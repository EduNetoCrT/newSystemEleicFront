import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Home/Dashboard';
import CreateEleitor from './pages/Eleitores/Eleitor';
import CreatePresenca from './pages/Presencas/CreatePresenca';
import CreateSessao from './pages/Secoes/CreateSessao';
import UpdateEleitor from './pages/Eleitores/UpdateEleitor';
import ListEleitores from './pages/Eleitores/ListEleitores';
import UpdateStatus from './pages/Eleitores/UpdateStatus';
import { AuthProvider } from './context/AuthContext';
import SimpleLayout from './layouts/SimpleLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import ListarUsuarios from './pages/Usuarios/ListarUsuarios';
import CriarUsuario from './pages/Usuarios/NovoUsuario';
import EditarUsuario from './pages/Usuarios/EditarUsuario';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota de Login com SimpleLayout */}
          <Route path="/login" element={
            <SimpleLayout>
              <Login />
            </SimpleLayout>
          } />

          {/* Rotas protegidas com MainLayout */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/create-eleitor" element={
            <MainLayout>
              <ProtectedRoute>
                <CreateEleitor />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/create-presenca" element={
            <MainLayout>
              <ProtectedRoute>
                <CreatePresenca />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/create-sessao" element={
            <MainLayout>
              <ProtectedRoute>
                <CreateSessao />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/update-eleitor" element={
            <MainLayout>
              <ProtectedRoute>
                <UpdateEleitor />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/list-eleitores" element={
            <MainLayout>
              <ProtectedRoute>
                <ListEleitores />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/update-status" element={
            <MainLayout>
              <ProtectedRoute>
                <UpdateStatus />
              </ProtectedRoute>
            </MainLayout>
          } />

          {/* USUARIOS */}
          <Route path="/novo-usuario" element={
            <MainLayout>
              <ProtectedRoute>
                <CriarUsuario />
              </ProtectedRoute>
            </MainLayout>
          } />
          <Route path="/listar-usuarios" element={
            <MainLayout>
              <ProtectedRoute>
                <ListarUsuarios />
              </ProtectedRoute>
            </MainLayout>
          } />
           <Route path="/editar-usuario/:id" element={
            <MainLayout>
              <ProtectedRoute>
                <EditarUsuario />
              </ProtectedRoute>
            </MainLayout>
          } />
           
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
