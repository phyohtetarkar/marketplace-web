import { ReactNode, useEffect, useRef } from "react";

interface DropdownProps {
  toggle: ReactNode;
  className?: string;
  toggleClassName?: string;
  menuClassName?: string;
  popperConfig?: any;
  disabled?: boolean;
  children: ReactNode;
}

function Dropdown({
  toggle,
  className,
  toggleClassName,
  menuClassName,
  popperConfig,
  children,
  disabled
}: DropdownProps) {
  const dropdownToggleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let dropdown: any;

    const initDropdowns = async () => {
      const Dropdown = (await import("bootstrap")).Dropdown;
      if (!dropdownToggleRef.current) {
        return;
      }
      dropdown = Dropdown.getOrCreateInstance(dropdownToggleRef.current, {
        popperConfig: popperConfig ?? null
      });
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      dropdown?.show();
    };

    initDropdowns();

    const element = dropdownToggleRef.current;

    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
      dropdown?.dispose();
    };
  }, [popperConfig]);

  return (
    <div className={`dropdown ${className ?? ""}`}>
      <div
        ref={dropdownToggleRef}
        className={`${toggleClassName ?? ""}`}
        role="button"
        data-bs-toggle="dropdown"
        style={{
          outlineStyle: "none"
        }}
      >
        {toggle}
      </div>
      <ul className={`dropdown-menu ${menuClassName ?? ""}`}>{children}</ul>
    </div>
  );
}

export default Dropdown;
