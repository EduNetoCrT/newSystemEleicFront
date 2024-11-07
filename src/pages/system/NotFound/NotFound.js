import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! A página que você está procurando não existe.</p>
      <Link to="/" className="not-found-link">Voltar para a página inicial</Link>
    </div>
  );
}

export default NotFound;