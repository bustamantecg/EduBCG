const About = () => {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">Sobre Nosotros</h1>
  
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Texto descriptivo */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                <i className="bi bi-shop-window"></i> Instituto BCG
              </h2>
              <p className="text-base leading-relaxed">
                En el Instituto BCG, estamos comprometidos con la formación integral de profesionales,
                docentes, emprendedores y personas que buscan desarrollarse personal y laboralmente.
                Nuestra institución se destaca por ofrecer programas de capacitación innovadores,
                adaptados a las necesidades reales del mercado y las demandas sociales actuales.
              </p>
  
              <p className="text-base leading-relaxed">
                Contamos con espacios cómodos, equipados con tecnología de vanguardia, y un equipo
                docente altamente capacitado y comprometido con la excelencia educativa. Nuestras
                clases presenciales y virtuales promueven el pensamiento crítico, la creatividad
                y el aprendizaje colaborativo.
              </p>
  
              <p className="text-base leading-relaxed">
                A través de nuestra plataforma eLearning, brindamos la posibilidad de estudiar
                desde cualquier lugar y en cualquier momento, facilitando el acceso a la educación
                continua sin barreras de tiempo ni distancia.
              </p>
  
              <p className="text-base leading-relaxed">
                Como institución formadora, aspiramos a contribuir activamente al desarrollo de la
                comunidad, promoviendo la inserción laboral, el emprendimiento, la inclusión digital
                y el fortalecimiento de competencias clave para un mundo en constante transformación.
              </p>
  
              <p className="text-base leading-relaxed">
                Nuestro compromiso con la calidad educativa, la innovación pedagógica y el
                acompañamiento permanente a nuestros estudiantes nos impulsa a seguir creciendo
                junto a quienes eligen superarse día a día.
              </p>
            </div>
  
            {/* Carrusel de imágenes */}
            <div className="carousel carousel-end rounded-box">
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Capacitación" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Talleres" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Clases" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Formación" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Educación" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Aprendizaje" />
              </div>
              <div className="carousel-item">
                <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Tecnología" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;  