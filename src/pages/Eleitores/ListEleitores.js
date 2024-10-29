import { useEffect, useState } from 'react';
import './ListEleitores.css'; // Importando o CSS
import { useNavigate } from 'react-router-dom'; // Para navegação

function ListEleitores() {
  const [eleitores, setEleitores] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchEleitores = async () => {
      try {
        const response = await fetch('http://localhost:3001/eleitores');
        if (response.ok) {
          const data = await response.json();
          setEleitores(data);
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
    if (!confirmDelete) return; // Se o usuário não confirmar, não faz nada

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
    navigate('/'); // Navega para a página anterior ou para onde desejar
  };

  return (
    <div className="list-eleitores-container">
      <h2 className="form-title">Lista de Eleitores</h2>
      <button onClick={handleBack} className="back-button">Voltar</button>
      <table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Patente</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eleitores.map((eleitor) => (
            <tr key={eleitor.matricula}>
              <td>{eleitor.matricula}</td>
              <td>{eleitor.nome}</td>
              <td>{eleitor.cpf}</td>
              <td>{eleitor.patente}</td>
              <td>{eleitor.status}</td>
              <td>
                <button onClick={() => handleDelete(eleitor.matricula)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEleitores;
