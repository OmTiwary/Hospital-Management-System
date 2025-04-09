import React, { useState } from 'react';
import './Remainder.css';

export default function Remainder() {
  const [form30, setForm30] = useState({
    name: '',
    email: '',
    enabled: false,
    message: ''
  });

  const [form5, setForm5] = useState({
    name: '',
    email: '',
    enabled: false,
    message: ''
  });

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (formType === '30') {
      setForm30(prev => ({ ...prev, [name]: val }));
    } else {
      setForm5(prev => ({ ...prev, [name]: val }));
    }
  };

  const validateForm = (formData) => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields.');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = (formData, label) => {
    if (!formData.enabled) {
      alert(`${label} reminder is not enabled.`);
      return;
    }
    if (!validateForm(formData)) return;

    console.log(`${label} Notification Sent:`, formData);
    alert(`${label} notification has been sent successfully!`);
  };

  return (
    <div className="remainder-container">
      <h1 className="remainder-header">
        <i className="fas fa-bell"></i> Appointment Reminders
      </h1>
      <p className="remainder-description">
        Notify patients before their appointments with custom messages.
      </p>

      <div className="reminder-card">
        <h2><i className="fas fa-clock"></i> 30 Minutes Before</h2>

        <div className="form-group">
          <label><i className="fas fa-user"></i> Patient Name</label>
          <input
            type="text"
            className="text-input"
            name="name"
            value={form30.name}
            onChange={(e) => handleChange(e, '30')}
            placeholder="Enter patient's name"
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-envelope"></i> Email Address</label>
          <input
            type="email"
            className="text-input"
            name="email"
            value={form30.email}
            onChange={(e) => handleChange(e, '30')}
            placeholder="Enter patient's email"
          />
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            name="enabled"
            checked={form30.enabled}
            onChange={(e) => handleChange(e, '30')}
          />
          <span>Enable this notification</span>
        </label>

        <label className="msg-label">Custom Message:</label>
        <textarea
          rows="3"
          className="msg-input"
          name="message"
          value={form30.message}
          onChange={(e) => handleChange(e, '30')}
          placeholder="e.g., Your appointment starts in 30 minutes."
        ></textarea>

        <button
          className="save-btn"
          onClick={() => handleSubmit(form30, '30-minute')}
        >
          <i className="fas fa-save"></i> Send Notification
        </button>
      </div>
      <div className="reminder-card">
        <h2><i className="fas fa-stopwatch"></i> 5 Minutes Before</h2>

        <div className="form-group">
          <label><i className="fas fa-user"></i> Patient Name</label>
          <input
            type="text"
            className="text-input"
            name="name"
            value={form5.name}
            onChange={(e) => handleChange(e, '5')}
            placeholder="Enter patient's name"
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-envelope"></i> Email Address</label>
          <input
            type="email"
            className="text-input"
            name="email"
            value={form5.email}
            onChange={(e) => handleChange(e, '5')}
            placeholder="Enter patient's email"
          />
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            name="enabled"
            checked={form5.enabled}
            onChange={(e) => handleChange(e, '5')}
          />
          <span>Enable this notification</span>
        </label>

        <label className="msg-label">Custom Message:</label>
        <textarea
          rows="3"
          className="msg-input"
          name="message"
          value={form5.message}
          onChange={(e) => handleChange(e, '5')}
          placeholder="e.g., Your appointment begins in 5 minutes."
        ></textarea>

        <button
          className="save-btn"
          onClick={() => handleSubmit(form5, '5-minute')}
        >
          <i className="fas fa-save"></i> Send Notification
        </button>
      </div>
    </div>
  );
}
