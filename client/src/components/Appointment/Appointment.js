import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { doctorsList } from '../Doctors/Doctors';
import './Appointment.css';

// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = "Z1FnnOX_5kkn5xVzn"; // Get this from EmailJS Account Settings
const EMAILJS_SERVICE_ID = "service_o8lujaq"; // Get this after adding an email service
const EMAILJS_TEMPLATE_ID = "template_ht91o4u"; // Get this after creating a template
const EMAILJS_CANCEL_TEMPLATE_ID = "template_nqr7o1g"; // Create another template for cancellations

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

export default function Appointment() {
  // States for appointments and form
  const [appointments, setAppointments] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current user info (this should come from your auth context/state)
  const currentUser = {
    id: '123', // This should come from your auth system
    name: 'Manjeet Singh',
    email: 'manjeet@example.com'
  };

  // State for new appointment
  const [newAppointment, setNewAppointment] = useState({
    patientId: currentUser.id,
    patientName: '',
    patientEmail: '', // This will store the user's entered email
    doctor: '',
    visitType: '',
    date: '',
    time: '',
    status: 'Confirmed'
  });

  // Visit types
  const visitTypes = [
    "Urgent",
    "New symptom visit",
    "Annual medicare wellness visit",
    "Follow up visit",
    "Chronic care visit"
  ];

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('clientAppointments');
    if (savedAppointments) {
      // Filter appointments for current user
      const userAppointments = JSON.parse(savedAppointments).filter(
        app => app.patientId === currentUser.id
      );
      setAppointments(userAppointments);
    }
  }, [currentUser.id]);

  // Update filtered appointments when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAppointments(appointments);
      return;
    }
    
    const filtered = appointments.filter(appointment => {
      const searchLower = searchQuery.toLowerCase();
      return (
        appointment.doctor.toLowerCase().includes(searchLower) ||
        appointment.visitType.toLowerCase().includes(searchLower)
      );
    });
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send confirmation email
  const sendConfirmationEmail = async (appointmentDetails) => {
    try {
      console.log('Sending email to:', appointmentDetails.patientEmail); 
      
      const templateParams = {
        to_email: appointmentDetails.patientEmail,
        to_name: appointmentDetails.patientName,
        doctor_name: appointmentDetails.doctor,
        appointment_date: formatDate(appointmentDetails.date),
        appointment_time: appointmentDetails.time,
        visit_type: appointmentDetails.visitType,
        hospital_name: "𝚇𝚎𝚗𝚘 𝙷𝚎𝚊𝚕𝚝𝚑",
        hospital_address: "154, 9, Bannerghatta Rd, opposite IIM, Sahyadri Layout, Panduranga Nagar, Bengaluru, Karnataka 560076",
        hospital_phone: "096633 67253",
        reply_to: "xenohealthcare@gmail.com" 
      };

      console.log('Template params:', templateParams); 
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        console.log('Confirmation email sent successfully to:', appointmentDetails.patientEmail);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      alert('Could not send confirmation email. Please save your appointment details.');
    }
  };

  // Send cancellation email
  const sendCancellationEmail = async (appointmentDetails) => {
    try {
      console.log('Sending cancellation email to:', appointmentDetails.patientEmail); 

      const templateParams = {
        to_email: appointmentDetails.patientEmail,
        to_name: appointmentDetails.patientName,
        doctor_name: appointmentDetails.doctor,
        appointment_date: formatDate(appointmentDetails.date),
        appointment_time: appointmentDetails.time,
        visit_type: appointmentDetails.visitType,
        hospital_name: "𝚇𝚎𝚗𝚘 𝙷𝚎𝚊𝚕𝚝𝚑",
        hospital_address: "154, 9, Bannerghatta Rd, opposite IIM, Sahyadri Layout, Panduranga Nagar, Bengaluru, Karnataka 560076",
        hospital_phone: "096633 67253",
        reply_to: "xenohealthcare@gmail.com" 
      };

      console.log('Cancellation template params:', templateParams); 

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CANCEL_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        console.log('Cancellation email sent successfully to:', appointmentDetails.patientEmail);
      } else {
        throw new Error('Failed to send cancellation email');
      }
    } catch (error) {
      console.error('Error sending cancellation email:', error);
      throw error; // Propagate error to handle it in the calling function
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!newAppointment.patientEmail) {
      alert('Please enter your email address');
      return;
    }

    if (!newAppointment.patientName) {
      alert('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    
    const appointment = {
      id: Date.now(),
      ...newAppointment,
      status: 'Confirmed'
    };
    
    try {
      // Send confirmation email first
      await sendConfirmationEmail(appointment);
      
      // If email sent successfully, save the appointment
      const allAppointments = JSON.parse(localStorage.getItem('clientAppointments') || '[]');
      const updatedAppointments = [...allAppointments, appointment];
      
      localStorage.setItem('clientAppointments', JSON.stringify(updatedAppointments));
      setAppointments(prev => [...prev, appointment]);
      
      // Reset form and close modal
      setNewAppointment({
        patientId: currentUser.id,
        patientName: '',
        patientEmail: '',
        doctor: '',
        visitType: '',
        date: '',
        time: '',
        status: 'Confirmed'
      });
      setShowScheduleForm(false);

      // Show success message
      alert('Appointment scheduled successfully! A confirmation email has been sent to ' + appointment.patientEmail);
    } catch (error) {
      console.error('Error in appointment submission:', error);
      alert('There was an error scheduling your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      // Send cancellation email first
      await sendCancellationEmail(selectedAppointment);

      // If email sent successfully, update appointment status
      const allAppointments = JSON.parse(localStorage.getItem('clientAppointments') || '[]');
      
      const updatedAllAppointments = allAppointments.map(app => 
        app.id === selectedAppointment.id ? { ...app, status: 'Canceled' } : app
      );

      // Update localStorage with all appointments
      localStorage.setItem('clientAppointments', JSON.stringify(updatedAllAppointments));

      // Update state with only user's appointments
      setAppointments(prev => 
        prev.map(app => 
          app.id === selectedAppointment.id ? { ...app, status: 'Canceled' } : app
        )
      );

      // Close confirmation modal
      setShowCancelConfirm(false);
      setSelectedAppointment(null);

      // Show success message
      alert('Appointment has been canceled successfully. A confirmation email has been sent to ' + selectedAppointment.patientEmail);
    } catch (error) {
      console.error('Error in appointment cancellation:', error);
      alert('There was an error canceling your appointment. Please try again.');
    }
  };

  // Check if appointment can be canceled (only confirmed appointments within 24 hours)
  const canCancelAppointment = (appointment) => {
    if (appointment.status !== 'Confirmed') return false;
    
    const appointmentDate = new Date(appointment.date + ' ' + appointment.time);
    const now = new Date();
    const hoursDifference = (appointmentDate - now) / (1000 * 60 * 60);
    
    return hoursDifference > 24;
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Format time for display
  const formatTime = (timeStr) => {
    return timeStr;
  };

  // Handle appointment deletion
  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;

    try {
      // Get all appointments from localStorage
      const allAppointments = JSON.parse(localStorage.getItem('clientAppointments') || '[]');
      
      // Filter out the selected appointment
      const updatedAllAppointments = allAppointments.filter(app => 
        app.id !== selectedAppointment.id
      );

      // Update localStorage with all appointments except the deleted one
      localStorage.setItem('clientAppointments', JSON.stringify(updatedAllAppointments));

      // Update state with filtered appointments
      setAppointments(prev => 
        prev.filter(app => app.id !== selectedAppointment.id)
      );

      // Close confirmation modal
      setShowDeleteConfirm(false);
      setSelectedAppointment(null);

      // Show success message
      alert('Appointment has been deleted successfully.');
    } catch (error) {
      console.error('Error in appointment deletion:', error);
      alert('There was an error deleting your appointment. Please try again.');
    }
  };

  // Handle clearing all appointment data for current user
  const handleClearAllData = () => {
    try {
      // Get all appointments from localStorage
      const allAppointments = JSON.parse(localStorage.getItem('clientAppointments') || '[]');
      
      // Filter out appointments for current user
      const updatedAllAppointments = allAppointments.filter(app => 
        app.patientId !== currentUser.id
      );

      // Update localStorage without current user's appointments
      localStorage.setItem('clientAppointments', JSON.stringify(updatedAllAppointments));

      // Clear appointments state
      setAppointments([]);
      
      // Close confirmation modal
      setShowClearDataConfirm(false);

      // Show success message
      alert('All your appointment records have been cleared successfully.');
    } catch (error) {
      console.error('Error clearing appointment data:', error);
      alert('There was an error clearing your appointment data. Please try again.');
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="schedule-btn"
            onClick={() => setShowScheduleForm(true)}
          >
            Schedule an Appointment
          </button>
          <button 
            className="clear-data-btn"
            onClick={() => setShowClearDataConfirm(true)}
          >
            Clear All Records
          </button>
        </div>
      </div>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Visit Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.visitType}</td>
                <td>{formatDate(appointment.date)}</td>
                <td>{formatTime(appointment.time)}</td>
                <td>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {canCancelAppointment(appointment) && (
                    <button
                      className="cancel-appointment-btn"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowCancelConfirm(true);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Schedule Appointment Modal */}
      {showScheduleForm && (
        <div className="modal-overlay" onClick={() => setShowScheduleForm(false)}>
          <div className="schedule-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Schedule an Appointment</h2>
              <button 
                className="close-btn"
                onClick={() => setShowScheduleForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  ✉️ Email Address
                </label>
                <input
                  type="email"
                  name="patientEmail"
                  value={newAppointment.patientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group name-field">
                <label>
                  👤 Your Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={newAppointment.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  👨‍⚕️ Doctor
                </label>
                <select 
                  name="doctor" 
                  value={newAppointment.doctor} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctorsList.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>{doctor.name} - {doctor.specialization}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  🩺 Visit Type
                </label>
                <select
                  name="visitType"
                  value={newAppointment.visitType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select visit type</option>
                  {visitTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="date-time-container">
                <div className="form-group">
                  <label>
                    📅 Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    🕒 Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowScheduleForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowCancelConfirm(false)}>
          <div className="cancel-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cancel Appointment</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCancelConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to cancel your appointment with {selectedAppointment.doctor} on {formatDate(selectedAppointment.date)} at {formatTime(selectedAppointment.time)}?</p>
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  No, Keep It
                </button>
                <button 
                  className="submit-btn cancel-confirm-btn"
                  onClick={handleCancelAppointment}
                >
                  Yes, Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="cancel-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Appointment</h2>
              <button 
                className="close-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete your completed appointment with {selectedAppointment.doctor} on {formatDate(selectedAppointment.date)} at {formatTime(selectedAppointment.time)}?</p>
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  No, Keep It
                </button>
                <button 
                  className="submit-btn delete-confirm-btn"
                  onClick={handleDeleteAppointment}
                >
                  Yes, Delete Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Data Confirmation Modal */}
      {showClearDataConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearDataConfirm(false)}>
          <div className="cancel-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Clear All Records</h2>
              <button 
                className="close-btn"
                onClick={() => setShowClearDataConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete ALL your appointment records? This action cannot be undone.</p>
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowClearDataConfirm(false)}
                >
                  No, Keep Records
                </button>
                <button 
                  className="submit-btn delete-confirm-btn"
                  onClick={handleClearAllData}
                >
                  Yes, Clear All Records
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
