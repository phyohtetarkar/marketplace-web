import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { useEffect, useRef, useState } from "react";
import Input, { InputProps } from "./Input";

interface DatePickerInput2Porps extends InputProps<HTMLInputElement> {
  mode?: "single" | "range";
  dates: Date[];
  onDateChange?: (values: Date[]) => void;
}

function DatePickerInput2(props: DatePickerInput2Porps) {
  const { mode = "single", dates, onDateChange, ...passThroughProps } = props;

  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  const pickerRef = useRef<Instance>();

  useEffect(() => {
    if (inputElement) {
      pickerRef.current = flatpickr(inputElement, {
        mode: mode,
        onChange: (dates, str, instance) => {
          if (mode === "range" && dates.length === 2) {
            onDateChange?.(dates);
          } else if (mode === "single") {
            onDateChange?.(dates);
          }
        },
        dateFormat: "M d, Y"
      });

      if (dates && dates.length > 0) {
        pickerRef.current.selectedDates = [...dates];
      }
    }
    return () => {
      pickerRef.current?.destroy();
    };
  }, [inputElement, mode, dates, onDateChange]);

  //   const dateString = (dates: Date[]) => {
  //     if (mode === "single" && dates.length > 0) {
  //       return dayjs(dates[0].getTime()).format("MMM DD, YYYY");
  //     }

  //     if (mode === "range" && dates.length > 1) {
  //       return `${dayjs(dates[0].getTime()).format("MMM DD, YYYY")} - ${dayjs(
  //         dates[1].getTime()
  //       ).format("MMM DD, YYYY")}`;
  //     }

  //     return "";
  //   };

  return (
    <div className="input-group flex-nowrap">
      <Input
        placeholder="Check in date"
        {...passThroughProps}
        ref={setInputElement}
        onChange={() => {}}
        onKeyDown={(evt) => {
          if (evt.key === "Backspace") {
            onDateChange?.([]);
          }
        }}
      />
      <span className="input-group-text">
        <CalendarDaysIcon width={20} />
      </span>
    </div>
  );
}

export default DatePickerInput2;
