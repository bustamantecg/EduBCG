import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasenia: ""    
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      await axios.post("http://localhost:5000/api/usuarios/registro", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al registrar");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit} className="space-y-4">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium text-indigo-600">Crear cuenta</div>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
            </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Registrarse
          </button>

          <p className="text-center text-sm mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-indigo-600 underline">
              Inicia sesión
            </a>
          </p>
        </section>
      </form>
    </main>
  );
};

export default RegisterPage;
