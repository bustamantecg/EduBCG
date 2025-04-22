import { useAuth } from "../../context/AuthContext";

const DocentePanel = () => {
    const { usuario, logout } = useAuth();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido Docente, {usuario?.nombre}</h1>
        <button onClick={logout} 
            className="mt-4 btn btn-outline btn-secondary rounded hover:bg-red-600">
          Cerrar sesión
        </button>
      </div>
    );
  };
  
  export default DocentePanel;