import { createContext, useState, useEffect, useContext } from 'react';
import { AuthProvider, useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { authToken, isLoggedIn } = useAuth(); // Consume AuthContext

  const API_URL = import.meta.env.VITE_API_URL || 'https://encome.onrender.com/api'; // Assuming a common API URL

  const fetchCart = async () => {
    if (!isLoggedIn || !authToken) {
      setCartItems([]); // Clear cart if not authenticated
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCartItems(data.items.map(item => ({
        ...item.productId, // Product details from populate
        id: item.productId._id,
        quantity: item.quantity
      })));
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authToken, isLoggedIn]);

  const addToCart = async (product) => {
    if (!isLoggedIn || !authToken) {
      console.error('User not authenticated. Cannot add to cart.');
      // Optionally, handle this by storing in local storage or prompting login
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      const data = await response.json();
      setCartItems(data.items.map(item => ({
        ...item.productId,
        id: item.productId._id,
        quantity: item.quantity
      })));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isLoggedIn || !authToken) {
      console.error('User not authenticated. Cannot remove from cart.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      const data = await response.json();
      setCartItems(data.items.map(item => ({
        ...item.productId,
        id: item.productId._id,
        quantity: item.quantity
      })));
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isLoggedIn || !authToken) {
      console.error('User not authenticated. Cannot update cart quantity.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ quantity })
      });
      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }
      const data = await response.json();
      setCartItems(data.items.map(item => ({
        ...item.productId,
        id: item.productId._id,
        quantity: item.quantity
      })));
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = async () => {
    if (!isLoggedIn || !authToken) {
      console.error('User not authenticated. Cannot clear cart.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
