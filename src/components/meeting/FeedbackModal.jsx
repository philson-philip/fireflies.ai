import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import Typography from "@components/ui/Typography";
import Button from "@components/ui/Button";
import IconButton from "@components/ui/IconButton";
import { cn } from "@lib/utils";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoverRating(0);
      setFeedback("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="feedback-title"
        className="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-elevated"
      >
        <div className="absolute right-4 top-4">
          <IconButton
            label="Close feedback"
            onClick={onClose}
            size="sm"
          >
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
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={32}
                    className={cn(
                      "transition-colors",
                      isActive ? "fill-[#FACC15] text-[#FACC15]" : "fill-transparent text-line-heavy hover:text-[#FACC15]"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Help us understand more... (Optional)"
            className="w-full h-24 resize-none rounded-lg border border-line bg-surface p-3 text-body text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
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
