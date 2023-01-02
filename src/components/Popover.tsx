import { Placement } from "@popperjs/core";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface PopoverProps {
  placement?: Placement;
  renderReferenceElement: (handleClick: () => void) => ReactNode;
  renderPopperElement: (close: () => void) => ReactNode;
}

function Reference() {}

function Popper() {}

function Popover(props: PopoverProps) {
  const { placement, renderReferenceElement, renderPopperElement } = props;

  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        {
          name: "offset",
          options: {
            offset: [0, 4]
          }
        }
      ],
      placement: placement ?? "bottom-start"
    }
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      (referenceElement?.current?.contains(e.target) ?? false)
    ) {
      return;
    }

    if (
      e.target instanceof Node &&
      (popperElement?.current?.contains(e.target) ?? false)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="position-relative">
      <div ref={referenceElement}>
        {renderReferenceElement(() => setOpen(!open))}
      </div>

      <div
        ref={popperElement}
        style={{ ...styles.popper, zIndex: 999 }}
        {...attributes.popper}
      >
        {open && renderPopperElement(() => setOpen(false))}
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
}

export default Popover;
