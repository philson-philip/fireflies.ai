import { cn } from "../../lib/utils";
import { speakerTone, initials } from "../../lib/utils";

const SIZES = {
  xs: "h-5 w-5 text-[10px] rounded",
  sm: "h-7 w-7 text-caption rounded-md",
  md: "h-9 w-9 text-body-sm rounded-md",
};

// Speaker chip. Color is derived deterministically from the name so the same
// person reads the same color in the transcript, talktime and attendee list.
export default function Avatar({ name, size = "sm", className }) {
  const tone = speakerTone(name);
  return (
    <span
      title={name}
      style={{ backgroundColor: tone.bg, color: tone.fg }}
      className={cn("inline-flex shrink-0 items-center justify-center font-display font-semibold", SIZES[size], className)}
    >
      {initials(name)}
    </span>
  );
}
