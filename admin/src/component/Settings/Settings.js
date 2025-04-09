import React, { useState, useEffect } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Setting() {
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    state: '',
    country: ''
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const handleSupportSubmit = (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const supportTeamParams = {
      from_name: name,
      from_email: email,
      issue: issue,
      to_email: 'pro12fessor3@gmail.com',
    };

    const userAcknowledgmentParams = {
      to_name: name,
      user_email: email,
      message: `
        This is ${name},
  
        We have received your support request regarding:
  
        "${issue}"
  
        Here is a copy of your message for your reference.
  
        Our team will review your issue and get back to you as soon as possible.
        If you need urgent assistance, feel free to reply to this email.
  
        — Support Team
      `,
    };
    emailjs.send(serviceId, templateId, supportTeamParams, publicKey)
      .then(() => {
        emailjs.send(serviceId, templateId, userAcknowledgmentParams, publicKey)
          .then(() => {
            alert('Your support request has been sent! A confirmation email has been sent to you.');
            setName('');
            setEmail('');
            setIssue('');
          })
          .catch((error) => {
            console.error('Error sending acknowledgment email:', error);
            alert('Your request was sent, but we couldn’t send a confirmation email.');
          });
      })
      .catch((error) => {
        console.error('Error sending support request:', error);
        alert('Failed to send your request. Please try again later.');
      });
  };


  const Navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('user_address');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleOption = (id) => {
    if (id === "edit_address") {
      setModalType("edit");
    } else if (id === "address") {
      setModalType("view");
    } else if (id === "faq") {
      setModalType("faq");
    } else if (id === "support") {
      setModalType("support");
    }
    else if (id === "payment_methods") {
      Navigate('/payments');
    }
    else if (id === "bills") {
      Navigate('/invoices');
    }
    else if (id === "logout") {
      alert("You are logging out your session")
      Navigate('/landing')
    }
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_address', JSON.stringify(formData));
    alert("Address saved!");
    setModalType(null);
  };

  const settingsOptions = [
    { id: 'dashboard', name: 'Dashboard Overview', icon: 'fas fa-tachometer-alt', valid: true },
    { id: 'user_management', name: 'User Management', icon: 'fas fa-users-cog', valid: true },
    { id: 'roles_permissions', name: 'Roles & Permissions', icon: 'fas fa-user-shield', valid: false },
    { id: 'audit_logs', name: 'Audit Logs', icon: 'fas fa-history', valid: true },
    { id: 'system_settings', name: 'System Settings', icon: 'fas fa-cogs', valid: false },
    { id: 'notifications', name: 'Notification Center', icon: 'fas fa-bell', valid: true },
    { id: 'themes', name: 'Theme Customization', icon: 'fas fa-paint-roller', valid: false },
    { id: 'data_backup', name: 'Data Backup & Restore', icon: 'fas fa-database', valid: false },
    { id: 'subscription', name: 'Subscription & Billing', icon: 'fas fa-file-invoice-dollar', valid: true },
    { id: 'support_center', name: 'Support Center', icon: 'fas fa-headset', valid: true },
    { id: 'language', name: 'Language Settings', icon: 'fas fa-language', valid: false },
    { id: 'security', name: 'Security Settings', icon: 'fas fa-lock', valid: true },
    { id: 'logout', name: 'Logout', icon: 'fas fa-sign-out-alt', valid: true }
  ];
  

  return (
    <div className="setting-container">
      <h2>Settings</h2>
      <div className="settings-list">
        {settingsOptions.map(option => (
          <div
            key={option.id}
            className={`setting-item ${option.valid ? 'active' : 'disabled'}`}
            onClick={() => option.valid && handleOption(option.id)}
          >
            <i className={option.icon}></i>
            <span>{option.name}</span>
          </div>
        ))}
      </div>

      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="styled-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === "edit" && "Edit Address"}
                {modalType === "view" && "Saved Address"}
                {modalType === "faq" && "Frequently Asked Questions"}
                {modalType === "support" && "Customer Support"}
              </h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            {modalType === "edit" && (
              <form onSubmit={handleSubmit} className="address-form-grid">
                <div className="form-fields-section">
                  <div className="form-grid">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                  </div>
                  <div className="modal-buttons">
                    <button type="submit">Save</button>
                  </div>
                </div>
              </form>
            )}
            {modalType === "view" && (
              <div className="form-only-grid saved-address-view">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Address:</strong> {formData.street}, {formData.city}, {formData.state}, {formData.zip}, {formData.country}</p>
                <div className="modal-buttons">
                  <button type="button" onClick={() => Navigate('/invoices')}>Continue</button>
                </div>
              </div>
            )}
            {modalType === "faq" && (
              <div className="form-only-grid faq-section" style={{ listStyle: 'none', paddingLeft: '0' }}>
                <div className="faq-item">
                  <p><strong>Q:</strong> How do I update my address?<br /><strong>A:</strong> Click on 'Edit Address' and save your changes.</p>
                </div>
                <div className="faq-item">
                  <p><strong>Q:</strong> Can I change my payment method?<br /><strong>A:</strong> Yes, go to 'Payment Methods' and add or edit your options.</p>
                </div>
                <div className="faq-item">
                  <p><strong>Q:</strong> What happens after I click continue on the address?<br /><strong>A:</strong> You’ll be redirected to the invoice page with your saved address.</p>
                </div>
                <div className="faq-item">
                  <p><strong>Q:</strong> How do I contact support?<br /><strong>A:</strong> Go to 'Customer Support' and fill in the form with your issue.</p>
                </div>
                <div className="faq-item">
                  <p><strong>Q:</strong> Where can I view my past bills?<br /><strong>A:</strong> Check the 'Bills & Transactions' section in settings.</p>
                </div>
                <div className="faq-item">
                  <p><strong>Q:</strong> Can I change the language of the app?<br /><strong>A:</strong> The 'Language Preferences' option will allow you to select your preferred language (feature coming soon).</p>
                </div>
              </div>
            )}

            {modalType === "support" && (
              <form onSubmit={handleSupportSubmit} className="address-form-grid">
                <div className="form-fields-section">
                  <div className="form-grid">
                    <input
                      type="text"
                      name="support_name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      name="support_email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <textarea
                      name="support_issue"
                      placeholder="Describe your issue..."
                      rows="4"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      style={{ gridColumn: '1 / -1', padding: '14px', borderRadius: '10px', border: '1.5px solid #d0e0dc' }}
                      required
                    />
                  </div>
                  <div className="modal-buttons">
                    <button type="submit">Submit Request</button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
