import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      {/* Navbar Superior */}
      <nav className="navbar">
        <div className="navbar-brand">JC Casas Restaurante</div>
        <div className="navbar-links">
          <span>Inicio</span>
          <span>Nosotros</span>
          <span className="active">Menú</span>
          <span>Contacto</span>
          <span>Perfil</span>
        </div>
      </nav>

      {/* Breadcrumb integrado */}
      <div className="breadcrumb">
        Inicio &gt; Menú &gt; Personalizar
      </div>
    </header>
  );
}