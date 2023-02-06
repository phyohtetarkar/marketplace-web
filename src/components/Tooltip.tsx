import { ReactNode, useEffect, useRef } from "react";

interface TooltipProps {
  title: string;
  className?: string;
  children: ReactNode;
}

function Tooltip({ title, className, children }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let tooltip: any;

    const initTooltip = async () => {
      const Tooltip = (await import("bootstrap")).Tooltip;
      if (!tooltipRef.current) {
        return;
      }
      tooltip = Tooltip.getOrCreateInstance(tooltipRef.current, {});
    };

    initTooltip();

    return () => {
      tooltip?.dispose();
    };
  }, [title]);

  return (
    <div
      ref={tooltipRef}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={title}
      className={`d-flex align-items-center ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default Tooltip;
