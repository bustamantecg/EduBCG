// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4 shadow-md">
      <div>
        <h1 className="text-2xl">Cambia el tema 🎨</h1>
        <ThemeSwitcher />
      </div>
      <div className="flex items-center gap-4">
        <span>Hola, {usuario?.nombre}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
