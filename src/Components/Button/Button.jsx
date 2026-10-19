import "./Button.css";

function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  const variantClass = variant === "secondary" ? "button--secondary" : "";
  const classes = ["button", variantClass, className].filter(Boolean).join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
