import { useState, useEffect } from 'react';
import { FaTimes, FaTag, FaAlignLeft, FaDollarSign, FaFile, FaTrash } from 'react-icons/fa';
import './Modals.css';

const EditItemModal = ({ isOpen, onClose, onEdit, onDelete, item }) => {
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    price: 0,
    file: null
  });

  useEffect(() => {
    if (item) {
      setEditData({
        itemId: item.id || '',
        name: item.name || '',
        description: item.description || '',
        price: item.price || 0,
        file: item.file || null,
        imageType: item.imageType || '',
        image: item.image || ''
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editData);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Editar Ítem</h3>
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
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <FaAlignLeft className="input-icon" />
            <textarea
              placeholder="Descripción"
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              rows="4"
            />
          </div>

          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Precio"
              value={editData.price}
              onChange={(e) => setEditData({...editData, price: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <FaFile className="input-icon" />
            <label className="input-label">
              {editData.file ? 
                (editData.file.name || 'Imagen actual') : 
                'Seleccionar nueva imagen'}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => 
                  setEditData({ ...editData, file: e.target.files[0] })
                }
              />
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="delete-button"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              <FaTrash className="button-icon" />
              Eliminar Ítem
            </button>
            
            <div>
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="confirm-button">
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;