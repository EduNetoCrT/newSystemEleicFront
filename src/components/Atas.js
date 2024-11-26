// src/components/Atas.js
import React from 'react';
import './Atas.css'; // Estilos para os cards, crie se necessário

function Atas() {
  const atas = [
    { nome: "ATA JOÃO PESSOA", arquivo: "ata_joao_pessoa.docx" },
    { nome: "ATA GUARABIRA", arquivo: "ata_guarabira.docx" },
    { nome: "ATA CAMPINA GRANDE", arquivo: "ata_campina_grande.docx" },
    { nome: "ATA PATOS", arquivo: "ata_patos.docx" },
    { nome: "ATA CAJAZEIRAS", arquivo: "ata_cajazeiras.docx" },
  ];

  const downloadPath = '/uteis/atas/'; // Caminho para os arquivos no diretório público

  return (
    <div className="atas-container">
      <h1>Atas Eleições 2024</h1>
      <div className="cards-container">
        {atas.map((ata, index) => (
          <div key={index} className="card">
            <h2>{ata.nome}</h2>
            <button
              onClick={() => window.open(`${downloadPath}${ata.arquivo}`, '_blank')}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Atas;
