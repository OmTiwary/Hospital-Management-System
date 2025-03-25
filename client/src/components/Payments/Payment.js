import React, { useState } from 'react';
import './Payment.css';

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: 'fas fa-money-bill-wave', enabled: true },
    { id: 'credit_card', name: 'Credit Card', icon: 'fas fa-credit-card', enabled: false },
    { id: 'debit_card', name: 'Debit Card', icon: 'fas fa-credit-card', enabled: false },
    { id: 'paypal', name: 'PayPal', icon: 'fab fa-paypal', enabled: false },
    { id: 'upi', name: 'UPI (Generic)', icon: 'fas fa-mobile-alt', enabled: false },
    { id: 'gpay', name: 'Google Pay', icon: 'fab fa-google-pay', enabled: false },
    { id: 'phonepe', name: 'PhonePe', icon: 'fas fa-mobile', enabled: false },
    { id: 'paytm', name: 'Paytm UPI', icon: 'fas fa-wallet', enabled: false },
    { id: 'net_banking', name: 'Net Banking', icon: 'fas fa-university', enabled: false }
  ];

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-option ${method.enabled ? 'active' : 'disabled'} ${selectedPayment === method.id ? 'selected' : ''}`}
            onClick={() => method.enabled && setSelectedPayment(method.id)}
          >
            <i className={method.icon}></i>
            <span>{method.name}</span>
          </div>
        ))}
      </div>
      <button className="proceed-btn" disabled={selectedPayment !== 'cod'}>
        Proceed to Payment
      </button>
    </div>
  );
}
