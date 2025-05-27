import { useEffect, useState } from 'react';
import { FaPlus, FaImage } from 'react-icons/fa';

import EditItemModal from '../../components/modals/EditItemModal';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { createItem, deleteItem, getItems, updateItem } from '../../actions/item';

import './Products.css';

const Products = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getItems();
        if (!response.error) {
          setProducts(response.data != '' ? response.data : []);
          setLoading(false);
        } else {
          throw new Error();
        }
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
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
  
  const handleCreateProduct = async (newProduct) => {
    const response = await createItem(newProduct);
    if (response.data) {
      setProducts(await getItems().then(res => res.data));
      setShowCreateModal(false);
    } else {
      setError('Error al crear el producto');
    }
  }

  const handleEditProduct = async (updatedItem) => {
    const response = await updateItem(updatedItem);
    if (response.data) {
      setProducts(await getItems().then(res => res.data));
      setShowEditModal(false);
    } else {
      setError('Error al actualizar el producto');
    }
  }

  const handleDeleteProduct = async () => {
    if (!selectedItem) return;

    const response = await deleteItem(selectedItem.itemId);
    if (response.data) {
      setProducts(products.filter((item) => item.itemId !== selectedItem.itemId));
      setShowEditModal(false);
      setSelectedItem(null);
    } else {
      setError('Error al eliminar el producto');
    }
  }

  return (
    <>
      <div className="products-container">
        <div className="table-header">
          <h2>Catálogo de Obras</h2>
          <button className="add-button" onClick={() => setShowCreateModal(true)}>
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
                  <tr key={product.itemId}>
                    <td>
                      {product.image ? (
                        <img src={`data:${getImageUrl(product.imageType)};base64,${product.image}`} alt={product.name} className="product-image" />
                      ) : (
                        <FaImage className="image-placeholder" />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>
                      <button className="action-button" onClick={() => {
                        setSelectedItem(product);
                        setShowEditModal(true);
                      }}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <CreateItemModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newItem) => handleCreateProduct(newItem)}
        error={error}
      />
      <EditItemModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        item={selectedItem}
        onDelete={() => handleDeleteProduct()}
        onEdit={(updatedItem) => handleEditProduct(updatedItem)}
      />
    </>
  );
};

export { Products };