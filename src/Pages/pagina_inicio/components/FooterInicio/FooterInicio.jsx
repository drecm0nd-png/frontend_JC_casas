import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  CONTACTO,
  FOOTER_LEGAL_LINKS,
  FOOTER_LINKS,
} from "../../data/inicioData.js";
import "./FooterInicio.css";

function FooterInicio({ onNavigate }) {
  return (
    <footer className="inicio-footer">
      <div className="inicio-footer__inner">
        <div className="inicio-footer__grid">
          <div className="inicio-footer__column">
            <h2 className="inicio-footer__title">JC Casas</h2>
            <p className="inicio-footer__text">
              Prepárate para probar nuestros ricos e increíbles desayunos y
              almuerzos, deléitate y satisface tu apetito.
            </p>
            <div className="inicio-footer__nav">
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="inicio-footer__nav-link"
                  onClick={() => onNavigate(link.index)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="inicio-footer__column">
            <h3 className="inicio-footer__heading">Visítanos</h3>
            <p className="inicio-footer__text">
              {CONTACTO.direccion}
              <br />
              {CONTACTO.barrio}
            </p>
            <a
              href={CONTACTO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inicio-footer__link inicio-footer__link--inline"
            >
              <MapPin aria-hidden="true" className="inicio-footer__icon" />
              Cómo llegar
            </a>
          </div>

          <div className="inicio-footer__column">
            <h3 className="inicio-footer__heading">Horario</h3>
            <p className="inicio-footer__text">{CONTACTO.horario}</p>
            <p className="inicio-footer__text inicio-footer__text--muted">
              {CONTACTO.horarioDetalle}
            </p>
          </div>

          <div className="inicio-footer__column">
            <h3 className="inicio-footer__heading">Contacto</h3>
            <ul className="inicio-footer__contact">
              <li>
                <a
                  href={CONTACTO.telefonoHref}
                  className="inicio-footer__link inicio-footer__link--inline"
                >
                  <Phone aria-hidden="true" className="inicio-footer__icon" />
                  {CONTACTO.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTO.correo}`}
                  className="inicio-footer__link inicio-footer__link--inline inicio-footer__link--email"
                >
                  <Mail aria-hidden="true" className="inicio-footer__icon" />
                  {CONTACTO.correo}
                </a>
              </li>
              <li className="inicio-footer__social">
                <a
                  href={CONTACTO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inicio-footer__social-link"
                  aria-label="Facebook de JC Casas"
                >
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a
                  href={CONTACTO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inicio-footer__social-link"
                  aria-label="Instagram de JC Casas"
                >
                  <FaInstagram aria-hidden="true" />
                </a>
                <a
                  href={CONTACTO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inicio-footer__social-link"
                  aria-label="WhatsApp de JC Casas"
                >
                  <FaWhatsapp aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="inicio-footer__bottom">
          <p className="inicio-footer__copyright">
            ©2026 Restaurante JC Casas.{" "}
            <span className="inicio-footer__brand-strong">Xuafood</span>
          </p>

          <div className="inicio-footer__legal">
            {FOOTER_LEGAL_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                className="inicio-footer__legal-link"
                onClick={(event) => event.preventDefault()}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterInicio;
