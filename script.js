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

// Update seat colors
function updateSeatColors() {
  Object.entries(seatData).forEach(([id, details]) => {
    const seat = document.getElementById(id) ||
      document.querySelector(`#floorplan-svg`).contentDocument?.getElementById(id);
    if (!seat) return;
    seat.classList.remove("available", "used", "reserved");
    seat.classList.add(details.status);
  });
}

// Fetch seats from backend
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

  const floorplan = document.getElementById("floorplan-svg");
  let seat = document.getElementById(selectedSeatId);
  if (!seat && floorplan && floorplan.contentDocument) {
    seat = floorplan.contentDocument.getElementById(selectedSeatId);
  }
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
    fetchSeats(); // Auto-refresh seats after save
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

// Attach click handlers to seats
function attachSeatEvents(seat, id, data, svgDoc = null) {
  seat.addEventListener("mouseenter", (e) => {
    tooltip.textContent = seat.dataset.tooltip;
    tooltip.style.opacity = "1";
    moveTooltip(e.clientX, e.clientY);
  });

  seat.addEventListener("mousemove", (e) => {
    moveTooltip(e.clientX, e.clientY);
  });

  seat.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  seat.addEventListener("click", (e) => {
    console.log("Seat clicked:", id, "Admin:", isAdminMode()); // <-- logging
    if (isAdminMode()) {
      selectedSeatId = id;
      nameInput.value = data.name || "";
      titleInput.value = data.title || "";
      statusInput.value = data.status || "available";
      editor.classList.remove("hidden");
    } else {
      if (selectedSeatId && selectedSeatId !== id) {
        const prev = svgDoc ? svgDoc.getElementById(selectedSeatId) : document.getElementById(selectedSeatId);
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

  const svg = document.getElementById("floorplan-svg");
  if (svg && svg.tagName.toLowerCase() === "object") {
    svg.addEventListener("load", () => {
      const svgDoc = svg.contentDocument;
      const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
      style.textContent = `
        .used { fill: #ff4d4f; }
        .available { fill: #4caf50; }
        .reserved { fill: #ffcc00; }
        .selected { stroke: #0000ff; stroke-width: 2; }
        .seat-label { font-size: 10px; fill: black; pointer-events: none; }
      `;
      svgDoc.documentElement.appendChild(style);

      Object.entries(seatData).forEach(([id, data]) => {
        const seat = svgDoc.getElementById(id);
        if (!seat) return;

        seat.classList.add("seat", data.status);
        seat.setAttribute("title", `${data.name}${data.title ? " – " + data.title : ""}`);
        seat.dataset.tooltip = `Seat ${id.replace("seat-", "")}: ${data.name}${data.title ? " - " + data.title : ""}`;

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const x = parseFloat(seat.getAttribute("x"));
        const y = parseFloat(seat.getAttribute("y"));
        text.textContent = id.replace("seat-", "");
        text.setAttribute("x", x + 5);
        text.setAttribute("y", y + 12);
        text.setAttribute("class", "seat-label");
        svgDoc.documentElement.appendChild(text);

        attachSeatEvents(seat, id, data, svgDoc);
      });

      fetchSeats(); // now fetch seats after SVG loaded
    });
  } else {
    fetchSeats();
  }
});