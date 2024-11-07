import { useEffect, useState } from 'react';
import './ListEleitores.css';
import { useNavigate } from 'react-router-dom';

function ListEleitores() {
  const [eleitores, setEleitores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEleitores = async () => {
      try {
        const response = await fetch('http://localhost:3001/eleitores');
        if (response.ok) {
          const data = await response.json();
          // Ordena os eleitores pelo ID
          const sortedEleitores = data.sort((a, b) => a.id - b.id);
          setEleitores(sortedEleitores);
        } else {
          console.error('Erro ao buscar eleitores');
          alert('Erro ao buscar eleitores');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchEleitores();
  }, []);

  const handleDelete = async (matricula) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este eleitor?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/eleitores/${matricula}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEleitores(eleitores.filter(eleitor => eleitor.matricula !== matricula));
        alert('Eleitor excluído com sucesso!');
      } else {
        console.error('Erro ao deletar eleitor');
        alert('Erro ao deletar eleitor');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="list-eleitores-container">
      <h2 className="form-title">Lista de Eleitores</h2>
      <button onClick={handleBack} className="back-button">Voltar</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Patente</th>
            <th>Status</th>
            <th>Votou</th>
          </tr>
        </thead>
        <tbody>
          {eleitores.map((eleitor) => (
            <tr key={eleitor.matricula}>
              <td>{eleitor.id}</td>
              <td>{eleitor.matricula}</td>
              <td>{eleitor.nome}</td>
              <td>{eleitor.cpf}</td>
              <td>{eleitor.patente}</td>
              <td>{eleitor.status}</td>
              <td style={{ color: eleitor.votou ? 'green' : 'red' }}>
                {eleitor.votou ? 'Confirmado' : 'Não Confirmado'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEleitores;
