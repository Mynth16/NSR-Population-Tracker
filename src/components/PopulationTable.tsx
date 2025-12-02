import { useState, useEffect } from "react";
import { Search, UserPlus, X, Users, Trash2, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

interface Resident {
  resident_id: string;
  first_name: string;
  last_name: string;
  civil_status: string;
  gender: string;
  birth_date: string;
  educational_attainment?: string;
  contact_number?: string;
  email?: string;
  household_id?: string;
  status?: string;
}

interface Household {
  household_id: string;
  zone_num: number;
  house_num: string;
  address: string;
  head_resident_id?: string;
}

interface ResidentFormData {
  household_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  civil_status: string;
  educational_attainment: string;
  contact_number: string;
  email: string;
}

interface EditResidentFormData extends ResidentFormData {
  status: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const PopulationTable = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [residents, setResidents] = useState<Resident[]>([]);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ResidentFormData>({
    household_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "male",
    civil_status: "single",
    educational_attainment: "",
    contact_number: "",
    email: "",
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [editFormData, setEditFormData] = useState<EditResidentFormData>({
    household_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "male",
    civil_status: "single",
    educational_attainment: "",
    contact_number: "",
    email: "",
    status: "active",
  });
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [residentsRes, householdsRes] = await Promise.all([
          fetch(`${API_URL}/api/residents?status=active`),
          fetch(`${API_URL}/api/households?status=active`)
        ]);
        
        if (!residentsRes.ok || !householdsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const residentsData = await residentsRes.json();
        const householdsData = await householdsRes.json();
        
        setResidents(residentsData);
        setHouseholds(householdsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      household_id: "",
      first_name: "",
      last_name: "",
      birth_date: "",
      gender: "male",
      civil_status: "single",
      educational_attainment: "",
      contact_number: "",
      email: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/residents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create resident');
      }

      const newResident = await response.json();
      setResidents(prev => [...prev, newResident]);
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error creating resident:", err);
      alert("Failed to create resident. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit modal handlers
  const handleResidentClick = (resident: Resident) => {
    setSelectedResident(resident);
    setEditFormData({
      household_id: resident.household_id || "",
      first_name: resident.first_name,
      last_name: resident.last_name,
      birth_date: resident.birth_date ? resident.birth_date.split('T')[0] : "",
      gender: resident.gender,
      civil_status: resident.civil_status,
      educational_attainment: resident.educational_attainment || "",
      contact_number: resident.contact_number || "",
      email: resident.email || "",
      status: resident.status || "active",
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResident) return;
    
    setEditSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/residents/${selectedResident.resident_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error('Failed to update resident');

      const updatedResident = await response.json();
      setResidents(prev => prev.map(r => 
        r.resident_id === selectedResident.resident_id 
          ? { ...r, ...updatedResident }
          : r
      ));
      setShowEditModal(false);
      setSelectedResident(null);
    } catch (err) {
      console.error("Error updating resident:", err);
      alert("Failed to update resident. Please try again.");
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedResident) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/residents/${selectedResident.resident_id}`, {
        method: 'DELETE',
        headers: {
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
      });

      if (!response.ok) throw new Error('Failed to delete resident');

      setResidents(prev => prev.filter(r => r.resident_id !== selectedResident.resident_id));
      setShowDeleteConfirm(false);
      setShowEditModal(false);
      setSelectedResident(null);
    } catch (err) {
      console.error("Error deleting resident:", err);
      alert("Failed to delete resident. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setShowDeleteConfirm(false);
    setSelectedResident(null);
  };

  // Handle appointing resident as head of household
  const handleAppointAsHead = async () => {
    if (!selectedResident || !editFormData.household_id) return;
    
    try {
      const response = await fetch(`${API_URL}/api/households/${editFormData.household_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
        body: JSON.stringify({ head_resident_id: selectedResident.resident_id }),
      });

      if (!response.ok) throw new Error('Failed to appoint as head');

      // Update households state
      setHouseholds(prev => prev.map(h => 
        h.household_id === editFormData.household_id 
          ? { ...h, head_resident_id: selectedResident.resident_id }
          : h
      ));
      
      alert(`${selectedResident.first_name} ${selectedResident.last_name} has been appointed as head of household.`);
    } catch (err) {
      console.error("Error appointing as head:", err);
      alert("Failed to appoint as head. Please try again.");
    }
  };

  const filteredResidents = residents.filter(
    (resident) =>
      `${resident.first_name} ${resident.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      resident.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.civil_status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-forest-50">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-sun-200/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-forest-200/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">Population</h1>
              <p className="text-earth-600 font-body">Manage and view all registered residents</p>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-forest-100 shadow-sm mb-8 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                placeholder="Search residents by name, gender, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
              />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-semibold">Add Resident</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-forest-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-earth-600 font-medium">Loading residents...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-mahogany-600 font-medium">{error}</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Civil Status</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {filteredResidents.map((resident) => (
                    <tr 
                      key={resident.resident_id}
                      onClick={() => handleResidentClick(resident)}
                      className="cursor-pointer hover:bg-forest-50/50 transition-colors"
                    >
                      <td className="font-medium">{resident.first_name}</td>
                      <td className="font-medium">{resident.last_name}</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-700 capitalize">
                          {resident.civil_status}
                        </span>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          resident.gender === 'male' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {resident.gender}
                        </span>
                      </td>
                      <td>{new Date(resident.birth_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && filteredResidents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-500">No residents found matching your search.</p>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-6 text-sm text-earth-600 font-medium">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        )}
      </div>

      {/* Add Resident Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sun-200/50 to-transparent rounded-bl-full"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-950 font-display">Add New Resident</h2>
                    <p className="text-sm text-earth-500 mt-1">Fill in the details below</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="p-2 text-earth-400 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Household Selection */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Household <span className="text-mahogany-500">*</span>
                    </label>
                    <select
                      name="household_id"
                      value={formData.household_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Household</option>
                      {households.map((household) => (
                        <option key={household.household_id} value={household.household_id}>
                          Zone {household.zone_num} - {household.house_num} ({household.address})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        First Name <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Last Name <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Birth Date, Gender, Civil Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Birth Date <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Gender <span className="text-mahogany-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Civil Status <span className="text-mahogany-500">*</span>
                      </label>
                      <select
                        name="civil_status"
                        value={formData.civil_status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Separated</option>
                        <option value="divorced">Divorced</option>
                      </select>
                    </div>
                  </div>

                  {/* Educational Attainment */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Educational Attainment
                    </label>
                    <input
                      type="text"
                      name="educational_attainment"
                      value={formData.educational_attainment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="e.g., College Graduate, High School Level"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="e.g., 09171234567"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="flex-1 px-6 py-3 border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-earth-400 disabled:to-earth-400 disabled:cursor-not-allowed font-semibold"
                    >
                      {submitting ? "Adding..." : "Add Resident"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resident Modal */}
      {showEditModal && selectedResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sun-200/50 to-transparent rounded-bl-full"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-950 font-display">Edit Resident</h2>
                    <p className="text-sm text-earth-500 mt-1">Update resident information</p>
                  </div>
                  <button
                    onClick={handleCloseEditModal}
                    className="p-2 text-earth-400 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-6">
                  {/* Household Selection with Appoint as Head */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Household <span className="text-mahogany-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="household_id"
                        value={editFormData.household_id}
                        onChange={handleEditInputChange}
                        required
                        className="flex-1 px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Household</option>
                        {households.map((household) => (
                          <option key={household.household_id} value={household.household_id}>
                            Zone {household.zone_num} - {household.house_num} ({household.address})
                            {household.head_resident_id === selectedResident.resident_id ? ' ★ Head' : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAppointAsHead}
                        disabled={!editFormData.household_id}
                        className="px-4 py-3 bg-sun-500 hover:bg-sun-400 text-white rounded-xl transition-colors font-semibold disabled:bg-earth-300 disabled:cursor-not-allowed whitespace-nowrap"
                        title="Appoint this resident as head of the selected household"
                      >
                        Appoint as Head
                      </button>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        First Name <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={editFormData.first_name}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Last Name <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editFormData.last_name}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Birth Date, Gender, Civil Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Birth Date <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="birth_date"
                        value={editFormData.birth_date}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Gender <span className="text-mahogany-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={editFormData.gender}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Civil Status <span className="text-mahogany-500">*</span>
                      </label>
                      <select
                        name="civil_status"
                        value={editFormData.civil_status}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Separated</option>
                        <option value="divorced">Divorced</option>
                      </select>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Status <span className="text-mahogany-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="deceased">Deceased</option>
                      <option value="moved">Moved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Educational Attainment */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Educational Attainment
                    </label>
                    <input
                      type="text"
                      name="educational_attainment"
                      value={editFormData.educational_attainment}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="e.g., College Graduate, High School Level"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contact_number"
                        value={editFormData.contact_number}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="e.g., 09171234567"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="px-6 py-3 bg-mahogany-600 hover:bg-mahogany-500 text-white rounded-xl transition-colors font-semibold flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={handleCloseEditModal}
                      className="px-6 py-3 border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={editSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-earth-400 disabled:to-earth-400 disabled:cursor-not-allowed font-semibold"
                    >
                      {editSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedResident && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-mahogany-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-mahogany-600" />
                </div>
                <h3 className="text-xl font-bold text-forest-950 font-display mb-2">Delete Resident?</h3>
                <p className="text-earth-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold">{selectedResident.first_name} {selectedResident.last_name}</span>? This action will archive the resident record and cannot be undone.
                </p>
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={deleting}
                    className="flex-1 px-6 py-3 bg-mahogany-600 hover:bg-mahogany-500 text-white rounded-xl transition-colors font-semibold disabled:bg-earth-400 disabled:cursor-not-allowed"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopulationTable;
