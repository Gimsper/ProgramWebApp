import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.itemId === item.itemId);
            if (existingItem) {
                return prevCart.map(i =>
                    i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId, removeAll = false) => {
        setCart(prevCart => {
            if (removeAll) {
                return prevCart.filter(item => item.itemId !== itemId);
            }
            return prevCart.map(item => {
                if (item.itemId === itemId) {
                    const newQuantity = item.quantity - 1;
                    return newQuantity > 0 ? { ...item, quantity: item.quantity - 1 } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const clearCart = () => setCart([]);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);