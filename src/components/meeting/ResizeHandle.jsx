import { useCallback, useRef } from "react";

// Draggable separator. Works with pointer drag AND arrow keys (a11y), and
// reports deltas to the parent which clamps the width. Because both panes use
// min-w-0 + normal wrapping, content re-justifies live as you drag — the
// behavior the live app is missing.
export default function ResizeHandle({ onResize }) {
  const startX = useRef(0);

  const onPointerDown = useCallback(
    (e) => {
      startX.current = e.clientX;
      e.currentTarget.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const delta = ev.clientX - startX.current;
        startX.current = ev.clientX;
        onResize(delta);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [onResize]
  );

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize transcript panel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onResize(16);
        if (e.key === "ArrowRight") onResize(-16);
      }}
      className="group relative z-10 hidden w-1.5 shrink-0 cursor-col-resize items-center justify-center lg:flex"
    >
      <span className="h-10 w-1 rounded-full bg-line transition-colors group-hover:bg-brand group-focus-visible:bg-brand" />
    </div>
  );
}
