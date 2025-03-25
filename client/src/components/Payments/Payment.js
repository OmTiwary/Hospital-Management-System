import React, { useState } from 'react';
import './Payment.css';

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: 'fas fa-money-bill-wave', description: 'Pay with cash when you receive your order.', discount: 'No extra charge', enabled: true },
    { id: 'credit_card', name: 'Credit Card', icon: 'fas fa-credit-card', description: 'Pay securely using your credit card.', discount: 'Earn 2% cashback', enabled: false },
    { id: 'debit_card', name: 'Debit Card', icon: 'fas fa-credit-card', description: 'Use your debit card for payment.', discount: 'No extra charge', enabled: false },
    { id: 'paypal', name: 'PayPal', icon: 'fab fa-paypal', description: 'Checkout quickly with PayPal.', discount: 'Save ₹100 on orders above ₹1000', enabled: false },
    { id: 'upi', name: 'UPI (Generic)', icon: 'fas fa-mobile-alt', description: 'Pay using any UPI ID or app.', discount: 'Flat 5% off on first UPI transaction', enabled: false },
    { id: 'gpay', name: 'Google Pay', icon: 'fab fa-google-pay', description: 'Fast payment via Google Pay.', discount: 'Get ₹50 cashback on ₹500+', enabled: false },
    { id: 'phonepe', name: 'PhonePe', icon: 'fas fa-mobile', description: 'Pay easily with PhonePe.', discount: 'Get ₹30 cashback on ₹300+', enabled: false },
    { id: 'paytm', name: 'Paytm UPI', icon: 'fas fa-wallet', description: 'Use Paytm UPI for transactions.', discount: 'Flat ₹25 off on ₹250+', enabled: false },
    { id: 'net_banking', name: 'Net Banking', icon: 'fas fa-university', description: 'Pay directly from your bank account.', discount: 'No extra charge', enabled: false }
  ];

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <p className="subtext">Choose a payment method to proceed with your order.</p>
      <div className="payment-options">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-option ${method.enabled ? 'active' : 'disabled'} ${selectedPayment === method.id ? 'selected' : ''}`}
            onClick={() => method.enabled && setSelectedPayment(method.id)}
          >
            <i className={method.icon}></i>
            <div className="payment-info">
              <span className="payment-name">{method.name}</span>
              <span className="payment-description">{method.description}</span>
              <span className="payment-discount">{method.discount}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="offers">
        <h3>Exclusive Offers</h3>
        <p><i className="fas fa-credit-card" style={{ color: "#63E6BE" }}></i> Get 5% off on Credit Card payments above ₹2000.</p>
        <p><i className="fas fa-mobile-alt"style={{ color: "#63E6BE" }}></i> First-time UPI users get ₹50 cashback.</p>
        <p><i className="fas fa-university"style={{ color: "#63E6BE" }}></i> Flat ₹100 off on orders above ₹5000 with Net Banking.</p>
      </div>
      <button className="proceed-btn" disabled={selectedPayment !== 'cod'}>
        <i className="fas fa-arrow-right"></i> Proceed to Payment
      </button>
    </div>
  );
}
