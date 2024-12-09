import React, { useState } from "react"; 
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import './Navbar.css';
import LogoutButton from "../Auth/LogoutButton";
import { useAuth } from "../Auth/AuthProvider";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false); // Estado para el menú desplegable
  const auth = useAuth();

  // Maneja el clic en el botón de menú
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      {/* Botón de menú visible solo en pantallas pequeñas */}
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navList ${menuActive ? "active" : ""}`}>
        <li className="navItem logo"> 
          <Link to="/" className="link">Darky’s</Link>
        </li>
        <li className="navItem">
          <Link to="/dashboard" className="link">Home</Link>
        </li>
        <li className="navItem">
          <Link to="/cart" className="link">Cart</Link> {/* Redirige al carrito */}
        </li>
      </ul>
      <ul>
        
      <h4>{auth.getUser()?.name || "Usuario no encontrado"}</h4>
      </ul>
      <ul>
      <LogoutButton />
      </ul>
    </nav>
  );
}

export default Navbar;
