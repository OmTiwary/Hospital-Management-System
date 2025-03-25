import React, { useState, useEffect } from 'react';
import { FiUpload, FiSearch, FiDownload, FiEye, FiTrash2, FiMoreVertical, FiX, FiEdit2, FiClock, FiCalendar, FiBarChart2, FiCheck, FiAlertCircle, FiPrinter } from 'react-icons/fi';
import './Reception.css';

// Ye main Reception component function hai
export default function Reception() {
  // ---------- CELEBRATION ANIMATION KE LIYE STATE ----------
  // Ye control karta hai ki welcome animation dikhana hai ya nahi
  const [showCelebration, setShowCelebration] = useState(true);

  // Ye useEffect celebration ko 4 seconds ke baad hide kar dega
  useEffect(() => {
    // Ek timer create karo jo automatically celebration ko hide karega
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Ye function tab chalta hai jab component unmount hota hai (cleanup)
    return () => clearTimeout(timer);
  }, []);

  // ---------- INITIAL DATA SETUP ----------
  // Ye sample data hai receptionists ka jo app first time load hone par dikhega
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

  // ---------- STATE MANAGEMENT ----------
  // Is state mein notification messages store hote hain jo user ko dikhte hain
  const [notification, setNotification] = useState(null);

  // Is state mein sabhi receptionist data store hota hai
  // Pehle localStorage se data load karne ki koshish karega, nahi mila toh initialReceptionists ka use karega
  const [receptionists, setReceptionists] = useState(() => {
    const savedData = localStorage.getItem('receptionists');
    return savedData ? JSON.parse(savedData) : initialReceptionists;
  });
  
  // UI control states - ye control karte hain ki interface par kya dikhega
  const [showAddModal, setShowAddModal] = useState(false);        // Add Staff modal ko control karta hai
  const [showViewModal, setShowViewModal] = useState(false);      // View Staff modal ko control karta hai
  const [searchQuery, setSearchQuery] = useState('');            // Search input ki value
  const [showActionMenu, setShowActionMenu] = useState(null);    // Har row ke action menu ko control karta hai
  const [editMode, setEditMode] = useState(false);               // View modal mein edit mode ko control karta hai
  
  // Selected receptionist ke liye states
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);  // Abhi jo receptionist view ho raha hai
  const [editedReceptionist, setEditedReceptionist] = useState(null);     // Edit kiya gaya receptionist data
  
  // ---------- FORM STATES ----------
  // New receptionist form ke liye default values
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
  
  // ---------- ATTENDANCE AUR SHIFT STATES ----------
  // Attendance aur shifts ko manage karne ke liye states
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [shiftData, setShiftData] = useState(() => {
    const savedShifts = localStorage.getItem('receptionistShifts');
    return savedShifts ? JSON.parse(savedShifts) : {};
  });
  
  // Shift modal mein selected receptionist ke liye state
  const [selectedShiftReceptionist, setSelectedShiftReceptionist] = useState(null);
  
  // Print view functionality ke liye state
  const [showPrintView, setShowPrintView] = useState(false);

  // ---------- EFFECTS (SIDE EFFECTS) ----------
  // Ye useEffect receptionists data ko localStorage mein save karta hai jab bhi ye change hota hai
  useEffect(() => {
    localStorage.setItem('receptionists', JSON.stringify(receptionists));
  }, [receptionists]);
  
  // Ye useEffect shift data ko localStorage mein save karta hai jab bhi ye change hota hai
  useEffect(() => {
    localStorage.setItem('receptionistShifts', JSON.stringify(shiftData));
  }, [shiftData]);

  // ---------- EVENT HANDLERS ----------
  // Ye function new receptionist ke liye profile image upload karne mein help karta hai
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Selected file ko get karo
    if (file) {
      // File ko read karne ke liye FileReader create karo
      const reader = new FileReader();
      reader.onloadend = () => {
        // Jab reading complete ho jaye, tab newReceptionist state ko image ke sath update karo
        setNewReceptionist({ ...newReceptionist, profileImage: reader.result });
      };
      // File ko data URL (base64 encoded string) ke roop mein read karna shuru karo
      reader.readAsDataURL(file);
    }
  };

  // Ye function new receptionist add karne ka kaam karta hai
  const handleAddReceptionist = () => {
    // Form validation - check karo ki required fields bhare gaye hain ya nahi
    if (!newReceptionist.name || !newReceptionist.email || !newReceptionist.phone || !newReceptionist.password) {
      alert('Please fill in all required fields (Name, Email, Phone, and Password)');
      return;
    }

    // Email validation regular expression ke through
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newReceptionist.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Ek new receptionist object create karo
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
      profileImage: newReceptionist.profileImage || '/manjeet.jpg', // Agar koi image nahi di gai to default image use karo
      permissions: {
        patient: { ...newReceptionist.permissions.patient },
        appointment: { ...newReceptionist.permissions.appointment },
        invoices: { ...newReceptionist.permissions.invoices },
        payments: { ...newReceptionist.permissions.payments }
      }
    };
    
    // State ko new receptionist ke saath update karo
    const updatedReceptionists = [...receptionists, receptionistToAdd];
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));

    // Form reset karo aur modal band karo
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

  // Ye function receptionist delete karne ka kaam karta hai
  const handleDelete = (id) => {
    // Matching id wale receptionist ko filter out karo
    const updatedReceptionists = receptionists.filter(receptionist => receptionist.id !== id);
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));
    setShowActionMenu(null); // Action menu band karo
  };

  // Ye function receptionist ki details dekhne ka kaam karta hai
  const handleViewReceptionist = (receptionist) => {
    // Default permissions agar koi nahi hai to
    const defaultPermissions = {
      patient: { read: false, edit: false, create: false, delete: false },
      appointment: { read: false, edit: false, create: false, delete: false },
      invoices: { read: false, edit: false, create: false, delete: false },
      payments: { read: false, edit: false, create: false, delete: false }
    };

    // Make sure permissions set hai (purane data ke saath errors se bachata hai)
    const receptionistWithPermissions = {
      ...receptionist,
      permissions: receptionist.permissions || defaultPermissions
    };

    // Selected receptionist ko view aur edit karne ke liye set karo
    setSelectedReceptionist(receptionistWithPermissions);
    setEditedReceptionist(receptionistWithPermissions);
    setShowViewModal(true); // View modal dikhao
    setShowActionMenu(null); // Action menu band karo
  };

  // Ye function view modal mein edit mode ko toggle karta hai
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  // Ye function edit mode mein receptionist fields ke changes handle karta hai
  const handleEditChange = (field, value) => {
    setEditedReceptionist(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Ye function edit mode mein permission settings ke changes handle karta hai
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

  // Ye function edit mode mein kiye gaye changes ko save karta hai
  const handleSaveChanges = () => {
    // Receptionist ko edited values ke saath update karo
    const updatedReceptionists = receptionists.map(receptionist =>
      receptionist.id === editedReceptionist.id ? editedReceptionist : receptionist
    );
    setReceptionists(updatedReceptionists);
    localStorage.setItem('receptionists', JSON.stringify(updatedReceptionists));
    
    // UI state ko reset karo
    setEditMode(false);
    setShowViewModal(false);
    setSelectedReceptionist(null);
    setEditedReceptionist(null);
  };

  // ---------- EXPORT AUR REPORT FUNCTIONS ----------
  // Ye function receptionist data ko CSV file mein export karta hai
  const handleExport = () => {
    // CSV file ke liye column headers define karo
    const headers = [
      'ID', 'Name', 'Title', 'Email', 'Phone', 'Created At',
      'Patient Read', 'Patient Edit', 'Patient Create', 'Patient Delete',
      'Appointment Read', 'Appointment Edit', 'Appointment Create', 'Appointment Delete',
      'Invoices Read', 'Invoices Edit', 'Invoices Create', 'Invoices Delete',
      'Payments Read', 'Payments Edit', 'Payments Create', 'Payments Delete'
    ];

    // Receptionist data ko CSV format mein convert karo
    const csvData = receptionists.map(receptionist => {
      return [
        receptionist.id,
        receptionist.name,
        receptionist.title,
        receptionist.email,
        receptionist.phone,
        receptionist.createdAt,
        // Boolean permission values ko Yes/No text mein convert karo
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
        // Text mein comma hai to usko quotes se surround karo
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
    });

    // Headers aur data ko join karke CSV content create karo
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // CSV content ke saath ek Blob (Binary Large Object) create karo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Current date ke saath filename set karo
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // Download link create karo aur download trigger karo
    link.setAttribute('href', url);
    link.setAttribute('download', `receptionists-${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Ye function detailed shift report generate karta hai
  const handleGenerateShiftReport = () => {
    // Detailed information ke saath CSV headers define karo
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

    // Shift types ko readable hours format mein map karo
    const shiftHours = {
      'morning': '6AM-2PM',
      'afternoon': '2PM-10PM',
      'night': '10PM-6AM',
      'offduty': 'Off Duty'
    };

    // Detailed information ke saath CSV data rows create karo
    const csvData = receptionists.map(receptionist => {
      const staffShift = shiftData[receptionist.id] || {};
      const shiftType = staffShift.currentShift || 'Not Assigned';
      
      // Shift type ke basis par status determine karo
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
        // Text mein comma hai to usko quotes se surround karo
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
    });

    // Report mein summary statistics add karo
    const morningCount = Object.values(shiftData).filter(s => s.currentShift === 'morning').length;
    const afternoonCount = Object.values(shiftData).filter(s => s.currentShift === 'afternoon').length;
    const nightCount = Object.values(shiftData).filter(s => s.currentShift === 'night').length;
    const offdutyCount = Object.values(shiftData).filter(s => s.currentShift === 'offduty').length;
    
    // Empty rows aur summary section add karo
    csvData.push([]);
    csvData.push(['SHIFT SUMMARY']);
    csvData.push(['Morning Shift', morningCount]);
    csvData.push(['Afternoon Shift', afternoonCount]);
    csvData.push(['Night Shift', nightCount]);
    csvData.push(['Off Duty', offdutyCount]);
    csvData.push(['Total Staff', receptionists.length]);
    csvData.push(['Report Generated', new Date().toLocaleString()]);

    // CSV content create karo
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // CSV file ke liye download link create karo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Current date ke saath filename set karo
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', `shift-report-${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Success notification dikhao
    showNotification('Detailed shift report has been generated and downloaded!', 'success');
    
    // Modal band karo
    setShowShiftModal(false);
    setSelectedShiftReceptionist(null);
  };

  // Ye function shift report print karne ka kaam karta hai
  const handlePrintReport = () => {
    // Print view dikhao
    setShowPrintView(true);
    
    // Rendering complete ho jaye iske liye delay ke baad print karo
    setTimeout(() => {
      window.print();
      // Print dialog close hone ke baad normal view par wapas jao
      setTimeout(() => {
        setShowPrintView(false);
      }, 1000);
    }, 500);
  };

  // ---------- UTILITY FUNCTIONS ----------
  // Search query ke basis par receptionists ko filter karo
  const filteredReceptionists = receptionists.filter(receptionist => 
    receptionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receptionist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ye function notification message dikhata hai
  const showNotification = (message, type = 'success') => {
    // Message aur type ke saath notification state set karo
    setNotification({ message, type });
    
    // 3 seconds ke baad notification auto hide karo
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // ---------- ATTENDANCE AUR SHIFT FUNCTIONS ----------
  // Ye function receptionist ki attendance mark karne ka kaam karta hai
  const handleAttendance = (receptionistId) => {
    // Current date aur time get karo
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    
    // Receptionist ka name dhundo
    const receptionist = receptionists.find(r => r.id === receptionistId);
    const name = receptionist ? receptionist.name : 'Staff';
    
    // Attendance data update karo
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
    
    // Success notification dikhao
    showNotification(`Attendance marked for ${name}`);
    
    // Action menu band karo
    setShowActionMenu(null);
  };

  // Ye function receptionist ka shift change karne ka kaam karta hai
  const handleShiftChange = (receptionistId, shiftType) => {
    // Current shift data ka copy create karo
    const updatedShiftData = { ...shiftData };
    
    // Receptionist ke liye shift update karo
    updatedShiftData[receptionistId] = {
      ...updatedShiftData[receptionistId],
      currentShift: shiftType,
      assignedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toLocaleString()
    };
    
    // New shift data ke saath state update karo
    setShiftData(updatedShiftData);
    
    // Notification ke liye receptionist ka name dhundo
    const receptionist = receptionists.find(r => r.id === receptionistId);
    const name = receptionist ? receptionist.name : 'Staff';
    
    // More details ke saath success notification dikhao
    showNotification(`${name}'s shift changed to ${shiftType}`, 'success');
    
    // Agar action menu open hai to use band karo
    if (showActionMenu === receptionistId) {
      setShowActionMenu(null);
    }
  };

  // ---------- RENDER FUNCTIONS ----------
  // Ye function celebration animation render karta hai
  const renderCelebration = () => {
    // Agar showCelebration false hai to kuch bhi render mat karo
    if (!showCelebration) return null;
    
    return (
      <div className="celebration-container">
        <div className="celebration-circle"></div>
        <div className="celebration-content">
          <h2 className="celebration-message">Welcome to Reception!</h2>
        </div>
        {/* Flower ke petal jo screen ke top se niche girte hain */}
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        {/* ... Aur bhi petals ... */}
        
        {/* Balloons jo screen ke bottom se upar uthte hain */}
        <div className="balloon balloon-1"></div>
        <div className="balloon balloon-2"></div>
        <div className="balloon balloon-3"></div>
        {/* ... Aur bhi balloons ... */}
      </div>
    );
  };

  // ---------- MAIN COMPONENT RENDER ----------
  // Ye main component render function hai
  return (
    <div className="receptions-container">
      {/* Agar jarurat hai to celebration animation render karo */}
      {renderCelebration()}
      
      {/* Page title */}
      <h1>Receptions</h1>
      
      {/* Notification message (showNotification call hone par dikhta hai) */}
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
      
      {/* Table aur actions ke saath main card */}
      <div className="receptions-card">
        {/* Search aur actions ke saath header */}
        <div className="receptions-header">
          {/* Search bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search 'Manjeet Singh'" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search receptionists"
            />
          </div>
          
          {/* Header action buttons */}
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
        
        {/* Receptionists dikhane ke liye table */}
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
              {/* Filtered receptionists ko map karke table rows create karo */}
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
                    {/* Actions cell with dropdown menu */}
                    <div className="actions-cell">
                      <button 
                        className="more-actions-btn" 
                        onClick={() => setShowActionMenu(showActionMenu === receptionist.id ? null : receptionist.id)}
                      >
                        <FiMoreVertical />
                      </button>
                      
                      {/* Dropdown menu jo more-actions click hone par dikhta hai */}
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

      {/* Floating Add button */}
      <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Modal Header */}
            <div className="modal-header">
              <h2>Add Staff</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
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
                    placeholder="Manjeet Singh"
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
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={newReceptionist.phone}
                    onChange={(e) => setNewReceptionist({...newReceptionist, phone: e.target.value})}
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
                />
              </div>

              {/* Permissions Table */}
              <div className="form-group">
                <label>Access</label>
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

      {/* View/Edit Staff Modal */}
      {showViewModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Modal Header */}
            <div className="modal-header">
              <h2>{editMode ? 'Edit Staff' : 'View Staff'}</h2>
              <div className="modal-header-actions">
                {!editMode && (
                  <button className="edit-btn" onClick={handleEditToggle}>
                    <FiEdit2 /> Edit
                  </button>
                )}
                <button className="close-btn" onClick={() => {
                  setShowViewModal(false);
                  setEditMode(false);
                  setSelectedReceptionist(null);
                  setEditedReceptionist(null);
                }}>
                  <FiX />
                </button>
              </div>
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
                <label>Access</label>
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

            {/* {footer of model ka } */}
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
          </div>
        </div>
      )}

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
