import React from 'react';
import './Modal.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-doctor-profile">
          <div className="modal-doctor-image">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-600nw-2380152965.jpg';
              }}
            />
          </div>
          <div className="modal-doctor-info">
            <h2 className="modal-doctor-name">{doctor.name}</h2>
            <p className="modal-doctor-specialization">{doctor.specialization}</p>
            <p className="modal-doctor-availability">
              <span className="modal-label">Availability:</span> {doctor.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
