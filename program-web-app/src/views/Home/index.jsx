import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../context/cart';

import { getItems } from '../../actions/item';

import './Home.css';

const Home = () => {
    const { cart, addToCart } = useCart();
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const response = await getItems();
            if (response.data) {
                setItems(response.data);
            } else {
                const mockItems = [
                    { id: 1, name: 'Producto 1', price: 10.00, image: '...' },
                    { id: 2, name: 'Producto 2', price: 20.00, image: '...' },
                    { id: 3, name: 'Producto 3', price: 30.00, image: '...' }
                ];
            setItems(mockItems);
            }
        }
        fetchItems();
    }, []);

    const getImageUrl = (type) => {
        if (!type) return '';

        switch (type) {
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        case '.svg':
            return 'image/svg+xml';
        default:
            return '';
        }
    }

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>Tienda Online</h1>
        <Link to="/cart" className="cart-link">
          Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})
        </Link>
      </nav>

      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img 
              src={`data:${getImageUrl(item.imageType)};base64,${item.image}`} 
              alt={item.name} 
              className="item-image"
            />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button 
                onClick={() => addToCart(item)}
                className="add-to-cart-btn"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Home };