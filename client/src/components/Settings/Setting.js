import React from 'react';
import './Setting.css';

export default function Setting() {
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
          <div key={option.id} className={`setting-item ${option.valid ? 'active' : 'disabled'}`}>
            <i className={option.icon}></i>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
