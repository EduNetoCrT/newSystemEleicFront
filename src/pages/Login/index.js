import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    section: '',
  });

  useEffect(() => {
    // Redireciona para o dashboard se o usuário já estiver logado
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, section } = formData;

    // Tenta fazer login com os dados fornecidos
    const success = await login(email, password, section);
    if (success) {
      navigate('/'); // Redireciona para o dashboard após login bem-sucedido
    } else {
      alert('Credenciais inválidas'); // Exibe alerta em caso de falha no login
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          value={formData.email} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Senha" 
          onChange={handleChange} 
          required 
          value={formData.password} 
        />
        <input 
          type="text" 
          name="section" 
          placeholder="Seção" 
          onChange={handleChange} 
          value={formData.section} 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
