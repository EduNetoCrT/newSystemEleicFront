// src/components/EditaisPortarias.js
import React from 'react';
import './EditaisPortarias.css'; // Crie um arquivo CSS semelhante ao de Atas, se necessário.

function EditaisPortarias() {
  const documentos = [
    { nome: "CONSELHO", arquivo: "conselho.pdf" },
    { nome: "ATRIBUIÇÕES", arquivo: "atribuicoes.pdf" },
    { nome: "TELEFONES", arquivo: "telefones.pdf" },
    { nome: "ESTATUTO", arquivo: "estatuto.pdf" },
    { nome: "CÓDIGO ELEITORAL", arquivo: "codigo_eleitoral.pdf" },
    { nome: "EDITAL CONVOCAÇÃO 2024", arquivo: "edital_convocacao_2024.pdf" },
  ];

  const downloadPath = '/uteis/editais_portarias/'; // Caminho para a pasta dos arquivos

  return (
    <div className="editais-container">
      <h1>Editais e Portarias</h1>
      <div className="cards-container">
        {documentos.map((doc, index) => (
          <div key={index} className="card">
            <h2>{doc.nome}</h2>
            <button
              onClick={() => window.open(`${downloadPath}${doc.arquivo}`, '_blank')}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditaisPortarias;
