
import Header from '../../Components/Header/Header';   // Ruta correcta subiendo desde Pages/Home a src
import Footer from '../../Components/Footer/Footer';   // Ruta correcta subiendo desde Pages/Home a src
import './Home.css';

import platillo1 from '../../assets/Platillos/platillo1.webp';
import platillo2 from '../../assets/Platillos/platillo2.jpg';
import ajiacoImg from '../../assets/Platillos/ajiaco.jpg';
import empanadasImg from '../../assets/Platillos/empanadas.jpg';
import pataconImg from '../../assets/Platillos/patacon.jpg';
import jugosImg from '../../assets/Platillos/jugos.jpg';
import limonadaImg from '../../assets/Platillos/limonada.jpg';
import gaseosaImg from '../../assets/Platillos/gaseosa.jpg';

export default function Home() {
  const precioBandeja = "29.500$";
  const precioLasana = "24.000$";

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="order-banner">
          <div className="order-banner-left">
            <div className="order-icon">
              <span>⏱️</span>
            </div>
            <div className="order-text-container">
              <div className="order-title">Tu pedido va en camino</div>
              <div className="order-subtitle">Llega de 10 a 15 min</div>
            </div>
          </div>
          <div className="order-arrow">&gt;</div>
        </div>

        <section className="featured-menu-section">
          <div className="featured-header">
            <h2 className="menu-section-title">Menú del día</h2>
            <button className="mas-info-btn">+ MÁS INFO</button>
          </div>
          
          <div className="featured-card">
            <img className="featured-image" src={platillo1} alt="Bandeja Tradicional" />
            <div className="featured-overlay"></div>
            <div className="featured-content">
              <div className="featured-info-group">
                <div className="featured-title">Bandeja Tradicional</div>
                <div className="featured-price">{precioBandeja}</div>
              </div>
              <button className="pedir-ahora-btn">Pedir Ahora</button>
            </div>
          </div>

          <div className="featured-card">
            <img className="featured-image" src={platillo2} alt="Lasaña" />
            <div className="featured-overlay"></div>
            <div className="featured-content">
              <div className="featured-info-group">
                <div className="featured-title">Lasaña</div>
                <div className="featured-price">{precioLasana}</div>
              </div>
              <button className="pedir-ahora-btn">Pedir Ahora</button>
            </div>
          </div>
        </section>

        <section className="menu-section">
          <h2 className="menu-section-title">Adicionales &amp; Sopas</h2>
          <div className="products-grid">
            <div className="product-card">
              <img className="product-image" src={ajiacoImg} alt="Ajiaco" />
              <div className="product-body">
                <div>
                  <div className="product-name">Sopa de Ajiaco</div>
                  <div className="product-description">Tradicional sopa con pollo, crema de leche y alcaparras.</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">8.000$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img className="product-image" src={empanadasImg} alt="Empanadas" />
              <div className="product-body">
                <div>
                  <div className="product-name">Porción de Empanadas</div>
                  <div className="product-description">3 deliciosas empanadas de carne con ají casero.</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">6.000$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img className="product-image" src={pataconImg} alt="Patacón" />
              <div className="product-body">
                <div>
                  <div className="product-name">Extra Patacón y Aguacate</div>
                  <div className="product-description">Porción adicional para acompañar tu plato principal.</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">4.500$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="menu-section">
          <h2 className="menu-section-title">Bebidas</h2>
          <div className="products-grid">
            <div className="product-card">
              <img className="product-image" src={jugosImg} alt="Jugos" />
              <div className="product-body">
                <div>
                  <div className="product-name">Jugos Naturales</div>
                  <div className="product-description">Maracuyá, Mora, Mango o Lulo en agua o leche.</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">4.000$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img className="product-image" src={limonadaImg} alt="Limonada" />
              <div className="product-body">
                <div>
                  <div className="product-name">Limonada Cerezada</div>
                  <div className="product-description">Refrescante limonada con jarabe de cereza y hielo.</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">5.500$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img className="product-image" src={gaseosaImg} alt="Gaseosas" />
              <div className="product-body">
                <div>
                  <div className="product-name">Gaseosas</div>
                  <div className="product-description">Coca-Cola, Sprite, o Quatro (Personal).</div>
                </div>
                <div className="product-footer">
                  <div className="product-price">3.500$</div>
                  <div className="product-btn"><span>+</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}