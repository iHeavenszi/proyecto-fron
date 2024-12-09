import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import type { AccessTokenResponse, AuthResponse, User } from "../types/types";

// Crear el contexto de autenticación
interface AuthContextType {
    isAuthenticated: boolean;
    getAccessToken: () => string;
    saveUser: (userData: AuthResponse) => void;
    getRefreshToken: () => string | null;
    getUser: () => User | undefined;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    getAccessToken: () => "",
    saveUser: () => {},
    getRefreshToken: () => null,
    getUser: () => undefined,
    logout: () => {},
  });
  

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setIsLoading(false));
  }, []);

  // Verificar si el usuario está autenticado
  async function checkAuth() {
    const storedAccessToken = localStorage.getItem("AccessToken");
    const storedUser = localStorage.getItem("User");

    if (storedAccessToken && storedUser) {
      setAccessToken(JSON.parse(storedAccessToken));
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      return;
    }

    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const newAccessToken = await requestNewAccessToken(refreshToken);
      if (newAccessToken) {
        const userInfo = await getUserInfo(newAccessToken);
        if (userInfo) {
          saveSessionInfo(userInfo, newAccessToken, refreshToken);
        }
      }
    }
  }

  // Guardar la información de sesión
  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("AccessToken", JSON.stringify(accessToken));
    localStorage.setItem("Token", JSON.stringify(refreshToken));
    localStorage.setItem("User", JSON.stringify(userInfo));
    setIsAuthenticated(true);
  }

  // Obtener información del usuario con el token de acceso
  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error obteniendo información del usuario:", error);
      return null;
    }
  }

  // Solicitar un nuevo token de acceso con el refresh token
  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch("http://localhost:4000/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`, // Cambiado a refreshToken
        },
      });

      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error obteniendo nuevo token de acceso:", error);
      return null;
    }
  }

  // Obtener el token de acceso
  function getAccessToken() {
    return accessToken;
  }

  // Obtener el refresh token desde localStorage
  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("Token");
    if (tokenData) {
      try {
        return JSON.parse(tokenData);
      } catch {
        console.error("Error al parsear el refresh token de localStorage");
        return null;
      }
    }
    return null;
  }

  // Obtener la información del usuario
  function getUser() {
    return user;
  }

  // Guardar la información del usuario desde la respuesta de autenticación
  function saveUser(userData: AuthResponse) {
    saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
  }

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setAccessToken("");
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, logout }}>
      {!isLoading ? children : <div>Cargando...</div>}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
