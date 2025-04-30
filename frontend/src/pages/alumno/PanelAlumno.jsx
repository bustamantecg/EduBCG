import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { format } from "date-fns";

const PanelAlumno = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarCursosInscriptos();
  }, []);

  const cargarCursosInscriptos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alumno/cursos"); // Ajustar a su API
      setCursos(res.data);
    } catch (error) {
      console.error("Error al cargar cursos del alumno", error);
      toast.error("No se pudieron cargar los cursos.");
    }
  };

  const handleVerCurso = (idCurso) => {
    navigate(`/alumno/curso/${idCurso}`);
  };

  const handleBaja = async (idInscripcion) => {
    const result = await MySwal.fire({
      title: "¿Está seguro?",
      text: "Se dará de baja del curso. Esta acción no puede deshacerse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, darme de baja",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/alumno/inscripciones/${idInscripcion}`);
        toast.success("Baja del curso exitosa.");
        cargarCursosInscriptos();
      } catch (error) {
        console.error("Error al darse de baja", error);
        toast.error("No fue posible darse de baja del curso.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Cursos Inscritos</h1>

      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Docente</th>
              <th>Duración</th>
              <th>Alta</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.length > 0 ? (
              cursos.map((item) => (
                <tr key={item._id}>
                  <td>{item.curso.nombre}</td>
                  <td>{item.curso.docente.nombre} ({item.curso.docente.email})</td>
                  <td>{item.curso.duracion}</td>
                  <td>{format(new Date(item.createdAt), "yyyy-MM-dd")}</td>
                  <td>{item.nota ?? "Sin nota"}</td>
                  <td>
                    <button
                      onClick={() => handleVerCurso(item.curso._id)}
                      className="btn btn-xs btn-info mr-2"
                    >
                      Ver Curso
                    </button>
                    {!item.nota && (
                      <button
                        onClick={() => handleBaja(item._id)}
                        className="btn btn-xs btn-error"
                      >
                        Baja
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No estás inscrito en ningún curso.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelAlumno;
