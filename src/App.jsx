import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
// Importa tu Footer (ajusta la ruta según dónde lo tengas guardado, ej: "./Components/Footer/Footer")
import Footer from "./Components/Footer/Footer"; 
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  return (
    <div className="app-with-sidebar">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenedor derecho: Header arriba, contenido en medio, Footer abajo */}
      <main className="app-main-content">
        <Header />
        
        <div className="app-page-wrapper">
          <AppRoutes />
        </div>

        <Footer />
      </main>
    </div>
  );
}