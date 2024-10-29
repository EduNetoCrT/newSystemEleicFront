import './Header.css';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth(); // Obtém o usuário logado e a função de logout

  return (
    <div className="header">
      <div className="logo">Caixa Beneficente PM/BM</div>
      {user && (
        <div className="user-info">
          <span className="user-name">Bem-vindo, {user.email}</span>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Header;
