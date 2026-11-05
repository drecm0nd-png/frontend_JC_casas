import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";
import AppRoutes from "./Routes/AppRoutes.jsx";

function App() {
  const { pathname } = useLocation();
  const isPaginaInicio =
    pathname === "/" || pathname === "/inicio" || pathname === "/inicio/";

  return (
    <>
      {!isPaginaInicio && <Header />}
      <main id="main-content">
        <AppRoutes />
      </main>
      {!isPaginaInicio && <Footer />}
    </>
  );
}

export default App;
