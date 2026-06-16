import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import Typography from "@components/ui/Typography";
import Button from "@components/ui/Button";
import IconButton from "@components/ui/IconButton";
import { cn } from "@lib/utils";

const RATING_STARS = [1, 2, 3, 4, 5];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-1">
      {RATING_STARS.map((star) => {
        const isActive = display >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="rounded-sm p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={32}
              className={cn(
                "transition-colors",
                isActive ? "fill-rating text-rating" : "fill-transparent text-line-strong hover:text-rating"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-lifted"
      >
        <div className="absolute right-4 top-4">
          <IconButton label="Close feedback" onClick={onClose} size="sm">
            <X size={20} />
          </IconButton>
        </div>

        <div className="mb-6">
          <Typography as="h2" id="feedback-title" variant="h3" className="mb-2">
            Love the New Notepad?
          </Typography>
          <Typography variant="body" tone="text-ink-muted">
            Your feedback matters! Help us make Fireflies even better for you.
          </Typography>
        </div>

        <div className="mb-6">
          <Typography variant="label" className="mb-3 block">
            Rate
          </Typography>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Help us understand more... (Optional)"
            className="h-24 w-full resize-none rounded-lg border border-line bg-surface p-3 text-body text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={rating === 0} onClick={onClose}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
