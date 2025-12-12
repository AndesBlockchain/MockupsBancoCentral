import { Link } from 'react-router-dom';
import './AccessCards.css';

const AccessCards = () => {
  return (
    <div className="access-cards-container">
      <Link to="/login-banco-central" className="access-card">
        <h2 className="access-card-title">Acceso Banco Central</h2>
      </Link>
      <Link to="/login-participante" className="access-card">
        <h2 className="access-card-title">Acceso Participantes</h2>
      </Link>
    </div>
  );
};

export default AccessCards;
