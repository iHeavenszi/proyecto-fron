import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider"; // Hook para acceder al estado de autenticación

const RutaProtegida = () => {
  const { isAuthenticated } = useAuth(); // Obtener estado de autenticación del contexto

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al inicio de sesión
    return <Navigate to="/" />;
  }

  return <Outlet />; // Renderiza las rutas hijas si está autenticado
};

export default RutaProtegida;
