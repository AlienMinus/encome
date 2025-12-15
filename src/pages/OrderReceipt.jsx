import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import '../App.css';
import favicon from '../assets/favicon.png'; // Import the favicon


const OrderReceipt = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails; // Access orderDetails from location.state

    const handleDownloadReceipt = () => {
        if (!orderDetails) return;

        const generateReceiptHtml = () => {
            let itemsHtml = orderDetails.items.map(item => `
                <li style="display: flex; justify-content: space-between; padding: 5px 0;">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.quantity * item.price).toFixed(2)}</span>
                </li>
            `).join('');

            return `
                <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #f8bbd0; background-color: #fff;">
                    <img src="${favicon}" alt="Company Logo" style="display: block; margin: 0 auto 20px auto; width: 60px; height: 60px;" />
                    <h1 style="text-align: center; color: #c2185b;">Order Confirmation</h1>
                    <p style="text-align: center; color: #ad1457;">Thank you for your purchase!</p>

                    <div style="margin-top: 30px; border-top: 1px solid #f8bbd0; padding-top: 20px;">
                        <h2 style="color: #c2185b;">Order Summary</h2>
                        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
                        <p><strong>Date:</strong> ${orderDetails.date}</p>

                        <h3 style="color: #c2185b;">Items Purchased:</h3>
                        <ul style="list-style: none; padding: 0; margin: 10px 0;">
                            ${itemsHtml}
                        </ul>
                        <div style="display: flex; justify-content: flex-start; font-size: 1.2em; font-weight: bold; border-top: 1px solid #f8bbd0; padding-top: 10px; margin-top: 10px; color: #c2185b; text-align: right;">
                            <strong>Total:</strong> <span style= "padding: 5px" >$${orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div style="margin-top: 30px; border-top: 1px solid #f8bbd0; padding-top: 20px;">
                        <h2 style="color: #c2185b;">Shipping Information</h2>
                        <p>${orderDetails.shippingAddress.name}</p>
                        <p>${orderDetails.shippingAddress.street}</p>
                        <p>${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}</p>
                        <p>${orderDetails.shippingAddress.country}</p>
                    </div>

                    <div style="margin-top: 30px; border-top: 1px solid #f8bbd0; padding-top: 20px;">
                        <h2 style="color: #c2185b;">Payment Method</h2>
                        <p>${orderDetails.paymentMethod}</p>
                    </div>

                    <p style="text-align: center; color: #ad1457; margin-top: 40px; border-top: 1px solid #f8bbd0; padding-top: 20px;">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </div>
            `;
        };

        const htmlContent = generateReceiptHtml();
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(htmlContent);
            newWindow.document.close();
            newWindow.print();
        } else {
            alert('Please allow pop-ups for downloading the receipt.');
        }
    };

    if (!orderDetails) {
        return (
            <div className="order-receipt-container">
                <h1>Order Not Found</h1>
                <p className="order-error-message">
                    We could not find details for your order. Please ensure you landed on this page correctly.
                </p>
            </div>
        );
    }

    return (
        <div className="order-receipt-container">
            <img src={favicon} alt="Company Logo" className="receipt-logo" />
            <h1>Order Confirmation</h1>
            <p className="order-success-message">Thank you for your purchase!</p>

            <div className="order-summary">
                <h2>Order Summary</h2>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Date:</strong> {orderDetails.date}</p>

                <h3>Items Purchased:</h3>
                <ul className="item-list">
                    {orderDetails.items.map(item => (
                        <li key={item.id} className="item-detail">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="total-amount">
                    <strong>Total:</strong> <span>${orderDetails.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="shipping-info">
                <h2>Shipping Information</h2>
                <p>{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.street}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}</p>
                <p>{orderDetails.shippingAddress.country}</p>
            </div>

            <div className="payment-info">
                <h2>Payment Method</h2>
                <p>{orderDetails.paymentMethod}</p>
            </div>

            <p className="order-footer">A confirmation email has been sent to your registered email address.</p>

            <button onClick={handleDownloadReceipt} className="btn btn-primary-custom mt-4">
                Download Receipt
            </button>
        </div>
    );
};

export default OrderReceipt;
