interface AlertProps {
  message: string;
  variant?: "primary" | "success" | "warning" | "danger";
}

function Alert(props: AlertProps) {
  return (
    <div className={`alert alert-${props.variant ?? "primary"}`} role="alert">
      {props.message}
    </div>
  );
}

export default Alert;
