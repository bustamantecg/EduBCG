import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si hay token al iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }
    setLoading(false);
  }, []);

  const login = async (correo, contrasenia) => {
    try {
      
     const { data } = await axios.post("http://localhost:5000/api/usuarios/login", {
        correo,
        contrasenia,
      });
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUsuario(data.usuario);
      setIsAuthenticated(true);
    } catch (error) {
      throw error.response?.data?.mensaje || "Error al iniciar sesión";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    delete axios.defaults.headers.common["Authorization"];
    setUsuario(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);
