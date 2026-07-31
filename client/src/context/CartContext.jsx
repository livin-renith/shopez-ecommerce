import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCartApi, addToCartApi, updateCartItemApi, removeCartItemApi, clearCartApi } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      // Fallback to local storage for guests
      const localCart = localStorage.getItem('shopez_guest_cart');
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCartApi();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, size = 'M', quantity = 1) => {
    if (user) {
      try {
        const { data } = await addToCartApi({ productId: product._id, size, quantity });
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Add to cart failed:', error);
      }
    } else {
      // Guest local state
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(item => item.product?._id === product._id && item.size === size);
        let updated;
        if (existingIndex > -1) {
          updated = [...prev];
          updated[existingIndex].quantity += quantity;
        } else {
          updated = [
            ...prev,
            {
              _id: 'guest_' + Date.now(),
              product: product,
              title: product.title,
              mainImg: product.mainImg,
              price: product.price,
              discount: product.discount || 0,
              size,
              quantity,
            }
          ];
        }
        localStorage.setItem('shopez_guest_cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (user) {
      try {
        const { data } = await updateCartItemApi(itemId, { quantity });
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Update quantity failed:', error);
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.map(item => item._id === itemId ? { ...item, quantity } : item).filter(item => item.quantity > 0);
        localStorage.setItem('shopez_guest_cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        const { data } = await removeCartItemApi(itemId);
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Remove item failed:', error);
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.filter(item => item._id !== itemId);
        localStorage.setItem('shopez_guest_cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await clearCartApi();
        setCartItems([]);
      } catch (error) {
        console.error('Clear cart failed:', error);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('shopez_guest_cart');
    }
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.price || item.product?.price || 0;
    const itemDiscount = item.discount || item.product?.discount || 0;
    const finalPrice = itemPrice - (itemPrice * itemDiscount / 100);
    return acc + (finalPrice * (item.quantity || 1));
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
