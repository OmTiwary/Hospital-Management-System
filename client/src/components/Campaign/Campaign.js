import React, { useState } from 'react';
import './Campaign.css';
import Axios from 'axios';

export default function Campaign() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hospital: '',
    message: '',
  });

  const validate = () => {
    const { name, email, hospital, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      alert('Please enter your name.');
      return false;
    }
    if (!email.trim()) {
      alert('Please enter your email.');
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!hospital.trim()) {
      alert('Please enter your hospital name.');
      return false;
    }
    if (!message.trim()) {
      alert('Please enter your message.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { name, email, hospital, message } = formData;

    Axios.post('http://localhost:5000/data', { name, email, hospital, message })
      .then((res) => {
        console.log(res);
        alert('Thank you for joining our campaign!');
        setShowForm(false);
        setFormData({ name: '', email: '', hospital: '', message: '' });
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!');
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="campaign-container">
      <section className="hero-section">
        <h1>Transform Healthcare with Our Hospital Management System</h1>
        <p>Simplify your operations, enhance patient care, and stay ahead with our all-in-one solution.</p>
        <button className="cta-button" onClick={() => setShowForm(true)}>Get Started Now</button>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {[
            ['Patient Management', 'Seamlessly register, track, and manage patient details.'],
            ['Appointments', 'Easy scheduling with reminders and doctor availability.'],
            ['Billing & Invoices', 'Generate accurate bills and track payments.'],
            ['Inventory Control', 'Manage medical stock with real-time alerts.'],
            ['Reports & Analytics', 'Monitor performance with smart reporting tools.'],
            ['Secure Records', 'Maintain secure, cloud-based patient histories.'],
          ].map(([title, desc], i) => (
            <div className="feature-card" key={i}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <span className="close-button" onClick={() => setShowForm(false)}>&times;</span>
            <h2>Join the Campaign</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="hospital"
                placeholder="Hospital Name"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <footer className="campaign-footer">
        <p>&copy; 2025 Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
