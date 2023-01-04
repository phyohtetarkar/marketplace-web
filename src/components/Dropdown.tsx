import { ReactNode, useEffect, useRef } from "react";

interface DropdownProps {
  toggle: ReactNode;
  className?: string;
  toggleClassName?: string;
  menuClassName?: string;
  popperConfig?: any;
  disabled?: boolean;
  children: ReactNode;
  showOnHover?: boolean;
}

function Dropdown({
  toggle,
  className,
  toggleClassName,
  menuClassName,
  popperConfig,
  children,
  disabled,
  showOnHover
}: DropdownProps) {
  const dropdownToggleRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement>(null);
  const dropdownToggle = useRef<any>(null);
  useEffect(() => {
    const initDropdowns = async () => {
      const Dropdown = (await import("bootstrap")).Dropdown;
      if (!dropdownToggleRef.current) {
        return;
      }
      dropdownToggle.current = Dropdown.getOrCreateInstance(
        dropdownToggleRef.current,
        {
          popperConfig: popperConfig ?? null
        }
      );
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      dropdownToggle.current?.show();
    };

    initDropdowns();

    const element = dropdownToggleRef.current;

    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
      dropdownToggle.current?.dispose();
    };
  }, [popperConfig]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      (dropdownToggleRef?.current?.contains(e.target) ?? false)
    ) {
      return;
    }

    // if (
    //   e.target instanceof Node &&
    //   (dropdownMenuRef?.current?.contains(e.target) ?? false)
    // ) {
    //   return;
    // }

    dropdownToggle.current?.hide();
  };

  return (
    <div className={`dropdown ${className ?? ""}`}>
      <div
        ref={dropdownToggleRef}
        className={`${toggleClassName ?? ""}`}
        role="button"
        style={{
          outlineStyle: "none"
        }}
        onMouseEnter={(evt) => {
          showOnHover && dropdownToggle.current?.show();
        }}
      >
        {toggle}
      </div>
      <ul
        ref={dropdownMenuRef}
        className={`dropdown-menu ${menuClassName ?? ""}`}
      >
        {children}
      </ul>
    </div>
  );
}

export default Dropdown;
