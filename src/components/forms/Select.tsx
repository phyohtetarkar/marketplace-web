import { ReactNode } from "react";
import { formControlHeight } from "../../common/app.config";
import { InputProps } from "./Input";

interface SelectInputProps extends InputProps<HTMLSelectElement> {
  children: ReactNode;
}

function Select({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  children,
  height = formControlHeight,
}: SelectInputProps) {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <select
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`form-select ps-3 ${error ? "is-invalid" : ""}`}
        style={{
          height: height,
        }}
      >
        {children}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}

export default Select;
