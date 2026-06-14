import { cn } from "../../lib/utils";

// One container with consistent padding/radius/border. Replaces the
// inconsistent card treatments across bookmarks, AI Skills and comments.
export default function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-line bg-surface p-4",
        interactive &&
          "cursor-pointer shadow-subtle transition duration-150 ease-out-soft hover:border-line-strong hover:shadow-raised",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
