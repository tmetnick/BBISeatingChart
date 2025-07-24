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

// --- Update seat colors ---
function updateSeatColors() {
  Object.entries(seatData).forEach(([id, details]) => {
    const seat = document.getElementById(id);
    if (!seat) return;
    seat.classList.remove("available", "used", "reserved");
    seat.classList.add(details.status);
  });
}

// --- Initialize seat click events ---
function initSeats() {
  console.log("initSeats called with", Object.keys(seatData).length, "seats");
  Object.entries(seatData).forEach(([id, data]) => {
    const seat = document.getElementById(id);
    if (!seat) return;

    // Remove any previous listeners before adding a new one
    seat.replaceWith(seat.cloneNode(true));
    const freshSeat = document.getElementById(id);

    freshSeat.addEventListener("mouseenter", (e) => {
      tooltip.textContent = `Seat ${id.replace("seat-", "")}: ${data.name}${data.title ? " - " + data.title : ""}`;
      tooltip.style.opacity = "1";
      moveTooltip(e.clientX, e.clientY);
    });

    freshSeat.addEventListener("mousemove", (e) => {
      moveTooltip(e.clientX, e.clientY);
    });

    freshSeat.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });

    freshSeat.addEventListener("click", (e) => {
      console.log("Seat clicked:", id, "Admin mode?", isAdminMode());
      if (isAdminMode()) {
        selectedSeatId = id;
        nameInput.value = data.name || "";
        titleInput.value = data.title || "";
        statusInput.value = data.status || "available";

        // Position editor near clicked seat
        const seatRect = freshSeat.getBoundingClientRect();
        editor.style.left = `${seatRect.x + seatRect.width + 10}px`;
        editor.style.top = `${seatRect.y}px`;
        editor.classList.remove("hidden");
      } else {
        if (selectedSeatId && selectedSeatId !== id) {
          const prev = document.getElementById(selectedSeatId);
          if (prev) prev.classList.remove("selected");
        }
        if (selectedSeatId === id) {
          freshSeat.classList.remove("selected");
          selectedSeatId = null;
        } else {
          freshSeat.classList.add("selected");
          selectedSeatId = id;
        }
        document.getElementById("seat-info").textContent = selectedSeatId
          ? `Selected: ${seatData[id].name} ${seatData[id].title ? `(${seatData[id].title})` : ''}`
          : "";
        tooltip.textContent = freshSeat.dataset.tooltip;
        tooltip.style.opacity = "1";
        moveTooltip(e.clientX, e.clientY);
      }
    });
  });
}

// --- Fetch seat data from backend ---
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
    initSeats();
  } catch (err) {
    console.error("Error fetching seats:", err);
  }
}
fetchSeats();

// --- Save seat changes ---
saveButton.addEventListener("click", async () => {
  if (!selectedSeatId) return;

  const details = seatData[selectedSeatId] || {};
  details.name = nameInput.value;
  details.title = titleInput.value;
  details.status = statusInput.value;
  seatData[selectedSeatId] = details;

  try {
    await fetch(`${API_BASE}/seats/${selectedSeatId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    console.log(`Seat ${selectedSeatId} saved to DB`);
    fetchSeats(); // refresh after save
  } catch (err) {
    console.error("Error saving seat to DB:", err);
  }

  editor.classList.add("hidden");
  localStorage.setItem("seatData", JSON.stringify(seatData));
});

// --- Helpers ---
function isAdminMode() {
  return document.body.classList.contains('admin-mode');
}

function moveTooltip(x, y) {
  const rect = container.getBoundingClientRect();
  tooltip.style.left = x - rect.left + 1 + "px";
  tooltip.style.top = y - rect.top + 1 + "px";
}

// --- Page Load Events ---
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
});