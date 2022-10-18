import { ReactNode, useEffect, useRef } from "react";

interface DropdownProps {
  toggle: ReactNode;
  toggleClassName?: string;
  menuClassName?: string;
  popperConfig?: any;
  disabled?: boolean;
  children: ReactNode;
}

function Dropdown({
  toggle,
  toggleClassName,
  menuClassName,
  popperConfig,
  children,
  disabled,
}: DropdownProps) {
  const dropdownToggle = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let dropdown: any;

    const initDropdowns = async () => {
      const Dropdown = (await import("bootstrap")).Dropdown;
      if (!dropdownToggle.current) {
        return;
      }
      dropdown = new Dropdown(dropdownToggle.current, {
        popperConfig: popperConfig ?? null,
      });
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      dropdown?.show();
    };

    initDropdowns();

    const element = dropdownToggle.current;

    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
      dropdown?.dispose();
    };
  }, [popperConfig]);

  return (
    <div className="dropdown">
      <div
        ref={dropdownToggle}
        className={`${toggleClassName ?? ""}`}
        role="button"
        data-bs-toggle="dropdown"
        style={{
          outlineStyle: "none",
        }}
      >
        {toggle}
      </div>
      <ul className={`dropdown-menu ${menuClassName ?? ""}`}>{children}</ul>
    </div>
  );
}

export default Dropdown;
