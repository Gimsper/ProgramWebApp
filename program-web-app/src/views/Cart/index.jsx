import { useCart } from '../../context/cart';
import { FaOpencart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import { generateInvoice } from '../../actions/utils';

import './Cart.css';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

    const handleGenerateInvoice = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        generateInvoice(cart, total);
    };

    return (
        <div className="cart-container">
        <div className="cart-header">
            <h1 className="cart-title">Tu Carrito</h1>
            <button onClick={clearCart} className="remove-btn">
                <FaTrash /> Vaciar Carrito
            </button>
        </div>

        {cart.length === 0 ? (
            <div className="empty-cart-message">
                <FaOpencart />
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos desde la tienda</p>
            </div>
        ) : (
            <>
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={`data:${getImageUrl(item.imageType)};base64,${item.image}`}
                                alt={item.name}
                                className="item-image-cart"
                            />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                    <FaMinus />
                                    </button>
                                    <span style={{ color: "#000" }}>{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id, true)}
                            >
                                <FaTrash /> Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <div className="order-summary">
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío:</span>
                        <span>Gratis</span>
                    </div>
                    <div className="summary-row total-price">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={handleGenerateInvoice}>
                        Generar Factura
                    </button>
                </div>
            </>
        )}
        </div>
    );
};

export { Cart };