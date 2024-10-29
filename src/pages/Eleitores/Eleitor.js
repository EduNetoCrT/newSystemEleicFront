import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Eleitor.css';

function CreateEleitor() {
  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    patente: '',
    status: 'APTO',
  });

  const [isEditing, setIsEditing] = useState(false); // Indica se o formulário está no modo de edição
  const navigate = useNavigate();

  // Função para lidar com a mudança de valores dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Se o campo alterado for a matrícula, verifica automaticamente os dados do eleitor
    if (name === 'matricula' && value.length === 7) {
      fetchEleitorData(value);
    }
  };

  // Função para buscar os dados do eleitor pela matrícula
  const fetchEleitorData = async (matricula) => {
    try {
      const response = await axios.get(`http://localhost:3001/eleitores/${matricula}`);
      if (response.data) {
        setFormData(response.data); // Preenche o formulário com os dados do eleitor encontrado
        setIsEditing(true); // Ativa o modo de edição
      }
    } catch (error) {
      console.error('Eleitor não encontrado ou erro na busca', error);
      setIsEditing(false); // Caso a matrícula não seja encontrada, o formulário estará no modo de criação
    }
  };

  // Função para enviar os dados (criando ou editando)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Atualiza o eleitor se já existir
        const response = await axios.put(`http://localhost:3001/eleitores/${formData.matricula}`, formData);
        alert(response.data.message || 'Eleitor atualizado com sucesso!');
      } else {
        // Cria um novo eleitor
        const response = await axios.post('http://localhost:3001/eleitores', formData);
        alert(response.data.message || 'Eleitor criado com sucesso!');
      }

      // Limpa o formulário após o sucesso
      setFormData({
        matricula: '',
        nome: '',
        cpf: '',
        patente: '',
        status: 'APTO',
      });
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao enviar o formulário: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="create-eleitor-container">
        <h2 className="form-title">{isEditing ? 'Atualizar Eleitor' : 'Cadastrar Eleitor'}</h2>
        <form className="create-eleitor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            onChange={handleChange}
            required
            value={formData.matricula}
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            onChange={handleChange}
            required
            value={formData.nome}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            onChange={handleChange}
            required
            value={formData.cpf}
          />
          <input
            type="text"
            name="patente"
            placeholder="Patente"
            onChange={handleChange}
            required
            value={formData.patente}
          />
          <select name="status" onChange={handleChange} value={formData.status}>
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>
          <button type="submit">{isEditing ? 'Atualizar Eleitor' : 'Criar Eleitor'}</button>
        </form>
        <button onClick={handleBack} className="back-button">Voltar</button>
      </div>
    </div>
  );
}

export default CreateEleitor;
