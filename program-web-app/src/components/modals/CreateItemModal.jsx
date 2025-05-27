import { useState } from 'react';
import { FaTimes, FaTag, FaAlignLeft, FaDollarSign, FaFile } from 'react-icons/fa';
import './Modals.css';

const CreateItemModal = ({ isOpen, onClose, onCreate }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(itemData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Nuevo Ítem</h3>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaTag className="input-icon" />
            <input
              type="text"
              placeholder="Nombre del ítem"
              value={itemData.name}
              onChange={(e) => setItemData({...itemData, name: e.target.value})}
              required
            />
          </div>
          <div className="input-group">
            <FaAlignLeft className="input-icon" />
            <textarea
              placeholder="Descripción"
              value={itemData.description}
              onChange={(e) => setItemData({...itemData, description: e.target.value})}
              rows="4"
            />
          </div>
          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type='number'
              placeholder="Precio"
              value={itemData.price}
              onChange={(e) => setItemData({...itemData, price: e.target.value})}
              required
            />
          </div>
          <div className="input-group">
            <FaFile className="input-icon" />
            <label className="input-label">
              { itemData.file ? itemData.file.name : 'Seleccionar imagen' }
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) =>
                  setItemData({ ...itemData, file: e.target.files[0] })
                }
                required
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="confirm-button">
              Crear Ítem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;