import React, { useState, useEffect } from 'react';
import axios from "../../../api/axiosConfig";
import './FeesStructure.css';

const FeesStructure = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [viewStructure, setViewStructure] = useState(null);
  const [formData, setFormData] = useState({
    course_id: '',
    fee_type: '',
    amount: '',
    payment_mode: '',
    number_of_installments: '',
  });
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch fee structures
  const fetchFeeStructures = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/fee-structures", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeeStructures(res.data || []);
    } catch (error) {
      console.error("Error fetching fee structures:", error);
    }
  };

  // Fetch all courses
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

  useEffect(() => {
    fetchFeeStructures();
    fetchCourses();
  }, []);

  // Update selected course when formData.course_id changes
  useEffect(() => {
    if (formData.course_id) {
      const course = courses.find(c => c.id === parseInt(formData.course_id));
      setSelectedCourse(course);
    } else {
      setSelectedCourse(null);
    }
  }, [formData.course_id, courses]);

  // Stats calculation
  const totalFees = feeStructures.reduce((sum, structure) => sum + parseFloat(structure.amount), 0);
  const totalInstallments = feeStructures.reduce((sum, structure) => 
    sum + (structure.payment_mode === 'installments' ? structure.number_of_installments : 0), 0);
  const totalCourses = new Set(feeStructures.map(s => s.course_id)).size;

  const openModal = (mode, id = null) => {
    setCurrentEditId(id);
    if (mode === 'edit' && id) {
      const structure = feeStructures.find(s => s.id === id);
      if (structure) {
        setFormData({
          course_id: structure.course_id,
          fee_type: structure.fee_type,
          amount: structure.amount,
          payment_mode: structure.payment_mode,
          number_of_installments: structure.number_of_installments || '',
        });
      }
    } else {
      setFormData({
        course_id: '',
        fee_type: '',
        amount: '',
        payment_mode: '',
        number_of_installments: '',
      });
      setSelectedCourse(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEditId(null);
    setSelectedCourse(null);
  };

  const handleView = (id) => {
    const structure = feeStructures.find(s => s.id === id);
    setViewStructure(structure);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewStructure(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const feeData = {
        course_id: parseInt(formData.course_id),
        fee_type: formData.fee_type,
        amount: formData.amount,
        payment_mode: formData.payment_mode,
        number_of_installments: formData.payment_mode === 'installments' ? parseInt(formData.number_of_installments) : 0,
      };

      if (currentEditId) {
        // Update existing fee structure
        const res = await axios.put(`/fee-structures/${currentEditId}`, feeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeeStructures(feeStructures.map(s => s.id === currentEditId ? res.data : s));
      } else {
        // Create new fee structure
        const res = await axios.post('/fee-structures', feeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeeStructures([...feeStructures, res.data]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving fee structure:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="fees-structure-container">
      {/* Header */}
      <header className="fs-header">
        <div className="fs-header-content">
          <div className="fs-header-left">
            <div className="fs-logo">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="fs-header-text">
              <h1>Fee Structure Management</h1>
              <p>Manage course fees and payment structures</p>
            </div>
          </div>
          <button onClick={() => openModal('add')} className="fs-add-btn">
            <i className="fas fa-plus"></i>
            Add Fee Structure
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="fs-main">
        {/* Stats Cards */}
        <div className="fs-stats-grid">
          <div className="fs-stat-card">
            <div className="fs-stat-content">
              <div className="fs-stat-icon bg-blue">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="fs-stat-text">
                <p>Total Fees</p>
                <h3>₹{totalFees.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          
          <div className="fs-stat-card">
            <div className="fs-stat-content">
              <div className="fs-stat-icon bg-orange">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="fs-stat-text">
                <p>Total Installments</p>
                <h3>{totalInstallments}</h3>
              </div>
            </div>
          </div>
          
          <div className="fs-stat-card">
            <div className="fs-stat-content">
              <div className="fs-stat-icon bg-green">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="fs-stat-text">
                <p>Active Structures</p>
                <h3>{feeStructures.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="fs-stat-card">
            <div className="fs-stat-content">
              <div className="fs-stat-icon bg-purple">
                <i className="fas fa-book"></i>
              </div>
              <div className="fs-stat-text">
                <p>Courses</p>
                <h3>{totalCourses}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structures Table */}
        <div className="fs-table-container">
          <div className="fs-table-header">
            <h2>Fee Structures</h2>
          </div>
          <div className="fs-table-wrapper">
            <table className="fs-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Fee Type</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Installments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeStructures.map(structure => (
                  <tr key={structure.id}>
                    <td>
                      <div className="fs-course-info">
                        <div className="fs-course-icon">
                          <i className="fas fa-book"></i>
                        </div>
                        <div>
                          <div className="fs-course-name">{structure.course?.course_name}</div>
                          <div className="fs-course-details">
                            {structure.course?.course_code} • {structure.course?.mode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="fs-badge fs-badge-blue">
                        {structure.fee_type}
                      </span>
                    </td>
                    <td className="fs-amount">
                      ₹{parseFloat(structure.amount).toLocaleString()}
                    </td>
                    <td>
                      <span className={`fs-badge ${structure.payment_mode === 'installments' ? 'fs-badge-green' : 'fs-badge-orange'}`}>
                        {structure.payment_mode}
                      </span>
                    </td>
                    <td>
                      {structure.payment_mode === 'installments' 
                        ? `${structure.number_of_installments} installments` 
                        : `${structure.number_of_installments}`}
                    </td>
                    <td>
                      <div className="fs-actions">
                        <button onClick={() => handleView(structure.id)} className="fs-action-btn text-blue">
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fs-modal-backdrop">
          <div className="fs-modal">
            <div className="fs-modal-header">
              <h3>{currentEditId ? 'Edit Fee Structure' : 'Add Fee Structure'}</h3>
              <button onClick={closeModal} className="fs-modal-close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="fs-modal-form">
              <div className="fs-form-grid">
                <div className="fs-form-group">
                  <label>Course</label>
                  <select 
                    name="course_id"
                    value={formData.course_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.course_name} ({course.course_code})
                      </option>
                    ))}
                  </select>
                  {selectedCourse && (
                    <div className="fs-course-price-info">
                      <p>Actual Price: ₹{parseFloat(selectedCourse.actual_price).toLocaleString()}</p>
                      {selectedCourse.discounted_price && (
                        <p>Discounted Price: ₹{parseFloat(selectedCourse.discounted_price).toLocaleString()}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="fs-form-group">
                  <label>Fee Type</label>
                  <select 
                    name="fee_type"
                    value={formData.fee_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Fee Type</option>
                    <option value="Tuition">Tuition</option>
                    <option value="Exam">Exam</option>
                    <option value="Library">Library</option>
                    <option value="Miscellaneous">Other</option>
                  </select>
                </div>
                
                <div className="fs-form-group">
                  <label>Amount (₹)</label>
                  <input 
                    type="number" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="fs-form-group">
                  <label>Payment Mode</label>
                  <select 
                    name="payment_mode"
                    value={formData.payment_mode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="installments">Installments</option>
                    <option value="Lumpsum">Lumpsum</option>
                    <option value="EMI">EMI</option>
                  </select>
                </div>
              </div>
              
              {formData.payment_mode === 'installments' && (
                <div className="fs-installment-section">
                  <div className="fs-form-group">
                    <label>Number of Installments</label>
                    <input 
                      type="number" 
                      name="number_of_installments"
                      value={formData.number_of_installments}
                      onChange={handleInputChange}
                      min="2"
                      max="12"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="fs-modal-actions">
                <button type="button" onClick={closeModal} className="fs-cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="fs-save-btn">
                  <i className="fas fa-save"></i>
                  Save Fee Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewStructure && (
        <div className="fs-modal-backdrop">
          <div className="fs-modal">
            <div className="fs-modal-header">
              <h3>Fee Structure Details</h3>
              <button onClick={closeViewModal} className="fs-modal-close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="fs-view-content">
              <div className="fs-view-grid">
                <div>
                  <h4>Course Information</h4>
                  <div className="fs-info-box">
                    <p className="fs-info-title">{viewStructure.course?.course_name}</p>
                    <p>Code: {viewStructure.course?.course_code}</p>
                    <p>Mode: {viewStructure.course?.mode}</p>
                    <p>Actual Price: ₹{parseFloat(viewStructure.course?.actual_price).toLocaleString()}</p>
                    {viewStructure.course?.discounted_price && (
                      <p>Discounted Price: ₹{parseFloat(viewStructure.course?.discounted_price).toLocaleString()}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4>Fee Details</h4>
                  <div className="fs-info-box">
                    <p className="fs-info-title">₹{parseFloat(viewStructure.amount).toLocaleString()}</p>
                    <p>Type: {viewStructure.fee_type}</p>
                    <p>Mode: {viewStructure.payment_mode}</p>
                  </div>
                </div>
              </div>
              
              {viewStructure.payment_mode === 'installments' && (
                <div>
                  <h4>Installment Information</h4>
                  <div className="fs-info-box">
                    <p className="fs-info-title">{viewStructure.number_of_installments} Installments</p>
                    {viewStructure.due_dates && viewStructure.due_dates.length > 0 ? (
                      <div>
                        <p>Due Dates:</p>
                        <ul>
                          {viewStructure.due_dates.map((date, index) => (
                            <li key={index}>{new Date(date).toLocaleDateString()}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Due dates will be set separately</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="fs-meta-info">
                <p>Created: {new Date(viewStructure.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(viewStructure.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesStructure;