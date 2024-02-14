import { RiAddFill, RiArrowDownFill, RiSubtractFill } from "@remixicon/react";
import { ReactNode, useState } from "react";

interface AccordionProps {
  header: (open: boolean) => ReactNode;
  open?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  iconType?: "plus-minus" | "chevron";
  children?: ReactNode;
}

function Accordion(props: AccordionProps) {
  const {
    header,
    open,
    headerClassName,
    bodyClassName,
    iconType = "chevron",
    children
  } = props;

  const [bodyElement, setBodyElement] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open ?? false);

  return (
    <>
      <div
        role="button"
        className={`hstack ${headerClassName ?? ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {header(isOpen)}
        <div className="flex-grow-1"></div>
        {iconType === "chevron" && (
          <RiArrowDownFill
            size={20}
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
              <RiAddFill
                size={20}
                style={{
                  rotate: `${isOpen ? "180deg" : "0deg"}`,
                  visibility: isOpen ? "hidden" : "visible",
                  transition: "rotate 0.25s ease-in, visibility 0.25s"
                }}
              />
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
              <RiSubtractFill
                size={20}
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
      <div>
        <div
          style={{
            overflowY: "clip",
            height: `${
              isOpen
                ? `${bodyElement ? bodyElement.clientHeight + "px" : undefined}`
                : "0px"
            }`,
            transition: "height 0.25s ease-in"
          }}
        >
          <div ref={setBodyElement} className={`${bodyClassName ?? ""}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accordion;
