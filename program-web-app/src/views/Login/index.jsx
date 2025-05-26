import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

import { useAuth } from '../../context/auth';

import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bienvenido a Galeria</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="username"
                placeholder="Nombre de usuario"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </label>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <div className="login-links">
          <Link to="/register" className="login-link">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };