import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Layout } from '../views/Layout';
import { Home } from '../views/Home';
import { NotFound } from '../views/NotFound';
import AuthProvider from '../context/auth';

import './App.css';
import { Login } from '../views/Login';
import { Products } from '../views/Products';
import { Users } from '../views/Users';
import { CartProvider } from '../context/cart';
import { Cart } from '../views/Cart';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
