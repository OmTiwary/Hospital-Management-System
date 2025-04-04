import React, { useState } from 'react';
import { FaSearch, FaAmbulance } from 'react-icons/fa';
import './Doctors.css';
import Modal from '../Doctors/Modal';

// Export doctors list to be used in other components
export const doctorsList = [
  { id: 1, name: "Dr. Rajesh Malhotra", specialization: "Health Checkup", availability: "Mon-Fri, 9AM-5PM", image: "https://img.freepik.com/free-photo/young-doctor-with-stethoscope-white-background_1157-36569.jpg" },
  { id: 2, name: "Dr. Anjali Verma", specialization: "Health Checkup", availability: "Mon-Wed, 10AM-4PM", image: '/images/anjali-verma.jpg' },
  { id: 3, name: "Dr. Vikram Choudhary", specialization: "Pediatrics", availability: "Tue-Sat, 8AM-2PM", image: '/images/vikram-choudhary.jpg' },
  { id: 4, name: "Dr. Sneha Kapoor", specialization: "Common Cold", availability: "Mon-Fri, 11AM-7PM", image: '/images/sneha-kapoor.jpg' },
  { id: 5, name: "Dr. Manoj Tiwari", specialization: "Cardiology", availability: "Wed-Sun, 9AM-6PM", image: '/images/manoj-tiwari.jpg' },
  { id: 6, name: "Dr. Priya Nair", specialization: "Orthopedics", availability: "Mon-Fri, 8AM-4PM", image: '/images/priya-nair.jpg' },
  { id: 7, name: "Dr. Arjun Deshmukh", specialization: "Neurology", availability: "Tue-Sat, 7AM-3PM", image: '/images/arjun-deshmukh.jpg' },
  { id: 8, name: "Dr. Pooja Mehta", specialization: "Dermatology", availability: "Mon-Fri, 10AM-6PM", image: '/images/pooja-mehta.jpg' },
  { id: 9, name: "Dr. Kiran Joshi", specialization: "ENT", availability: "Wed-Sun, 9AM-4PM", image: '/images/kiran-joshi.jpg' },
  { id: 10, name: "Dr. Ramesh Iyer", specialization: "Gastroenterology", availability: "Mon-Fri, 8AM-2PM", image: '/images/ramesh-iyer.jpg' },
  { id: 11, name: "Dr. Neha Sharma", specialization: "General Medicine", availability: "Mon-Fri, 9AM-5PM", image: '/images/neha-sharma.jpg' },
  { id: 12, name: "Dr. Aditya Rao", specialization: "Psychiatry", availability: "Tue-Sat, 10AM-4PM", image: '/images/aditya-rao.jpg' },
  { id: 13, name: "Dr. Meenakshi Pillai", specialization: "Gynaecology", availability: "Mon-Wed, 9AM-6PM", image: '/images/meenakshi-pillai.jpg' },
  { id: 14, name: "Dr. Sanjay Sinha", specialization: "Nephrology", availability: "Wed-Sun, 8AM-2PM", image: '/images/sanjay-sinha.jpg' },
  { id: 15, name: "Dr. Ritu Agrawal", specialization: "Pulmonology", availability: "Mon-Fri, 10AM-7PM", image: '/images/ritu-agrawal.jpg' },
  { id: 16, name: "Dr. Anil Bansal", specialization: "Endocrinology", availability: "Tue-Sat, 8AM-4PM", image: '/images/anil-bansal.jpg' },
  { id: 17, name: "Dr. Kavita Reddy", specialization: "Oncology", availability: "Mon-Fri, 9AM-5PM", image: '/images/kavita-reddy.jpg' },
  { id: 18, name: "Dr. Suresh Patel", specialization: "Radiology", availability: "Wed-Sun, 8AM-3PM", image: '/images/suresh-patel.jpg' },
  { id: 19, name: "Dr. Deepak Das", specialization: "Hematology", availability: "Mon-Fri, 9AM-4PM", image: '/images/deepak-das.jpg' },
  { id: 20, name: "Dr. Swati Saxena", specialization: "Urology", availability: "Tue-Sat, 10AM-6PM", image: '/images/swati-saxena.jpg' },
  { id: 21, name: "Dr. Rohan Menon", specialization: "Cardiothoracic Surgery", availability: "Mon-Fri, 8AM-4PM", image: '/images/rohan-menon.jpg' },
  { id: 22, name: "Dr. Varsha Prasad", specialization: "Geriatrics", availability: "Wed-Sun, 9AM-5PM", image: '/images/varsha-prasad.jpg' },
  { id: 23, name: "Dr. Amit Mishra", specialization: "Rheumatology", availability: "Mon-Fri, 10AM-3PM", image: '/images/amit-mishra.jpg' },
  { id: 24, name: "Dr. Seema Dutta", specialization: "Ophthalmology", availability: "Tue-Sat, 7AM-2PM", image: '/images/seema-dutta.jpg' },
  { id: 25, name: "Dr. Nitin Kapoor", specialization: "Plastic Surgery", availability: "Mon-Fri, 10AM-6PM", image: '/images/nitin-kapoor.jpg' },
  { id: 26, name: "Dr. Alok Pandey", specialization: "Dentistry", availability: "Wed-Sun, 8AM-4PM", image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg" },
  { id: 27, name: "Dr. Tanya Srivastava", specialization: "Neurology", availability: "Mon-Fri, 9AM-5PM", image: '/images/tanya-srivastava.jpg' },
  { id: 28, name: "Dr. Sunil Rathi", specialization: "Neurosurgery", availability: "Tue-Sat, 8AM-2PM", image: '/images/sunil-rathi.jpg' },
  { id: 29, name: "Dr. Radha Joshi", specialization: "Psychology", availability: "Mon-Wed, 10AM-5PM", image: '/images/radha-joshi.jpg' },
  { id: 30, name: "Dr. Keshav Agarwal", specialization: "Neonatology", availability: "Wed-Sun, 9AM-6PM", image: '/images/keshav-agarwal.jpg' },
];

// Export emergency doctors list
export const emergencyDoctorsList = [
  { id: 1, name: "Dr. Adam Scott", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
  { id: 2, name: "Dr. Emma Watson", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
  { id: 3, name: "Dr. Robert Chase", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
  { id: 4, name: "Dr. Sarah Connor", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
  { id: 5, name: "Dr. Tom Shelby", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' },
  { id: 6, name: "Dr. Amy Pond", specialization: "Emergency", availability: "24/7", image: '/images/default-doctor.jpg' }
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Use the exported doctorsList instead of redefining it here
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
    <div className="doctors-container">
      <div className="doctors-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="action-buttons">
          {/* Add any action buttons here if needed */}
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
        {emergencyDoctorsList.map(doctor => (
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
