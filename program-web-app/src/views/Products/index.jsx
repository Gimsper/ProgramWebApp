import { useEffect, useState } from 'react';
import { FaPlus, FaImage } from 'react-icons/fa';

import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockData = [
          { id: 1, name: 'Atardecer en la playa', artist: 'María López', category: 'Paisajes', price: 450, stock: 5, image: 'url1' },
          { id: 2, name: 'Retrato urbano', artist: 'Carlos Gómez', category: 'Retratos', price: 320, stock: 0, image: 'url2' },
          { id: 3, name: 'Naturaleza abstracta', artist: 'Ana Martínez', category: 'Abstracto', price: 680, stock: 2, image: 'url3' },
        ];
        setProducts(mockData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="table-header">
        <h2>Catálogo de Obras</h2>
        <button className="add-button">
          <FaPlus className="button-icon" />
          Nueva Obra
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-image" />
                    ) : (
                      <FaImage className="image-placeholder" />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}asdasdasdasdas asd as das das das das das das as das das dwqweqweqw as da sd asd as das das dasdas d</td>
                  <td>${product.price}</td>
                  <td>
                    <button className="action-button">Editar</button>
                    <button className="action-button delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export { Products };