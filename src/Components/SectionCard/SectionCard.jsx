import "./SectionCard.css";

export default function SectionCard({
  title,
  action,
  children,
  className = "",
  variant = "card" // "card" | "subcard"
}) {
  const baseClass = variant === "subcard" ? "section-card--subcard" : "section-card";

  return (
    <section className={`${baseClass} ${className}`.trim()}>
      {title && (
        <header className="section-card-header">
          {variant === "subcard" ? <h4>{title}</h4> : <h3>{title}</h3>}
          {action && <div className="section-card-action">{action}</div>}
        </header>
      )}
      <div className="section-card-body">{children}</div>
    </section>
  );
}