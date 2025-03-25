import React, { useState } from 'react';
import './Service.css';

export default function Service() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, name: 'Emergency Care', icon: 'fas fa-ambulance', description: '24/7 emergency services for critical patients.' },
    { id: 2, name: 'Outpatient Services', icon: 'fas fa-user-md', description: 'Consultations and treatments without admission.' },
    { id: 3, name: 'Inpatient Services', icon: 'fas fa-procedures', description: 'Hospitalization and continuous care.' },
    { id: 4, name: 'Pharmacy', icon: 'fas fa-pills', description: 'Well-stocked pharmacy with all essential medicines.' },
    { id: 5, name: 'Radiology', icon: 'fas fa-x-ray', description: 'Advanced imaging and diagnostic facilities.' },
    { id: 6, name: 'Laboratory', icon: 'fas fa-vial', description: 'Comprehensive medical testing services.' },
    { id: 7, name: 'Surgical Services', icon: 'fas fa-user-injured', description: 'State-of-the-art operation theatres with advanced surgical care.' },
    { id: 8, name: 'Maternity Care', icon: 'fas fa-baby', description: 'Comprehensive maternal and child healthcare.' },
    { id: 9, name: 'Physiotherapy', icon: 'fas fa-dumbbell', description: 'Rehabilitation and physical therapy services.' },
    { id: 10, name: 'Ambulance Pickup', icon: 'fas fa-truck-medical', description: 'Quick and safe patient transport to the hospital.' }
  ];

  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <i className={service.icon}></i>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button className="view-details" onClick={() => setSelectedService(service)}>View Details</button>
          </div>
        ))}
      </div>
      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedService(null)}>&times;</span>
            <h2>{selectedService.name}</h2>
            <p>{selectedService.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
