import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AdminPanel = () => {
  const { usuario, logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error al obtener los usuarios", err);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Panel de Administración - Bienvenido {usuario?.nombre}
        </h1>
        <button
          onClick={logout}          
          className="mt-4 btn btn-outline btn-secondary rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-black rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, index) => (
              <tr key={u._id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{u.nombre}</td>
                <td className="px-4 py-2">{u.correo}</td>
                <td className="px-4 py-2 capitalize">{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
