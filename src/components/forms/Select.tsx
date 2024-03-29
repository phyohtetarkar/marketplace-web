import { forwardRef, ReactNode } from "react";
import { formControlHeight } from "../../common/app.config";
import { InputProps } from "./Input";

interface SelectInputProps extends InputProps<HTMLSelectElement> {
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const {
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled,
    className,
    children,
    height = formControlHeight
  } = props;
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <select
        id={id}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`form-select ps-3 ${error ? "is-invalid" : ""} ${
          className ?? ""
        }`}
        style={{
          height: height
        }}
      >
        {children}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
});

Select.displayName = "Select";

export default Select;
