// November 2026 Moon calendar.
//
// Main phase times come from the US Naval Observatory (USNO) API:
// https://aa.usno.navy.mil/api/moon/phases/date?date=2026-10-20&nump=8
// Times are in Universal Time (UTC). The page shows every date and
// time in UTC, so every visitor sees the same calendar.
const PHASES = [
  { name: "Full Moon",     utc: "2026-10-26T04:12Z" },
  { name: "Last Quarter",  utc: "2026-11-01T20:28Z" },
  { name: "New Moon",      utc: "2026-11-09T07:02Z" },
  { name: "First Quarter", utc: "2026-11-17T11:48Z" },
  { name: "Full Moon",     utc: "2026-11-24T14:53Z" },
  { name: "Last Quarter",  utc: "2026-12-01T06:08Z" },
].map((p) => ({ name: p.name, date: new Date(p.utc) }));

const YEAR = 2026;
const MONTH = 10; // JavaScript months start at 0, so 10 is November.

// The phase between two main phases. For example, after a New Moon
// and before the First Quarter, the Moon is a waxing crescent.
const BETWEEN = {
  "New Moon": "Waxing Crescent",
  "First Quarter": "Waxing Gibbous",
  "Full Moon": "Waning Gibbous",
  "Last Quarter": "Waning Crescent",
};

// How much of the Moon's face to draw lit for each phase, and whether
// the lit side is on the right (waxing) or left (waning), as seen from
// the Northern Hemisphere. The drawing is a guide, not an exact figure.
const SHAPES = {
  "New Moon":        { lit: 0,    waxing: true },
  "Waxing Crescent": { lit: 0.25, waxing: true },
  "First Quarter":   { lit: 0.5,  waxing: true },
  "Waxing Gibbous":  { lit: 0.75, waxing: true },
  "Full Moon":       { lit: 1,    waxing: true },
  "Waning Gibbous":  { lit: 0.75, waxing: false },
  "Last Quarter":    { lit: 0.5,  waxing: false },
  "Waning Crescent": { lit: 0.25, waxing: false },
};

// Plain-language explanation of each phase, shown when a visitor
// hovers over or tabs to a day. Written in our own words, based on
// Britannica, "Lunar phase": https://www.britannica.com/science/lunar-phases
const EXPLANATIONS = {
  "New Moon":
    "The Moon is between Earth and the Sun. Sunlight hits the far side of the Moon, so the side facing us is in shadow and we can barely see it. Fun fact: if you stood on the Moon right now, Earth would look full.",
  "Waxing Crescent":
    "Only about a quarter of the Moon's face is lit, in a thin curve. “Waxing” means growing: the lit part gets a little bigger each night.",
  "First Quarter":
    "Seen from Earth, the Moon and the Sun form a right angle. That means half of the Moon's face is lit and half is dark.",
  "Waxing Gibbous":
    "About three-quarters of the Moon's face is lit. The lit part is still growing, on its way to a full Moon.",
  "Full Moon":
    "Earth is between the Sun and the Moon. The whole sunlit side of the Moon faces us, so we see a bright, round disk. Fun fact: if you stood on the Moon right now, Earth would look dark.",
  "Waning Gibbous":
    "About three-quarters of the Moon's face is still lit, but the full Moon has passed. “Waning” means shrinking: the lit part gets a little smaller each night.",
  "Last Quarter":
    "The Moon and the Sun form a right angle again, as seen from Earth. Half of the Moon's face is lit, but it's the opposite half from the first quarter.",
  "Waning Crescent":
    "Only about a quarter of the Moon's face is lit, in a thin curve that shrinks each night until the next new Moon.",
};

function sameUtcDay(a, b) {
  return a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate();
}

// Returns the phase name for a UTC calendar day, and the main phase
// event if one happens that day.
function phaseForDay(day) {
  const event = PHASES.find((p) => sameUtcDay(p.date, day));
  if (event) return { name: event.name, event };

  const noon = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 12));
  let last = null;
  for (const p of PHASES) {
    if (p.date <= noon) last = p;
  }
  return { name: BETWEEN[last.name], event: null };
}

// Draws the Moon as an SVG. The lit part is a half circle on one side,
// plus or minus an ellipse that marks the line between light and dark.
function moonSvg(phaseName) {
  const { lit, waxing } = SHAPES[phaseName];
  const r = 20;
  let litShape = "";

  if (lit === 1) {
    litShape = `<circle r="${r}" class="moon-lit"/>`;
  } else if (lit > 0) {
    const rx = Math.abs(1 - 2 * lit) * r;
    const sweep = lit > 0.5 ? 1 : 0;
    const d = `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${rx} ${r} 0 0 ${sweep} 0 ${-r} Z`;
    const flip = waxing ? "" : ` transform="scale(-1 1)"`;
    litShape = `<path d="${d}" class="moon-lit"${flip}/>`;
  }

  return `<svg viewBox="-22 -22 44 44" class="moon" aria-hidden="true" focusable="false">
    <circle r="${r}" class="moon-dark"/>${litShape}
  </svg>`;
}

function formatTime(date) {
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}

function buildCalendar() {
  const container = document.getElementById("calendar");
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const first = new Date(Date.UTC(YEAR, MONTH, 1));
  const daysInMonth = new Date(Date.UTC(YEAR, MONTH + 1, 0)).getUTCDate();
  const today = new Date();

  const table = document.createElement("table");
  table.innerHTML = `<thead><tr>${weekdays
    .map((d) => `<th scope="col">${d}</th>`)
    .join("")}</tr></thead>`;
  const body = document.createElement("tbody");

  let row = document.createElement("tr");
  for (let i = 0; i < first.getUTCDay(); i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(Date.UTC(YEAR, MONTH, d));
    const { name, event } = phaseForDay(day);
    const cell = document.createElement("td");
    cell.className = "day" + (event ? " main-phase" : "");
    cell.tabIndex = 0;
    cell.setAttribute("aria-describedby", `tip-${d}`);
    if (sameUtcDay(day, today)) {
      cell.classList.add("today");
      cell.setAttribute("aria-current", "date");
    }
    cell.innerHTML = `
      <span class="date">${d}</span>
      ${moonSvg(name)}
      <span class="phase">${name}</span>
      ${event ? `<span class="time">${formatTime(event.date)}</span>` : ""}
      <span class="tooltip" role="tooltip" id="tip-${d}">
        <strong>${name}</strong>
        ${EXPLANATIONS[name]}
      </span>`;
    row.appendChild(cell);

    if (day.getUTCDay() === 6 || d === daysInMonth) {
      body.appendChild(row);
      row = document.createElement("tr");
    }
  }

  table.appendChild(body);
  container.replaceChildren(table);
}

buildCalendar();
