import React, { useState } from 'react';
import { FaSearch, FaAmbulance } from 'react-icons/fa';
import './Doctors.css';
import Modal from '../Doctors/Modal';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctorsList = [
    { id: 1, name: "Dr. M.J. Mical", specialization: "Health Checkup", availability: "Mon-Fri, 9AM-5PM", image: '/images/mj-mical.jpg' },
    { id: 2, name: "Dr. Sanath Deo", specialization: "Health Checkup", availability: "Mon-Wed, 10AM-4PM", image: '/images/sanath-deo.jpg' },
    { id: 3, name: "Dr. Lokara Phanj", specialization: "Pediatrics", availability: "Tue-Sat, 8AM-2PM", image: '/images/lokara-phanj.jpg' },
    { id: 4, name: "Dr. Komola Haris", specialization: "Common Cold", availability: "Mon-Fri, 11AM-7PM", image: '/images/komola-haris.jpg' },
    { id: 5, name: "Dr. Maria Sarafat", specialization: "Cardiology", availability: "Wed-Sun, 9AM-6PM", image: '/images/maria-sarafat.jpg' },
    { id: 6, name: "Dr. Jhon Deo", specialization: "Orthopedics", availability: "Mon-Fri, 8AM-4PM", image: '/images/jhon-deo.jpg' }
  ];

  const emergencyDoctors = [
    { id: 1, name: "Dr. Adam Scott", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
    { id: 2, name: "Dr. Emma Watson", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
    { id: 3, name: "Dr. Robert Chase", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
    { id: 4, name: "Dr. Sarah Connor", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
    { id: 5, name: "Dr. Tom Shelby", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
    { id: 6, name: "Dr. Amy Pond", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' }
  ];

  const filteredDoctors = doctorsList.filter(
    doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleSchedule = (doctor) => {
    alert(`
      📅 Schedule for ${doctor.name}:
      🕒 Availability: ${doctor.availability}
    `);
  };

  return (
    <div className="dashboard">
      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="doctor-cards">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
              </div>
            </div>
            <div className="doctor-details">
              <p className="doctor-availability">
                Availability: {doctor.availability}
              </p>
              <div className="doctor-actions">
                <button className="profile-button" onClick={() => handleViewProfile(doctor)}>View Profile</button>
                <button className="schedule-button" onClick={() => handleSchedule(doctor)}>Schedule</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="emergency-title">Emergency Doctors</h2>
      <div className="doctor-cards">
        {emergencyDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card emergency-card">
            <FaAmbulance className="emergency-icon" />
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialization">{doctor.specialization}</p>
              <p className="doctor-availability">
                Availability: {doctor.availability}
              </p>
              <button className="profile-button mt-2" onClick={() => handleViewProfile(doctor)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        doctor={selectedDoctor} 
      />

      <footer className="footer">
        © {new Date().getFullYear()} All Rights Reserved. Powered by Abhishek Kumar.
      </footer>
    </div>
  );
};

export default Doctors;
