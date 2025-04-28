import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="flex min-h-screen">
      
      {/* MENÚ LATERAL */}
      <div className="w-64 bg-base-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        
        <ul className="menu bg-base-100 rounded-box">
          
          {/* Cerrar sesión */}
          <li className="mb-2">
            <button onClick={logout} className="btn btn-outline btn-error">
              Cerrar sesión
            </button>
          </li>

          {/* Cursos */}
          <li>
            <details open>
              <summary>Cursos</summary>
              <ul>
                <li><Link to="/cursos/nuevo">Agregar nuevo</Link></li>
                <li><Link to="/cursos">Listar cursos</Link></li>
              </ul>
            </details>
          </li>

          {/* Docentes */}
          <li>
            <details>
              <summary>Docentes</summary>
              <ul>
                <li><Link to="/admin/docentes/nuevo">Agregar nuevo</Link></li>
                <li><Link to="/admin/docentes">Listar docentes</Link></li>
              </ul>
            </details>
          </li>

          {/* Alumnos */}
          <li>
            <details>
              <summary>Alumnos</summary>
              <ul>
                <li><Link to="/admin/alumnos/nuevo">Agregar nuevo</Link></li>
                <li><Link to="/admin/alumnos">Listar alumnos</Link></li>
              </ul>
            </details>
          </li>

        </ul>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Panel de Administración - Bienvenido {usuario?.nombre}
        </h1>

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

    </div>
  );
};

export default AdminPanel;

