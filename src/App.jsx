import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RecoverPass from "./pages/RecoverPass"
import NewPass from "./pages/NewPass"
import AccountConfirm from "./pages/AccountConfirm"
import ProtectRoutes from "./layouts/ProtectRoutes"
import Projects from "./pages/Projects"
import CreateProyect from "./pages/CreateProyect"
import ProjectInfo from "./pages/ProjectInfo"
import EditProject from "./pages/EditProject"
import AddColaborator from "./pages/AddColaborator"

import { AuthProvider } from "./context/AuthProvider"
import { ProyectsProvider } from "./context/ProyectsProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectsProvider>
          <Routes>

            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="recuperar-contraseña" element={<RecoverPass />} />
              <Route path="recuperar-contraseña/:token" element={<NewPass />} />
              <Route path="confirmar-cuenta/:token" element={<AccountConfirm />} />
            </Route>

            <Route path="/proyectos" element={<ProtectRoutes />}>
              <Route index element={<Projects />} />
              <Route path="crear-proyecto" element={<CreateProyect />} />
              <Route path="editar/:id" element={<EditProject />} />
              <Route path="nuevo-colaborador/:id" element={<AddColaborator />} />
              <Route path=":id" element={<ProjectInfo />} />
            </Route>

          </Routes>
        </ProyectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
