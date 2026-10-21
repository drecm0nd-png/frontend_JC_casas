import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";
import AppRoutes from "./Routes/AppRoutes.jsx";

function App() {
  return (
    <>
      <Header /> 
      <main id="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
