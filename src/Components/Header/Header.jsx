import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función auxiliar para verificar la ruta actual
  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      {/* Navbar Superior */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          JC Casas Restaurante
        </div>
        <div className="navbar-links">
          <span 
            className={isActive('/inicio') ? 'active' : ''} 
            onClick={() => navigate('/inicio')}
          >
            Nosotros
          </span>
          <span 
            className={isActive('/') ? 'active' : ''} 
            onClick={() => navigate('/')}
          >
            Menú
          </span>
          <span 
            className={isActive('/contacto') ? 'active' : ''} 
            onClick={() => navigate('/contacto')}
          >
            Contacto
          </span>
          <span 
            className={isActive('/login') ? 'active' : ''} 
            onClick={() => navigate('/login')}
          >
            Login/signup
          </span>
        </div>
      </nav>

      {/* Breadcrumb integrado */}
      <div className="breadcrumb">
        Inicio &gt; Menú &gt; Personalizar
      </div>
    </header>
  );
}