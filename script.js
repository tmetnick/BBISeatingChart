// Example seat data - replace with your real data or fetch from JSON
const seatData = {
  "seat-6": { name: "Daniel Morrison", title: "", status: "used" },
  "seat-7": { name: "Katie Hug", title: "", status: "used" },
  "seat-8": { name: "Jason Goetluck", title: "", status: "used" },
  "seat-9": { name: "Frankie Wren", title: "", status: "used" },
  "seat-10": { name: "Available", title: "", status: "available" },
  "seat-11": { name: "Available", title: "", status: "available" },
  "seat-12": { name: "Available", title: "", status: "available" },
  "seat-13": { name: "Available", title: "", status: "available" },
  "seat-14": { name: "Available", title: "", status: "available" },
  "seat-15": { name: "Available", title: "", status: "available" },
  "seat-16": { name: "Ilian Iliev", title: "", status: "used" },
  "seat-17": { name: "Anthony Helm", title: "", status: "used" },
  "seat-18": { name: "Harrison Rodriguez", title: "", status: "used" },
  "seat-19": { name: "Seth Frisby-Jack", title: "", status: "used" },
  "seat-20": { name: "Eric Carr", title: "", status: "used" },
  "seat-21": { name: "Nate Campbell", title: "", status: "used" },
  "seat-22": { name: "Available", title: "", status: "available" },
  "seat-23": { name: "Available", title: "", status: "available" },
  "seat-24": { name: "Available", title: "", status: "available" },
  "seat-25": { name: "Available", title: "", status: "available" },
  "seat-26": { name: "Cleon Deal", title: "", status: "used" },
  "seat-27": { name: "Derya Ekren", title: "", status: "used" },
  "seat-28": { name: "Seth Cutright", title: "", status: "used" },
  "seat-29": { name: "Nicholas Whittaker", title: "", status: "used" },
  "seat-30": { name: "Patrick Poulos", title: "", status: "used" },
  "seat-31": { name: "Daniel Stuckey", title: "", status: "used" },
  "seat-32": { name: "Logan Perhacs", title: "", status: "used" },
  "seat-33": { name: "Available", title: "", status: "available" },
  "seat-34": { name: "Available", title: "", status: "available" },
  "seat-35": { name: "Available", title: "", status: "available" },
  "seat-36": { name: "Available", title: "", status: "available" },
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
  "seat-101": { name: "Anna Hopkins", title: "Recruiting Team Lead", status: "used" },
  "seat-102": { name: "Available", title: "", status: "available" },
  "seat-103": { name: "Available", title: "", status: "available" },
  "seat-104": { name: "Teagan Metnick", title: "IT Support Intern", status: "used" },
  "seat-105": { name: "Katie Nichter", title: "HR Intern", status: "used" },
  "seat-106": { name: "Available", title: "", status: "available" },
  "seat-107": { name: "Available", title: "", status: "available" },
  "seat-108": { name: "Willie Dunham", title: "", status: "used" },
  "seat-109": { name: "Nate Wood", title: "", status: "used" },
  "seat-110": { name: "Colin Julian", title: "", status: "used" },
  "seat-111": { name: "Available", title: "", status: "available" },
  "seat-112": { name: "Available", title: "", status: "available" },
  "seat-113": { name: "Available", title: "", status: "available" },
  "seat-114": { name: "Available", title: "", status: "available" },
  "seat-115": { name: "Adam Kraemer", title: "", status: "used" },
  "seat-116": { name: "Available", title: "", status: "available" },
  "seat-117": { name: "Available", title: "", status: "available" },
  "seat-118": { name: "Lexi Enderby", title: "", status: "used" },
  "seat-119": { name: "Available", title: "", status: "available" },
  "seat-120": { name: "Available", title: "", status: "available" },
  "seat-121": { name: "Available", title: "", status: "available" },
  "seat-122": { name: "Available", title: "", status: "available" },
  "seat-123": { name: "Available", title: "", status: "available" },
  "seat-124": { name: "Available", title: "", status: "available" },
  "seat-125": { name: "Available", title: "", status: "available" },
  "seat-126": { name: "Available", title: "", status: "available" },
  "seat-127": { name: "Available", title: "", status: "available" },
  "seat-128": { name: "Available", title: "", status: "available" },
  "seat-129": { name: "Available", title: "", status: "available" },
  "seat-130": { name: "Zachary Eckerson", title: "", status: "used" },
  "seat-131": { name: "Ryan Skelly", title: "", status: "used" },
  "seat-132": { name: "Available", title: "", status: "available" },
  "seat-133": { name: "Riley Golden", title: "", status: "used" },
  "seat-134": { name: "Available", title: "", status: "available" },
  "seat-135": { name: "Available", title: "", status: "available" },
  "seat-136": { name: "Isaiah Tirado", title: "", status: "used" },
  "seat-137": { name: "Kyler Rossi", title: "", status: "used" },
  "seat-138": { name: "Joshua Conn", title: "", status: "used" },
  "seat-139": { name: "Available", title: "", status: "available" },
  "seat-140": { name: "Jillian Klopp", title: "", status: "used" },
  "seat-141": { name: "Available", title: "", status: "available" },
  "seat-142": { name: "Available", title: "", status: "available" },
  "seat-143": { name: "Available", title: "", status: "available" },
  "seat-144": { name: "Shawn Boone", title: "", status: "used" },
  "seat-145": { name: "Marios Delis", title: "", status: "used" },
  "seat-146": { name: "Adam Cox", title: "", status: "used" },
  "seat-147": { name: "Available", title: "", status: "available" },
  "seat-148": { name: "Available", title: "", status: "available" },
  "seat-149": { name: "AJ Trapasso", title: "", status: "used" }

  // add more seats here...
};

const tooltip = document.getElementById("tooltip");
let selectedSeatId = null;

function isAdminMode() {
  return document.body.classList.contains('admin-mode');
}

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

seat.addEventListener("click", () => {
  if (isAdminMode()) {
    // Cycle status in admin mode
    seat.classList.remove("available", "used", "reserved"); // Clear all
    if (data.status === "available") {
      data.status = "used";
    } else if (data.status === "used") {
      data.status = "reserved";
    } else {
      data.status = "available";
    }
    seat.classList.add(data.status);
    seat.dataset.tooltip = `Seat ${seatNumber}: ${data.name}${data.title ? " - " + data.title : ""}`;
  } else {
    // Regular select/deselect logic
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
  }
});
  });
}
// Toggle Admin/User Mode
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-mode");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("admin-mode");
      toggleBtn.textContent = document.body.classList.contains("admin-mode")
        ? "Switch to User Mode"
        : "Switch to Admin Mode";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("floorplan-svg");

  // For <object> SVG
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

        const seatNumber = id.replace("seat-", "");

        // Add label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const x = parseFloat(seat.getAttribute("x"));
        const y = parseFloat(seat.getAttribute("y"));
        text.textContent = seatNumber;
        text.setAttribute("x", x + 5);
        text.setAttribute("y", y + 12);
        text.setAttribute("class", "seat-label");
        svgDoc.documentElement.appendChild(text);

        // Add click logic
        seat.addEventListener("click", () => {
          if (isAdminMode()) {
            seat.classList.remove("available", "used", "reserved");
            if (data.status === "available") {
              data.status = "used";
            } else if (data.status === "used") {
              data.status = "reserved";
            } else {
              data.status = "available";
            }
            seat.classList.add(data.status);
            seat.setAttribute("title", `${data.name}${data.title ? " – " + data.title : ""}`);
          } else {
            if (selectedSeatId && selectedSeatId !== id) {
              const prev = svgDoc.getElementById(selectedSeatId);
              if (prev) prev.classList.remove("selected");
            }

            if (selectedSeatId === id) {
              seat.classList.remove("selected");
              selectedSeatId = null;
            } else {
              seat.classList.add("selected");
              selectedSeatId = id;
            }
          }
        });
      });
    });
  } else {
    // For inline SVG fallback
    initSeats();
  }
});
