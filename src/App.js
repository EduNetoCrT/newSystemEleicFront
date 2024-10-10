// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header'; // Importando o Header
import Sidebar from './components/Sidebar'; // Importando o Sidebar
import Dashboard from './components/Dashboard';
import CreateEleitor from './components/Eleitor';
import CreatePresenca from './components/CreatePresenca';
import CreateSessao from './components/CreateSessao';
import UpdateEleitor from './components/UpdateEleitor';
import ListEleitores from './components/ListEleitores';
import UpdateStatus from './components/UpdateStatus';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        <Sidebar /> {/* Sidebar fixo à esquerda */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Header /> {/* Header ocupa toda a largura no topo */}
          <div style={{ flexGrow: 1, padding: '20px' }}> {/* Área principal do conteúdo */}
            <Routes>
             <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-eleitor" element={<CreateEleitor />} />
              <Route path="/create-presenca" element={<CreatePresenca />} /> 
              <Route path="/create-sessao" element={<CreateSessao />} />
              <Route path="/update-eleitor" element={<UpdateEleitor />} /> 
              <Route path="/list-eleitores" element={<ListEleitores />} /> 
              <Route path="/update-status" element={<UpdateStatus />} /> {/* Nova rota para alterar status */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
