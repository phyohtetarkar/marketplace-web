"use client";
import { RiArrowDropDownFill } from "@remixicon/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import Input from "./Input";

interface OptionProps<T, Key> {
  getOptionLabel: (op: T) => string;
  getOptionKey: (op: T) => Key;
  formatOptionLabel?: (op: T, selected: boolean) => ReactNode;
  skipOption?: (op: T) => boolean;
  getNestedData?: (op: T) => T[] | [T] | null | undefined;
  canSelect?: (op: T) => boolean;
}

interface AutocompleteSelectProps<T = string, Key = string>
  extends OptionProps<T, Key> {
  defaultValue?: T;
  referenceId?: string;
  popperId?: string;
  options?: readonly T[];
  placeholder?: string;
  maxHeight?: number;
  error?: string;
  formatSelectedOption?: (op: T) => string;
  onChange?: (newValue: T) => void;
}

function Option<T, Key>(
  props: OptionProps<T, Key> & {
    value: T;
    selectedKey?: Key;
    level: number;
    handleClick: (key: Key, value: T) => void;
    handleFilter: (value: T) => boolean;
  }
) {
  if (props.skipOption?.(props.value) ?? false) {
    return null;
  }

  const key = props.getOptionKey(props.value);
  const selected = key === props.selectedKey;
  const prefix =
    props.level > 0
      ? Array(props.level)
          .fill(props.level)
          .map((_) => " - ")
          .join("")
      : "";
  const label = prefix + props.getOptionLabel(props.value);

  const list = props.getNestedData?.(props.value);

  const { value, level, ...passThroughProps } = props;

  const canSelect = props.canSelect?.(props.value) ?? true;

  return (
    <>
      {props.handleFilter(props.value) && (
        <li
          role="button"
          onClick={() => {
            if (canSelect) {
              !selected && props.handleClick(key, props.value);
            }
          }}
        >
          <div
            className={`autocomplete-dropdown-item ${selected ? "active" : ""} ${
              !canSelect ? "disabled" : ""
            }`}
          >
            {label}
          </div>
        </li>
      )}
      {list &&
        list.map((v, i) => {
          return (
            <Option<T, Key>
              key={i}
              value={v}
              level={level + 1}
              {...passThroughProps}
            />
          );
        })}
    </>
  );
}

function AutocompleteSelect<T, Key>(props: AutocompleteSelectProps<T, Key>) {
  const {
    referenceId,
    popperId,
    options,
    defaultValue,
    placeholder,
    error,
    onChange,
    maxHeight,
    formatSelectedOption,
    ...optionProps
  } = props;

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
        key: props.getOptionKey(props.defaultValue!),
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
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  // useEffect(() => {
  //   if (defaultValue) {
  //     setSelectedOption({
  //       key: props.getOptionKey(defaultValue),
  //       value: defaultValue! as T
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [defaultValue]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption({
        key: props.getOptionKey(defaultValue),
        value: defaultValue! as T
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, defaultValue]);

  function handleFilter(v: T) {
    if (!filter) {
      return true;
    }

    return props
      .getOptionLabel(v)
      .toLocaleLowerCase()
      .startsWith(filter.toLocaleLowerCase());
  }

  function formatSelectedOptionValue() {
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
                {list.map((v, i) => {
                  return (
                    <Option<T, Key>
                      key={i}
                      value={v}
                      level={0}
                      selectedKey={selectedOption?.key}
                      handleFilter={(v) => handleFilter(v)}
                      handleClick={(key, value) => {
                        setSelectedOption({ key: key, value: value });
                        setOpen(false);
                        props.onChange?.(value);
                      }}
                      {...optionProps}
                    />
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
          value={formatSelectedOptionValue()}
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
            <RiArrowDropDownFill
              size={24}
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
          zIndex: 9999,
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
