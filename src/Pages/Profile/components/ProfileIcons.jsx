const ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18h.01" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v12H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  edit: <path d="M4 20h4L19 9l-4-4L4 16z" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10 6a9 9 0 0 1 2-.2c6 0 10 7 10 7a17 17 0 0 1-3 3.6M6.5 7A17 17 0 0 0 2 12s4 7 10 7c1.6 0 3-.4 4.2-1" />
    </>
  ),
  logout: (
    <>
      <path d="M9 4H5v16h4" />
      <path d="M16 8l4 4-4 4M20 12H9" />
    </>
  ),
  check: <path d="M5 12l5 5 9-10" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1" />
      <path d="M2 19h20" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3" />
    </>
  )
};

export function ProfileIcon({ name, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export function ProfileToggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`cfg-switch ${checked ? "is-on" : ""}`}
      onClick={onChange}
    >
      <span className="cfg-switch-knob" />
    </button>
  );
}

export function ProfileRow({ title, desc, children, danger }) {
  return (
    <div className={`cfg-row ${danger ? "is-danger" : ""}`}>
      <div className="cfg-row-text">
        <span className="cfg-row-title">{title}</span>
        {desc && <p className="cfg-row-desc">{desc}</p>}
      </div>
      <div className="cfg-row-control">{children}</div>
    </div>
  );
}

export function ProfileSectionHead({ title, desc }) {
  return (
    <header className="cfg-section-head">
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </header>
  );
}