import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import CreatePresenca from "./pages/Presencas/CreatePresenca";
import CreateSessao from "./pages/Secoes/CreateSessao";
import ListSessoes from "./pages/Secoes/ListSessoes";
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
import ListPresencas from "./pages/Presencas/ListPresencas";
import PresencaCountBySessao from "./pages/Presencas/PresencaCountBySessao";
import Atas from "./components/Atas";
import EditaisPortarias from "./components/EditaisPortarias";
import RegistrarVotos from "./pages/Resultados/RegistarVotos";
import ResumoDosVotos from "./pages/Resultados/ResumoDosVotos";
import ListNaoConfirmados from "./pages/Presencas/ListNaoConfirmados";

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
          {/* Links de Resultados */}
          <Route
            path="/registrar-votos"
            element={<RegistrarVotos />} />
          <Route
            path="/resumo-dos-votos"
            element={<ResumoDosVotos />} />

          {/* Links de Úteis */}
          <Route
            path="/atas-eleicoes-2024"
            element={<Atas />} />
          <Route
            path="editais-portarias"
            element={<EditaisPortarias />} />
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