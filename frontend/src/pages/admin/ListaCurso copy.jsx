import { useEffect, useState } from "react";
import { obtenerCursos, eliminarCurso } from "../../services/cursoService";
import { Link } from "react-router-dom";

const CursoList = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    const res = await obtenerCursos();
    if (res && res.data) {
      setCursos(res.data);
    } else {
      console.error("Error al cargar los cursos.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este curso?")) {
      const res = await eliminarCurso(id);
      if (res) {
        cargarCursos();
      } else {
        console.error("Error al eliminar el curso.");
      }
    }
  };

  return (
    <div className="p-4">
      <Link
        to="/cursos/crear"
        className="btn btn-outline btn-primary mb-2 rounded-full"
      >
        Nuevo Curso
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
              <th>Duración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <tr key={curso._id}>
                  <td>{curso.nombre}</td>
                  <td>{curso.nivel}</td>
                  <td>{curso.duracion}</td>
                  <td>
                    <Link
                      to={`/cursos/editar/${curso._id}`}
                      className="btn btn-sm btn-primary mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(curso._id)}
                      className="btn btn-sm btn-error"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay cursos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CursoList;
