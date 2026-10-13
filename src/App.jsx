import React, { useState } from "react";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/sing up/SingUp";

function App() {
  // 'login' o 'signup'
  const [vistaActual, setVistaActual] = useState('login');

  return (
    <div>
      {vistaActual === 'login' ? (
        <Login onNavigate={setVistaActual} />
      ) : (
        <SignUp onNavigate={setVistaActual} />
      )}
    </div>
  );
}

export default App;