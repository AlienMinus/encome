import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="card mb-3 cart-item h-100">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={item.images[0]}
            className="img-fluid rounded-start h-100"
            style={{ objectFit: "cover" }}
            alt={item.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text fw-bold">${item.price}</p>
            </div>
            <p className="card-text flex-grow-1">{item.description.slice(0, 35) + "..."}</p>
            <div className="cart-item-controls mt-auto">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className="input-group-text">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger ms-auto"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
