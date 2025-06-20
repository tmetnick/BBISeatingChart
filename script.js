// Example seat data - replace with your real data or fetch from JSON
const seatAssignments = {
  "seat-1": { name: "Teagan Metnick", status: "used", title: "Sales" },
  "seat-2": { name: "Open", status: "available" },
  "seat-3": { name: "Reserved", status: "reserved" },
  // add more seats here...
};

const tooltip = document.getElementById("tooltip");
let selectedSeatId = null;

// Helper: position tooltip near mouse
function moveTooltip(x, y) {
  tooltip.style.left = x + 15 + "px";
  tooltip.style.top = y + 15 + "px";
}

// Initialize seats on SVG load or page load
function initSeats() {
  Object.entries(seatAssignments).forEach(([id, data]) => {
    const seat = document.getElementById(id);
    if (!seat) return;

    // Add base class
    seat.classList.add("seat");

    // Add status class
    seat.classList.add(data.status);

    // Set tooltip title (used by JS, not native title attr)
    seat.dataset.tooltip = `${data.name}${data.title ? " - " + data.title : ""}`;

    // Mouse enter: show tooltip
    seat.addEventListener("mouseenter", (e) => {
      tooltip.textContent = seat.dataset.tooltip;
      tooltip.style.opacity = "1";
      moveTooltip(e.pageX, e.pageY);
    });

    // Mouse move: update tooltip position
    seat.addEventListener("mousemove", (e) => {
      moveTooltip(e.pageX, e.pageY);
    });

    // Mouse leave: hide tooltip
    seat.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });

    // Click: toggle selected seat highlight
    seat.addEventListener("click", () => {
      if (selectedSeatId && selectedSeatId !== id) {
        // Remove highlight from previously selected seat
        const prev = document.getElementById(selectedSeatId);
        if (prev) prev.classList.remove("selected");
      }

      if (selectedSeatId === id) {
        // Deselect seat
        seat.classList.remove("selected");
        selectedSeatId = null;
      } else {
        seat.classList.add("selected");
        selectedSeatId = id;
      }
    });
  });
}

// Run init after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // If your SVG is embedded via <object>, wait for it to load
  const obj = document.getElementById("floorplan-svg");
  if (obj) {
    obj.addEventListener("load", () => {
      // Access the SVG document inside <object>
      const svgDoc = obj.contentDocument;
      if (!svgDoc) return;

      // Override getElementById to look inside SVG doc
      window.getElementById = (id) => svgDoc.getElementById(id);

      initSeats();
    });
  } else {
    // SVG inline in HTML or no <object>, just init normally
    initSeats();
  }
});
