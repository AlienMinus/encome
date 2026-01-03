import { useContext } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const totalPrice = getCartTotal();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Cart</h1>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/order-history')} title="Order History">
          <FaHistory size={20} />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <hr />
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <div className="mb-2 mb-sm-0">
              <button className="btn btn-checkout" onClick={handleCheckout}>Checkout</button>
            </div>
            <div className="text-sm-end">
              <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;