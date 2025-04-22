import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminPanel from "../pages/admin/AdminPanel";
import DocentePanel from "../pages/docente/DocentePanel";
import AlumnoPanel from "../pages/alumno/AlumnoPanel";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
