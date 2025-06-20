// Example seat data - replace with your real data or fetch from JSON
const seatData = {
  "seat-6": { name: "Daniel Morrison", title: "", status: "used" },
  "seat-7": { name: "Katie Hug", title: "", status: "used" },
  "seat-8": { name: "Jason Goetluck", title: "", status: "used" },
  "seat-9": { name: "Frankie Wren", title: "", status: "used" },
  "seat-16": { name: "Ilian Iliev", title: "", status: "used" },
  "seat-17": { name: "Anthony Helm", title: "", status: "used" },
  "seat-18": { name: "Harrison Rodriguez", title: "", status: "used" },
  "seat-19": { name: "Seth Frisby-Jack", title: "", status: "used" },
  "seat-20": { name: "Eric Carr", title: "", status: "used" },
  "seat-21": { name: "Nate Campbell", title: "", status: "used" },
  "seat-26": { name: "Cleon Deal", title: "", status: "used" },
  "seat-27": { name: "Derya Ekren", title: "", status: "used" },
  "seat-28": { name: "Seth Cutright", title: "", status: "used" },
  "seat-29": { name: "Nicholas Whittaker", title: "", status: "used" },
  "seat-30": { name: "Patrick Poulos", title: "", status: "used" },
  "seat-31": { name: "Daniel Stuckey", title: "", status: "used" },
  "seat-32": { name: "Logan Perhacs", title: "", status: "used" },
  "seat-37": { name: "Austin Evans", title: "", status: "used" },
  "seat-38": { name: "Eric Lowe", title: "", status: "used" },
  "seat-39": { name: "Jake Cadotte", title: "", status: "used" },
  "seat-52": { name: "Richard Wilson", title: "", status: "used" },
  "seat-62": { name: "Jesse Halpern", title: "", status: "used" },
  "seat-68": { name: "Brian Keifer", title: "", status: "used" },
  "seat-71": { name: "Benjamin Durham", title: "", status: "used" },
  "seat-74": { name: "Alex Boucher", title: "", status: "used" },
  "seat-75": { name: "Mia Scharrenberg", title: "", status: "used" },
  "seat-76": { name: "Andrew Flores", title: "", status: "used" },
  "seat-77": { name: "Cody Rogowski", title: "", status: "used" },
  "seat-78": { name: "Nick Tosto", title: "", status: "used" },
  "seat-79": { name: "Cody Southiere", title: "", status: "used" },
  "seat-84": { name: "William Russell", title: "", status: "used" },
  "seat-85": { name: "Joshua Reyes", title: "", status: "used" },
  "seat-88": { name: "Steven Sargeant", title: "", status: "used" },
  "seat-99": { name: "Alison O'Brien", title: "HR Specialist", status: "used" },
  "seat-100": { name: "Samantha Bensch", title: "Recruiter", status: "used" },
  "seat-101": { name: "Anna Hopkins", title: "", status: "used" },
  "seat-103": { name: "", title: "", status: "available" },
  "seat-104": { name: "Teagan Metnick", title: "IT Support Intern", status: "used" },
  "seat-105": { name: "Katie Nichter", title: "", status: "used" },
  "seat-108": { name: "Willie Dunham", title: "", status: "used" },
  "seat-109": { name: "Nate Wood", title: "", status: "used" },
  "seat-110": { name: "Colin Julian", title: "", status: "used" },
  "seat-115": { name: "Adam Kraemer", title: "", status: "used" },
  "seat-118": { name: "Lexi Enderby", title: "", status: "used" },
  "seat-130": { name: "Zachary Eckerson", title: "", status: "used" },
  "seat-131": { name: "Ryan Skelly", title: "", status: "used" },
  "seat-133": { name: "Riley Golden", title: "", status: "used" },
  "seat-136": { name: "Isaiah Tirado", title: "", status: "used" },
  "seat-137": { name: "Kyler Rossi", title: "", status: "used" },
  "seat-138": { name: "Joshua Conn", title: "", status: "used" },
  "seat-140": { name: "Jillian Klopp", title: "", status: "used" },
  "seat-144": { name: "Shawn Boone", title: "", status: "used" },
  "seat-145": { name: "Marios Delis", title: "", status: "used" },
  "seat-146": { name: "Adam Cox", title: "", status: "used" },
  "seat-149": { name: "AJ Trapasso", title: "", status: "used" }

  // add more seats here...
};

const tooltip = document.getElementById("tooltip");
let selectedSeatId = null;

// Helper: position tooltip near mouse
function moveTooltip(x, y) {
  tooltip.style.left = x + 5 + "px";
  tooltip.style.top = y + 5 + "px";
}

// Initialize seats on SVG load or page load
function initSeats() {
  Object.entries(seatData).forEach(([id, data]) => {
    const seat = document.getElementById(id);
    if (!seat) return;

    // Add base class
    seat.classList.add("seat");

    // Add status class
    seat.classList.add(data.status);

    // Set tooltip title (used by JS, not native title attr)
    const seatNumber = id.replace("seat-", "");
    seat.dataset.tooltip = `Seat ${seatNumber}: ${data.name}${data.title ? " - " + data.title : ""}`;

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
        // Remove highlight from previously selected seatAdd commentMore actions
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
  const svg = document.getElementById("floorplan-svg");

  if (svg && svg.contentDocument) {
    svg.addEventListener("load", () => {
      const svgDoc = svg.contentDocument;

      Object.entries(seatData).forEach(([id, data]) => {
        const seat = svgDoc.getElementById(id);
        if (seat) {
          seat.classList.add(data.status);
          seat.setAttribute("title", `${data.name}${data.title ? " – " + data.title : ""}`);

          // Create and add seat number label
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.textContent = id.replace("seat-", "");

          const x = parseFloat(seat.getAttribute("x"));
          const y = parseFloat(seat.getAttribute("y"));

          text.setAttribute("x", x + 5);
          text.setAttribute("y", y + 12);
          text.setAttribute("class", "seat-label");

          svgDoc.documentElement.appendChild(text);
        }
      });
    });
  } else {
    initSeats(); // for inline SVG fallback
  }
});
