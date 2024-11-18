import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginService } from "../../services/authService"; // Importa o serviço de autenticação

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(email, senha);
      login(data.token); // Atualiza o estado de autenticação no contexto com o token
      navigate("/"); // Redireciona para a página inicial
    } catch (errorMessage) {
      console.error("Erro ao fazer login:", errorMessage);
      alert("Login falhou: " + errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="info-section">
        <div className="background-image"></div>
        <div className="info-text">
          <h1>Bem-vindo!</h1>
          <p>
            Caro usuário, este é o sistema para gerenciar a presença dos
            associados que irão efetuar o seu voto.
          </p>
        </div>
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Login</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <a href="/forgot-password">Esqueceu a senha? Clique aqui</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
