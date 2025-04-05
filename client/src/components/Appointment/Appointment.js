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
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Get current user info (this should come from your auth context/state)
  const currentUser = {
    id: '123', // This should come from your auth system
    name: 'Manjeet Singh',
    email: 'manjeet@example.com'
  };

  // State for new appointment
  const [newAppointment, setNewAppointment] = useState({
    patientId: currentUser.id,
    patientName: currentUser.name,
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
        hospital_address: "371, ɢᴜʀᴜ ʜᴀʀɢᴏʙɪɴᴅ ɴᴀɢᴀʀ, ᴘʜᴀɢᴡᴀʀᴀ, ᴘᴜɴᴊᴀʙ 144401",
        hospital_phone: "0182 426 0066",
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
        hospital_address: "371, ɢᴜʀᴜ ʜᴀʀɢᴏʙɪɴᴅ ɴᴀɢᴀʀ, ᴘʜᴀɢᴡᴀʀᴀ, ᴘᴜɴᴊᴀʙ 144401",
        hospital_phone: "0182 426 0066",
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
    
    if (!newAppointment.patientEmail) {
      alert('Please enter your email address');
      return;
    }

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
        patientName: currentUser.name,
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
                <label>Email Address</label>
                <input
                  type="email"
                  name="patientEmail"
                  value={newAppointment.patientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Doctor</label>
                <select 
                  name="doctor" 
                  value={newAppointment.doctor} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                >
                  <option value="">Select doctor</option>
                  {doctorsList.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>{doctor.name} - {doctor.specialization}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Visit Type</label>
                <select
                  name="visitType"
                  value={newAppointment.visitType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select visit type...</option>
                  {visitTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
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
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowScheduleForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Schedule Appointment
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
    </div>
  );
}
