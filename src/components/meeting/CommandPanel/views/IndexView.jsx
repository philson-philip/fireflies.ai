import { MoreHorizontal } from "lucide-react";
import Typography from "../../../ui/Typography";

const IndexView = () => {
  const items = [
    { label: "Key Takeaways", hasMore: true },
    { label: "Notes", hasMore: false },
    { label: "Action items", hasMore: false },
  ];

  return (
    <div className="flex flex-col p-4">
      {items.map((item, i) => (
        <div key={i} className="flex h-12 items-center justify-between px-4 hover:bg-surface-secondary cursor-pointer group rounded-lg">
          <Typography as="span" variant="body-sm" tone="text-ink">{item.label}</Typography>
          {item.hasMore && (
            <span className="text-ink-muted transition-opacity">
              <MoreHorizontal size={18} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default IndexView;
