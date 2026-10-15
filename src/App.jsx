import { useState } from "react";
import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
