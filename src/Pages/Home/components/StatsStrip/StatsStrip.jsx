import "./StatsStrip.css";

const STATS = [
  { value: "20+", label: "años de experiencia" },
  { value: "Casero", label: "sabor hecho en casa" },
  { value: "Soacha", label: "somos parte del barrio" },
];

export default function StatsStrip() {
  return (
    <section className="lp-cifras" aria-label="Datos destacados">
      <div className="lp-contenedor">
        <ul className="lp-cifras__lista">
          {STATS.map((item) => (
            <li key={item.label} className="lp-cifras__item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}