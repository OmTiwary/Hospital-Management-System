import React, { useState, useEffect } from 'react';
import { FiUpload, FiSearch, FiDownload, FiEye, FiTrash2, FiMoreVertical, FiX, FiEdit2, FiClock, FiCalendar, FiBarChart2, FiCheck, FiAlertCircle, FiPrinter } from 'react-icons/fi';
import './Reception.css';

export default function Reception() {
  // Add state for celebration animation
  const [showCelebration, setShowCelebration] = useState(true);

  // Set up effect to hide celebration after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 4000); // Hide after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  // =============== Initial Data Setup ===============

  // Sample data for receptionists
  const initialReceptionists = [
    {
      id: 1,
      name: 'Manjeet Singh',
      title: 'Dr.',
      email: 'manjet@gmail.com',
      phone: '+91 9905350850',
      createdAt: '25 Mar, 2025',
      profileImage: '/manjeet.jpg',
      permissions: {
        patient: { read: true, edit: true, create: true, delete: false },
        appointment: { read: true, edit: true, create: true, delete: true },
        invoices: { read: true, edit: false, create: false, delete: false },
        payments: { read: true, edit: false, create: false, delete: false }
      }
    },
    {
      id: 2,
      name: 'Sonu',
      title: 'Dr.',
      email: 'sonu@gmail.com',
      phone: '86407464788',
      createdAt: '1 jun, 2025',
      profileImage: '/sonu.jpg',
      permissions: {
        patient: { read: true, edit: false, create: false, delete: false },
        appointment: { read: true, edit: true, create: true, delete: false },
        invoices: { read: true, edit: false, create: false, delete: false },
        payments: { read: true, edit: false, create: false, delete: false }
      }
    },
    {
      id: 3,
      name: 'Sonu',
      title: 'Dr.',
      email: 'sonu@gmail.com',
      phone: '86407464788',
      createdAt: '1 jun, 2025',
      profileImage: '/sonu.jpg',
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoices: { read: false, edit: false, create: false, delete: false },
        payments: { read: false, edit: false, create: false, delete: false }
      }
    },
    {
      id: 4,
      name: 'Sonu',
      title: 'Dr.',
      email: 'sonu@gmail.com',
      phone: '86407464788',
      createdAt: '1 jun, 2025',
      profileImage: '/sonu.jpg',
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoices: { read: false, edit: false, create: false, delete: false },
        payments: { read: false, edit: false, create: false, delete: false }
      }
    },
    {
      id: 5,
      name: 'Sonu',
      title: 'Dr.',
      email: 'sonu@gmail.com',
      phone: '86407464788',
      createdAt: '1 jun, 2025',
      profileImage: '/sonu.jpg',
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoices: { read: false, edit: false, create: false, delete: false },
        payments: { read: false, edit: false, create: false, delete: false }
      }
    },
    {
      id: 6,
      name: 'Sonu',
      title: 'Dr.',
      email: 'sonu@gmail.com',
      phone: '86407464788',
      createdAt: '1 jun, 2025',
      profileImage: '/sonu.jpg',
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoices: { read: false, edit: false, create: false, delete: false },
        payments: { read: false, edit: false, create: false, delete: false }
      }
    }
  ];

  // =============== State Management ===============

  // Notification state - declare earlier to avoid reference errors
  const [notification, setNotification] = useState(null);

  // Main receptionists data state with localStorage
  const [receptionists, setReceptionists] = useState(() => {
    const savedData = localStorage.getItem('receptionists');
    return savedData ? JSON.parse(savedData) : initialReceptionists;
  });
  
  // UI state management 
  const [showAddModal, setShowAddModal] = useState(false);        // Controls Add Staff modal
  const [showViewModal, setShowViewModal] = useState(false);      // Controls View Staff modal
  const [searchQuery, setSearchQuery] = useState('');            // Search input value
  const [showActionMenu, setShowActionMenu] = useState(null);    // Controls action menu for each row
  const [editMode, setEditMode] = useState(false);               // Controls edit mode in View modal
  
  // Selected receptionist states
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);  // Currently viewed receptionist
  const [editedReceptionist, setEditedReceptionist] = useState(null);     // Edited receptionist data
  
  // Form default values
  const [newReceptionist, setNewReceptionist] = useState({
    name: '',
    title: 'Dr.',
    email: '',
    phone: '',
    password: '',
    profileImage: null,
    permissions: {
      patient: { read: false, edit: false, create: false, delete: false },
      appointment: { read: false, edit: false, create: false, delete: false },
      invoices: { read: false, edit: false, create: false, delete: false },
      payments: { read: false, edit: false, create: false, delete: false }
    }
  });
  
  // States for attendance and shifts
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  
  // Declare shift data state
  const [shiftData, setShiftData] = useState(() => {
    const savedShifts = localStorage.getItem('receptionistShifts');
    return savedShifts ? JSON.parse(savedShifts) : {};
  });
  
  // State for selected shift receptionist - declare after notification state
  const [selectedShiftReceptionist, setSelectedShiftReceptionist] = useState(null);
  
  // Add state for print view
  const [showPrintView, setShowPrintView] = useState(false);
  
  // =============== Effects ===============
  
  // Save receptionists data to localStorage
  useEffect(() => {
    localStorage.setItem('receptionists', JSON.stringify(receptionists));
  }, [receptionists]);
  
  // Save shift data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('receptionistShifts', JSON.stringify(shiftData));
  }, [shiftData]);

  // ===============  Ab yaha ek event handler craete kiye hai  jisme profile img upload kr skte hai ===============
  //Event Handlers 
  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReceptionist({ ...newReceptionist, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // aur Handle adding new receptionist
  const handleAddReceptionist = () => {
    // Form validation
    if (!newReceptionist.name || !newReceptionist.email || !newReceptionist.phone || !newReceptionist.password) {
      alert('Please fill in all required fields (Name, Email, Phone, and Password)');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newReceptionist.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Create new receptionist object
    const newId = receptionists.length > 0 ? Math.max(...receptionists.map(r => r.id)) + 1 : 1;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}, ${currentDate.getFullYear()}`;
    
    const receptionistToAdd = {
      id: newId,
      name: newReceptionist.name,
      title: newReceptionist.title,
      email: newReceptionist.email,
      phone: newReceptionist.phone,
      password: newReceptionist.password,
      createdAt: formattedDate,
      profileImage: newReceptionist.profileImage || '/manjeet.jpg',
      permissions: {
        patient: { ...newReceptionist.permissions.patient },
        appointment: { ...newReceptionist.permissions.appointment },
        invoices: { ...newReceptionist.permissions.invoices },
        payments: { ...newReceptionist.permissions.payments }
      }
    };
    
    // Update state and localStorage
    const updatedReceptionists = [...receptionists, receptionistToAdd];
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));

    // Reset form and close modal
    setNewReceptionist({
      name: '',
      title: 'Dr.',
      email: '',
      phone: '',
      password: '',
      profileImage: null,
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoices: { read: false, edit: false, create: false, delete: false },
        payments: { read: false, edit: false, create: false, delete: false }
      }
    });
    setShowAddModal(false);
    alert('Staff member added successfully!');
  };

  // Handle deleting a receptionist
  const handleDelete = (id) => {
    const updatedReceptionists = receptionists.filter(receptionist => receptionist.id !== id);
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));
    setShowActionMenu(null);
  };

  // Handle viewing a receptionist's details
  const handleViewReceptionist = (receptionist) => {
    const defaultPermissions = {
      patient: { read: false, edit: false, create: false, delete: false },
      appointment: { read: false, edit: false, create: false, delete: false },
      invoices: { read: false, edit: false, create: false, delete: false },
      payments: { read: false, edit: false, create: false, delete: false }
    };

    const receptionistWithPermissions = {
      ...receptionist,
      permissions: receptionist.permissions || defaultPermissions
    };

    setSelectedReceptionist(receptionistWithPermissions);
    setEditedReceptionist(receptionistWithPermissions);
    setShowViewModal(true);
    setShowActionMenu(null);
  };

  // Handle toggling edit mode
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  // Handle editing receptionist fields
  const handleEditChange = (field, value) => {
    setEditedReceptionist(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle editing permissions
  const handleEditPermissionChange = (category, action, value) => {
    setEditedReceptionist(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: {
          ...prev.permissions[category],
          [action]: value
        }
      }
    }));
  };

  // Handle saving edited changes
  const handleSaveChanges = () => {
    const updatedReceptionists = receptionists.map(receptionist =>
      receptionist.id === editedReceptionist.id ? editedReceptionist : receptionist
    );
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));
    setEditMode(false);
    setShowViewModal(false);
    setSelectedReceptionist(null);
    setEditedReceptionist(null);
  };

  // Handle exporting data to CSV  jo dta export kr rhe hia  recpsnist se wo excel ke form me download hoga 
  const handleExport = () => {
    // Define CSV column headers
    const headers = [
      'ID', 'Name', 'Title', 'Email', 'Phone', 'Created At',
      'Patient Read', 'Patient Edit', 'Patient Create', 'Patient Delete',
      'Appointment Read', 'Appointment Edit', 'Appointment Create', 'Appointment Delete',
      'Invoices Read', 'Invoices Edit', 'Invoices Create', 'Invoices Delete',
      'Payments Read', 'Payments Edit', 'Payments Create', 'Payments Delete'
    ];

    // jo palhe convert krega CSV formate me  
    const csvData = receptionists.map(receptionist => {
      return [
        receptionist.id,
        receptionist.name,
        receptionist.title,
        receptionist.email,
        receptionist.phone,
        receptionist.createdAt,
        // Convert permissions to Yes/No format
        receptionist.permissions.patient.read ? 'Yes' : 'No',
        receptionist.permissions.patient.edit ? 'Yes' : 'No',
        receptionist.permissions.patient.create ? 'Yes' : 'No',
        receptionist.permissions.patient.delete ? 'Yes' : 'No',
        receptionist.permissions.appointment.read ? 'Yes' : 'No',
        receptionist.permissions.appointment.edit ? 'Yes' : 'No',
        receptionist.permissions.appointment.create ? 'Yes' : 'No',
        receptionist.permissions.appointment.delete ? 'Yes' : 'No',
        receptionist.permissions.invoices.read ? 'Yes' : 'No',
        receptionist.permissions.invoices.edit ? 'Yes' : 'No',
        receptionist.permissions.invoices.create ? 'Yes' : 'No',
        receptionist.permissions.invoices.delete ? 'Yes' : 'No',
        receptionist.permissions.payments.read ? 'Yes' : 'No',
        receptionist.permissions.payments.edit ? 'Yes' : 'No',
        receptionist.permissions.payments.create ? 'Yes' : 'No',
        receptionist.permissions.payments.delete ? 'Yes' : 'No'
      ].map(value => {
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set filename with current date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', `receptionists-${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter receptionists based on search query
  const filteredReceptionists = receptionists.filter(receptionist => 
    receptionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receptionist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    // Auto hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle attendance tracking
  const handleAttendance = (receptionistId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    
    // Find the receptionist name
    const receptionist = receptionists.find(r => r.id === receptionistId);
    const name = receptionist ? receptionist.name : 'Staff';
    
    setAttendanceData(prev => ({
      ...prev,
      [receptionistId]: {
        ...prev[receptionistId],
        [currentDate]: {
          checkIn: currentTime,
          status: 'present'
        }
      }
    }));
    
    // Show success notification
    showNotification(`Attendance marked for ${name}`);
    
    // Close action menu
    setShowActionMenu(null);
  };

  // Handle shift management
  const handleShiftChange = (receptionistId, shiftType) => {
    // Create a copy of current shift data
    const updatedShiftData = { ...shiftData };
    
    // Update shift for the receptionist
    updatedShiftData[receptionistId] = {
      ...updatedShiftData[receptionistId],
      currentShift: shiftType,
      assignedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toLocaleString()
    };
    
    // Update state with new shift data
    setShiftData(updatedShiftData);
    
    // Find the receptionist name for notification
    const receptionist = receptionists.find(r => r.id === receptionistId);
    const name = receptionist ? receptionist.name : 'Staff';
    
    // Show success notification with more details
    showNotification(`${name}'s shift changed to ${shiftType}`, 'success');
    
    // Close action menu if open
    if (showActionMenu === receptionistId) {
      setShowActionMenu(null);
    }
  };

  // Enhance the shift report generation function
  const handleGenerateShiftReport = () => {
    // Define CSV headers with more detailed information
    const headers = [
      'Staff ID', 
      'Name', 
      'Title',
      'Email',
      'Phone',
      'Shift Type', 
      'Shift Hours',
      'Assigned Date', 
      'Last Updated',
      'Status'
    ];

    // Map shift types to readable hours
    const shiftHours = {
      'morning': '6AM-2PM',
      'afternoon': '2PM-10PM',
      'night': '10PM-6AM',
      'offduty': 'Off Duty'
    };

    // Create CSV data rows with more information
    const csvData = receptionists.map(receptionist => {
      const staffShift = shiftData[receptionist.id] || {};
      const shiftType = staffShift.currentShift || 'Not Assigned';
      
      // Determine status based on shift type
      let status = 'Active';
      if (shiftType === 'offduty') {
        status = 'Off Duty';
      } else if (shiftType === 'Not Assigned') {
        status = 'Pending Assignment';
      }
      
      return [
        receptionist.id,
        receptionist.name,
        receptionist.title,
        receptionist.email,
        receptionist.phone,
        shiftType,
        shiftType !== 'Not Assigned' ? shiftHours[shiftType] || '-' : '-',
        staffShift.assignedDate || 'Not Assigned',
        staffShift.lastUpdated || 'Never',
        status
      ].map(value => {
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
    });

    // Add a summary row with counts
    const morningCount = Object.values(shiftData).filter(s => s.currentShift === 'morning').length;
    const afternoonCount = Object.values(shiftData).filter(s => s.currentShift === 'afternoon').length;
    const nightCount = Object.values(shiftData).filter(s => s.currentShift === 'night').length;
    const offdutyCount = Object.values(shiftData).filter(s => s.currentShift === 'offduty').length;
    
    // Add empty rows and summary
    csvData.push([]);
    csvData.push(['SHIFT SUMMARY']);
    csvData.push(['Morning Shift', morningCount]);
    csvData.push(['Afternoon Shift', afternoonCount]);
    csvData.push(['Night Shift', nightCount]);
    csvData.push(['Off Duty', offdutyCount]);
    csvData.push(['Total Staff', receptionists.length]);
    csvData.push(['Report Generated', new Date().toLocaleString()]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set filename with current date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', `shift-report-${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success notification
    showNotification('Detailed shift report has been generated and downloaded!', 'success');
    
    // Close the modal
    setShowShiftModal(false);
    setSelectedShiftReceptionist(null);
  };

  // Function to toggle print view
  const handlePrintReport = () => {
    setShowPrintView(true);
    
    // Print after rendering
    setTimeout(() => {
      window.print();
      // Return to normal view after print dialog closes
      setTimeout(() => {
        setShowPrintView(false);
      }, 1000);
    }, 500);
  };

  // =============== Component Render ===============

  // Render celebration component
  const renderCelebration = () => {
    if (!showCelebration) return null;
    
    return (
      <div className="celebration-container">
        <div className="celebration-circle"></div>
        <div className="celebration-content">
          <h2 className="celebration-message">Welcome to Reception!</h2>
        </div>
        
        {/* Petals 1-18 */}
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="petal petal-5"></div>
        <div className="petal petal-6"></div>
        <div className="petal petal-7"></div>
        <div className="petal petal-8"></div>
        <div className="petal petal-9"></div>
        <div className="petal petal-10"></div>
        <div className="petal petal-11"></div>
        <div className="petal petal-12"></div>
        <div className="petal petal-13"></div>
        <div className="petal petal-14"></div>
        <div className="petal petal-15"></div>
        <div className="petal petal-16"></div>
        <div className="petal petal-17"></div>
        <div className="petal petal-18"></div>
        
        {/* Additional petals 19-30 */}
        <div className="petal petal-19"></div>
        <div className="petal petal-20"></div>
        <div className="petal petal-21"></div>
        <div className="petal petal-22"></div>
        <div className="petal petal-23"></div>
        <div className="petal petal-24"></div>
        <div className="petal petal-25"></div>
        <div className="petal petal-26"></div>
        <div className="petal petal-27"></div>
        <div className="petal petal-28"></div>
        <div className="petal petal-29"></div>
        <div className="petal petal-30"></div>
        
        {/* Balloons 1-9 */}
        <div className="balloon balloon-1"></div>
        <div className="balloon balloon-2"></div>
        <div className="balloon balloon-3"></div>
        <div className="balloon balloon-4"></div>
        <div className="balloon balloon-5"></div>
        <div className="balloon balloon-6"></div>
        <div className="balloon balloon-7"></div>
        <div className="balloon balloon-8"></div>
        <div className="balloon balloon-9"></div>
        
        {/* Additional balloons 10-15 */}
        <div className="balloon balloon-10"></div>
        <div className="balloon balloon-11"></div>
        <div className="balloon balloon-12"></div>
        <div className="balloon balloon-13"></div>
        <div className="balloon balloon-14"></div>
        <div className="balloon balloon-15"></div>
      </div>
    );
  };

  // ha ur yaha se component ko render krna prega taki sb data line by line show ho 
  return (
    <div className="receptions-container">
      {/* Render celebration animation */}
      {renderCelebration()}
      
      <h1>Receptions</h1>
      
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
          </span>
          <span className="notification-message">{notification.message}</span>
          <button 
            className="notification-close" 
            onClick={() => setNotification(null)}
          >
            <FiX />
          </button>
        </div>
      )}
      
      {/* Main Card */}
      <div className="receptions-card">
        {/* Header with Search and Export */}
        <div className="receptions-header">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search 'Manjeet Singh'" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search receptionists"
            />
          </div>
          
          <div className="header-actions">
            <button className="action-btn" onClick={() => setShowAttendanceModal(true)}>
              <FiClock /> Attendance
            </button>
            <button className="action-btn" onClick={() => setShowShiftModal(true)}>
              <FiCalendar /> Shifts
            </button>
            <button className="export-btn" onClick={handleExport}>
              Export <FiDownload />
            </button>
          </div>
        </div>
        
        {/* Receptionists Table */}
        <div className="receptions-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Receptionist</th>
                <th>Created At</th>
                <th>Phone</th>
                <th>Title</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceptionists.map((receptionist) => (
                <tr key={receptionist.id}>
                  <td>{receptionist.id}</td>
                  <td className="receptionist-info">
                    <img src={receptionist.profileImage} alt={receptionist.name} />
                    <span>{receptionist.name}</span>
                  </td>
                  <td>{receptionist.createdAt}</td>
                  <td>{receptionist.phone}</td>
                  <td>{receptionist.title}</td>
                  <td>{receptionist.email}</td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="more-actions-btn" 
                        onClick={() => setShowActionMenu(showActionMenu === receptionist.id ? null : receptionist.id)}
                      >
                        <FiMoreVertical />
                      </button>
                      
                      {showActionMenu === receptionist.id && (
                        <div className="actions-menu">
                          <button onClick={() => handleViewReceptionist(receptionist)}>
                            <FiEye /> View
                          </button>
                          <button onClick={() => handleAttendance(receptionist.id)}>
                            <FiClock /> Mark Attendance
                          </button>
                          <button onClick={() => handleDelete(receptionist.id)}>
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Button */}
      <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>

      {/* View/Edit Staff Modal */}
      {showViewModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-actions" style={{position: 'absolute', left: '25px'}}>
                {!editMode && (
                  <button className="edit-btn" onClick={handleEditToggle}>
                    <FiEdit2 /> Edit
                  </button>
                )}
              </div>
              <h2>{editMode ? 'Edit Staff' : 'View Staff'}</h2>
              <button className="close-btn" onClick={() => {
                setShowViewModal(false);
                setEditMode(false);
                setSelectedReceptionist(null);
                setEditedReceptionist(null);
              }} style={{position: 'absolute', right: '25px'}}>
                <FiX />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Profile Image */}
              <div className="form-group">
                <label>Profile Image</label>
                <div className="image-upload-container">
                  <div className="image-preview">
                    <img src={editedReceptionist?.profileImage} alt={editedReceptionist?.name} />
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={editedReceptionist?.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    disabled={!editMode}
                  />
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <select 
                    value={editedReceptionist?.title || 'Dr.'}
                    onChange={(e) => handleEditChange('title', e.target.value)}
                    disabled={!editMode}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
              </div>

              {/* Email and Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={editedReceptionist?.email || ''}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    disabled={!editMode}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={editedReceptionist?.phone || ''}
                    onChange={(e) => handleEditChange('phone', e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>

              {/* Permissions Table */}
              <div className="form-group">
                <label>Access Permissions</label>
                <div className="permissions-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Create</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedReceptionist && Object.entries(editedReceptionist.permissions || {}).map(([category, actions]) => (
                        <tr key={category}>
                          <td className="permission-name">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </td>
                          {Object.entries(actions).map(([action, value]) => (
                            <td key={action}>
                              <input 
                                type="checkbox" 
                                checked={value}
                                onChange={(e) => handleEditPermissionChange(category, action, e.target.checked)}
                                disabled={!editMode}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              {editMode ? (
                <>
                  <button className="cancel-btn" onClick={() => {
                    setEditMode(false);
                    setEditedReceptionist({ ...selectedReceptionist });
                  }}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Modal Header */}
            <div className="modal-header">
              <div style={{width: '40px'}}></div> {/* Spacer for alignment */}
              <h2>Add Staff</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)} style={{position: 'absolute', right: '25px'}}>
                <FiX />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Profile Image Upload */}
              <div className="form-group profile-image-group">
                <label>Profile Image</label>
                <div className="image-upload-container">
                  {newReceptionist.profileImage ? (
                    <div className="image-preview">
                      <img src={newReceptionist.profileImage} alt="Profile preview" />
                      <button 
                        className="change-image-btn" 
                        onClick={() => setNewReceptionist({...newReceptionist, profileImage: null})}
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="upload-box">
                      <FiUpload size={40} />
                      <p>Drag your image here</p>
                      <small>(Only *.jpeg and *.png images will be accepted)</small>
                      <input 
                        type="file" 
                        accept=".jpeg,.jpg,.png" 
                        onChange={handleImageUpload} 
                        className="file-input"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Title */}
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={newReceptionist.name}
                    onChange={(e) => setNewReceptionist({...newReceptionist, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <select 
                    value={newReceptionist.title}
                    onChange={(e) => setNewReceptionist({...newReceptionist, title: e.target.value})}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
              </div>

              {/* Email and Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={newReceptionist.email}
                    onChange={(e) => setNewReceptionist({...newReceptionist, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={newReceptionist.phone}
                    onChange={(e) => setNewReceptionist({...newReceptionist, phone: e.target.value})}
                    placeholder="+91 9905350850"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={newReceptionist.password}
                  onChange={(e) => setNewReceptionist({...newReceptionist, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>

              {/* Permissions Table */}
              <div className="form-group">
                <label>Access Permissions</label>
                <div className="permissions-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Create</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(newReceptionist.permissions).map(permKey => (
                        <tr key={permKey}>
                          <td className="permission-name">
                            {permKey.charAt(0).toUpperCase() + permKey.slice(1)}
                          </td>
                          {Object.keys(newReceptionist.permissions[permKey]).map(action => (
                            <td key={action}>
                              <input 
                                type="checkbox" 
                                checked={newReceptionist.permissions[permKey][action]}
                                onChange={(e) => {
                                  const updatedPermissions = {...newReceptionist.permissions};
                                  updatedPermissions[permKey][action] = e.target.checked;
                                  setNewReceptionist({...newReceptionist, permissions: updatedPermissions});
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddReceptionist}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Attendance Records</h2>
              <button className="close-btn" onClick={() => setShowAttendanceModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <div className="attendance-calendar">
                <h3>Select Date</h3>
                <input 
                  type="date" 
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <div className="attendance-list">
                {receptionists.map(receptionist => {
                  const status = attendanceData[receptionist.id]?.[selectedDate.toISOString().split('T')[0]]?.status || 'absent';
                  return (
                    <div key={receptionist.id} className="attendance-item" style={{ borderLeftColor: status === 'present' ? 'var(--success)' : 'var(--accent)' }}>
                      <div className="receptionist-info">
                        <img src={receptionist.profileImage} alt={receptionist.name} />
                        <span>{receptionist.name}</span>
                      </div>
                      <div className={`attendance-status ${status}`}>
                        {status}
                        {status === 'present' && attendanceData[receptionist.id]?.[selectedDate.toISOString().split('T')[0]]?.checkIn && (
                          <span className="check-in-time">
                            <br />
                            {attendanceData[receptionist.id][selectedDate.toISOString().split('T')[0]].checkIn}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAttendanceModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shift Management Modal */}
      {showShiftModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Shift Management</h2>
              <button className="close-btn" onClick={() => {
                setShowShiftModal(false);
                setSelectedShiftReceptionist(null);
              }}>
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              {/* Date selector */}
              <div className="shift-calendar">
                <h3>Manage Shifts</h3>
                <div className="shift-info">
                  <p>Assign shifts to staff members and track their schedules</p>
                </div>
              </div>
              
              {/* Shift list with highlight for selected receptionist */}
              <div className="shift-list">
                {receptionists.map(receptionist => {
                  const currentShift = shiftData[receptionist.id]?.currentShift || 'morning';
                  const assignedDate = shiftData[receptionist.id]?.assignedDate || 'Not assigned';
                  const lastUpdated = shiftData[receptionist.id]?.lastUpdated || 'Never';
                  const isSelected = selectedShiftReceptionist === receptionist.id;
                  
                  return (
                    <div 
                      key={receptionist.id} 
                      className={`shift-item shift-${currentShift} ${isSelected ? 'shift-selected' : ''}`}
                      ref={isSelected ? (el) => el && el.scrollIntoView({ behavior: 'smooth', block: 'center' }) : null}
                    >
                      <div className="receptionist-info">
                        <img src={receptionist.profileImage} alt={receptionist.name} />
                        <div className="receptionist-details">
                          <span className="name">{receptionist.name}</span>
                          <span className="shift-date">Assigned: {assignedDate}</span>
                        </div>
                      </div>
                      <div className="shift-controls">
                        <div className="shift-type">
                          <label>Shift Type</label>
                          <select 
                            value={currentShift}
                            onChange={(e) => {
                              handleShiftChange(receptionist.id, e.target.value);
                            }}
                          >
                            <option value="morning">Morning (6AM-2PM)</option>
                            <option value="afternoon">Afternoon (2PM-10PM)</option>
                            <option value="night">Night (10PM-6AM)</option>
                            <option value="offduty">Off Duty</option>
                          </select>
                        </div>
                        
                        <div className="shift-actions">
                          <button 
                            className="view-history-btn"
                            onClick={() => showNotification(`Shift history for ${receptionist.name} - Coming soon!`, 'info')}
                          >
                            <FiClock /> History
                          </button>
                          <button 
                            className="notes-btn"
                            onClick={() => showNotification(`Notes for ${receptionist.name} - Coming soon!`, 'info')}
                          >
                            <FiEdit2 /> Notes
                          </button>
                        </div>
                      </div>
                      <div className="shift-status">
                        Last updated: {lastUpdated}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Shift statistics section */}
              <div className="shift-stats">
                <h3>Shift Distribution</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-label">Morning</div>
                    <div className="stat-value">{Object.values(shiftData).filter(s => s.currentShift === 'morning').length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Afternoon</div>
                    <div className="stat-value">{Object.values(shiftData).filter(s => s.currentShift === 'afternoon').length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Night</div>
                    <div className="stat-value">{Object.values(shiftData).filter(s => s.currentShift === 'night').length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Off Duty</div>
                    <div className="stat-value">{Object.values(shiftData).filter(s => s.currentShift === 'offduty').length}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowShiftModal(false);
                  setSelectedShiftReceptionist(null);
                }}
              >
                Close
              </button>
              <button 
                className="print-btn" 
                onClick={handlePrintReport}
              >
                <FiPrinter /> Print Report
              </button>
              <button 
                className="save-btn" 
                onClick={handleGenerateShiftReport}
              >
                <FiDownload /> Download CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrintView && (
        <div className="print-container">
          <div className="print-header">
            <h1>Staff Shift Report</h1>
            <p>Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>
          
          <table className="print-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Shift</th>
                <th>Hours</th>
                <th>Assigned Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map(receptionist => {
                const staffShift = shiftData[receptionist.id] || {};
                const shiftType = staffShift.currentShift || 'Not Assigned';
                const hours = shiftType === 'morning' ? '6AM-2PM' : 
                            shiftType === 'afternoon' ? '2PM-10PM' : 
                            shiftType === 'night' ? '10PM-6AM' : 
                            shiftType === 'offduty' ? 'Off Duty' : '-';
                
                // Determine status
                let status = 'Active';
                if (shiftType === 'offduty') {
                  status = 'Off Duty';
                } else if (shiftType === 'Not Assigned') {
                  status = 'Pending';
                }
                
                return (
                  <tr key={receptionist.id} className={`shift-${shiftType}`}>
                    <td>{receptionist.id}</td>
                    <td>{receptionist.name}</td>
                    <td>{shiftType}</td>
                    <td>{hours}</td>
                    <td>{staffShift.assignedDate || 'Not Assigned'}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className="print-summary">
            <h2>Shift Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <strong>Morning:</strong> {Object.values(shiftData).filter(s => s.currentShift === 'morning').length}
              </div>
              <div className="summary-item">
                <strong>Afternoon:</strong> {Object.values(shiftData).filter(s => s.currentShift === 'afternoon').length}
              </div>
              <div className="summary-item">
                <strong>Night:</strong> {Object.values(shiftData).filter(s => s.currentShift === 'night').length}
              </div>
              <div className="summary-item">
                <strong>Off Duty:</strong> {Object.values(shiftData).filter(s => s.currentShift === 'offduty').length}
              </div>
            </div>
            <div className="total-staff">
              <strong>Total Staff:</strong> {receptionists.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
