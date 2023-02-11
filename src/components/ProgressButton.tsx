import { ReactNode } from "react";

interface ProgressButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "accent" | "warning" | "danger" | "dark";
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

function ProgressButton(props: ProgressButtonProps) {
  const {
    type = "button",
    variant = "primary",
    loading,
    className = "",
    onClick,
    children
  } = props;

  return (
    <button
      type={type}
      className={`btn btn-${variant} hstack justify-content-center ${className}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {children}
    </button>
  );
}

export default ProgressButton;
