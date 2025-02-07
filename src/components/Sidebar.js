// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logo_2.png'; // Ajuste o caminho conforme necessário

function Sidebar() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo_2" className="logo_2" />
      <h3 onClick={() => toggleSection('presencas')}>
        <span className={`expand-icon ${expandedSection === 'presencas' ? '' : 'collapsed'}`}>&#9654;</span>PRESENÇAS
      </h3>
      <ul style={{ display: expandedSection === 'presencas' ? 'block' : 'none' }}>
        <li><Link to="/create-presenca">REGISTRAR PRESENÇA</Link></li>
        <li><Link to="/list-presencas">CONFIRMADAS</Link></li>
        <li><Link to="/list-nao-confirmados">NÃO CONFIRMADAS</Link></li>
        <li><Link to="/consultar-presenca-eleitor">CONSULTAR PRESENÇA DO ELEITOR</Link></li>
        


        
      </ul>

      <h3 onClick={() => toggleSection('associados')}>
        <span className={`expand-icon ${expandedSection === 'associados' ? '' : 'collapsed'}`}>&#9654;</span>ASSOCIADOS
      </h3>
      <ul style={{ display: expandedSection === 'associados' ? 'block' : 'none' }}>
        <li><Link to="/create-eleitor">NOVO ASSOCIADO</Link></li>
        <li><Link to="/consultar-eleitor">CONSULTAR ASSOCIADO</Link></li>
        <li><Link to="/list-eleitores">LISTAR ASSOCIADOS</Link></li>
        <li><Link to="/update-status">MUDAR STATUS DO ASSOCIADO</Link></li>
      </ul>

      <h3 onClick={() => toggleSection('secoes')}>
        <span className={`expand-icon ${expandedSection === 'secoes' ? '' : 'collapsed'}`}>&#9654;</span>SEÇÕES
      </h3>
      <ul style={{ display: expandedSection === 'secoes' ? 'block' : 'none' }}>
        <li><Link to="/create-sessao">NOVA SEÇÃO</Link></li>
        <li><Link to="/list-sessoes">LISTAR SEÇÕES</Link></li>
      </ul>

      <h3 onClick={() => toggleSection('usuarios')}>
        <span className={`expand-icon ${expandedSection === 'usuarios' ? '' : 'collapsed'}`}>&#9654;</span>USUÁRIOS
      </h3>
      <ul style={{ display: expandedSection === 'usuarios' ? 'block' : 'none' }}>
        <li><Link to="/create-user">NOVO USUÁRIO</Link></li>
        <li><Link to="/edit-usuario">EDITAR USUÁRIO</Link></li>
        <li><Link to="/list-usuarios">LISTAR USUÁRIOS</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
