import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

function Report() {
  const [activeTab, setActiveTab] = useState('students');
  const [studentsData, setStudentsData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    course: '',
    batch: '',
    status: '',
    search: ''
  });

  // Sample data (replace with API calls)
  const feesData = [
    { student: 'John Smith', course: 'Computer Science', amount: 2500, dueDate: '2024-01-15', daysOverdue: 5 },
    { student: 'Mike Wilson', course: 'Physics', amount: 1800, dueDate: '2024-01-10', daysOverdue: 10 },
    { student: 'Emily Davis', course: 'Chemistry', amount: 2200, dueDate: '2024-01-20', daysOverdue: 0 }
  ];

  const attendanceData = [
    { student: 'John Smith', course: 'Computer Science', total: 45, present: 42, absent: 3, percentage: 93.3 },
    { student: 'Sarah Johnson', course: 'Mathematics', total: 40, present: 38, absent: 2, percentage: 95.0 },
    { student: 'Mike Wilson', course: 'Physics', total: 35, present: 28, absent: 7, percentage: 80.0 }
  ];

  const performanceData = [
    { student: 'John Smith', course: 'Computer Science', assignments: 88, exams: 92, overall: 'A-', trend: 'up' },
    { student: 'Sarah Johnson', course: 'Mathematics', assignments: 95, exams: 98, overall: 'A+', trend: 'up' },
    { student: 'Mike Wilson', course: 'Physics', assignments: 75, exams: 78, overall: 'B+', trend: 'stable' }
  ];

  useEffect(() => {
    // Fetch students data from API
    const fetchStudents = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await axios.get('/api/students');
        // setStudentsData(response.data);
        // setFilteredStudents(response.data);
        
        // Using sample data for now
        const sampleStudents = [
          { id: 1, name: 'John Smith', course: 'Computer Science', batch: '2024-A', status: 'Active', enrollmentDate: '2024-01-15', email: 'john@email.com' },
          { id: 2, name: 'Sarah Johnson', course: 'Mathematics', batch: '2024-B', status: 'Active', enrollmentDate: '2024-02-01', email: 'sarah@email.com' },
          { id: 3, name: 'Mike Wilson', course: 'Physics', batch: '2023-A', status: 'Inactive', enrollmentDate: '2023-09-10', email: 'mike@email.com' },
          { id: 4, name: 'Emily Davis', course: 'Chemistry', batch: '2024-A', status: 'Pending', enrollmentDate: '2024-03-05', email: 'emily@email.com' },
          { id: 5, name: 'David Brown', course: 'Computer Science', batch: '2024-B', status: 'Active', enrollmentDate: '2024-01-20', email: 'david@email.com' }
        ];
        
        setStudentsData(sampleStudents);
        setFilteredStudents(sampleStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
        showNotification('Failed to load student data', 'error');
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [filters, studentsData]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filterStudents = () => {
    const filtered = studentsData.filter(student => {
      return (
        (!filters.course || student.course === filters.course) &&
        (!filters.batch || student.batch === filters.batch) &&
        (!filters.status || student.status === filters.status) &&
        (!filters.search || 
          student.name.toLowerCase().includes(filters.search.toLowerCase()) || 
          student.email.toLowerCase().includes(filters.search.toLowerCase()))
      );
    });
    setFilteredStudents(filtered);
  };

  const showNotification = (message, type) => {
    // Implement your notification system here
    console.log(`${type}: ${message}`);
  };

  const exportStudents = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Course,Batch,Status,Enrollment Date,Email\n" +
      filteredStudents.map(s => `${s.name},${s.course},${s.batch},${s.status},${s.enrollmentDate},${s.email}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Student list exported successfully!', 'success');
  };

  const exportFees = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Student,Course,Amount,Due Date,Days Overdue\n" +
      feesData.map(f => `${f.student},${f.course},$${f.amount},${f.dueDate},${f.daysOverdue}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fee_due_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Fee report exported successfully!', 'success');
  };

  const exportAttendance = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Student,Course,Total Classes,Present,Absent,Attendance %\n" +
      attendanceData.map(a => `${a.student},${a.course},${a.total},${a.present},${a.absent},${a.percentage}%`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Attendance report exported successfully!', 'success');
  };

  const exportPerformance = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Student,Course,Assignments,Exams,Overall Grade,Trend\n" +
      performanceData.map(p => `${p.student},${p.course},${p.assignments}%,${p.exams}%,${p.overall},${p.trend}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "performance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Performance report exported successfully!', 'success');
  };

  const exportAllData = () => {
    exportStudents();
    setTimeout(() => exportFees(), 500);
    setTimeout(() => exportAttendance(), 1000);
    setTimeout(() => exportPerformance(), 1500);
    
    showNotification('All reports exported successfully!', 'success');
  };

  const refreshData = () => {
    // Implement data refresh logic
    showNotification('Data refreshed successfully!', 'success');
  };

  const viewStudent = (id) => {
    const student = studentsData.find(s => s.id === id);
    showNotification(`Viewing details for ${student.name}`, 'info');
  };

  const editStudent = (id) => {
    const student = studentsData.find(s => s.id === id);
    showNotification(`Editing ${student.name}`, 'info');
  };

  const sendReminder = (studentName) => {
    showNotification(`Reminder sent to ${studentName}`, 'success');
  };

  const recordPayment = (studentName) => {
    showNotification(`Payment recorded for ${studentName}`, 'success');
  };

  // Helper function to get status class
  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SAAdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-700 text-white p-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                <p className="text-blue-100">Comprehensive insights and data management</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={exportAllData} 
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  <i className="fas fa-download mr-2"></i>Export All
                </button>
                <button 
                  onClick={refreshData} 
                  className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-200"
                >
                  <i className="fas fa-sync-alt mr-2"></i>Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="flex flex-wrap border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('students')} 
                className={`px-6 py-4 font-semibold transition-colors duration-200 flex items-center ${activeTab === 'students' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <i className="fas fa-users mr-2"></i>Student List
              </button>
              <button 
                onClick={() => setActiveTab('fees')} 
                className={`px-6 py-4 font-semibold transition-colors duration-200 flex items-center ${activeTab === 'fees' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <i className="fas fa-dollar-sign mr-2"></i>Fee Due Report
              </button>
              <button 
                onClick={() => setActiveTab('attendance')} 
                className={`px-6 py-4 font-semibold transition-colors duration-200 flex items-center ${activeTab === 'attendance' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <i className="fas fa-calendar-check mr-2"></i>Attendance Summary
              </button>
              <button 
                onClick={() => setActiveTab('performance')} 
                className={`px-6 py-4 font-semibold transition-colors duration-200 flex items-center ${activeTab === 'performance' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <i className="fas fa-chart-line mr-2"></i>Performance Report
              </button>
            </div>
          </div>

          {/* Student List Tab */}
          {activeTab === 'students' && (
            <div>
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                    <select 
                      value={filters.course} 
                      onChange={(e) => handleFilterChange('course', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">All Courses</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                    <select 
                      value={filters.batch} 
                      onChange={(e) => handleFilterChange('batch', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">All Batches</option>
                      <option value="2024-A">2024-A</option>
                      <option value="2024-B">2024-B</option>
                      <option value="2023-A">2023-A</option>
                      <option value="2023-B">2023-B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={filters.status} 
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input 
                      type="text" 
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Search students..." 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Student List */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-lg font-semibold">Student List</h3>
                  <button 
                    onClick={exportStudents} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <i className="fas fa-file-excel mr-2"></i>Export Excel
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-semibold">{student.name.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.batch}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(student.status)}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.enrollmentDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => viewStudent(student.id)} 
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => editStudent(student.id)} 
                              className="text-green-600 hover:text-green-900"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fee Due Report Tab */}
          {activeTab === 'fees' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <i className="fas fa-exclamation-triangle text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                      <p className="text-2xl font-bold text-gray-900">$45,230</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                      <p className="text-2xl font-bold text-gray-900">$12,450</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <i className="fas fa-users text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Students with Dues</p>
                      <p className="text-2xl font-bold text-gray-900">23</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-lg font-semibold">Fee Due Details</h3>
                  <button 
                    onClick={exportFees} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <i className="fas fa-file-pdf mr-2"></i>Export PDF
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {feesData.map((fee, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">${fee.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.dueDate}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${fee.daysOverdue > 0 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                            {fee.daysOverdue > 0 ? `${fee.daysOverdue} days` : 'Not overdue'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => sendReminder(fee.student)} 
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Send Reminder
                            </button>
                            <button 
                              onClick={() => recordPayment(fee.student)} 
                              className="text-green-600 hover:text-green-900"
                            >
                              Record Payment
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Summary Tab */}
          {activeTab === 'attendance' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Attendance chart would be displayed here</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Trend chart would be displayed here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-lg font-semibold">Detailed Attendance Report</h3>
                  <button 
                    onClick={exportAttendance} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <i className="fas fa-file-excel mr-2"></i>Export Excel
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Classes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendanceData.map((attendance, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attendance.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attendance.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{attendance.present}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{attendance.absent}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                            attendance.percentage >= 90 ? 'text-green-600' : 
                            attendance.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attendance.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Performance Report Tab */}
          {activeTab === 'performance' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Grade chart would be displayed here</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Score</span>
                      <span className="text-2xl font-bold text-green-600">85.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Top Performer</span>
                      <span className="font-semibold">Sarah Johnson (96.5%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Students Above 80%</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Improvement Rate</span>
                      <span className="text-green-600 font-semibold">+12.3%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="text-lg font-semibold">Student Performance Details</h3>
                  <button 
                    onClick={exportPerformance} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <i className="fas fa-file-pdf mr-2"></i>Export PDF
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {performanceData.map((performance, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{performance.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.assignments}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{performance.exams}%</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                            performance.overall.includes('A') ? 'text-green-600' : 
                            performance.overall.includes('B') ? 'text-blue-600' : 'text-yellow-600'
                          }`}>
                            {performance.overall}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {performance.trend === 'up' ? '📈' : 
                             performance.trend === 'down' ? '📉' : '➡️'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default Report;