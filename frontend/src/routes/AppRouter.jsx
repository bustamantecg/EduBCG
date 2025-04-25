import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminPanel from "../pages/admin/AdminPanel";
import DocentePanel from "../pages/docente/DocentePanel";
import AlumnoPanel from "../pages/alumno/AlumnoPanel";
import NotFound from "../pages/NotFound";
import PublicLayout from "../pages/public/PublicLayout";
import HomePage from "../pages/public/HomePage";
import Contacto from "../pages/public/Contacto";
import About from "../pages/public/About";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Layout público */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["docente"]} />}>
          <Route path="/docente" element={<DocentePanel />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["alumno"]} />}>
          <Route path="/alumno" element={<AlumnoPanel />} />
        </Route>

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
