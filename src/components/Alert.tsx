interface AlertProps {
  message: string;
  variant?: "primary" | "info" | "success" | "warning" | "danger";
}

function Alert(props: AlertProps) {
  return (
    <div
      className={`alert alert-${props.variant ?? "dark-gray"} py-2h`}
      role="alert"
    >
      {props.message}
    </div>
  );
}

export default Alert;