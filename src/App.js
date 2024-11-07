// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateEleitor from './components/Eleitor';
import CreateUser from './components/CreateUser';
import CreatePresenca from './components/CreatePresenca';
import CreateSessao from './components/CreateSessao';
import UpdateEleitor from './components/UpdateEleitor';
import ListEleitores from './components/ListEleitores';
import UpdateStatus from './components/UpdateStatus';
import Login from './components/Login';
import ListerUsers from './components/ListerUsers';
import ConsultarEleitor from './components/ConsultarEleitor';
import ListSessoes from './components/ListSessoes';
import ListPresencas from './components/ListPresencas';
import ListNaoConfirmados from './components/ListNaoConfirmados'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-eleitor" element={<CreateEleitor />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/create-presenca" element={<CreatePresenca />} />
              <Route path="/create-sessao" element={<CreateSessao />} />
              <Route path="/update-eleitor" element={<UpdateEleitor />} />
              <Route path="/list-eleitores" element={<ListEleitores />} />
              <Route path="/update-status" element={<UpdateStatus />} />
              <Route path="/list-usuarios" element={<ListerUsers />} />
              <Route path="/consultar-eleitor" element={<ConsultarEleitor />} />
              <Route path="/list-sessoes" element={<ListSessoes />} />
              <Route path="/list-presencas" element={<ListPresencas />} />
              <Route path="/list-nao-confirmados" element={<ListNaoConfirmados />} /> {/* New route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
