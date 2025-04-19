import React, { useState } from 'react';
import './Inventory.css';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter, FaSort, FaFileExport } from 'react-icons/fa';

const Inventory = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      itemNo: 'MED002',
      manufacturer: 'Cipla Ltd',
      category: 'Medication',
      storeBox: 'A1.2',
      price: 150,
      quantity: 200,
      expiryDate: '2027-12-31',
      condition: 'Good'
    }
  ]);

  const [filters, setFilters] = useState({ search: '', category: '', condition: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: '', itemNo: '', manufacturer: '', category: '', storeBox: '',
    price: '', quantity: '', expiryDate: '', condition: ''
  });

  const categories = ['Medication', 'Equipment', 'Supplies', 'Instruments', 'PPE'];
  const conditions = ['Good', 'Fair', 'Critical', 'Expired'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.category === '' || item.category === filters.category) &&
    (filters.condition === '' || item.condition === filters.condition)
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;
    const aVal = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
    const bVal = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];
    if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const handleAddItem = () => {
    setInventory(prev => [...prev, { ...newItem, id: Date.now() }]);
    setShowAddModal(false);
    setNewItem({
      name: '', itemNo: '', manufacturer: '', category: '', storeBox: '',
      price: '', quantity: '', expiryDate: '', condition: ''
    });
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    setInventory(prev =>
      prev.map(item => item.id === editItem.id ? editItem : item)
    );
    setShowEditModal(false);
    setEditItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Item No', 'Manufacturer', 'Category', 'Store Box', 'Price', 'Quantity', 'Expiry Date', 'Condition'];
    const data = filteredInventory.map(item => [
      item.name, item.itemNo, item.manufacturer, item.category,
      item.storeBox, item.price, item.quantity, item.expiryDate, item.condition
    ]);
    const csvContent = [headers.join(','), ...data.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <div className="header-actions">
          <button className="export-btn" onClick={exportToCSV}><FaFileExport /> Export CSV</button>
          <button className="add-btn" onClick={() => setShowAddModal(true)}><FaPlus /> Add New Item</button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search inventory..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select name="condition" value={filters.condition} onChange={handleFilterChange}>
            <option value="">All Conditions</option>
            {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
          </select>
        </div>
      </div>

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              {['name', 'itemNo', 'manufacturer', 'category', 'storeBox', 'price', 'quantity', 'expiryDate', 'condition'].map(header => (
                <th key={header} onClick={() => handleSort(header)}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                  {sortConfig.key === header && (
                    <FaSort className={`sort-icon ${sortConfig.direction}`} />
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.itemNo}</td>
                <td>{item.manufacturer}</td>
                <td>{item.category}</td>
                <td>{item.storeBox}</td>
                <td>₹{item.price}</td>
                <td className={item.quantity < 50 ? 'low-stock' : ''}>{item.quantity}</td>
                <td>{item.expiryDate}</td>
                <td><span className={`status-${item.condition.toLowerCase()}`}>{item.condition}</span></td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(item)}><FaEdit /></button>
                  <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Item</h3>
            {['name', 'itemNo', 'manufacturer', 'storeBox', 'price', 'quantity', 'expiryDate'].map(field => (
              <input
                key={field}
                type={field === 'price' || field === 'quantity' ? 'number' : field === 'expiryDate' ? 'date' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newItem[field]}
                onChange={e => setNewItem({ ...newItem, [field]: e.target.value })}
              />
            ))}
            <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={newItem.condition} onChange={e => setNewItem({ ...newItem, condition: e.target.value })}>
              <option value="">Select Condition</option>
              {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
            </select>
            <div className="modal-buttons">
              <button onClick={handleAddItem}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Item</h3>
            {Object.keys(editItem).filter(key => key !== 'id').map(key => (
              key !== 'category' && key !== 'condition' ? (
                <input
                  key={key}
                  type={key === 'price' || key === 'quantity' ? 'number' : key === 'expiryDate' ? 'date' : 'text'}
                  value={editItem[key]}
                  onChange={e => setEditItem({ ...editItem, [key]: e.target.value })}
                />
              ) : (
                <select key={key} value={editItem[key]} onChange={e => setEditItem({ ...editItem, [key]: e.target.value })}>
                  <option value="">{`Select ${key}`}</option>
                  {(key === 'category' ? categories : conditions).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )
            ))}
            <div className="modal-buttons">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
