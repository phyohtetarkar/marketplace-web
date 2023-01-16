import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import Input from "./Input";

interface AutocompleteSelectProps<T = string, Key = string> {
  referenceId?: string;
  popperId?: string;
  options?: readonly T[];
  defaultValue?: T;
  placeholder?: string;
  maxHeight?: number;
  error?: string;
  getOptionLabel: (op: T) => string;
  getOptionValue: (op: T) => Key;
  formatOptionLabel?: (op: T, selected: boolean) => ReactNode;
  formatSelectedOption?: (op: T) => string;
  skipOption?: (op: T) => boolean;
  onChange?: (newValue: T) => void;
}

function AutocompleteSelect<T, Key>(props: AutocompleteSelectProps<T, Key>) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 4]
        }
      }
    ],
    placement: "bottom-start"
  });
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    if (props.defaultValue) {
      return {
        key: props.getOptionValue(props.defaultValue!),
        value: props.defaultValue! as T
      };
    }
    return null;
  });
  const [filter, setFilter] = useState<string>();

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        (referenceElement?.contains(e.target) ?? false)
      ) {
        return;
      }

      if (
        e.target instanceof Node &&
        (popperElement?.contains(e.target) ?? false)
      ) {
        return;
      }
      setOpen(false);
    },
    [referenceElement, popperElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  function handleFilter(v: T) {
    if (!filter) {
      return true;
    }

    return props
      .getOptionLabel(v)
      .toLocaleLowerCase()
      .startsWith(filter.toLocaleLowerCase());
  }

  function formatSelectedOption() {
    const value = selectedOption?.value;
    if (value) {
      return props.formatSelectedOption?.(value) ?? props.getOptionLabel(value);
    }
    return "";
  }

  function renderPopper() {
    const list = props.options ?? [];

    return (
      <div className="card shadow">
        <div className="card-body p-0">
          {list.length === 0 && (
            <div className="text-dark-gray text-center p-3">No options</div>
          )}
          {list.length > 0 && (
            <>
              <div className="p-2">
                {open && (
                  <Input
                    height={44}
                    value={filter ?? ""}
                    onChange={(e) => setFilter(e.target.value)}
                    autoFocus={true}
                  />
                )}
              </div>
              <ul
                className="list-unstyled mb-0 pb-2 scrollbar-custom"
                style={{ maxHeight: props.maxHeight ?? 350, overflowY: "auto" }}
              >
                {list.filter(handleFilter).map((v, i) => {
                  const key = props.getOptionValue(v);
                  const label = props.getOptionLabel(v);
                  const selected = key === selectedOption?.key;
                  const handleClick = () => {
                    if (!selected) {
                      setSelectedOption({ key: key, value: v });
                      setOpen(false);
                      props.onChange?.(v);
                    }
                  };

                  if (props.skipOption?.(v) ?? false) {
                    return null;
                  }

                  if (props.formatOptionLabel) {
                    return (
                      <li key={i} onClick={handleClick} role="button">
                        {props.formatOptionLabel(v, selected)}
                      </li>
                    );
                  }
                  return (
                    <li key={i} onClick={handleClick} role="button">
                      <div
                        className={`dropdown-item py-2 ${
                          selected ? "active" : ""
                        }`}
                      >
                        {label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="position-relative">
        <Input
          id={props.referenceId}
          value={formatSelectedOption()}
          className={open ? "border-primary" : ""}
          placeholder={props.placeholder ?? "Select"}
          ref={setReferenceElement}
          onClick={() => setOpen(!open)}
          onChange={() => {}}
          error={props.error}
          style={{
            cursor: "default",
            caretColor: "transparent",
            paddingRight: "60px !important"
          }}
        />
        {!props.error && (
          <div
            className="hstack gap-2 position-absolute end-0 top-50 translate-middle-y me-3"
            style={{
              pointerEvents: "none"
            }}
          >
            {/* <div className="vr"></div> */}
            <ChevronDownIcon
              width={18}
              strokeWidth={2.5}
              className="text-dark-gray"
            />
          </div>
        )}
      </div>

      <div
        id={props.popperId}
        ref={setPopperElement}
        style={{
          ...styles.popper,
          zIndex: 999,
          width: referenceElement?.offsetWidth,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none"
        }}
        {...attributes.popper}
      >
        {renderPopper()}
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
}

export default AutocompleteSelect;
