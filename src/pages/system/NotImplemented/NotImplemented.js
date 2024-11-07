import { Link } from 'react-router-dom';
import './NotImplemented.css';

function NotImplemented() {
  return (
    <div className="not-implemented-container">
      <h1 className="not-implemented-title">501</h1>
      <p className="not-implemented-message">Esta funcionalidade ainda não foi implementada.</p>
      <Link to="/" className="not-implemented-link">Voltar para a página inicial</Link>
    </div>
  );
}

export default NotImplemented;