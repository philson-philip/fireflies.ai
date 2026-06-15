import { useCallback, useRef } from "react";

const ResizeHandle = ({ onResize, value, min, max }) => {
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
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={value != null ? `${Math.round(value)} pixels` : undefined}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onResize(16);
        if (e.key === "ArrowRight") onResize(-16);
      }}
      className="group relative z-10 hidden w-px shrink-0 cursor-col-resize lg:block"
    >
      <div className="absolute inset-y-0 right-0 w-px bg-line transition-all group-hover:w-[2px] group-hover:bg-brand group-focus-visible:w-[2px] group-focus-visible:bg-brand" />
      <div className="absolute inset-y-0 -left-1 w-3" />
    </div>
  );
};

export default ResizeHandle;
