import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="banner">
      <div className="banner-content">
        <img
          src="/logo-banco-central.png"
          alt="Logo Banco Central de Chile"
          className="banner-logo"
        />
        <h1 className="banner-title">Proyecto PoC CBDC Banco Central de Chile</h1>
        <button className="banner-exit-button" aria-label="Salir" onClick={handleExit}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Banner;
