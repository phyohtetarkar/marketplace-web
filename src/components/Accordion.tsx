import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

interface AccordionProps {
  header: (open: boolean) => ReactNode;
  className?: string;
  open?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  iconType?: "plus-minus" | "chevron";
  children?: ReactNode;
}

function Accordion(props: AccordionProps) {
  const {
    header,
    className,
    open,
    headerClassName,
    bodyClassName,
    iconType = "chevron",
    children
  } = props;

  const [bodyElement, setBodyElement] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open ?? false);

  return (
    <div className={`${className ?? ""}`}>
      <div
        role="button"
        className={`hstack ${headerClassName ?? ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {header(isOpen)}
        <div className="flex-grow-1"></div>
        {iconType === "chevron" && (
          <ChevronDownIcon
            width={20}
            strokeWidth={2}
            className={`ms-auto`}
            style={{
              rotate: `${isOpen ? "180deg" : "0deg"}`,
              transition: "rotate 0.25s ease-in"
            }}
          />
        )}

        {iconType === "plus-minus" && (
          <div className="position-relative" style={{ width: 20 }}>
            <div className="position-absolute top-50 start-50 translate-middle">
              <PlusIcon
                width={20}
                strokeWidth={2}
                style={{
                  rotate: `${isOpen ? "180deg" : "0deg"}`,
                  visibility: isOpen ? "hidden" : "visible",
                  transition: "rotate 0.25s ease-in, visibility 0.25s"
                }}
              />
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
              <MinusIcon
                width={20}
                strokeWidth={2}
                className={`text-primary`}
                style={{
                  rotate: `${isOpen ? "180deg" : "0deg"}`,
                  visibility: isOpen ? "visible" : "hidden",
                  transition: "rotate 0.25s ease-in, visibility 0.25s"
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          overflowY: "clip",
          height: `${
            isOpen
              ? `${bodyElement ? bodyElement.clientHeight + "px" : "auto"}`
              : "0px"
          }`,
          transition: "height 0.25s ease-in"
        }}
      >
        <div ref={setBodyElement} className={bodyClassName ?? ""}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
