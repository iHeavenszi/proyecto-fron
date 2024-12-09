import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types.ts";

export default function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("https://server-3dlw.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {               
                const json = (await response.json()) as AuthResponse;
                if(json.body.accessToken && json.body.refreshToken){
                    console.log("sesion iniciada");
                    setErrorResponse("");
                    auth.saveUser(json)
                    goTo("/dashboard");
                }

            } else {
                console.error("Error al iniciar sesion");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;

            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    
    if (auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="wrapper">
            <form action="" onSubmit={handleSubmit}>
                <h1>login</h1>
                <div className="input-box">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Usuario" required/>
                    <FaUser className="icon"/>
                </div>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <div className="input-box">
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="contraseña" required/>
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit">Iniciar sesion</button>
            </form>
            
            <div className="register-link">
                <p>¿No tienes una cuenta? <a href="/registro">Registrate!</a></p>
            </div>
        </div>
    );
}