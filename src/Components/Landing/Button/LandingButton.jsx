function LandingButton({ text, onClick, className = "", ...props }) {
  const clases = ["lp-boton", "lp-boton--primario", "lp-boton--compacto", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={clases} onClick={onClick} {...props}>
      {text}
    </button>
  );
}

export default LandingButton;
