"use client";
import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { useEffect, useRef, useState } from "react";
import Input, { InputProps } from "./Input";
import { RiCalendarLine } from "@remixicon/react";

interface DatePickerInput2Porps extends InputProps<HTMLInputElement> {
  mode?: "single" | "range";
  enableTime?: boolean;
  minDate?: Date;
  dateFormat?: string;
  dates: Date[];
  onDateChange?: (values: Date[]) => void;
}

function DatePickerInput2(props: DatePickerInput2Porps) {
  const {
    mode = "single",
    enableTime,
    dates,
    minDate,
    dateFormat,
    onDateChange,
    error,
    ...passThroughProps
  } = props;

  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  const pickerRef = useRef<Instance>();

  useEffect(() => {
    if (inputElement) {
      pickerRef.current = flatpickr(inputElement, {
        mode: mode,
        enableTime: enableTime,
        minDate: minDate,
        disableMobile: true,
        minuteIncrement: 1,
        onChange: (dates, str, instance) => {
          if (mode === "range" && dates.length === 2) {
            onDateChange?.(dates);
          } else if (mode === "single") {
            onDateChange?.(dates);
          }
        },
        dateFormat: dateFormat ?? "M d, Y"
      });

      if (dates && dates.length > 0) {
        pickerRef.current.selectedDates = [...dates];
      }
    }
    return () => {
      pickerRef.current?.destroy();
    };
  }, [
    inputElement,
    mode,
    enableTime,
    dateFormat,
    minDate,
    dates,
    onDateChange
  ]);

  return (
    <div className={`input-group ${error ? "has-validation" : ""}`}>
      <Input
        {...passThroughProps}
        ref={setInputElement}
        onChange={() => {}}
        className={`${error ? "is-invalid" : ""}`}
        onKeyDown={(evt) => {
          if (evt.key === "Backspace") {
            onDateChange?.([]);
          }
        }}
      />
      <span className="input-group-text">
        <RiCalendarLine size={20} />
      </span>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default DatePickerInput2;
