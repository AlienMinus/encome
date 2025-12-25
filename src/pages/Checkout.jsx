import React, { useContext, useState, useEffect } from "react"; // Added useEffect
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user._id) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get(
            `https://encome.onrender.com/api/user/${encodeURIComponent(
              user.email
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = response.data;
          const shippingAddress = userData.addresses && userData.addresses[0] ? userData.addresses[0] : {};
          setShippingInfo((prevInfo) => ({
            ...prevInfo,
            name: userData.name || "",
            email: userData.email || "",
            street: shippingAddress.street || "",
            city: shippingAddress.city || "",
            state: shippingAddress.state || "",
            zip: shippingAddress.zip || "",
            country: shippingAddress.country || "",
          }));
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };

    fetchUserProfile();
  }, [user]); // Rerun when user object changes

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const generateOrderId = () => {
      const now = new Date();
      const date = now.toISOString().slice(0, 10).replace(/-/g, "");
      const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
      return `${date}${time}${Math.floor(Math.random() * 10000)}`;
    };

    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let currentUserId = null;
    let currentUserEmail = null;

    if (user) {
      currentUserId = user._id;
      currentUserEmail = user.email;
    } else {
      if (!shippingInfo.email) {
        return;
      }
      currentUserEmail = shippingInfo.email;
    }

    const orderDetails = {
      orderId,
      date: orderDate,
      items: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getCartTotal(),
      shippingAddress: shippingInfo,
      paymentMethod: paymentMethod,
      userId: currentUserId,
      userEmail: currentUserEmail,
    };

    try {
      const response = await axios.post("https://encome.onrender.com/api/orders", orderDetails, {
        headers: {
          ...(user && {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }),
        },
      });

      const placedOrder = response.data;
      console.log("Order Placed Successfully:", placedOrder);

      clearCart();
      navigate(`/order-receipt/${placedOrder.orderId}`, { state: { orderDetails: placedOrder } });
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="container checkout-container">
      <h1>Checkout</h1>

      <div className="order-summary-checkout">
        <h2>Your Order</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="item-list-checkout">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="total-checkout">
              <strong>Total:</strong> ${getCartTotal().toFixed(2)}
            </div>
          </>
        )}
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <h2>Shipping Information</h2>
        <>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={shippingInfo.street}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State/Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip/Postal Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingInfo.zip}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              required
            />
          </div>
        </>

        <h2>Payment Information</h2>
        <div className="form-group">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={handlePaymentChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={handlePaymentChange}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="place-order-button"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
