import { cn } from "../../lib/utils";

const Card = ({ as: Tag = "div", interactive = false, className, children, ...props }) => (
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

export default Card;
