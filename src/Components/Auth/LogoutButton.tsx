import React from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();  // Para redirigir al usuario

    const handleLogout = () => {
        logout();  // Llamar al método logout del AuthProvider
        navigate("/");  // Redirigir al login o página de inicio
    };

    return (
        <button onClick={handleLogout}>Cerrar sesión</button>
    );
};

export default LogoutButton;
