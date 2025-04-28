import { Link } from "react-router-dom";
import cursoReactImg from "../../assets/imagenes/cursoreact.jpg";
import cursoImg from "../../assets/imagenes/cursos.jpg";
import docente1 from "../../assets/imagenes/docente4.jpg";
import docente2 from "../../assets/imagenes/docente2.jpg";
import docente3 from "../../assets/imagenes/docente3.jpg";

const HomePage = () => {
  // Datos simulados de cursos y docentes
  const cursos = [
    { id: 1, nombre: "Desarrollo Web con React", descripcion: "Aprende a crear aplicaciones modernas con React y Tailwind.", imagen: cursoReactImg },
    { id: 2, nombre: "Python y Django", descripcion: "Desarrolla aplicaciones robustas con Django y PostgreSQL.", imagen: cursoImg },
    { id: 3, nombre: "Base de Datos con SQL", descripcion: "Domina las bases de datos relacionales con casos prácticos.", imagen: cursoImg },
  ];

  const docentes = [
    { nombre: "Prof. Carlos Bustamante", especialidad: "Analista de Sistemas de Computación - Prof. de Computación. Experto en Backend con Django y Node.js", imagen: docente1 },
    { nombre: "Prof. Lucas Montivero", especialidad: "Desarrollador Fullstack. Amplia experiencia en React y MongoDB", imagen: docente2 },
    { nombre: "Prof. Ana Torres", especialidad: "Diseñadora UX/UI. Creadora de interfaces accesibles y modernas", imagen: docente3 },
  ];

  return (
    <section className="p-8 space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido al Instituto BCG</h1>
        
        <p className="text-base leading-relaxed">
              En el Instituto BCG, estamos comprometidos con la formación integral de profesionales,
              docentes, emprendedores y personas que buscan desarrollarse personal y laboralmente.
              Nuestra institución se destaca por ofrecer programas de capacitación innovadores,
              adaptados a las necesidades reales del mercado y las demandas sociales actuales.
            </p>
      </div>

      {/* Sección de cursos */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestros Cursos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={curso.imagen} alt={curso.nombre} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{curso.nombre}</h3>
                <p className="text-gray-600 mb-4">{curso.descripcion}</p>
                {/*    <Link
                  to={`/preinscripcion/${curso.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Preinscribirme
                </Link>
               */}
                <button className="btn btn-outline btn-info">Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de docentes */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Conocé a Nuestros Docentes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {docentes.map((docente, index) => (
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src={docente.imagen}
                  alt={docente.nombre}
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{docente.nombre}</h2>
                <p>{docente.especialidad}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
