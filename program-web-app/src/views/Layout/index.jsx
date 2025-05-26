import { NavLink, Outlet, Link } from 'react-router-dom';

import { useAuth } from '../../context/auth';

import './Layout.css';

function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className='main-app-container'>
      {
        
        <header>
          <nav>
            <span>Galeria</span>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {
                isAuthenticated &&
                <>
                  <li style={{ display: 'inline-block', margin: '0 10px' }}>
                    <NavLink to="/products" className="App-link">Productos</NavLink>
                  </li>
                  <li style={{ display: 'inline-block', margin: '0 10px' }}>
                    <NavLink to="/users" className="App-link">Usuarios</NavLink>
                  </li>
                </>
              }
            </ul>
            {
              isAuthenticated ?
                (<button type='button' onClick={logout}>Cerrar sesión</button>)
                  :
                (<NavLink to='/login'>Iniciar sesión</NavLink>)
            }
          </nav>
        </header>
      }
      <main>
        <Outlet />
      </main>
      <footer>
        © 2024 Galeria. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export { Layout };