import { cn } from "../../lib/utils";
import { speakerTone, initials } from "../../lib/utils";
import { participants } from "../../data/meeting";

const SIZES = {
  xs: "h-5 w-5 text-[10px] rounded",
  sm: "h-8 w-8 text-caption rounded-md",
  md: "h-9 w-9 text-body-sm rounded-md",
};

// Speaker chip. Color is derived deterministically from the name so the same
// person reads the same color in the transcript, talktime and attendee list.
export default function Avatar({ name, size = "sm", className, imageUrl: explicitImageUrl }) {
  const tone = speakerTone(name);
  const participant = participants.find((p) => p.name === name);
  const finalImageUrl = explicitImageUrl || participant?.imageUrl;

  if (finalImageUrl) {
    return (
      <img
        src={finalImageUrl}
        alt={name}
        title={name}
        className={cn("inline-flex shrink-0 items-center justify-center object-cover", SIZES[size], className)}
      />
    );
  }
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
