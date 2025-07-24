let seatData = {};
const API_BASE = 'https://bbi-seating-map-backend.onrender.com';
const ADMIN_PASSWORD = 'BBI-123';

const tooltip = document.getElementById("tooltip");
const container = document.getElementById("chart-container");
let selectedSeatId = null;

const editor = document.getElementById("admin-editor");
const nameInput = document.getElementById("editor-name");
const titleInput = document.getElementById("editor-title");
const statusInput = document.getElementById("editor-status");
const saveButton = document.getElementById("save-seat");

// Update seat colors based on status
function updateSeatColors() {
  Object.entries(seatData).forEach(([id, details]) => {
    const seat = document.getElementById(id);
    if (!seat) return;
    seat.classList.remove("available", "used", "reserved");
    seat.classList.add(details.status);
  });
}

// Fetch all seats from backend
async function fetchSeats() {
  try {
    const res = await fetch(`${API_BASE}/seats`);
    const data = await res.json();
    seatData = {};
    data.forEach(seat => {
      seatData[seat.seatId] = {
        name: seat.name,
        title: seat.title,
        status: seat.status
      };
    });
    updateSeatColors();
  } catch (err) {
    console.error("Error fetching seats:", err);
  }
}

// Save seat changes
saveButton.addEventListener("click", async () => {
  if (!selectedSeatId) return;

  const seat = document.getElementById(selectedSeatId);
  if (!seat) return;

  const details = seatData[selectedSeatId] || {};
  details.name = nameInput.value;
  details.title = titleInput.value;
  details.status = statusInput.value;
  seatData[selectedSeatId] = details;

  seat.classList.remove("available", "used", "reserved");
  seat.classList.add(details.status);
  seat.dataset.tooltip =
    `Seat ${selectedSeatId.replace("seat-", "")}: ${details.name}${details.title ? " - " + details.title : ""}`;
  tooltip.textContent = seat.dataset.tooltip;
  editor.classList.add("hidden");

  try {
    await fetch(`${API_BASE}/seats/${selectedSeatId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    console.log(`Seat ${selectedSeatId} saved to DB`);
    fetchSeats(); // Refresh after save
  } catch (err) {
    console.error("Error saving seat to DB:", err);
  }

  localStorage.setItem("seatData", JSON.stringify(seatData));
});

function isAdminMode() {
  return document.body.classList.contains('admin-mode');
}

function moveTooltip(x, y) {
  const rect = container.getBoundingClientRect();
  tooltip.style.left = x - rect.left + 1 + "px";
  tooltip.style.top = y - rect.top + 1 + "px";
}

// Attach listeners to seats already in DOM
function initSeats() {
  Object.entries(seatData).forEach(([id, data]) => {
    const seat = document.getElementById(id);
    if (!seat) return;

    seat.classList.add("seat");
    seat.classList.add(data.status);

    const seatNumber = id.replace("seat-", "");
    seat.dataset.tooltip = `Seat ${seatNumber}: ${data.name}${data.title ? " - " + data.title : ""}`;

    seat.addEventListener("mouseenter", (e) => {
      tooltip.textContent = seat.dataset.tooltip;
      tooltip.style.opacity = "1";
      moveTooltip(e.clientX, e.clientY);
    });

    seat.addEventListener("mousemove", (e) => moveTooltip(e.clientX, e.clientY));
    seat.addEventListener("mouseleave", () => tooltip.style.opacity = "0");

    seat.addEventListener("click", (e) => {
      console.log("Seat clicked:", id, "Admin:", isAdminMode());
      if (isAdminMode()) {
        selectedSeatId = id;
        nameInput.value = data.name || "";
        titleInput.value = data.title || "";
        statusInput.value = data.status || "available";

        // Position editor near clicked seat
        editor.style.position = "absolute";
        editor.style.left = e.pageX + 15 + "px";
        editor.style.top = e.pageY + 15 + "px";
        editor.classList.remove("hidden");
      } else {
        if (selectedSeatId && selectedSeatId !== id) {
          const prev = document.getElementById(selectedSeatId);
          if (prev) prev.classList.remove("selected");
        }

        if (selectedSeatId === id) {
          seat.classList.remove("selected");
          selectedSeatId = null;
        } else {
          seat.classList.add("selected");
          selectedSeatId = id;
        }

        document.getElementById("seat-info").textContent = selectedSeatId
          ? `Selected: ${seatData[id].name} ${seatData[id].title ? `(${seatData[id].title})` : ''}`
          : "";
        tooltip.textContent = seat.dataset.tooltip;
        tooltip.style.opacity = "1";
        moveTooltip(e.clientX, e.clientY);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-mode");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (!isAdminMode()) {
        const pwd = prompt("Enter admin password:");
        if (pwd === ADMIN_PASSWORD) {
          document.body.classList.add("admin-mode");
        } else if (pwd !== null) {
          alert("Incorrect password.");
        }
      } else {
        document.body.classList.remove("admin-mode");
      }
      toggleBtn.textContent = isAdminMode()
        ? "Switch to User Mode"
        : "Switch to Admin Mode";
    });
  }

  const exportBtn = document.getElementById("export-data");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      console.log(JSON.stringify(seatData, null, 2));
      alert("Check the console for updated seat data.");
    });
  }

  const stored = localStorage.getItem("seatData");
  if (stored) Object.assign(seatData, JSON.parse(stored));

  fetchSeats().then(initSeats);

  // Close editor when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!editor.contains(event.target) && !event.target.closest(".seat")) {
      editor.classList.add("hidden");
    }
  });
});