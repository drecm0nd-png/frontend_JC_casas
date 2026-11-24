import { useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <AppRoutes />;
  }

  return (
    <div className="app-with-sidebar">
      <Sidebar />

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
