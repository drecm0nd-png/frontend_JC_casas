import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Menu from "../Pages/Menu/Menu.jsx";
import Panel from "../Pages/Panel/Panel.jsx";
import Pedidos from "../Pages/PanelPedidos/Pedidos.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SignUp from "../Pages/SignUp/SignUp.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Home />} />
      
      {/* Rutas de Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<SignUp />} />

      {/* Rutas del Menú y Pedidos */}
      <Route path="/menu" element={<Menu />} />
      <Route path="/pedidos" element={<Pedidos />} />

      {/* Rutas de Panel y Dashboard (con protección en dashboard) */}
      <Route path="/panel" element={<Panel />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta 404 / Página no encontrada */}
      <Route
        path="*"
        element={
          <section className="page-layout" aria-labelledby="not-found-title">
            <h1 id="not-found-title">Página no encontrada</h1>
            <p>La dirección solicitada no corresponde a una página disponible.</p>
          </section>
        }
      />
    </Routes>
  );
}

export default AppRoutes;