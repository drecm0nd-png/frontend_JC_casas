
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import './App.css';
import SignUp from "./Pages/SignUp/SignUp"; 
export default function App() {
 
  return (
    <>
   
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp/>} />     
        {/* Puedes agregar más rutas aquí según las vayas creando */}
      </Routes>
    </>
  );
}