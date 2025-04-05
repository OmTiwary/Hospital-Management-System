import React, { useEffect, useState } from 'react';
import './Invoice.css';
import { useCart } from '../../context/CartContext';
import { FaCheckCircle, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaFileInvoiceDollar, FaPrint } from 'react-icons/fa';

export default function Invoice() {
  const { cartItems, getCartTotal } = useCart();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem('userAddress'));

    const generatedData = {
      orderId: 'ORD' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      orderDate: new Date().toLocaleString(),
      fromAddress: savedAddress
        ? `${savedAddress.street}, ${savedAddress.city}, ${savedAddress.state} - ${savedAddress.pin}`
        : 'Xeno Health, Bangalore, Karnataka - 560001',
      phone: savedAddress?.phone || 'N/A',
      paymentMethod: 'Online Payment (UPI)',
      deliveryEstimate: '8 April 2025',
      status: 'Confirmed',
      items: cartItems,
      total: Math.round(getCartTotal() * 83),
    };

    localStorage.setItem('invoiceData', JSON.stringify(generatedData));
    setInvoiceData(generatedData);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!invoiceData) return <div>Loading Invoice...</div>;

  return (
    <div className="invoice-container">
    <div className="invoice-card" id="invoice-content">
      <div className="invoice-header">
        <div className="billed-to">
          <div className="dot" />
          <p><strong>BILLED TO:</strong><br />
            {invoiceData.fromAddress}<br />
            {invoiceData.phone}<br />
            Xeno Health
          </p>
        </div>
        <div className="invoice-info">
          <h2>INVOICE</h2>
          <p><strong>Invoice No.</strong> {invoiceData.orderId}</p>
          <p>{invoiceData.orderDate}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>₹{Math.round(item.price * 83)}</td>
              <td>₹{Math.round(item.price * item.quantity * 83)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals">
        <p><strong>Subtotal:</strong> ₹{invoiceData.total}</p>
        <p><strong>Tax (0%):</strong> ₹0</p>
        <p className="total-due"><strong>Total Due:</strong> ₹{invoiceData.total}</p>
      </div>

      <p className="thank-you-text">Thank you for your Business!</p>

      <div className="footer-info">
        <div className="payment-info">
          <p><strong>PAYMENT INFORMATION</strong></p>
          <p>Bank Name: ABC Bank<br />
          Account Name: Xeno Health<br />
          Account No: 987-654-321</p>
        </div>
        <div className="company-address">
          <p><strong>Xeno Health</strong><br />
            987 Anywhere St., Mangalore, Bangalore 987650</p>
        </div>
      </div>
    </div>

    <button className="print-button" onClick={handlePrint}>
      <FaPrint className="icon" /> Generate Invoice
    </button>
  </div>
  );
}
