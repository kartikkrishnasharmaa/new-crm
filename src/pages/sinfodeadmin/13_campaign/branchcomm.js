import React, { useState } from 'react';

const BranchCommunication = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [communications, setCommunications] = useState([
    {
      id: 1,
      type: 'internal',
      title: 'System Maintenance Alert',
      description: 'Scheduled maintenance this weekend affecting all systems...',
      branch: 'Downtown Branch',
      department: 'IT Department',
      amount: '$2,500',
      status: 'paid',
      priority: 'high',
      author: 'John Smith',
      timestamp: '2 hours ago',
      content: 'Dear Team, We have scheduled system maintenance for this weekend...'
    },
    {
      id: 2,
      type: 'announcement',
      title: 'Holiday Schedule 2024',
      description: 'Updated holiday working hours and branch operations...',
      branch: 'All Branches',
      department: 'HR Department',
      amount: '$1,200',
      status: 'pending',
      priority: 'medium',
      author: 'Sarah Johnson',
      timestamp: '3 hours ago',
      content: 'Dear Team, We are excited to share our holiday schedule...'
    },
    {
      id: 3,
      type: 'event',
      title: 'Quarterly Review Meeting',
      description: 'Q4 performance review and planning session...',
      branch: 'Mall Branch',
      department: 'Management',
      amount: '$3,800',
      status: 'partial',
      priority: 'low',
      author: 'Mike Chen',
      timestamp: 'Dec 15, 2:00 PM',
      content: 'The quarterly review meeting will cover...',
      eventDate: 'Dec 15, 2024 at 2:00 PM'
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Branch Coordination Meeting',
      description: 'Inter-branch coordination and resource sharing...',
      branch: 'Airport Branch',
      department: 'Operations',
      amount: '$950',
      status: 'overdue',
      priority: 'high',
      author: 'Anna Lee',
      timestamp: 'Dec 14, 1:30 PM',
      content: 'Meeting notes from the branch coordination session...'
    }
  ]);

  const [newCommunication, setNewCommunication] = useState({
    type: 'internal',
    branch: '',
    title: '',
    description: '',
    eventDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication({
      ...newCommunication,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: communications.length + 1,
      ...newCommunication,
      author: 'Admin User',
      timestamp: 'Just now',
      status: 'pending',
      priority: 'medium',
      department: 'Administration',
      amount: '$0'
    };
    
    setCommunications([...communications, newItem]);
    setShowCreateModal(false);
    setNewCommunication({
      type: 'internal',
      branch: '',
      title: '',
      description: '',
      eventDate: ''
    });
  };

  const filteredCommunications = communications.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="text-gray-500 shadow-sm">
        <div className="max-w-7xl mx-auto py-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Branch Communication CRM</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                New Communication
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-3xl font-medium text-sm transition-all ${activeTab === 'all' ? 'bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                All Communications
              </button>
              <button 
                onClick={() => setActiveTab('internal')}
                className={`px-4 py-2 rounded-3xl font-medium text-sm transition-all ${activeTab === 'internal' ? 'bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Internal Messages
              </button>
              <button 
                onClick={() => setActiveTab('announcement')}
                className={`px-4 py-2 rounded-3xl font-medium text-sm transition-all ${activeTab === 'announcement' ? 'bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Announcements
              </button>
              <button 
                onClick={() => setActiveTab('event')}
                className={`px-4 py-2 rounded-3xl font-medium text-sm transition-all ${activeTab === 'event' ? 'bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Event Schedule
              </button>
              <button 
                onClick={() => setActiveTab('meeting')}
                className={`px-4 py-2 rounded-3xl font-medium text-sm transition-all ${activeTab === 'meeting' ? 'bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Meeting Notes
              </button>
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Master List (Left Panel) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Communications</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full font-medium">
                    {filteredCommunications.length} items
                  </span>
                </div>
              </div>

              {/* Master List Items */}
              <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                {filteredCommunications.map(item => (
                  <div 
                    key={item.id} 
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${selectedItem?.id === item.id ? 'bg-blue-50 border-l-4 border-l-blue-700' : 'border-l-4 border-l-transparent'}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'internal' ? 'bg-blue-100 text-blue-800' :
                            item.type === 'announcement' ? 'bg-purple-100 text-purple-800' :
                            item.type === 'event' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'high' ? 'bg-red-100 text-red-800' :
                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'paid' ? 'bg-green-100 text-green-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            item.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{item.department}</span>
                          <span>{item.branch}</span>
                          <span className="font-medium text-green-600">{item.amount}</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{item.timestamp}</p>
                        <p className="font-medium">By: {item.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel (Right Panel) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
              {selectedItem ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        selectedItem.type === 'internal' ? 'bg-blue-600' :
                        selectedItem.type === 'announcement' ? 'bg-purple-600' :
                        selectedItem.type === 'event' ? 'bg-green-600' :
                        'bg-orange-600'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          {selectedItem.type === 'internal' ? (
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                          ) : selectedItem.type === 'announcement' ? (
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          ) : selectedItem.type === 'event' ? (
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                          ) : (
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                          )}
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
                        <p className="text-gray-600">
                          {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} • {selectedItem.priority} Priority
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Category:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedItem.type === 'internal' ? 'bg-blue-100 text-blue-800' :
                            selectedItem.type === 'announcement' ? 'bg-purple-100 text-purple-800' :
                            selectedItem.type === 'event' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedItem.priority === 'high' ? 'bg-red-100 text-red-800' :
                            selectedItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedItem.priority.charAt(0).toUpperCase() + selectedItem.priority.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Created:</span>
                          <span className="text-sm text-gray-900">{selectedItem.timestamp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Branch:</span>
                          <span className="text-sm text-gray-900">{selectedItem.branch}</span>
                        </div>
                        {selectedItem.eventDate && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Event Date:</span>
                            <span className="text-sm text-gray-900">{selectedItem.eventDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Author Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Author:</span>
                          <span className="text-sm text-gray-900">{selectedItem.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Department:</span>
                          <span className="text-sm text-gray-900">{selectedItem.department}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Content</h4>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-800">{selectedItem.content}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Communication</h3>
                  <p className="text-gray-600 mb-8">
                    Choose an item from the list to view detailed information and communication content.
                  </p>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2 items-center mx-auto"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    New Communication
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Communication</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Communication Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Communication Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['internal', 'announcement', 'event', 'meeting'].map(type => (
                      <label key={type} className="cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          value={type} 
                          checked={newCommunication.type === type}
                          onChange={handleInputChange}
                          className="sr-only" 
                        />
                        <div className={`border-2 rounded-lg p-4 text-center transition-colors ${
                          newCommunication.type === type ? 
                            type === 'internal' ? 'border-blue-500' :
                            type === 'announcement' ? 'border-purple-500' :
                            type === 'event' ? 'border-green-500' :
                            'border-orange-500' :
                            'border-gray-200'
                        }`}>
                          <svg className={`w-8 h-8 mx-auto mb-2 ${
                            type === 'internal' ? 'text-blue-600' :
                            type === 'announcement' ? 'text-purple-600' :
                            type === 'event' ? 'text-green-600' :
                            'text-orange-600'
                          }`} fill="currentColor" viewBox="0 0 24 24">
                            {type === 'internal' ? (
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                            ) : type === 'announcement' ? (
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            ) : type === 'event' ? (
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            ) : (
                              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                            )}
                          </svg>
                          <p className="font-medium text-gray-800">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Branch *</label>
                    <select 
                      name="branch"
                      value={newCommunication.branch}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Branch</option>
                      <option>All Branches</option>
                      <option>Downtown Branch</option>
                      <option>Mall Branch</option>
                      <option>Airport Branch</option>
                      <option>Suburb Branch</option>
                      <option>North Branch</option>
                      <option>South Branch</option>
                      <option>East Branch</option>
                      <option>West Branch</option>
                    </select>
                  </div>
                  {newCommunication.type === 'event' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
                      <input 
                        type="date" 
                        name="eventDate"
                        value={newCommunication.eventDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={newCommunication.type === 'event'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={newCommunication.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea 
                    rows="4"
                    name="description"
                    value={newCommunication.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-3xl font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
              >
                Create Communication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchCommunication;