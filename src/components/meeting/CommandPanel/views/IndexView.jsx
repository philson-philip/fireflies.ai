import { MoreHorizontal } from "lucide-react";
import Typography from "@components/ui/Typography";
import Card from "@components/ui/Card";

const IndexView = () => {
  const items = [
    { label: "Key Takeaways", hasMore: true },
    { label: "Notes", hasMore: false },
    { label: "Action items", hasMore: false },
  ];

  return (
    <div className="flex flex-col p-4 gap-3 h-full">
      {items.map((item, i) => (
        <Card key={i} interactive className="flex items-center justify-between h-auto">
          <Typography as="span" variant="body-sm" tone="text-ink" className="font-medium">{item.label}</Typography>
          {item.hasMore && (
            <span className="text-ink-muted transition-opacity">
              <MoreHorizontal size={18} />
            </span>
          )}
        </Card>
      ))}
    </div>
  );
};

export default IndexView;
