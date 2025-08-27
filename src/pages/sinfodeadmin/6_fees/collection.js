import React, { useState, useEffect } from 'react';
import axios from "../../../api/axiosConfig";
import './Collection.css';

const Collection = () => {
  const [showModal, setShowModal] = useState(false);
  const [feeRecords, setFeeRecords] = useState([]);
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    total_fee: '',
    due_date: '',
    paid_amount: '',
    discount: '',
    penalty: ''
  });

  // Fetch all fee records
  useEffect(() => {
    const fetchFeeRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/studentfee", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeeRecords(res.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fee records:", error);
        setLoading(false);
      }
    };
    fetchFeeRecords();
  }, []);

  // Fetch all branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/branches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches(res.data || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/courses/index", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch students when course changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCourse) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/courses/${selectedCourse}/show`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudents(res.data.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  // Filter students by branch
  const filteredStudents = students.filter(
    (s) => !selectedBranch || s.branch_id?.toString() === selectedBranch
  );

  const openModal = () => {
    setShowModal(true);
    // Reset selections when opening modal
    setSelectedBranch('');
    setSelectedCourse('');
    setSelectedStudent('');
    setFormData({
      total_fee: '',
      due_date: '',
      paid_amount: '',
      discount: '',
      penalty: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const dataToSubmit = {
        student_id: selectedStudent,
        course_name: selectedCourse,
        total_fee: formData.total_fee,
        due_date: formData.due_date,
        paid_amount: formData.paid_amount,
        discount: formData.discount,
        penalty: formData.penalty
      };

      const res = await axios.post('/studentfee', dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the fee records
      const feeRes = await axios.get("/studentfee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeeRecords(feeRes.data || []);
      
      alert("Fee record saved successfully!");
      closeModal();
    } catch (error) {
      console.error("Error saving fee data:", error);
      alert("Error saving fee data. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (pendingAmount) => {
    if (pendingAmount === 0) {
      return <span className="status-badge paid">Paid</span>;
    } else if (pendingAmount > 0) {
      return <span className="status-badge pending">Pending</span>;
    } else {
      return <span className="status-badge advance">Advance</span>;
    }
  };

  if (loading) {
    return <div className="loading">Loading fee records...</div>;
  }

  return (
    <div className="collection-container">
      <div className="collection-header">
        <h1>Fee Collection Management</h1>
        <button onClick={openModal} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Fee Collection
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-info">
            <h3>{feeRecords.length}</h3>
            <p>Total Fee Records</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon paid">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{feeRecords.filter(r => r.pending_amount === 0).length}</h3>
            <p>Fully Paid</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{feeRecords.filter(r => r.pending_amount > 0).length}</h3>
            <p>Pending Payments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon advance">
            <i className="fas fa-plus-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{feeRecords.filter(r => r.pending_amount < 0).length}</h3>
            <p>Advance Payments</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Fee Records</h2>
        <div className="table-responsive">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Total Fee</th>
                <th>Paid Amount</th>
                <th>Pending Amount</th>
                <th>Discount</th>
                <th>Penalty</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payments</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.length === 0 ? (
                <tr>
                  <td colSpan="10" className="no-data">No fee records found</td>
                </tr>
              ) : (
                feeRecords.map(record => (
                  <tr key={record.id}>
                    <td className="student-info">
                      <div className="student-name">{record.student?.full_name}</div>
                      <div className="student-id">{record.student?.admission_number}</div>
                    </td>
                    <td>Course ID: {record.course_name}</td>
                    <td>{formatCurrency(record.total_fee)}</td>
                    <td>{formatCurrency(record.paid_amount)}</td>
                    <td>{formatCurrency(record.pending_amount)}</td>
                    <td>{formatCurrency(record.discount)}</td>
                    <td>{formatCurrency(record.penalty)}</td>
                    <td>{formatDate(record.due_date)}</td>
                    <td>{getStatusBadge(record.pending_amount)}</td>
                    <td>{record.payments?.length || 0} payments</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Fee Collection</h3>
              <button onClick={closeModal} className="modal-close">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Branch</label>
                  <select 
                    value={selectedBranch} 
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Course</label>
                  <select 
                    value={selectedCourse} 
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {courses
                      .filter(course => !selectedBranch || course.branch_id?.toString() === selectedBranch)
                      .map(course => (
                        <option key={course.id} value={course.id}>
                          {course.course_name} ({course.course_code})
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Student</label>
                <select 
                  value={selectedStudent} 
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                >
                  <option value="">Select Student</option>
                  {filteredStudents.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Fee (₹)</label>
                  <input 
                    type="number" 
                    name="total_fee"
                    value={formData.total_fee}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Paid Amount (₹)</label>
                  <input 
                    type="number" 
                    name="paid_amount"
                    value={formData.paid_amount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Discount (₹)</label>
                  <input 
                    type="number" 
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Penalty (₹)</label>
                  <input 
                    type="number" 
                    name="penalty"
                    value={formData.penalty}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Fee Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;