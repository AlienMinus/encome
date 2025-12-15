import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = getCartTotal();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container">
      <h1>Cart</h1>
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
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
