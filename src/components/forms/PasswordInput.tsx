import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { formControlHeight } from "../../common/app.config";
import { InputProps } from "./Input";

interface PasswordInputProps extends InputProps<HTMLInputElement> {}

function PasswordInput({
  label,
  id,
  name,
  placeholder,
  disabled,
  value,
  defaultValue,
  onChange,
  onBlur,
  error,
  height = formControlHeight
}: PasswordInputProps) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <div className={`input-group ${error ? "has-validation" : ""}`}>
        <input
          id={id}
          type={isPassword ? "password" : "text"}
          name={name}
          className={`form-control px-3 ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            height: height
          }}
        />
        <div
          className="input-group-text px-3"
          role="button"
          onClick={() => setIsPassword(!isPassword)}
        >
          {isPassword ? <EyeSlashIcon width={20} /> : <EyeIcon width={20} />}
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </>
  );
}

export default PasswordInput;
