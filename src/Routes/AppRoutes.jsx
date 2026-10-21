import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SignUp from "../Pages/SignUp/SignUp.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Pendientes de etapas futuras: /registro, /perfil, /carrito, /menu y /contacto. */}
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
