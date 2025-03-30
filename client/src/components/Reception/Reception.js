import React, { useState, useEffect, useRef } from 'react';
import './Reception.css';
import { FaSearch, FaDownload, FaUpload, FaTimes, FaEye, FaTrash, FaCheck, FaCalendarCheck, FaEnvelope, FaPhone, FaRegClock, FaFileExport, FaMagic } from 'react-icons/fa';

export default function Reception() {
  // ****** STORAGE FUNCTIONS ******
  // Ye functions localStorage se data safely get aur set karne ke liye hain
  
  // Safe storage functions
  const safeGetFromStorage = (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      localStorage.removeItem(key); // Corrupt data ko clear karo
      setDataError(true); // Error state ko set karo
      return defaultValue;
    }
  };

  // localStorage mein data safely set karne ka function
  const safeSetToStorage = (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error);
      return false;
    }
  };
  
  // ****** UI STATES ******
  // Ye states UI elements ko control karte hain
  
  const [dataError, setDataError] = useState(false); // Data error tracking ke liye
  const [showBalloons, setShowBalloons] = useState(false); // Welcome balloons dikhane ke liye
  const [searchTerm, setSearchTerm] = useState(''); // Search box ke liye
  const [showAddStaffModal, setShowAddStaffModal] = useState(false); // Add Staff modal ke liye
  const [staffImage, setStaffImage] = useState(null); // Staff ki profile image ke liye
  const [activeDropdown, setActiveDropdown] = useState(null); // Dropdown menu ke liye
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Delete confirmation ke liye
  const [receptionistToDelete, setReceptionistToDelete] = useState(null); // Delete karne wale receptionist ke liye
  const [showViewProfile, setShowViewProfile] = useState(false); // Profile view ke liye
  const [selectedReceptionist, setSelectedReceptionist] = useState(null); // Selected receptionist ke liye
  const [showAttendanceModal, setShowAttendanceModal] = useState(false); // Attendance modal ke liye
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10)); // Date selector ke liye
  const [notification, setNotification] = useState({ show: false, message: '' }); // Notifications ke liye
  const [showShiftsModal, setShowShiftsModal] = useState(false); // Shifts modal ke liye
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().substr(0, 10)); // Shift date ke liye
  const [selectedShift, setSelectedShift] = useState(null); // Selected shift ke liye

  // ****** FORM STATE ******
  // Staff add karne ke form ka state
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    email: '',
    phoneNumber: '',
    password: '',
    department: '',
    address: '',
    emergencyContact: '',
    dateOfBirth: '',
    joinDate: new Date().toISOString().substr(0, 10),
    permissions: {
      patient: { read: false, edit: false, create: false, delete: false },
      appointment: { read: false, edit: false, create: false, delete: false },
      invoice: { read: false, edit: false, create: false, delete: false }
    }
  });
  
  // File input ke liye reference
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ****** DEFAULT DATA ******
  // Default receptionists data jab koi data na ho
  const defaultReceptionists = [
    {
      id: 1,
      name: "Manjeet Singh",
      createdAt: "25 Mar, 2025",
      phone: "+91 9905350850",
      title: "Dr.",
      email: "manjet@gmail.com",
      profileImg: "/manjeet.jpg"
    },
    {
      id: 2,
      name: "Sonu",
      createdAt: "1 Jun, 2025",
      phone: "8640746788",
      title: "Dr.",
      email: "sonu@gmail.com",
      profileImg: "/sonu.jpg"
    },
    {
      id: 3,
      name: "Sonu",
      createdAt: "1 Jun, 2025",
      phone: "8640746788",
      title: "Dr.",
      email: "sonu@gmail.com",
      profileImg: "/sonu.jpg"
    },
    {
      id: 4,
      name: "Sonu",
      createdAt: "1 Jun, 2025",
      phone: "8640746788",
      title: "Dr.",
      email: "sonu@gmail.com",
      profileImg: "/sonu.jpg"
    },
    {
      id: 5,
      name: "Sonu",
      createdAt: "1 Jun, 2025",
      phone: "8640746788",
      title: "Dr.",
      email: "sonu@gmail.com",
      profileImg: "/sonu.jpg"
    },
    {
      id: 6,
      name: "Sonu",
      createdAt: "1 Jun, 2025",
      phone: "8640746788",
      title: "Dr.",
      email: "sonu@gmail.com",
      profileImg: "/sonu.jpg"
    },
    {
      id: 7,
      name: "Manjeet Kumar",
      createdAt: "26 Mar, 2025",
      phone: "09006224043",
      title: "Dr.",
      email: "manjeetkyp24@gmail.com",
      profileImg: "/manjeet.jpg"
    }
  ];

  // ****** DATA STATES ******
  // Data states ko localStorage se initialize karna
  
  // Receptionists ka data
  const [receptionists, setReceptionists] = useState(() => 
    safeGetFromStorage('receptionists', defaultReceptionists)
  );
  
  // Attendance ka data - purane attendance ko clean karke
  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = safeGetFromStorage('attendance', {});
    
    // 30 din se purana attendance data clean karna
    if (Object.keys(savedAttendance).length > 0) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const filteredAttendance = {};
      Object.keys(savedAttendance).forEach(date => {
        if (new Date(date) >= thirtyDaysAgo) {
          filteredAttendance[date] = savedAttendance[date];
        }
      });
      
      return filteredAttendance;
    }
    
    return {};
  });
  
  // Shifts ka data
  const [shifts, setShifts] = useState(() => 
    safeGetFromStorage('shifts', {})
  );

  // Shift statistics tracking ke liye
  const [shiftStats, setShiftStats] = useState(() =>
    safeGetFromStorage('shiftStats', {
      receptionist: {},
      dates: {},
      preferred: {}
    })
  );
  
  // ****** DATA SAVING EFFECTS ******
  // Data jab change ho to localStorage mein save karne ke effects
  
  // Receptionists data save karna
  useEffect(() => {
    safeSetToStorage('receptionists', receptionists);
  }, [receptionists]);

  // Attendance data save karna - sirf 30 din ka recent data
  useEffect(() => {
    try {
      // Sirf last 30 din ka attendance data store karna
      const limitedAttendance = {};
      const dates = Object.keys(attendance).sort((a, b) => new Date(b) - new Date(a));
      const recentDates = dates.slice(0, 30); // Sirf 30 sabse recent dates rakhna
      
      recentDates.forEach(date => {
        limitedAttendance[date] = attendance[date];
      });
      
      safeSetToStorage('attendance', limitedAttendance);
    } catch (error) {
      console.error('Error saving attendance to localStorage:', error);
      setNotification({
        show: true,
        message: 'Warning: Storage limit reached. Only recent attendance data will be saved.'
      });
    }
  }, [attendance]);

  // Shifts data save karna
  useEffect(() => {
    safeSetToStorage('shifts', shifts);
    
    // Shifts change hone par statistics update karna
    if (Object.keys(shifts).length > 0) {
      updateShiftStatistics();
    }
  }, [shifts]);

  // ****** UI EFFECTS ******
  
  // Dropdown bahar click karne par close karne ke liye
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Notification auto-hide karne ke liye 3 seconds baad
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // ****** FORM HANDLING ******
  
  // Form input change ko handle karne ka function
  // Jab koi form field mein kuch type kare
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Permission checkboxes ko handle karne ka function
  // Jab koi permission checkbox toggle kare
  const handlePermissionChange = (category, action, checked) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [category]: {
          ...formData.permissions[category],
          [action]: checked
        }
      }
    });
  };

  // Permission preset buttons ko handle karne ka function
  // View Only, Standard Access aur Full Access buttons ke liye
  const handlePermissionPreset = (presetType) => {
    switch(presetType) {
      case 'viewOnly':
        // Sirf read permission dena
        setFormData({
          ...formData,
          permissions: {
            patient: { read: true, edit: false, create: false, delete: false },
            appointment: { read: true, edit: false, create: false, delete: false },
            invoice: { read: true, edit: false, create: false, delete: false }
          }
        });
        break;
      case 'standard':
        // Read, edit, create permissions dena, delete nahi
        setFormData({
          ...formData,
          permissions: {
            patient: { read: true, edit: true, create: true, delete: false },
            appointment: { read: true, edit: true, create: true, delete: false },
            invoice: { read: true, edit: true, create: true, delete: false }
          }
        });
        break;
      case 'full':
        // Sabhi permissions dena
        setFormData({
          ...formData,
          permissions: {
            patient: { read: true, edit: true, create: true, delete: true },
            appointment: { read: true, edit: true, create: true, delete: true },
            invoice: { read: true, edit: true, create: true, delete: true }
          }
        });
        break;
      default:
        break;
    }
  };

  // ****** FORM SUBMISSION ******
  // Form submission handler
  const handleSaveStaff = () => {
    // Form validation - check karna ki sabhi jaruri fields bhare gaye hain
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    } else if (receptionists.some(r => r.email === formData.email)) {
      errors.email = "Email already exists in the system";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9\s\-\(\)]{8,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = "Phone number is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Agar koi error hai to function ko yahi rok do
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Sabse bada ID dhundhna current array mein
    const highestId = receptionists.reduce((max, receptionist) => {
      return receptionist.id > max ? receptionist.id : max;
    }, 0);

    // Naya receptionist object create karna sequential ID ke saath
    const newReceptionist = {
      id: highestId + 1, // Sequential ID (highest ID + 1)
      name: formData.fullName,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
      phone: formData.phoneNumber,
      title: formData.title,
      email: formData.email,
      profileImg: staffImage,
      permissions: formData.permissions,
      department: formData.department,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      dateOfBirth: formData.dateOfBirth,
      joinDate: formData.joinDate || new Date().toISOString().substr(0, 10)
    };

    // Receptionists array mein add karna aur localStorage mein save karna
    const updatedReceptionists = [...receptionists, newReceptionist];
    setReceptionists(updatedReceptionists);
    
    // Success notification dikhana
    setNotification({
      show: true,
      message: `${formData.fullName} has been added to the staff successfully.`
    });
    
    // Form reset karna aur modal band karna
    setFormData({
      fullName: '',
      title: '',
      email: '',
      phoneNumber: '',
      password: '',
      department: '',
      address: '',
      emergencyContact: '',
      dateOfBirth: '',
      joinDate: new Date().toISOString().substr(0, 10),
      permissions: {
        patient: { read: false, edit: false, create: false, delete: false },
        appointment: { read: false, edit: false, create: false, delete: false },
        invoice: { read: false, edit: false, create: false, delete: false }
      }
    });
    setFormErrors({});
    setStaffImage(null);
    setShowAddStaffModal(false);
    
    // Celebration balloons dikhana
    setShowBalloons(true);
    setTimeout(() => setShowBalloons(false), 3000);
  };

  // ****** UI ELEMENTS ******
  // Toggle dropdown menu with dynamic positioning
  const toggleDropdown = (id) => {
    // If the dropdown is already open, close it
    if (activeDropdown === id) {
      setActiveDropdown(null);
      return;
    }
    
    // Set the active dropdown first (to render it)
    setActiveDropdown(id);
    
    // After state update, position the dropdown in the next render cycle
    setTimeout(() => {
      const button = document.querySelector(`[data-receptionist-id="${id}"]`);
      if (!button) return;
      
      const dropdown = button.closest('.action-dropdown').querySelector('.dropdown-menu');
      if (!dropdown) return;
      
      // Get viewport height and dropdown's position and height
      const viewportHeight = window.innerHeight;
      const dropdownRect = dropdown.getBoundingClientRect();
      
      // Check if dropdown would go below viewport
      if (dropdownRect.bottom > viewportHeight - 20) {
        dropdown.style.top = 'auto';
        dropdown.style.bottom = '100%';
      } else {
        dropdown.style.bottom = 'auto';
        dropdown.style.top = '100%';
      }
      
      // Make sure dropdown is fully visible
      dropdown.style.maxHeight = Math.min(200, viewportHeight - 50) + 'px';
      
      // Trigger a reflow (no need to store the value)
      void dropdown.offsetHeight;
    }, 0);
  };

  // Handle view profile
  const handleViewProfile = (receptionist) => {
    setSelectedReceptionist(receptionist);
    setShowViewProfile(true);
    setActiveDropdown(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (receptionist) => {
    setReceptionistToDelete(receptionist);
    setShowDeleteConfirmation(true);
    setActiveDropdown(null);
  };

  // Handle delete receptionist
  const handleDeleteReceptionist = () => {
    if (receptionistToDelete) {
      const updatedReceptionists = receptionists.filter(
        receptionist => receptionist.id !== receptionistToDelete.id
      );
      setReceptionists(updatedReceptionists);
      setShowDeleteConfirmation(false);
      setReceptionistToDelete(null);
      
      // Show notification
      setNotification({
        show: true,
        message: `Receptionist ${receptionistToDelete.name} has been deleted successfully.`
      });
    }
  };

  // ****** ATTENDANCE MANAGEMENT ******
  
  // Staff ki attendance mark karne ka function
  const handleMarkAttendance = (receptionist) => {
    const today = new Date().toISOString().substr(0, 10);
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    try {
      // Agar aaj ki attendance entry nahi hai to create karna
      if (!attendance[today]) {
        attendance[today] = [];
      }
      
      // Check karna ki receptionist ki attendance pehle se mark hai ya nahi
      const existingEntry = attendance[today].find(entry => entry.id === receptionist.id);
      
      if (existingEntry) {
        // Existing entry ko update karna
        const updatedAttendance = {
          ...attendance,
          [today]: attendance[today].map(entry => 
            entry.id === receptionist.id 
              ? { ...entry, status: 'present', time: currentTime }
              : entry
          )
        };
        setAttendance(updatedAttendance);
      } else {
        // Naya entry add karna - minimal data ke saath (storage bachane ke liye)
        const updatedAttendance = {
          ...attendance,
          [today]: [
            ...attendance[today],
            {
              id: receptionist.id,
              name: receptionist.name,
              status: 'present',
              time: currentTime
            }
          ]
        };
        setAttendance(updatedAttendance);
      }
      
      // Success notification dikhana
      setNotification({
        show: true,
        message: `Attendance marked for ${receptionist.name}`
      });
      
      setActiveDropdown(null);
    } catch (error) {
      console.error('Error marking attendance:', error);
      setNotification({
        show: true,
        message: 'Error marking attendance. Storage may be full.'
      });
    }
  };

  // Specific date ke liye attendance data get karne ka function
  const getAttendanceForDate = (date) => {
    try {
      // Agar is date ke liye koi attendance nahi hai to sabhi receptionists ke liye empty entries create karna
      if (!attendance[date]) {
        return receptionists.map(receptionist => ({
          id: receptionist.id,
          name: receptionist.name,
          status: 'absent',
          time: '-'
        }));
      }
      
      // Is date ke liye marked attendance lena
      const markedAttendance = attendance[date];
      
      // Complete list create karna, unmarked receptionists ko absent mark karke
      return receptionists.map(receptionist => {
        const found = markedAttendance.find(entry => entry.id === receptionist.id);
        if (found) {
          // Agar attendance record mein profile image nahi hai to receptionists data se add karna
          return {
            ...found,
            profileImg: found.profileImg || receptionist.profileImg
          };
        } else {
          return {
            id: receptionist.id,
            name: receptionist.name,
            profileImg: receptionist.profileImg,
            status: 'absent',
            time: '-'
          };
        }
      });
    } catch (error) {
      console.error('Error getting attendance for date:', error);
      return [];
    }
  };
  
  // ****** SHIFT MANAGEMENT ******
  
  // Specific date ke liye shifts data get karne ka function
  const getShiftsForDate = (date) => {
    return shifts[date] || [];
  };

  // Receptionist ki current shift get karne ka function
  const getReceptionistShift = (receptionistId) => {
    const dateShifts = getShiftsForDate(shiftDate);
    return dateShifts.find(shift => shift.receptionistId === receptionistId)?.shift || null;
  };

  // Sabhi receptionists ko unki shifts ke saath get karne ka function
  const getReceptionistsWithShifts = () => {
    return receptionists.map(receptionist => {
      const currentShift = getReceptionistShift(receptionist.id);
      return {
        ...receptionist,
        currentShift
      };
    });
  };

  // Shifts by type get karne ka function (morning, afternoon, night)
  const getShiftsSummary = () => {
    const morningShifts = getShiftsForDate(shiftDate).filter(shift => shift.shift === 'Morning');
    const afternoonShifts = getShiftsForDate(shiftDate).filter(shift => shift.shift === 'Afternoon');
    const nightShifts = getShiftsForDate(shiftDate).filter(shift => shift.shift === 'Night');
    
    return {
      morning: morningShifts,
      afternoon: afternoonShifts,
      night: nightShifts
    };
  };

  // Check karna ki koi date mein shifts assign hui hai ya nahi
  const hasShifts = (date) => {
    return shifts[date] && shifts[date].length > 0;
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Change shift date handler
  const handleShiftDateChange = (e) => {
    setShiftDate(e.target.value);
  };

  // Handle export shifts for the current date
  const exportShiftsToCSV = () => {
    try {
      const shiftSummary = getShiftsSummary();
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add header
      csvContent += "Date: " + formatDate(shiftDate) + "\r\n\r\n";
      csvContent += "Shift Type,Staff Name,Phone,Email\r\n";
      
      // Add Morning shifts
      shiftSummary.morning.forEach(staff => {
        const receptionist = receptionists.find(r => r.id === staff.receptionistId);
        if (receptionist) {
          csvContent += `Morning,${receptionist.name},${receptionist.phone},${receptionist.email}\r\n`;
        }
      });
      
      // Add Afternoon shifts
      shiftSummary.afternoon.forEach(staff => {
        const receptionist = receptionists.find(r => r.id === staff.receptionistId);
        if (receptionist) {
          csvContent += `Afternoon,${receptionist.name},${receptionist.phone},${receptionist.email}\r\n`;
        }
      });
      
      // Add Night shifts
      shiftSummary.night.forEach(staff => {
        const receptionist = receptionists.find(r => r.id === staff.receptionistId);
        if (receptionist) {
          csvContent += `Night,${receptionist.name},${receptionist.phone},${receptionist.email}\r\n`;
        }
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Shifts_${shiftDate}.csv`);
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      document.body.removeChild(link);
      
      setNotification({
        show: true,
        message: `Shifts for ${formatDate(shiftDate)} exported successfully`
      });
    } catch (error) {
      console.error('Error exporting shifts:', error);
      setNotification({
        show: true,
        message: 'Error exporting shifts. Please try again.'
      });
    }
  };

  // Function to update shift statistics
  const updateShiftStatistics = () => {
    try {
      // Initialize statistics object
      const stats = {
        receptionist: {},
        dates: {},
        preferred: {}
      };
      
      // Process all shifts to build statistics
      Object.keys(shifts).forEach(date => {
        const dateShifts = shifts[date] || [];
        
        // Update date stats
        if (!stats.dates[date]) {
          stats.dates[date] = {
            total: dateShifts.length,
            Morning: 0,
            Afternoon: 0,
            Night: 0
          };
        }
        
        // Process each shift assignment
        dateShifts.forEach(shift => {
          const { receptionistId, shift: shiftType } = shift;
          
          // Update receptionist stats
          if (!stats.receptionist[receptionistId]) {
            stats.receptionist[receptionistId] = {
              total: 0,
              Morning: 0,
              Afternoon: 0,
              Night: 0,
              lastAssigned: date
            };
          }
          
          // Increment counters
          stats.receptionist[receptionistId].total += 1;
          stats.receptionist[receptionistId][shiftType] += 1;
          stats.receptionist[receptionistId].lastAssigned = date;
          
          // Update date shift type counts
          stats.dates[date][shiftType] += 1;
          
          // Track preferred shifts based on frequency
          if (!stats.preferred[receptionistId]) {
            stats.preferred[receptionistId] = { type: shiftType, count: 1 };
          } else {
            const currentPreferred = stats.preferred[receptionistId];
            if (currentPreferred.type === shiftType) {
              currentPreferred.count += 1;
            } else if (stats.receptionist[receptionistId][shiftType] > 
                      stats.receptionist[receptionistId][currentPreferred.type]) {
              // Update preferred if this shift type is now more frequent
              stats.preferred[receptionistId] = { type: shiftType, count: stats.receptionist[receptionistId][shiftType] };
            }
          }
        });
      });
      
      // Save updated statistics
      setShiftStats(stats);
      safeSetToStorage('shiftStats', stats);
      
    } catch (error) {
      console.error('Error updating shift statistics:', error);
    }
  };

  // Get receptionist shift statistics
  const getReceptionistShiftStats = (receptionistId) => {
    return shiftStats.receptionist[receptionistId] || {
      total: 0,
      Morning: 0,
      Afternoon: 0,
      Night: 0,
      lastAssigned: 'Never'
    };
  };

  // Get preferred shift for a receptionist
  const getPreferredShift = (receptionistId) => {
    return shiftStats.preferred[receptionistId]?.type || null;
  };

  // Get shifts workload distribution
  const getShiftsWorkload = () => {
    const workload = {};
    
    // Calculate total shifts per receptionist
    receptionists.forEach(receptionist => {
      const stats = getReceptionistShiftStats(receptionist.id);
      workload[receptionist.id] = {
        name: receptionist.name,
        total: stats.total,
        preferred: getPreferredShift(receptionist.id),
        lastAssigned: stats.lastAssigned
      };
    });
    
    return workload;
  };

  // Calculate shift statistics for reporting
  const calculateShiftStatistics = () => {
    try {
      // Initialize counters
      const stats = {
        totalAssignments: 0,
        byShift: { Morning: 0, Afternoon: 0, Night: 0 },
        byReceptionist: {},
        mostAssigned: { id: null, count: 0 },
        leastAssigned: { id: null, count: Infinity }
      };
      
      // Get all shift assignments across all dates
      let allShiftAssignments = [];
      Object.keys(shifts).forEach(date => {
        allShiftAssignments = [...allShiftAssignments, ...shifts[date]];
      });
      
      // Total assignments
      stats.totalAssignments = allShiftAssignments.length;
      
      // Count by shift type
      allShiftAssignments.forEach(shift => {
        const type = shift.shift; // Keep case of original shift type (Morning, Afternoon, Night)
        stats.byShift[type] = (stats.byShift[type] || 0) + 1;
      });
      
      // Count by receptionist
      receptionists.forEach(receptionist => {
        const receptionistShifts = allShiftAssignments.filter(
          shift => shift.receptionistId === receptionist.id
        );
        
        const count = receptionistShifts.length;
        stats.byReceptionist[receptionist.id] = {
          name: receptionist.name,
          count,
          byType: {
            Morning: receptionistShifts.filter(s => s.shift === 'Morning').length,
            Afternoon: receptionistShifts.filter(s => s.shift === 'Afternoon').length,
            Night: receptionistShifts.filter(s => s.shift === 'Night').length
          }
        };
        
        // Track most assigned
        if (count > stats.mostAssigned.count) {
          stats.mostAssigned = { id: receptionist.id, count };
        }
        
        // Track least assigned (only if receptionist has any assignments)
        if (count > 0 && count < stats.leastAssigned.count) {
          stats.leastAssigned = { id: receptionist.id, count };
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Error calculating shift statistics:', error);
      return null;
    }
  };

  // Auto-assign shifts based on workload and previous assignments
  const autoAssignShifts = () => {
    try {
      // Get shift statistics to determine workload
      const stats = calculateShiftStatistics();
      if (!stats) {
        throw new Error("Couldn't calculate shift statistics");
      }
      
      // Create ranking of receptionists by workload (ascending)
      const rankByWorkload = Object.keys(stats.byReceptionist)
        .map(id => ({
          id: parseInt(id),
          count: stats.byReceptionist[id].count
        }))
        .sort((a, b) => a.count - b.count);
      
      // Define shift types
      const shiftTypes = ['Morning', 'Afternoon', 'Night'];
      
      // Get current date's shifts
      const currentDateShifts = [...getShiftsForDate(shiftDate)];
      
      // Check which shift types are already assigned
      const assignedTypes = currentDateShifts.map(shift => shift.shift);
      const unassignedTypes = shiftTypes.filter(type => !assignedTypes.includes(type));
      
      // Get receptionist IDs that are already assigned for this date
      const assignedReceptionists = currentDateShifts.map(shift => shift.receptionistId);
      
      // Auto-assign unassigned shifts
      const newAssignments = [];
      
      unassignedTypes.forEach(shiftType => {
        // Find the receptionist with the lowest workload who isn't already assigned
        for (const receptionist of rankByWorkload) {
          if (!assignedReceptionists.includes(receptionist.id)) {
            // Assign this shift to this receptionist
            newAssignments.push({
              receptionistId: receptionist.id,
              shift: shiftType,
              assignedAt: new Date().toISOString(),
              autoAssigned: true
            });
            
            // Mark this receptionist as assigned
            assignedReceptionists.push(receptionist.id);
            break;
          }
        }
      });
      
      // Update shifts state
      if (newAssignments.length > 0) {
        const updatedShifts = {
          ...shifts,
          [shiftDate]: [...currentDateShifts, ...newAssignments]
        };
        
        setShifts(updatedShifts);
        
        setNotification({
          show: true,
          message: `Auto-assigned ${newAssignments.length} shifts for ${formatDate(shiftDate)}`
        });
      } else {
        setNotification({
          show: true,
          message: 'No shifts to auto-assign for this date'
        });
      }
    } catch (error) {
      console.error('Error auto-assigning shifts:', error);
      setNotification({
        show: true,
        message: 'Error auto-assigning shifts. Please try again.'
      });
    }
  };

  // Get receptionist workload percentage
  const getReceptionistWorkload = (receptionistId) => {
    const stats = calculateShiftStatistics();
    if (!stats || stats.totalAssignments === 0) return 0;
    
    const receptionist = stats.byReceptionist[receptionistId];
    if (!receptionist) return 0;
    
    return Math.round((receptionist.count / stats.totalAssignments) * 100);
  };

  // Render staff assigned to a particular shift
  const renderShiftStaff = (shiftType) => {
    const shiftsForDate = getShiftsForDate(shiftDate);
    const staffForShift = shiftsForDate
      .filter(shift => shift.shift === shiftType)
      .map(shift => {
        const receptionist = receptionists.find(r => r.id === shift.receptionistId);
        return receptionist ? {
          ...receptionist,
          autoAssigned: shift.autoAssigned
        } : null;
      })
      .filter(staff => staff !== null); // Filter out null values
    
    if (staffForShift.length === 0) {
      return (
        <div className="empty-shift">
          <span className="empty-shift-emoji">👋</span>
          <p>No staff assigned to this shift yet</p>
        </div>
      );
    }
    
    return (
      <div className="shift-staff-list">
        {staffForShift.map(staff => (
          <div className="shift-staff-card" key={staff.id}>
            <div className="staff-card-profile">
              {staff.profileImg ? (
                <img 
                  src={staff.profileImg} 
                  alt={staff.name}
                  className="staff-avatar-img" 
                />
              ) : (
                <div className="staff-avatar">
                  {staff.name && staff.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="staff-card-details">
              <div className="staff-card-name">{staff.name || 'Unknown'}</div>
              <div className="staff-card-phone">
                <FaPhone /> {staff.phone || 'No phone'}
              </div>
              {staff.autoAssigned && (
                <span className="auto-badge">Auto</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Clear all shifts for a specific date
  const clearShiftsForDate = (date) => {
    const updatedShifts = {...shifts};
    delete updatedShifts[date];
    setShifts(updatedShifts);
    setNotification({
      show: true,
      message: `All shifts cleared for ${formatDate(date)}`
    });
  };

  // Assign a shift to a receptionist
  const assignShift = (receptionistId, shiftType) => {
    const currentDateShifts = getShiftsForDate(shiftDate);
    
    // Check if receptionist already has a shift for this date
    const existingShift = currentDateShifts.find(s => s.receptionistId === receptionistId);
    
    let updatedShiftsForDate;
    if (existingShift) {
      // Update existing shift
      updatedShiftsForDate = currentDateShifts.map(shift => 
        shift.receptionistId === receptionistId 
          ? { ...shift, shift: shiftType, assignedAt: new Date().toISOString(), autoAssigned: false }
          : shift
      );
    } else {
      // Add new shift
      updatedShiftsForDate = [
        ...currentDateShifts,
        {
          receptionistId,
          shift: shiftType,
          assignedAt: new Date().toISOString(),
          autoAssigned: false
        }
      ];
    }
    
    const updatedShifts = {
      ...shifts,
      [shiftDate]: updatedShiftsForDate
    };
    
    setShifts(updatedShifts);
    setNotification({
      show: true,
      message: `${shiftType} shift assigned successfully`
    });
  };
  
  // Remove a shift assignment
  const removeShift = (receptionistId) => {
    const currentDateShifts = getShiftsForDate(shiftDate);
    const updatedShiftsForDate = currentDateShifts.filter(
      shift => shift.receptionistId !== receptionistId
    );
    
    const updatedShifts = {
      ...shifts,
      [shiftDate]: updatedShiftsForDate
    };
    
    setShifts(updatedShifts);
    setNotification({
      show: true,
      message: 'Shift removed successfully'
    });
  };

  // Add this state for form errors
  const [formErrors, setFormErrors] = useState({});

  // ****** EXPORT FUNCTIONS ******
  
  // Staff data ko CSV format mein export karne ka function
  // Jab Export button click hoga tab ye chalega
  const exportAllStaffToCSV = () => {
    try {
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Header row add karna (columns ke naam)
      csvContent += "ID,Name,Title,Email,Phone,Department,Address,Created Date\r\n";
      
      // Har staff ka data row by row add karna
      receptionists.forEach(staff => {
        const row = [
          staff.id,
          staff.name,
          staff.title || '',
          staff.email,
          staff.phone,
          staff.department || '',
          staff.address || '',
          staff.createdAt
        ];
        
        // Agar kisi field mein comma hai to usko quotes mein wrap karna
        const formattedRow = row.map(field => {
          if (field && typeof field === 'string' && field.includes(',')) {
            return `"${field}"`;
          }
          return field;
        });
        
        // Row ko CSV string mein add karna
        csvContent += formattedRow.join(',') + '\r\n';
      });
      
      // Download link create karna
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Staff_Export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      
      // Download trigger karna
      link.click();
      document.body.removeChild(link);
      
      // Success notification dikhana
      setNotification({
        show: true,
        message: `${receptionists.length} staff records exported successfully`
      });
    } catch (error) {
      console.error('Error exporting staff data:', error);
      // Error notification dikhana
      setNotification({
        show: true,
        message: 'Error exporting staff data. Please try again.'
      });
    }
  };

  // ****** SEARCH & FILTER ******
  
  // Receptionists ko search term ke hisaab se filter karna
  // Ye name, email aur phone number ke basis par filter karta hai
  const filteredReceptionists = receptionists.filter(receptionist =>
    receptionist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receptionist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receptionist.phone.includes(searchTerm)
  );

  // ****** IMAGE UPLOAD KI FUNCTIONALITY ******
  
  // Drag over event ko handle karne ka function
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Image drop karne par usko handle karne ka function
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.match('image/jpeg') || file.type.match('image/png')) {
        handleImageFile(file);
      } else {
        alert('Only .jpeg and .png images are accepted');
      }
    }
  };

  // Selected image file ko process karne ka function
  const handleImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setStaffImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // File input change event ko handle karne ka function
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Function to reset file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Function to clean up attendance storage - purane records delete karna
  const cleanupAttendanceStorage = () => {
    try {
      const allAttendance = {...attendance};
      const dates = Object.keys(allAttendance);
      
      // If we have too many dates, keep only the most recent 30
      if (dates.length > 30) {
        const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
        const recentDates = sortedDates.slice(0, 30);
        
        // Create a new object with only recent dates
        const trimmedAttendance = {};
        recentDates.forEach(date => {
          trimmedAttendance[date] = allAttendance[date];
        });
        
        setAttendance(trimmedAttendance);
        setNotification({
          show: true,
          message: 'Storage optimized: Older attendance records archived'
        });
      }
    } catch (error) {
      console.error('Error cleaning up attendance data:', error);
    }
  };
  
  // Function to reset localStorage if there are persistent issues
  const resetAllStorageData = () => {
    try {
      // Clear all related localStorage items
      localStorage.removeItem('receptionists');
      localStorage.removeItem('attendance');
      localStorage.removeItem('shifts');
      
      // Reset state to defaults
      setReceptionists(defaultReceptionists);
      setAttendance({});
      setShifts({});
      
      setNotification({
        show: true,
        message: 'All data has been reset due to corruption'
      });
      
      // Reload the page to ensure clean state
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error resetting storage data:', error);
    }
  };

  // Function to create balloons with more variety
  const renderBalloons = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#F9D56E', '#C38D9E', '#7FDBFF', '#85DCBA', '#E8A87C'];
    const balloons = [];
    
    // Create balloons concentrated in certain areas for the pattern in the image
    // Left side balloons
    for (let i = 0; i < 12; i++) {
      const randomLeft = Math.floor(Math.random() * 30); // Left side
      const randomSize = 30 + Math.random() * 30;
      const randomDelay = Math.random() * 0.2;
      const randomDuration = 0.6;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      balloons.push(
        <div 
          key={`left-${i}`}
          className="balloon"
          style={{
            left: `${randomLeft}%`,
            width: `${randomSize}px`,
            height: `${randomSize * 1.25}px`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`,
            backgroundColor: randomColor
          }}
        />
      );
    }
    
    // Right side balloons
    for (let i = 0; i < 12; i++) {
      const randomLeft = 70 + Math.floor(Math.random() * 30); // Right side
      const randomSize = 30 + Math.random() * 30;
      const randomDelay = Math.random() * 0.2;
      const randomDuration = 0.6;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      balloons.push(
        <div 
          key={`right-${i}`}
          className="balloon"
          style={{
            left: `${randomLeft}%`,
            width: `${randomSize}px`,
            height: `${randomSize * 1.25}px`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`,
            backgroundColor: randomColor
          }}
        />
      );
    }
    
    // Center-top balloons
    for (let i = 0; i < 12; i++) {
      const randomLeft = 35 + Math.floor(Math.random() * 30); // Center
      const randomSize = 30 + Math.random() * 30;
      const randomDelay = Math.random() * 0.2;
      const randomDuration = 0.6;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      balloons.push(
        <div 
          key={`center-${i}`}
          className="balloon"
          style={{
            left: `${randomLeft}%`,
            width: `${randomSize}px`,
            height: `${randomSize * 1.25}px`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`,
            backgroundColor: randomColor
          }}
        />
      );
    }
    
    // Add the styled balloons from CSS
    balloons.push(<div key="balloon-10" className="balloon-10" />);
    balloons.push(<div key="balloon-11" className="balloon-11" />);
    balloons.push(<div key="balloon-12" className="balloon-12" />);
    balloons.push(<div key="balloon-13" className="balloon-13" />);
    balloons.push(<div key="balloon-14" className="balloon-14" />);
    balloons.push(<div key="balloon-15" className="balloon-15" />);
    
    // Add petals
    balloons.push(<div key="petal-19" className="petal-19" />);
    balloons.push(<div key="petal-20" className="petal-20" />);
    balloons.push(<div key="petal-21" className="petal-21" />);
    balloons.push(<div key="petal-22" className="petal-22" />);
    balloons.push(<div key="petal-23" className="petal-23" />);
    balloons.push(<div key="petal-24" className="petal-24" />);
    balloons.push(<div key="petal-25" className="petal-25" />);
    balloons.push(<div key="petal-26" className="petal-26" />);
    balloons.push(<div key="petal-27" className="petal-27" />);
    balloons.push(<div key="petal-28" className="petal-28" />);
    balloons.push(<div key="petal-29" className="petal-29" />);
    balloons.push(<div key="petal-30" className="petal-30" />);
    
    return balloons;
  };

  return (
    <div className="reception-container">
      {/* Data error banner - jab localStorage mein koi problem ho */}
      {dataError && (
        <div className="data-error-banner">
          <div className="error-message">
            <h3>Storage Data Error</h3>
            <p>There was an issue loading your data. Some information may have been reset.</p>
            <button 
              className="error-action-btn"
              onClick={() => {
                resetAllStorageData();
                setDataError(false);
              }}
            >
              Reset All Data
            </button>
            <button 
              className="error-dismiss-btn"
              onClick={() => setDataError(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      
      {/* Welcome balloons animation */}
      {showBalloons && (
        <div className="balloons-container">
          {renderBalloons()}
          <div className="welcome-message" onClick={() => setShowBalloons(false)}>
            Welcome to Reception!
          </div>
        </div>
      )}
      
      {/* Notification toast - user ko message dikhane ke liye */}
      {notification.show && (
        <div className="toast-notification">
          {notification.message}
        </div>
      )}
      
      {/* Header section with search and action buttons */}
      <div className="reception-header">
        {/* Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search 'Manjeet Singh'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        
        {/* Action buttons */}
        <div className="action-buttons">
          {/* Attendance button */}
          <button className="attendance-btn" onClick={() => {
            cleanupAttendanceStorage();
            setShowAttendanceModal(true);
          }}>
            <span className="icon">⏱️</span>
            Attendance
          </button>
          
          {/* Shifts button */}
          <button className="shifts-btn" onClick={() => setShowShiftsModal(true)}>
            <span className="icon">📅</span>
            Shifts
          </button>
          
          {/* Export button - ye exportAllStaffToCSV function ko call karta hai jisse saare staff ka data CSV file mein download ho jata hai */}
          <button className="export-btn" onClick={exportAllStaffToCSV}>
            <FaDownload className="download-icon" />
            Export
          </button>
        </div>
      </div>
      
      <div className="reception-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>RECEPTIONIST</th>
              <th>CREATED AT</th>
              <th>PHONE</th>
              <th>TITLE</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceptionists.map((receptionist, index) => (
              <tr key={receptionist.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="receptionist-info">
                    {receptionist.profileImg ? (
                      <img 
                        src={receptionist.profileImg} 
                        alt={receptionist.name}
                        className="avatar-img" 
                      />
                    ) : (
                      <div className="avatar">
                        {receptionist.name.charAt(0)}
                      </div>
                    )}
                    <span>{receptionist.name}</span>
                  </div>
                </td>
                <td>{receptionist.createdAt}</td>
                <td>{receptionist.phone}</td>
                <td>{receptionist.title}</td>
                <td>{receptionist.email}</td>
                <td>
                  <div className="action-dropdown" ref={activeDropdown === receptionist.id ? dropdownRef : null}>
                    <button 
                      className="action-btn" 
                      onClick={() => toggleDropdown(receptionist.id)}
                      data-receptionist-id={receptionist.id}
                    >
                      ⋮
                    </button>
                    
                    {activeDropdown === receptionist.id && (
                      <div className="dropdown-menu">
                        <div 
                          className="dropdown-item view"
                          onClick={() => handleViewProfile(receptionist)}
                        >
                          <FaEye /> View
                        </div>
                        <div 
                          className="dropdown-item delete"
                          onClick={() => handleDeleteConfirmation(receptionist)}
                        >
                          <FaTrash /> Delete
                        </div>
                        <div 
                          className="dropdown-item attendance"
                          onClick={() => handleMarkAttendance(receptionist)}
                        >
                          <FaCheck /> Mark Attendance
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="add-btn">
        <button onClick={() => setShowAddStaffModal(true)}>+</button>
      </div>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="modal-backdrop">
          <div className="add-staff-modal">
            <div className="modal-header">
              <h2>Create Staff</h2>
              <button className="close-btn" onClick={() => {
                setShowAddStaffModal(false);
                setFormErrors({});
              }}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
                {/* Left side - profile image */}
                <div style={{ width: '220px' }}>
                  <div 
                    style={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      backgroundColor: '#f8f9fa',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto 20px',
                      cursor: 'pointer',
                      border: '1px solid #eee',
                      position: 'relative'
                    }}
                    onClick={triggerFileInput}
                  >
                    {staffImage ? (
                      <img 
                        src={staffImage} 
                        alt="Staff" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                      />
                    ) : (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#3498db"/>
                        </svg>
                        <div style={{ marginTop: '10px', color: '#3498db', fontSize: '20px' }}>+</div>
                      </div>
                    )}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept=".jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '10px', 
                    fontSize: '14px', 
                    color: '#888' 
                  }}>
                    Drag your image here
                    <div style={{ fontSize: '12px', marginTop: '5px' }}>
                      (Only *.jpeg and *.png images will be accepted)
                    </div>
                  </div>
                </div>

                {/* Right side - form fields */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#666', marginBottom: '10px' }}>Personal Information</div>
                    
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>First Name</div>
                        <input 
                          type="text"
                          name="fullName"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                        {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Title</div>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            backgroundColor: '#fff'
                          }}
                        >
                          <option value="">Select title</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Phone Number</div>
                        <input 
                          type="text"
                          name="phoneNumber"
                          placeholder="+91 9905350850"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                        {formErrors.phoneNumber && <div className="error-message">{formErrors.phoneNumber}</div>}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Email</div>
                        <input 
                          type="email"
                          name="email" 
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Designation</div>
                        <input
                          type="text"
                          name="department"
                          placeholder="Department"
                          value={formData.department}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Address</div>
                        <input 
                          type="text"
                          name="address"
                          placeholder="Staff residential address"
                          value={formData.address}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>City</div>
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter city"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>State</div>
                        <input
                          type="text"
                          name="state"
                          placeholder="Enter state"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#666', marginBottom: '10px' }}>Education</div>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Degree Program</div>
                        <input
                          type="text"
                          name="degree"
                          placeholder="Enter degree program"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Institute</div>
                        <input
                          type="text"
                          name="institute"
                          placeholder="Enter institute name"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#666', marginBottom: '10px' }}>Password</div>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="password"
                          name="password"
                          placeholder="Enter secure password"
                          value={formData.password}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#666', marginBottom: '10px' }}>Access Permissions</div>
                    <div style={{
                      backgroundColor: '#f8f9fa', 
                      padding: '15px',
                      borderRadius: '4px',
                      border: '1px solid #eee'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr repeat(4, 1fr)',
                        gap: '10px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textAlign: 'center',
                        padding: '10px 5px',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        marginBottom: '10px',
                        borderRadius: '4px'
                      }}>
                        <div>Patient</div>
                        <div>READ</div>
                        <div>EDIT</div>
                        <div>CREATE</div>
                        <div>DELETE</div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr repeat(4, 1fr)',
                        gap: '10px',
                        textAlign: 'center',
                        padding: '6px 0'
                      }}>
                        <div style={{ textAlign: 'left' }}>Patient</div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="patient-read"
                            checked={formData.permissions.patient.read}
                            onChange={(e) => handlePermissionChange('patient', 'read', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="patient-edit"
                            checked={formData.permissions.patient.edit}
                            onChange={(e) => handlePermissionChange('patient', 'edit', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="patient-create"
                            checked={formData.permissions.patient.create}
                            onChange={(e) => handlePermissionChange('patient', 'create', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="patient-delete"
                            checked={formData.permissions.patient.delete}
                            onChange={(e) => handlePermissionChange('patient', 'delete', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr repeat(4, 1fr)',
                        gap: '10px',
                        textAlign: 'center',
                        padding: '6px 0'
                      }}>
                        <div style={{ textAlign: 'left' }}>Appointment</div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="appointment-read"
                            checked={formData.permissions.appointment.read}
                            onChange={(e) => handlePermissionChange('appointment', 'read', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="appointment-edit"
                            checked={formData.permissions.appointment.edit}
                            onChange={(e) => handlePermissionChange('appointment', 'edit', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="appointment-create"
                            checked={formData.permissions.appointment.create}
                            onChange={(e) => handlePermissionChange('appointment', 'create', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="appointment-delete"
                            checked={formData.permissions.appointment.delete}
                            onChange={(e) => handlePermissionChange('appointment', 'delete', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr repeat(4, 1fr)',
                        gap: '10px',
                        textAlign: 'center',
                        padding: '6px 0'
                      }}>
                        <div style={{ textAlign: 'left' }}>Invoice</div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="invoice-read"
                            checked={formData.permissions.invoice.read}
                            onChange={(e) => handlePermissionChange('invoice', 'read', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="invoice-edit"
                            checked={formData.permissions.invoice.edit}
                            onChange={(e) => handlePermissionChange('invoice', 'edit', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="invoice-create"
                            checked={formData.permissions.invoice.create}
                            onChange={(e) => handlePermissionChange('invoice', 'create', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                        <div>
                          <input 
                            type="checkbox" 
                            id="invoice-delete"
                            checked={formData.permissions.invoice.delete}
                            onChange={(e) => handlePermissionChange('invoice', 'delete', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
                        <button 
                          onClick={() => handlePermissionPreset('viewOnly')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f0f2f5',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          View Only
                        </button>
                        <button 
                          onClick={() => handlePermissionPreset('standard')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f0f2f5',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Standard Access
                        </button>
                        <button 
                          onClick={() => handlePermissionPreset('full')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f0f2f5',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Full Access
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              padding: '15px 20px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa'
            }}>
              <button 
                onClick={() => {
                  setShowAddStaffModal(false);
                  setFormErrors({});
                }}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px 15px',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveStaff}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 15px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other modals: View profile, delete confirmation, attendance, etc. */}
      {showViewProfile && selectedReceptionist && (
        <div className="modal-backdrop">
          <div className="view-profile-modal">
            <div className="profile-header">
              <div className="profile-image-container">
                {selectedReceptionist.profileImg ? (
                  <img src={selectedReceptionist.profileImg} alt={selectedReceptionist.name} />
                ) : (
                  <div className="profile-image-placeholder">
                    {selectedReceptionist.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="profile-name">{selectedReceptionist.name}</div>
              <div className="profile-title">{selectedReceptionist.title}</div>
            </div>
            
            <div className="profile-body">
              <div className="profile-info-section">
                <div className="profile-info-title">Contact Information</div>
                <div className="profile-info-item">
                  <div className="profile-info-label">Email</div>
                  <div className="profile-info-value">{selectedReceptionist.email}</div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-label">Phone</div>
                  <div className="profile-info-value">{selectedReceptionist.phone}</div>
                </div>
                {selectedReceptionist.address && (
                  <div style={{
                    margin: '10px 0',
                    padding: '5px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    {selectedReceptionist.address}
                  </div>
                )}
                {selectedReceptionist.emergencyContact && (
                  <div className="profile-info-item">
                    <div className="profile-info-label">Emergency</div>
                    <div className="profile-info-value">{selectedReceptionist.emergencyContact}</div>
                  </div>
                )}
              </div>
              
              <div className="profile-info-section">
                <div className="profile-info-title">Account Information</div>
                {selectedReceptionist.department && (
                  <div className="profile-info-item">
                    <div className="profile-info-label">Department</div>
                    <div className="profile-info-value">{selectedReceptionist.department}</div>
                  </div>
                )}
                <div className="profile-info-item">
                  <div className="profile-info-label">Created At</div>
                  <div className="profile-info-value">{selectedReceptionist.createdAt}</div>
                </div>
                {selectedReceptionist.joinDate && (
                  <div className="profile-info-item">
                    <div className="profile-info-label">Join Date</div>
                    <div className="profile-info-value">{new Date(selectedReceptionist.joinDate).toLocaleDateString()}</div>
                  </div>
                )}
                {selectedReceptionist.dateOfBirth && (
                  <div className="profile-info-item">
                    <div className="profile-info-label">Date of Birth</div>
                    <div className="profile-info-value">{new Date(selectedReceptionist.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
              
              {selectedReceptionist.permissions && (
                <div className="profile-info-section">
                  <div className="profile-info-title">Permissions</div>
                  <div className="profile-permissions">
                    <div className="permission-grid">
                      <div className="permission-header">Module</div>
                      <div className="permission-header">Read</div>
                      <div className="permission-header">Edit</div>
                      <div className="permission-header">Create</div>
                      <div className="permission-header">Delete</div>
                      
                      <div className="permission-row-label">Patient</div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.patient.read ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.patient.edit ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.patient.create ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.patient.delete ? "✓" : "✗"}
                      </div>
                      
                      <div className="permission-row-label">Appointment</div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.appointment.read ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.appointment.edit ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.appointment.create ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.appointment.delete ? "✓" : "✗"}
                      </div>
                      
                      <div className="permission-row-label">Invoice</div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.invoice.read ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.invoice.edit ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.invoice.create ? "✓" : "✗"}
                      </div>
                      <div className="permission-check">
                        {selectedReceptionist.permissions.invoice.delete ? "✓" : "✗"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="modal-close-btn"
              onClick={() => setShowViewProfile(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
      
      {showDeleteConfirmation && receptionistToDelete && (
        <div className="modal-backdrop">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <h3>Delete Confirmation</h3>
            </div>
            <div className="confirmation-body">
              <div className="confirmation-message">
                Are you sure you want to delete <strong>{receptionistToDelete.name}</strong>?
                This action cannot be undone.
              </div>
              <div className="confirmation-buttons">
                <button 
                  className="btn-no"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  No
                </button>
                <button 
                  className="btn-yes"
                  onClick={handleDeleteReceptionist}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showAttendanceModal && (
        <div className="modal-backdrop">
          <div className="attendance-modal">
            <div className="attendance-modal-header">
              <h2>Attendance Records</h2>
            </div>
            
            <div className="attendance-modal-body">
              <div className="attendance-date-selector">
                <h3>Select Date</h3>
                <div className="date-picker-container">
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="data-management-buttons">
                  <button 
                    className="optimize-storage-btn" 
                    onClick={cleanupAttendanceStorage}
                    title="Remove old attendance data to free up storage space"
                  >
                    Optimize Storage
                  </button>
                  <button 
                    className="reset-data-btn" 
                    onClick={() => {
                      if (window.confirm('Are you sure? This will reset ALL data to defaults.')) {
                        resetAllStorageData();
                      }
                    }}
                    title="Reset all data if you're experiencing issues"
                  >
                    Reset All Data
                  </button>
                </div>
              </div>
              
              <div className="attendance-list">
                {getAttendanceForDate(selectedDate).map(attendanceRecord => (
                  <div 
                    key={attendanceRecord.id}
                    className={`attendance-item ${attendanceRecord.status}`}
                  >
                    <div className="attendance-profile">
                      {attendanceRecord.profileImg ? (
                        <img 
                          src={attendanceRecord.profileImg} 
                          alt={attendanceRecord.name}
                          className="avatar-img" 
                          style={{ width: '35px', height: '35px' }}
                        />
                      ) : (
                        <div className="avatar" style={{ width: '35px', height: '35px', fontSize: '14px' }}>
                          {attendanceRecord.name ? attendanceRecord.name.charAt(0) : '?'}
                        </div>
                      )}
                      <span>{attendanceRecord.name}</span>
                    </div>
                    
                    <div className="attendance-details">
                      <div className={`attendance-status status-${attendanceRecord.status}`}>
                        {attendanceRecord.status === 'present' ? 'Present' : 'Absent'}
                      </div>
                      {attendanceRecord.status === 'present' && (
                        <div className="attendance-time">{attendanceRecord.time}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="modal-close-btn"
              onClick={() => setShowAttendanceModal(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Shifts Modal */}
      {showShiftsModal && (
        <div className="modal-backdrop">
          <div className="shifts-modal">
            <div className="shifts-modal-header">
              <h2>Shift Management System</h2>
              <button className="close-btn" onClick={() => setShowShiftsModal(false)}>×</button>
            </div>
            <div className="shifts-modal-body">
              {/* Date Selector */}
              <div className="shifts-date-selector">
                <h3>Select Date for Shift Management</h3>
                <div className="date-picker-container">
                  <input
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="shifts-actions">
                  <button className="export-btn" onClick={exportShiftsToCSV}>
                    <FaFileExport /> Export to CSV
                  </button>
                  <button className="auto-assign-btn" onClick={autoAssignShifts}>
                    <FaMagic /> Auto-Assign Shifts
                  </button>
                  <button 
                    className="cancel-btn" 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to clear all shifts for ${formatDate(shiftDate)}?`)) {
                        clearShiftsForDate(shiftDate);
                      }
                    }}
                  >
                    <FaTrash /> Clear All Shifts
                  </button>
                </div>
              </div>

              {/* Shift Statistics */}
              <div className="shifts-stats-summary">
                <h3>Shift Distribution Statistics</h3>
                <div className="stats-grid">
                  {calculateShiftStatistics() ? (
                    <>
                      <div className="stats-item">
                        <div className="stats-label">Total Shifts</div>
                        <div className="stats-value">{calculateShiftStatistics().totalAssignments}</div>
                      </div>
                      <div className="stats-item">
                        <div className="stats-label">Morning</div>
                        <div className="stats-value">{calculateShiftStatistics().byShift.Morning || 0}</div>
                      </div>
                      <div className="stats-item">
                        <div className="stats-label">Afternoon</div>
                        <div className="stats-value">{calculateShiftStatistics().byShift.Afternoon || 0}</div>
                      </div>
                      <div className="stats-item">
                        <div className="stats-label">Night</div>
                        <div className="stats-value">{calculateShiftStatistics().byShift.Night || 0}</div>
                      </div>
                    </>
                  ) : (
                    <div className="no-stats-message">No shift data available</div>
                  )}
                </div>
              </div>

              {/* Shift Legend */}
              <div className="shifts-legend">
                <div className="shift-type morning">
                  <span className="dot"></span>
                  <span>Morning (6AM-2PM)</span>
                </div>
                <div className="shift-type afternoon">
                  <span className="dot"></span>
                  <span>Afternoon (2PM-10PM)</span>
                </div>
                <div className="shift-type night">
                  <span className="dot"></span>
                  <span>Night (10PM-6AM)</span>
                </div>
              </div>

              {/* Shift Staff List */}
              <div className="shifts-list">
                {filteredReceptionists.map((receptionist) => {
                  const shiftsForDate = getShiftsForDate(shiftDate);
                  const receptionistShift = shiftsForDate.find(s => s.receptionistId === receptionist.id);
                  const workloadPercent = getReceptionistWorkload(receptionist.id);
                  
                  return (
                    <div className="shift-item" key={receptionist.id}>
                      <div className="shift-profile">
                        {receptionist.profileImg ? (
                          <img 
                            src={receptionist.profileImg} 
                            alt={receptionist.name}
                            className="avatar-img" 
                          />
                        ) : (
                          <div className="avatar">
                            {receptionist.name.charAt(0)}
                          </div>
                        )}
                        <div className="shift-staff-info">
                          <div className="staff-name">{receptionist.name}</div>
                          <div className="staff-workload">
                            <span className="workload-label">Workload:</span>
                            <div className="workload-bar">
                              <div 
                                className="workload-fill" 
                                style={{ width: `${workloadPercent}%` }}
                              ></div>
                            </div>
                            <span className="workload-percent">{workloadPercent}%</span>
                          </div>
                          {receptionistShift && receptionistShift.autoAssigned && (
                            <span className="auto-assigned-badge">Auto</span>
                          )}
                        </div>
                      </div>
                      <div className="shift-actions">
                        <button 
                          className={`shift-btn morning ${receptionistShift && receptionistShift.shift === 'Morning' ? 'active' : ''}`}
                          onClick={() => assignShift(receptionist.id, 'Morning')}
                        >
                          Morning
                        </button>
                        <button 
                          className={`shift-btn afternoon ${receptionistShift && receptionistShift.shift === 'Afternoon' ? 'active' : ''}`}
                          onClick={() => assignShift(receptionist.id, 'Afternoon')}
                        >
                          Afternoon
                        </button>
                        <button 
                          className={`shift-btn night ${receptionistShift && receptionistShift.shift === 'Night' ? 'active' : ''}`}
                          onClick={() => assignShift(receptionist.id, 'Night')}
                        >
                          Night
                        </button>
                        {receptionistShift && (
                          <button 
                            className="shift-btn remove"
                            onClick={() => removeShift(receptionist.id)}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shift Summary Tabs */}
              <div className="shift-summary-tabs">
                <h3>Shifts Summary</h3>
                <div className="shift-tabs-container">
                  <div className="shift-tab morning">
                    <div className="shift-tab-header">
                      <h4>Morning Shift (6AM-2PM)</h4>
                    </div>
                    <div className="shift-tab-content">
                      {renderShiftStaff('Morning')}
                    </div>
                  </div>
                  
                  <div className="shift-tab afternoon">
                    <div className="shift-tab-header">
                      <h4>Afternoon Shift (2PM-10PM)</h4>
                    </div>
                    <div className="shift-tab-content">
                      {renderShiftStaff('Afternoon')}
                    </div>
                  </div>
                  
                  <div className="shift-tab night">
                    <div className="shift-tab-header">
                      <h4>Night Shift (10PM-6AM)</h4>
                    </div>
                    <div className="shift-tab-content">
                      {renderShiftStaff('Night')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="modal-close-btn" onClick={() => setShowShiftsModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}