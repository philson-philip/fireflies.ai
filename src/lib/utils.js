export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function toSeconds(ts) {
  if (typeof ts !== "string" || !ts.trim()) return 0;
  const bits = ts.split(":").map(Number);
  if (bits.some(Number.isNaN)) return 0;
  return bits.reduce((acc, n) => acc * 60 + n, 0);
}

export function formatClock(totalSeconds) {
  const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function uid() {
  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

const SPEAKER_TONES = [
  { bg: "#FEF0C7", fg: "#B54708" },
  { bg: "#D1FADF", fg: "#067647" },
  { bg: "#E0EAFF", fg: "#175CD3" },
  { bg: "#FCE7F6", fg: "#9F1AB1" },
  { bg: "#E9D7FE", fg: "#6938EF" },
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
