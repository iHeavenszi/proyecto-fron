import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const location = useLocation(); // Obtiene la ubicación actual

  // Rutas donde no quieres que aparezca la Navbar
  const hideNavbarRoutes = ["/", "/registro"];

  // Verifica si la ruta actual está en la lista
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />} {/* Renderiza Navbar solo si aplica */}
      <Outlet /> {/* Renderiza el contenido de la ruta actual */}
    </div>
  );
}

export default App;
