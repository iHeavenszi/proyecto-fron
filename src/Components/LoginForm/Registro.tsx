import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useAuth } from "../Auth/AuthProvider.tsx";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponseError } from "../types/types.ts";




const Registro = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("https://server-3dlw.onrender.com/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    email
                }),
            });

            if (response.ok) {               
                console.log("Usuario registrado:");
                setErrorResponse("");
                goTo("/");
            } else {
                console.error("Error al registrar usuario");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;

            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (  
        <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Registro</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <div className="input-box">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ingresa tu nombre y apellido" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Ingresa un usuario nuevo" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Ingresa tu correo" required/>
                    <IoMail className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Ingresa contraseña" required/>
                    <FaLock className="icon" />
                </div>
                <button type="submit">Registrar</button>
            </form>
            
            <div className="register-link">
                <p>¿Ya tienes cuenta? <a href="/">Inicia sesion!</a></p>
            </div>
        </div>
    );
};

export default Registro;