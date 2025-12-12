import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCard.css';

const LoginCard = ({ title, redirectTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });

    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-card-title">{title}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Acceder
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
