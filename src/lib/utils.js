// Tiny classname joiner (no dependency needed).
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

// "MM:SS" or "H:MM:SS" -> seconds
export function toSeconds(ts) {
  const bits = ts.split(":").map(Number);
  return bits.reduce((acc, n) => acc * 60 + n, 0);
}

// seconds -> "MM:SS"
export function formatClock(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

// Deterministic speaker accent from a name, drawn from the token palette.
// One source of truth so the avatar color matches across transcript,
// talktime and attendee chips (a system primitive, not ad-hoc).
const SPEAKER_TONES = [
  { bg: "#FEF0C7", fg: "#B54708" }, // amber
  { bg: "#D1FADF", fg: "#067647" }, // green
  { bg: "#E0EAFF", fg: "#175CD3" }, // blue
  { bg: "#FCE7F6", fg: "#9F1AB1" }, // magenta
  { bg: "#E9D7FE", fg: "#6938EF" }, // violet
];

export function speakerTone(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return SPEAKER_TONES[h % SPEAKER_TONES.length];
}

export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
