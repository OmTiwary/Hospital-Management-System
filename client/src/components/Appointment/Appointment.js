import React, { useState, useEffect } from 'react';
import './Appointment.css';
// Import doctorsList from Doctors component
import { doctorsList } from '../Doctors/Doctors';

export default function Appointment() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('grid'); // 'grid', 'week', 'day'
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    date: new Date(), // keeping for backward compatibility
    startTime: '09:00',
    endTime: '10:00',
    purpose: '',
    doctor: '',
    status: '',
    description: '',
    shareVia: {
      email: true,
      sms: true,
      whatsapp: false
    }
  });
  const [selectedDay, setSelectedDay] = useState(new Date());
  // List of available doctors
  const [doctors, setDoctors] = useState([]);
  
  // List of purpose options
  const purposeOptions = [
    "Checkup",
    "Root Canal",
    "Cleaning",
    "Surgery",
    "Consultation",
    "Follow-up",
    "X-Ray",
    "Dental Implant",
    "Tooth Extraction",
    "Teeth Whitening"
  ];
  
  // Sample data for appointments
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  
  // Load appointments from localStorage on component mount
  useEffect(() => {
    // Try to get appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    
    if (savedAppointments) {
      // If appointments exist in localStorage, parse and convert date strings back to Date objects
      const parsedAppointments = JSON.parse(savedAppointments);
      
      // Convert string dates back to Date objects
      const appointmentsWithDates = parsedAppointments.map(appointment => ({
        ...appointment,
        date: new Date(appointment.date)
      }));
      
      // Set the appointments state
      setAppointments(appointmentsWithDates);
    } else {
      // If no saved appointments exist, use the sample data
      const sampleAppointments = [
        { 
          id: 1, 
          name: 'Manjeet Singh', 
          date: new Date(2025, 6, 14), 
          startTime: '07:00', 
          endTime: '09:00', 
          purpose: 'x-ray',
          doctor: 'Abhishek Kr',
          status: 'Confirmed',
          description: 'He is not sure about the time',
          shareVia: {
            email: true,
            sms: true,
            whatsapp: false
          },
          more: 2 
        },
        
      ];
      
      setAppointments(sampleAppointments);
      // Save the sample data to localStorage for future visits
      localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
    }

    // Fetch doctors list
    if (Array.isArray(doctorsList)) {
      setDoctors(doctorsList.map(doctor => ({
        id: doctor.id,
        name: doctor.name
      })));
    }
  }, []);
  
  // Save appointments to localStorage whenever they change
  useEffect(() => {
    if (appointments.length > 0) {
      // Need to convert Date objects to strings before saving to localStorage
      const appointmentsToSave = appointments.map(appointment => ({
        ...appointment,
        date: appointment.date.toISOString() // Convert Date to ISO string for storage
      }));
      localStorage.setItem('appointments', JSON.stringify(appointmentsToSave));
    }
  }, [appointments]);
  
  // Navigate to previous period (month or week)
  const prevPeriod = () => {
    if (view === 'grid') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(selectedDay);
      newDate.setDate(newDate.getDate() - 1);
      setSelectedDay(newDate);
    }
  };

  // Navigate to next period (month or week)
  const nextPeriod = () => {
    if (view === 'grid') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(selectedDay);
      newDate.setDate(newDate.getDate() + 1);
      setSelectedDay(newDate);
    }
  };

  // Format month and year
  const formatCurrentPeriod = () => {
    if (view === 'grid') {
      return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      // Get the week start and end dates
      const weekStart = getWeekStartDate(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      // Format as "July 2023"
      return weekStart.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (view === 'day') {
      // Format as "July 14, 2023"
      return selectedDay.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return '';
  };

  // Get the start date of the week (Sunday)
  const getWeekStartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday
    d.setDate(d.getDate() - day); // Go to the beginning of the week
    return d;
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Add days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1),
        isCurrentMonth: false,
        day: prevMonthDays - firstDay + i + 1
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        day: i
      });
    }
    
    // Add days from next month
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        day: i
      });
    }
    
    return days;
  };

  // Get appointment for a day
  const getAppointmentsForDay = (date) => {
    return filteredAppointments.filter(a => 
      a.date.getDate() === date.getDate() && 
      a.date.getMonth() === date.getMonth() && 
      a.date.getFullYear() === date.getFullYear()
    );
  };

  // Format to double digits
  const formatDay = (day) => {
    return day < 10 ? `0${day}` : day;
  };

  // Get week days
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days of the week for the week view
  const getWeekDays = () => {
    const weekStart = getWeekStartDate(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      days.push({
        date,
        dayName: weekDays[i],
        dayNumber: date.getDate()
      });
    }
    
    return days;
  };

  // Get time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? 'am' : 'pm';
      slots.push({
        time: `${displayHour}:00 ${period}`,
        hour
      });
    }
    return slots;
  };

  // Get appointments for a specific day and hour
  const getAppointmentsForTimeSlot = (date, hour) => {
    const formattedHour = hour.toString().padStart(2, '0');
    return filteredAppointments.filter(a => {
      const appointmentDate = new Date(a.date);
      const appointmentStartHour = parseInt(a.startTime.split(':')[0]);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear() &&
        appointmentStartHour === hour
      );
    });
  };

  // Set to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date());
  };

  // Handle appointment form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle share options change
  const handleShareChange = (option) => {
    setNewAppointment(prev => ({
      ...prev,
      shareVia: {
        ...prev.shareVia,
        [option]: !prev.shareVia[option]
      }
    }));
  };

  // Format date for display in form
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for display (MM/DD/YYYY)
  const formatDateDisplay = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Handle form submit to add new appointment
  const handleAddAppointment = (e) => {
    e.preventDefault();
    
    // Create a new appointment
    const startDateObj = new Date(newAppointment.startDate);
    const endDateObj = new Date(newAppointment.endDate);
    const appointment = {
      id: Date.now(), // Use timestamp as unique ID for reliability
      name: newAppointment.name,
      startDate: startDateObj,
      endDate: endDateObj,
      date: startDateObj, // keeping for backward compatibility
      startTime: newAppointment.startTime,
      endTime: newAppointment.endTime,
      purpose: newAppointment.purpose,
      doctor: newAppointment.doctor,
      status: newAppointment.status,
      description: newAppointment.description,
      shareVia: newAppointment.shareVia
    };
    
    // Add to appointments
    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Reset form and close it
    resetForm();
    setShowAddForm(false);
  };

  // Handle editing an appointment
  const handleEditAppointment = (e) => {
    e.preventDefault();
    
    // Update the appointment
    const updatedAppointments = appointments.map(app => 
      app.id === selectedAppointment.id 
        ? { ...app, 
            name: newAppointment.name,
            startDate: new Date(newAppointment.startDate),
            endDate: new Date(newAppointment.endDate),
            date: new Date(newAppointment.startDate), // keeping for backward compatibility
            startTime: newAppointment.startTime,
            endTime: newAppointment.endTime,
            purpose: newAppointment.purpose,
            doctor: newAppointment.doctor,
            status: newAppointment.status,
            description: newAppointment.description,
            shareVia: newAppointment.shareVia
          } 
        : app
    );
    
    setAppointments(updatedAppointments);
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Reset form and close it
    resetForm();
    setShowEditForm(false);
    setSelectedAppointment(null);
  };

  // Delete an appointment
  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updatedAppointments = appointments.filter(app => app.id !== id);
      setAppointments(updatedAppointments);
      // No need to explicitly save to localStorage here, as the useEffect will handle it
    }
  };

  // Open edit modal
  const openEditModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      name: appointment.name,
      startDate: appointment.startDate || appointment.date,
      endDate: appointment.endDate || appointment.date,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      purpose: appointment.purpose,
      doctor: appointment.doctor,
      status: appointment.status,
      description: appointment.description,
      shareVia: appointment.shareVia
    });
    setShowEditForm(true);
  };

  // Reset form
  const resetForm = () => {
    setNewAppointment({
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      purpose: '',
      doctor: '',
      status: '',
      description: '',
      shareVia: {
        email: true,
        sms: true,
        whatsapp: false
      }
    });
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  // Format time 24h to 12h for display
  const formatTime = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Get appointments for the selected day in day view
  const getAppointmentsForSelectedDay = () => {
    return filteredAppointments.filter(a => {
      const appDate = new Date(a.date);
      return appDate.getDate() === selectedDay.getDate() && 
             appDate.getMonth() === selectedDay.getMonth() && 
             appDate.getFullYear() === selectedDay.getFullYear();
    }).sort((a, b) => {
      // Sort by start time
      return a.startTime.localeCompare(b.startTime);
    });
  };

  // Format day of week
  const formatDayOfWeek = (date) => {
    return date.toLocaleString('default', { weekday: 'long' });
  };

  // Function to handle clicking on a day in month view
  const handleDayClick = (date) => {
    setSelectedDay(date);
    setView('day');
  };

  // Initialize filteredAppointments with all appointments
  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  // Add search filter functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAppointments(appointments);
      return;
    }
    
    const filtered = appointments.filter(appointment => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (appointment.name && appointment.name.toLowerCase().includes(searchLower)) ||
        (appointment.doctor && appointment.doctor.toLowerCase().includes(searchLower)) ||
        (appointment.purpose && appointment.purpose.toLowerCase().includes(searchLower))
      );
    });
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  // Add search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search appointments by patient, doctor or purpose..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="user-profile">
          <div className="notifications">
            <span className="notification-icon">
              <i className="fas fa-bell"></i>
            </span>
            <span className="notification-badge">3</span>
          </div>
          <div className="profile">
            <div className="profile-image">
              <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Dr. John Smith" />
            </div>
            <div className="profile-info">
              <div className="profile-name">Dr. John Smith</div>
              <div className="profile-specialty">Dental Surgeon</div>
            </div>
          </div>
        </div>
      </div>
      
      <h1 className="appointments-title">Appointments</h1>
      
      <div className="calendar-controls">
        <div className="left-controls">
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        
        <div className="month-navigation">
          <button className="nav-btn prev" onClick={prevPeriod}><i className="fas fa-chevron-left"></i></button>
          <div className="current-month">{formatCurrentPeriod()}</div>
          <button className="nav-btn next" onClick={nextPeriod}><i className="fas fa-chevron-right"></i></button>
        </div>
        
        <div className="view-options">
          <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>
            <i className="fas fa-th"></i>
          </button>
          <button className={`view-btn ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')}>
            <i className="far fa-calendar-alt"></i>
          </button>
          <button className={`view-btn ${view === 'day' ? 'active' : ''}`} onClick={() => setView('day')}>
            <i className="far fa-clock"></i>
          </button>
        </div>
      </div>
      
      {view === 'grid' && (
        <div className="calendar-grid">
          <div className="weekdays">
            {weekDays.map((day, index) => (
              <div key={index} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="days">
            {getDaysInMonth(currentDate).map((dayInfo, index) => {
              const dayAppointments = getAppointmentsForDay(dayInfo.date);
              return (
                <div 
                  key={index} 
                  className={`day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${isToday(dayInfo.date) ? 'today' : ''}`}
                  onClick={() => handleDayClick(dayInfo.date)}
                >
                  <div className="day-number">{formatDay(dayInfo.day)}</div>
                  {dayAppointments.length > 0 && (
                    <div className="day-appointments">
                      <div 
                        className="appointment-preview"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(dayAppointments[0]);
                        }}
                      >
                        <div className="appointment-item">{dayAppointments[0].name}</div>
                      </div>
                      {dayAppointments.length > 1 && (
                        <div className="more-appointments">+{dayAppointments.length - 1} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="week-view">
          <div className="week-header">
            <div className="time-column-header"></div>
            {getWeekDays().map((day, index) => (
              <div 
                key={index} 
                className={`day-column-header ${isToday(day.date) ? 'today' : ''}`}
              >
                <div className="day-name">{day.dayNumber} {day.dayName}</div>
              </div>
            ))}
          </div>
          
          <div className="week-body">
            {getTimeSlots().map((slot, slotIndex) => (
              <div key={slotIndex} className="time-row">
                <div className="time-label">{slot.time}</div>
                {getWeekDays().map((day, dayIndex) => {
                  const appts = getAppointmentsForTimeSlot(day.date, slot.hour);
                  return (
                    <div key={dayIndex} className="day-slot">
                      {appts.map((appt, apptIndex) => (
                        <div 
                          key={apptIndex} 
                          className="week-appointment" 
                          onClick={() => openEditModal(appt)}
                        >
                          <div className="time-range">
                            {formatTime(appt.startTime)} - {formatTime(appt.endTime)}
                          </div>
                          <div className="patient-name">{appt.name}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {view === 'day' && (
        <div className="day-view">
          <div className="day-view-header">
            <h3>{formatDayOfWeek(selectedDay)}</h3>
            <p className="day-date">{selectedDay.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="day-view-content">
            <div className="time-slots">
              {getTimeSlots().map((slot, slotIndex) => {
                const timeAppts = appointments.filter(a => {
                  const appointmentDate = new Date(a.date);
                  const appointmentStartHour = parseInt(a.startTime.split(':')[0]);
                  return (
                    appointmentDate.getDate() === selectedDay.getDate() &&
                    appointmentDate.getMonth() === selectedDay.getMonth() &&
                    appointmentDate.getFullYear() === selectedDay.getFullYear() &&
                    appointmentStartHour === slot.hour
                  );
                });
                
                return (
                  <div key={slotIndex} className="day-time-slot">
                    <div className="time-slot-label">{slot.time}</div>
                    <div className="time-slot-content">
                      {timeAppts.map((appt, apptIndex) => (
                        <div 
                          key={apptIndex} 
                          className="day-appointment" 
                          onClick={() => openEditModal(appt)}
                        >
                          <div className="time-range">
                            {formatTime(appt.startTime)} - {formatTime(appt.endTime)}
                          </div>
                          <div className="patient-name">{appt.name}</div>
                          <div className="appointment-purpose">{appt.purpose}</div>
                          <div className="appointment-doctor">{appt.doctor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <button className="add-appointment-btn" onClick={() => setShowAddForm(true)}>
        <i className="fas fa-plus"></i>
      </button>

      {showAddForm && (
        <div className="add-appointment-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Appointment</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddAppointment}>
              <div className="form-group">
                <label>Patient Name</label>
                <div className="input-with-add">
                  <input 
                    type="text" 
                    name="name" 
                    value={newAppointment.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Select Patient and patient name will appear here"
                  />
                  <button type="button" className="add-btn">+ Add</button>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Purpose of visit</label>
                  <select 
                    name="purpose" 
                    value={newAppointment.purpose} 
                    onChange={handleInputChange}
                    className="dropdown-select"
                    placeholder="Select service.."
                  >
                    <option value="">Select service..</option>
                    {purposeOptions.map((purpose, index) => (
                      <option key={index} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formatDateForInput(newAppointment.startDate || newAppointment.date)}
                    onChange={handleInputChange}
                    min={formatDateForInput(new Date())}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    name="endDate" 
                    value={formatDateForInput(newAppointment.endDate || newAppointment.date)}
                    onChange={handleInputChange}
                    min={formatDateForInput(newAppointment.startDate || new Date())}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start time</label>
                  <input 
                    type="time" 
                    name="startTime" 
                    value={newAppointment.startTime}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>End time</label>
                  <input 
                    type="time" 
                    name="endTime" 
                    value={newAppointment.endTime}
                    onChange={handleInputChange} 
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
                    {doctors && doctors.length > 0 ? (
                      doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                      ))
                    ) : (
                      // Fallback options if doctors list is not available
                      <>
                        <option value="Hugo Lloris">Hugo Lloris</option>
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Dr. Johnson">Dr. Johnson</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={newAppointment.status} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                >
                  <option value="">Status...</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={newAppointment.description} 
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="She will be coming for a checkup...."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Share with patient via</label>
                <div className="share-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.email} 
                      onChange={() => handleShareChange('email')} 
                    />
                    <span className="checkbox-text">Email</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.sms} 
                      onChange={() => handleShareChange('sms')} 
                    />
                    <span className="checkbox-text">SMS</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.whatsapp} 
                      onChange={() => handleShareChange('whatsapp')} 
                    />
                    <span className="checkbox-text">WhatsApp</span>
                  </label>
                </div>
              </div>
              
              <div className="form-buttons edit-buttons">
                <button type="button" className="discard-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  Save <i className="fas fa-check-circle"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditForm && selectedAppointment && (
        <div className="edit-appointment-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Appointment</h2>
              <button className="close-btn" onClick={() => {
                setShowEditForm(false);
                setSelectedAppointment(null);
              }}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleEditAppointment}>
              <div className="form-group">
                <label>Patient Name</label>
                <div className="input-with-add">
                  <input 
                    type="text" 
                    name="name" 
                    value={newAppointment.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="John Doe"
                  />
                  <button type="button" className="add-btn">+ Add</button>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Purpose of visit</label>
                  <select 
                    name="purpose" 
                    value={newAppointment.purpose} 
                    onChange={handleInputChange}
                    className="dropdown-select"
                  >
                    <option value="">Select purpose</option>
                    {purposeOptions.map((purpose, index) => (
                      <option key={index} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formatDateForInput(newAppointment.startDate || newAppointment.date)}
                    onChange={handleInputChange}
                    min={formatDateForInput(new Date())}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    name="endDate" 
                    value={formatDateForInput(newAppointment.endDate || newAppointment.date)}
                    onChange={handleInputChange}
                    min={formatDateForInput(newAppointment.startDate || new Date())}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start time</label>
                  <input 
                    type="time" 
                    name="startTime" 
                    value={newAppointment.startTime}
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>End time</label>
                  <input 
                    type="time" 
                    name="endTime" 
                    value={newAppointment.endTime}
                    onChange={handleInputChange} 
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
                    {doctors && doctors.length > 0 ? (
                      doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                      ))
                    ) : (
                      // Fallback options if doctors list is not available
                      <>
                        <option value="Hugo Lloris">Hugo Lloris</option>
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Dr. Johnson">Dr. Johnson</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={newAppointment.status} 
                  onChange={handleInputChange}
                  className="dropdown-select"
                >
                  <option value="">Status...</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={newAppointment.description} 
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="He is not sure about the time"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Share with patient via</label>
                <div className="share-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.email} 
                      onChange={() => handleShareChange('email')} 
                    />
                    <span className="checkbox-text">Email</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.sms} 
                      onChange={() => handleShareChange('sms')} 
                    />
                    <span className="checkbox-text">SMS</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={newAppointment.shareVia.whatsapp} 
                      onChange={() => handleShareChange('whatsapp')} 
                    />
                    <span className="checkbox-text">WhatsApp</span>
                  </label>
                </div>
              </div>
              
              <div className="form-buttons edit-buttons">
                <div className="left-buttons">
                  <button 
                    type="button" 
                    className="delete-btn" 
                    onClick={() => {
                      handleDeleteAppointment(selectedAppointment.id);
                      setShowEditForm(false);
                      setSelectedAppointment(null);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                  <button 
                    type="button" 
                    className="discard-btn" 
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedAppointment(null);
                    }}
                  >
                    Discard
                  </button>
                </div>
                <button type="submit" className="save-btn">
                  Save <i className="fas fa-check-circle"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
