import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nosotros</h3>
          <p>
            Prepárate para probar nuestros ricos e increíbles desayunos y almuerzos, 
            deleítate y satisface tu apetito.
          </p>
          <div className="footer-socials">
            {/* Puedes usar íconos de SVG, Lucide-react o etiquetas a con clases */}
            <span className="social-icon"></span>
            <span className="social-icon"></span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p><strong>Telefono:</strong> 3228658935</p>
          <p><strong>Correo electronico:</strong> jCasasRestaurant@gmail.com</p>
          <p><strong>Dirección:</strong> Crra 19 # 14B - 28 Barrio Prado Vegas</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Restaurante JC Casas. <strong>Xuafood</strong></p>
      </div>
    </footer>
  );
}