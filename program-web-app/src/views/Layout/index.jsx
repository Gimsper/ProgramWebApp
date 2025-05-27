import { NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../../context/auth';

import './Layout.css';
import { useCart } from '../../context/cart';

function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className='main-app-container'>
      {
        
        <header>
          <nav>
            <span>Galeria</span>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {
                isAuthenticated ?
                (
                  <>
                    <li style={{ display: 'inline-block', margin: '0 10px' }}>
                      <NavLink to="/products" className="App-link">Productos</NavLink>
                    </li>
                    <li style={{ display: 'inline-block', margin: '0 10px' }}>
                      <NavLink to="/users" className="App-link">Usuarios</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li style={{ display: 'inline-block', margin: '0 10px' }}>
                      <NavLink to="/" className="App-link">Inicio</NavLink>
                    </li>
                    {
                      cart.length > 0 && (
                        <li style={{ display: 'inline-block', margin: '0 10px' }}>
                          <NavLink to="/cart" className="App-link">
                            Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})
                          </NavLink>
                        </li>
                      )
                    }
                  </>
                )
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
        © 2025 Galeria. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export { Layout };