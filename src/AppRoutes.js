import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import SidebarLayout from "./components/layouts/SidebarLayout";
import Dashboard from "./components/Dashboard";
import CreatePresenca from "./components/CreatePresenca";
import CreateSessao from "./components/CreateSessao";
import ListSessoes from "./components/ListSessoes";
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
import PresencaCountBySessao from "./components/PresencaCountBySessao";
import Atas from "./components/Atas";
import EditaisPortarias from "./components/EditaisPortarias";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/create-eleitor"
            element={<CreateEleitor />}
          />
          <Route
            path="/create-user"
            element={<CreateUser />}
          />
          <Route
            path="/create-presenca"
            element={<CreatePresenca />}
          />
          <Route
            path="/create-sessao"
            element={<CreateSessao />}
          />
          <Route
            path="/update-eleitor"
            element={<UpdateEleitor />}
          />
          <Route
            path="/list-eleitores"
            element={<ListEleitores />}
          />
          <Route
            path="/update-status"
            element={<UpdateStatus />}
          />
          <Route
            path="/list-usuarios"
            element={<ListUsers />}
          />
          <Route
            path="/consultar-eleitor"
            element={<ConsultarEleitor />}
          />
          <Route
            path="/list-presencas"
            element={<ListPresencas />}
          />
          <Route
            path="/list-nao-confirmados"
            element={<ListNaoConfirmados />}
          />
          <Route
            path="/list-secoes"
            element={<ListSessoes />}
          />
          <Route
            path="/presenca-count"
            element={<PresencaCountBySessao />}
          />
          <Route
            path="/atas-eleicoes-2024"
            element={<Atas />}/>
          <Route
           path="editais-portarias"
           element={ <EditaisPortarias/>}/>
        </Route>



        {/* Rota para a página de Not Implemented */}
        <Route path="/not-implemented" element={<NotImplemented />} />

        {/* Rota catch-all para Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;