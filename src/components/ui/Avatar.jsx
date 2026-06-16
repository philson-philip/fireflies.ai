import { cn, speakerTone, initials } from "@lib/utils";

const SIZES = {
  xs: "h-5 w-5 text-[10px] rounded",
  sm: "h-8 w-8 text-caption rounded-md",
  md: "h-9 w-9 text-body-sm rounded-md",
};

const Avatar = ({ name, size = "sm", className, imageUrl }) => {
  const tone = speakerTone(name);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
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
};

export default Avatar;
