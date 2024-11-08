import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import SidebarLayout from "./components/layouts/SidebarLayout";
import Dashboard from "./components/Dashboard";
import CreatePresenca from "./components/CreatePresenca";
import CreateSessao from "./components/CreateSessao";
import CreateEleitor from "./pages/Associados/CreateEleitor";
import CreateUser from "./pages/Users/CreateUser";
import ConsultarEleitor from "./pages/Associados/ConsultarEleitor";
import ListEleitores from "./pages/Associados/ListEleitores";
import UpdateStatus from "./pages/Associados/UpdateStatus";
import UpdateEleitor from "./pages/Associados/UpdateEleitor";
import NotFound from "./pages/system/NotFound/NotFound";
import NotImplemented from "./pages/system/NotImplemented/NotImplemented";
import Login from "./pages/Auth/Login";
import ListUsers from "./pages/Users/ListUsers";
import ListNaoConfirmados from "./components/ListNaoConfirmados";
import ListPresencas from "./components/ListPresencas";

function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <Dashboard />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-eleitor"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <CreateEleitor />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <CreateUser />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-presenca"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <CreatePresenca />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-sessao"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <CreateSessao />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-eleitor"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <UpdateEleitor />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-eleitores"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <ListEleitores />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-status"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <UpdateStatus />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-usuarios"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <ListUsers />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultar-eleitor"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <ConsultarEleitor />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-presencas"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <ListPresencas />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-nao-confirmados"
            element={
              <ProtectedRoute>
                <SidebarLayout>
                  <ListNaoConfirmados />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
  
          {/* Rota para a página de Not Implemented */}
          <Route path="/not-implemented" element={<NotImplemented />} />
  
          {/* Rota catch-all para Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
  
  export default AppRoutes;