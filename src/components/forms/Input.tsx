import { ChangeEvent, FocusEvent } from "react";
import { formControlHeight } from "../../common/app.config";

type OnChange<E> = (e: ChangeEvent<E>) => void;
type OnBlur<E> = (e: FocusEvent<E, Element>) => void;

export interface InputProps<ElementType> {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  error?: string;
  className?: string;
  height?: number;
  disabled?: boolean;
  onChange?: OnChange<ElementType>;
  onBlur?: OnBlur<ElementType>;
}

function Input({
  label,
  id,
  type,
  name,
  placeholder,
  disabled,
  value,
  defaultValue,
  onChange,
  onBlur,
  error,
  className,
  height = formControlHeight,
}: InputProps<HTMLInputElement>) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        className={`form-control px-3 ${error ? "is-invalid" : ""} ${
          className ?? ""
        }`}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          height: height,
        }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}

export default Input;
