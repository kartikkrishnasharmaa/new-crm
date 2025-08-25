import { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Sinfodeadmin";

export default function Lead() {
  const [leads, setLeads] = useState([]);
  const [leadCounter, setLeadCounter] = useState(100001);
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    primaryContact: "",
    alternateContact: "",
    email: "",
    leadSource: "",
    leadStatus: "New",
    leadOwner: "",
    priority: "Medium",
    interestedCourse: "",
    budgetRange: "",
    followUpDate: "",
    followUpTime: "",
    notes: "",
  });

  useEffect(() => {
    generateLeadId();
    setDefaultValues();
  }, []);

  const generateLeadId = () => {
    const newId = "LD-" + leadCounter.toString().padStart(6, "0");
    setFormData((prev) => ({ ...prev, id: newId }));
  };

  const setDefaultValues = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      leadStatus: "New",
      priority: "Medium",
      followUpDate: today,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const saveLead = (e) => {
    e.preventDefault();

    const newLead = {
      ...formData,
      createdOn: new Date().toLocaleString(),
      lastContacted: new Date().toLocaleString(),
      conversionDate:
        formData.leadStatus === "Converted"
          ? new Date().toLocaleString()
          : null,
    };

    setLeads((prev) => [...prev, newLead]);
    setLeadCounter((prev) => prev + 1);

    // Reset form
    setFormData({
      id: "",
      fullName: "",
      primaryContact: "",
      alternateContact: "",
      email: "",
      leadSource: "",
      leadStatus: "New",
      leadOwner: "",
      priority: "Medium",
      interestedCourse: "",
      budgetRange: "",
      followUpDate: new Date().toISOString().split("T")[0],
      followUpTime: "",
      notes: "",
    });

    generateLeadId();
    setActiveTab("leads");
    // You would typically show a notification here
  };

  const clearForm = () => {
    setFormData({
      id: "",
      fullName: "",
      primaryContact: "",
      alternateContact: "",
      email: "",
      leadSource: "",
      leadStatus: "New",
      leadOwner: "",
      priority: "Medium",
      interestedCourse: "",
      budgetRange: "",
      followUpDate: new Date().toISOString().split("T")[0],
      followUpTime: "",
      notes: "",
    });
    generateLeadId();
  };

  const getStatusBadge = (status) => {
    const badges = {
      New: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          New
        </span>
      ),
      Contacted: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Contacted
        </span>
      ),
      "Follow-up": (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          Follow-up
        </span>
      ),
      "Demo Scheduled": (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Demo Scheduled
        </span>
      ),
      Converted: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Converted
        </span>
      ),
      Lost: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Lost
        </span>
      ),
    };
    return (
      badges[status] || (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unknown
        </span>
      )
    );
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      High: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          High
        </span>
      ),
      Medium: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Medium
        </span>
      ),
      Low: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Low
        </span>
      ),
    };
    return (
      badges[priority] || (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unknown
        </span>
      )
    );
  };
  const editLead = (lead) => {
    setFormData(lead);
    setActiveTab("new-lead");
  };

  // Filter leads based on search and status filter
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchTerm === "" ||
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.primaryContact.includes(searchTerm);

    const matchesStatus =
      statusFilter === "" || lead.leadStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate report stats
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(
    (l) => l.leadStatus === "Converted"
  ).length;
  const inProgressLeads = leads.filter((l) =>
    ["Contacted", "Follow-up", "Demo Scheduled"].includes(l.leadStatus)
  ).length;
  const lostLeads = leads.filter((l) => l.leadStatus === "Lost").length;

  return (
    <SAAdminLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-sf-border sf-shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-sf-blue rounded flex items-center justify-center">
                    <i className="fas fa-cloud text-white text-lg"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-semibold text-sf-text">
                    Lead Management
                  </h1>
                </div>
              </div>
  
            </div>
          </div>
        </header>

        <div className="max-w-full mx-auto  sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg sf-shadow mb-6">
            <div className="border-b border-sf-border">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`py-4 px-1 border-b-2 ${
                    activeTab === "leads"
                      ? "border-sf-blue text-sf-blue"
                      : "border-transparent text-sf-text-light hover:text-sf-text"
                  } font-medium text-sm`}
                >
                  <i className="fas fa-users mr-2"></i>Leads
                </button>
                <button
                  onClick={() => setActiveTab("new-lead")}
                  className={`py-4 px-1 border-b-2 ${
                    activeTab === "new-lead"
                      ? "border-sf-blue text-sf-blue"
                      : "border-transparent text-sf-text-light hover:text-sf-text"
                  } font-medium text-sm`}
                >
                  <i className="fas fa-plus mr-2"></i>New Lead
                </button>
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`py-4 px-1 border-b-2 ${
                    activeTab === "reports"
                      ? "border-sf-blue text-sf-blue"
                      : "border-transparent text-sf-text-light hover:text-sf-text"
                  } font-medium text-sm`}
                >
                  <i className="fas fa-chart-bar mr-2"></i>Reports
                </button>
              </nav>
            </div>
          </div>

          {/* Leads List View */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="bg-white rounded-lg sf-shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold text-sf-text">
                      Leads
                    </h2>
                    <span className="bg-sf-blue-light text-sf-blue px-3 py-1 rounded-full text-sm font-medium">
                      {filteredLeads.length} item
                      {filteredLeads.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-10 pr-4 py-2 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <i className="fas fa-search absolute left-3 top-3 text-sf-text-light"></i>
                    </div>
                    <select
                      className="px-4 py-2 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Demo Scheduled">Demo Scheduled</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                    <button
                      onClick={() => setActiveTab("new-lead")}
                      className="bg-sf-blue hover:bg-sf-blue-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="fas fa-plus mr-2"></i>New Lead
                    </button>
                  </div>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-lg sf-shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-sf-border">
                    <thead className="bg-sf-gray">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Lead
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-sf-text-light uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-sf-border">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-12 text-center text-sf-text-light"
                          >
                            <i className="fas fa-users text-4xl mb-4"></i>
                            <p className="text-lg">No leads found</p>
                            <p className="text-sm">
                              Create your first lead to get started
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-sf-gray cursor-pointer"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-sf-blue flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">
                                      {lead.fullName.charAt(0)}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-sf-text">
                                    {lead.fullName}
                                  </div>
                                  <div className="text-sm text-sf-text-light">
                                    {lead.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-sf-text">
                                {lead.email}
                              </div>
                              <div className="text-sm text-sf-text-light">
                                {lead.primaryContact}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(lead.leadStatus)}
                            </td>
                            <td className="px-6 py-4">
                              {getPriorityBadge(lead.priority)}
                            </td>
                            <td className="px-6 py-4 text-sm text-sf-text">
                              {lead.leadOwner}
                            </td>
                            <td className="px-6 py-4 text-sm text-sf-text">
                              {lead.leadSource}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-sf-blue hover:text-sf-blue-dark">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  onClick={() => editLead(lead)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* New Lead Form */}
          {activeTab === "new-lead" && (
            <div>
              <div className="bg-white rounded-lg sf-shadow">
                <div className="px-6 py-4 border-b border-sf-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-sf-text">
                      New Lead
                    </h2>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-sf-text-light hover:text-sf-text"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                </div>

                <form onSubmit={saveLead} className="p-6">
                  {/* Lead Information Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-sf-text mb-4 pb-2 border-b border-sf-border">
                      Lead Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Lead ID
                        </label>
                        <input
                          type="text"
                          id="id"
                          value={formData.id}
                          className="w-full px-4 py-3 bg-sf-gray border border-sf-border rounded-lg text-sf-text-light"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Primary Contact{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="primaryContact"
                          value={formData.primaryContact}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Alternate Contact
                        </label>
                        <input
                          type="tel"
                          id="alternateContact"
                          value={formData.alternateContact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lead Details Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-sf-text mb-4 pb-2 border-b border-sf-border">
                      Lead Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Lead Source <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="leadSource"
                          value={formData.leadSource}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        >
                          <option value="">--None--</option>
                          <option value="Website">Website</option>
                          <option value="Referral">Referral</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Walk-in">Walk-in</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Cold Call">Cold Call</option>
                          <option value="Trade Show">Trade Show</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Lead Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="leadStatus"
                          value={formData.leadStatus}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Demo Scheduled">Demo Scheduled</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Lead Owner <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="leadOwner"
                          value={formData.leadOwner}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        >
                          <option value="">--None--</option>
                          <option value="John Smith">John Smith</option>
                          <option value="Sarah Johnson">Sarah Johnson</option>
                          <option value="Mike Davis">Mike Davis</option>
                          <option value="Emily Brown">Emily Brown</option>
                          <option value="David Wilson">David Wilson</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Priority <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        >
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Interested Course/Service
                        </label>
                        <input
                          type="text"
                          id="interestedCourse"
                          value={formData.interestedCourse}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Budget Range
                        </label>
                        <input
                          type="text"
                          id="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          placeholder="e.g., $1,000 - $5,000"
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Follow-up & Additional Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-sf-text mb-4 pb-2 border-b border-sf-border">
                      Follow-up & Additional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Follow-up Date
                        </label>
                        <input
                          type="date"
                          id="followUpDate"
                          value={formData.followUpDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Follow-up Time
                        </label>
                        <input
                          type="time"
                          id="followUpTime"
                          value={formData.followUpTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-sf-text mb-2">
                          Notes/Remarks
                        </label>
                        <textarea
                          id="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-sf-border rounded-lg focus:ring-2 focus:ring-sf-blue focus:border-transparent"
                          placeholder="Enter any additional notes or remarks..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-sf-border">
                    <button
                      type="button"
                      onClick={() => setActiveTab("leads")}
                      className="px-6 py-3 border border-sf-border text-sf-text rounded-lg hover:bg-sf-gray transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={clearForm}
                      className="px-6 py-3 border border-sf-border text-sf-text rounded-lg hover:bg-sf-gray transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-sf-blue hover:bg-sf-blue-dark text-white rounded-lg transition-colors font-medium"
                    >
                      <i className="fas fa-save mr-2"></i>Save Lead
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Reports View */}
          {activeTab === "reports" && (
            <div>
              <div className="bg-white rounded-lg sf-shadow p-6">
                <h2 className="text-2xl font-semibold text-sf-text mb-6">
                  Lead Reports
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-sf-blue-light p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-users text-sf-blue text-2xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-sf-text-light">
                          Total Leads
                        </p>
                        <p className="text-2xl font-semibold text-sf-text">
                          {totalLeads}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-sf-text-light">
                          Converted
                        </p>
                        <p className="text-2xl font-semibold text-sf-text">
                          {convertedLeads}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-clock text-yellow-600 text-2xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-sf-text-light">
                          In Progress
                        </p>
                        <p className="text-2xl font-semibold text-sf-text">
                          {inProgressLeads}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-times-circle text-red-600 text-2xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-sf-text-light">
                          Lost
                        </p>
                        <p className="text-2xl font-semibold text-sf-text">
                          {lostLeads}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bg-sf-blue {
          background-color: #0176d3;
        }
        .bg-sf-blue-dark {
          background-color: #014486;
        }
        .bg-sf-blue-light {
          background-color: #e3f3ff;
        }
        .bg-sf-gray {
          background-color: #f3f2f2;
        }
        .border-sf-border {
          border-color: #dddbda;
        }
        .text-sf-text {
          color: #080707;
        }
        .text-sf-text-light {
          color: #706e6b;
        }
        .sf-shadow {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }
        .sf-shadow-lg {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </SAAdminLayout>
  );
}
