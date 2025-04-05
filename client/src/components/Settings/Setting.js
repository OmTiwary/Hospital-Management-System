import React, { useState, useEffect } from 'react';
import './Setting.css';
import {useNavigate} from 'react-router-dom';

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
    { id: 'address', name: 'Manage Address', icon: 'fas fa-map-marker-alt', valid: true },
    { id: 'edit_address', name: 'Edit Address', icon: 'fas fa-edit', valid: true },
    { id: 'faq', name: 'FAQs', icon: 'fas fa-question-circle', valid: true },
    { id: 'payment_methods', name: 'Payment Methods', icon: 'fas fa-credit-card', valid: true },
    { id: 'bills', name: 'Bills & Transactions', icon: 'fas fa-file-invoice-dollar', valid: true },
    { id: 'notifications', name: 'Notifications', icon: 'fas fa-bell', valid: false },
    { id: 'privacy', name: 'Privacy Settings', icon: 'fas fa-shield-alt', valid: false },
    { id: 'subscription', name: 'Subscription', icon: 'fas fa-sync-alt', valid: false },
    { id: 'language', name: 'Language Preferences', icon: 'fas fa-language', valid: false },
    { id: 'security', name: 'Security Settings', icon: 'fas fa-lock', valid: false },
    { id: 'theme', name: 'Theme Customization', icon: 'fas fa-paint-brush', valid: false },
    { id: 'backup', name: 'Data Backup & Restore', icon: 'fas fa-database', valid: false },
    { id: 'support', name: 'Customer Support', icon: 'fas fa-headset', valid: true },
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
              <h3>{modalType === "edit" ? "Edit Address" : "Saved Address"}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            {modalType === "edit" ? (
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
            ) : (
              <div className="form-only-grid saved-address-view">
                <p><strong>Name:</strong> {formData.name}</p>
                <p>
                  <strong>Address:</strong> {formData.street}, {formData.city}, {formData.state}, {formData.zip}, {formData.country}
                </p>

                <div className="modal-buttons">
                  <button type="button" onClick={()=> Navigate('/invoices')}>Continue</button>
                </div>
              </div>

            )}
          </div>
        </div>
      )}
    </div>
  );
}
