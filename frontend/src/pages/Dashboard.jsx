import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const {usuario} = useAuth()
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenido , {usuario?.nombre}</h1>
        <p className="mt-4 text-gray-600">Esta es la página principal después del login.</p>
        <p className="mt-4 text-gray-600">se llama pages/Dashboard.jsx</p>
        <p className="mt-2 text-gray-300">
        Este es tu panel de control.
       </p>
      </div>
    );
  };
  
  export default Dashboard;
  