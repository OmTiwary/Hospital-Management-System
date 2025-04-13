import React, { useState } from 'react';
import './Revenue.css';

const RevenuePage = () => {
  const [transactions, setTransactions] = useState([
    { date: '2025-04-01', type: 'INCOME', description: 'Consultation Fee', amount: 3000 },
    { date: '2025-04-02', type: 'EXPENSE', description: 'Medical Equipment', amount: -1500 },
    { date: '2025-04-03', type: 'EXPENSE', description: 'Lunch', amount: -300 },
    { date: '2025-04-04', type: 'INCOME', description: 'Follow-up Fee', amount: 2000 },
    { date: '2025-04-05', type: 'EXPENSE', description: 'Stationery', amount: -250 },
    { date: '2025-04-06', type: 'INCOME', description: 'Surgery Assistance', amount: 7000 },
    { date: '2025-04-07', type: 'Expense', description: 'Electricity Bill', amount: -1200 },
    { date: '2025-04-08', type: 'Income', description: 'Health Checkup Camp', amount: 5000 },
    { date: '2025-04-09', type: 'Expense', description: 'Snacks', amount: -200 },
    { date: '2025-04-10', type: 'Income', description: 'Emergency Visit', amount: 3500 },
    { date: '2025-04-11', type: 'Expense', description: 'Internet Bill', amount: -900 },
    { date: '2025-04-12', type: 'Expense', description: 'Cleaning Services', amount: -1100 },
    { date: '2025-04-13', type: 'Income', description: 'Prescription Charge', amount: 800 },
    { date: '2025-04-14', type: 'Expense', description: 'Transport', amount: -400 },
    { date: '2025-04-15', type: 'Income', description: 'Consultation Fee', amount: 3200 },
    { date: '2025-04-16', type: 'Expense', description: 'Clinic Rent', amount: -7000 },
    { date: '2025-04-17', type: 'Income', description: 'Routine Checkup', amount: 1500 },
    { date: '2025-04-18', type: 'Expense', description: 'Medical Books', amount: -600 },
    { date: '2025-04-19', type: 'Income', description: 'X-Ray Analysis', amount: 1800 },
    { date: '2025-04-20', type: 'Expense', description: 'Tea and Snacks', amount: -220 }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', type: 'INCOME', description: '', amount: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([...transactions, {
      ...formData,
      amount: parseInt(formData.amount)
    }]);
    setFormData({ date: '', type: 'INCOME', description: '', amount: '' });
    setModalOpen(false);
  };

  return (
    <div className="revenue-page">
      <div className="revenue-header">
        <h2>Revenue Summary</h2>
        <button className="add-btn" onClick={() => setModalOpen(true)}>+ Add Transaction</button>
      </div>

      <div className="summary-cards">
        <div className="card">This Month<br /><strong>₹75,000</strong></div>
        <div className="card">Previous Month<br /><strong>₹68,500</strong></div>
        <div className="card">Last Year<br /><strong>₹8,75,000</strong></div>
        <div className="card">Total Income<br /><strong>₹15,50,000</strong></div>
      </div>

      <h3 className="transaction-heading">Transactions</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx}>
              <td>{txn.date}</td>
              <td className={txn.type.toLowerCase()}>{txn.type}</td>
              <td>{txn.description}</td>
              <td className={txn.amount >= 0 ? 'positive' : 'negative'}>{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="print-button-container">
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Slip
        </button>
      </div>


      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Transaction</h3>
            <input name="date" type="date" onChange={handleInputChange} value={formData.date} />
            <select name="type" onChange={handleInputChange} value={formData.type}>
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
            <input name="description" type="text" placeholder="Description" onChange={handleInputChange} value={formData.description} />
            <input name="amount" type="number" placeholder="Amount" onChange={handleInputChange} value={formData.amount} />
            <button onClick={addTransaction}>Add</button>
            <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenuePage;