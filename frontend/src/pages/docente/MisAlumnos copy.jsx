import { useEffect, useState } from 'react';
import axios from 'axios';
import { obtenerMisAlumnos } from '../../services/inscripcionService';

const MisAlumnos = () => {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const obtenerInscripciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/inscripciones/mis-alumnos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInscripciones(data);
        console.log(inscripciones);
      } catch (error) {
        console.error('Error al obtener inscripciones:', error);
      }
    };

    obtenerInscripciones();
  }, []);

/*
useEffect(() => {
    const obtenerInscripciones = async () => {
      try {
        const data = await obtenerMisAlumnos();
        setInscripciones(data);
        console.log(inscripciones);
      } catch (error) {
        console.error('Error al obtener inscripciones:', error);
      }
    };
  
    obtenerInscripciones();
  }, []);
  */

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Alumnos por Docente</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr className='text-left'>
              <th>#</th>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Nota Final</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No hay inscripciones registradas.</td>
              </tr>
            ) : (
              inscripciones.map((inscripcion, index) => (
                <tr key={inscripcion._id} className="border-t hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td>{inscripcion.alumno?.nombre} | {inscripcion.alumno?.correo}</td>
                  <td>{inscripcion.curso?.nombre}</td>
                  <td>{inscripcion.notaFinal !== null ? inscripcion.notaFinal : 'Sin nota'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisAlumnos;
