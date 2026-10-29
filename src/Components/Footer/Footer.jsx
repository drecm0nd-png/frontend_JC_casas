import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-footer">
          <h2 className="title-footer">Nosotros</h2>
          <p className="footer-description">
            Prepárate para probar ricos e increíbles desayunos y almuerzos,
            deléitate y satisface tu apetito.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de JC Casas">
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de JC Casas">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de JC Casas">
              <FaWhatsapp aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="right-footer">
          <h2 className="contact-title">Contacto</h2>
          <p><span className="footer-label">Teléfono:</span> <a href="tel:+573228658935">3228658935</a></p>
          <p><span className="footer-label">Correo electrónico:</span> <a href="mailto:jcAsasRestaurant@gmail.com">jcAsasRestaurant@gmail.com</a></p>
          <p><span className="footer-label">Dirección:</span> Cra 19 # 14B - 28, Barrio Prado Vegas</p>
        </div>
      </div>

      <p className="footer-copy">© Restaurante JC Casas. <strong>Xuafood</strong></p>
    </footer>
  );
}

export default Footer;
