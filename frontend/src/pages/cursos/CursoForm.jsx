import { useState, useEffect } from "react";
import { crearCurso, actualizarCurso, obtenerCursoPorId } from "../../services/cursoService";
import { useNavigate, useParams } from "react-router-dom";

const CursoForm = () => {
  const [curso, setCurso] = useState({
    nombre: "",
    nivel: "principiante",
    duracion: "",
    urlVideo: "",
    portada: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Si viene el id, estamos editando

  useEffect(() => {
    if (id) {
      obtenerCursoPorId(id).then((res) => setCurso(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarCurso(id, curso);
    } else {
      await crearCurso(curso);
    }
    navigate("/cursos"); // Redirecciona al listado
  };

  return (
    <>
    <h1 className="text-2xl font-bold mb-6">Panel de Administración - Cursos</h1>
    <h2 className="text-xl text-center font-semibold mb-4">{id ? "Actualizar" : "Crear"}</h2>  

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del curso"
        value={curso.nombre}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        name="nivel"
        value={curso.nivel}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
      <input
        type="text"
        name="duracion"
        placeholder="Duración"
        value={curso.duracion}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="urlVideo"
        placeholder="URL del video"
        value={curso.urlVideo}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="portada"
        placeholder="URL de la portada"
        value={curso.portada}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
        {id ? "Actualizar" : "Crear"} Curso
      </button>
    </form>
    </>
  );
};

export default CursoForm;
