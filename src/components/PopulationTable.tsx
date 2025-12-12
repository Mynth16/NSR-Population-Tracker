import { useState, useEffect } from "react";
import { Search, UserPlus, Users, Trash2, AlertTriangle } from "lucide-react";
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full top-20 right-20 w-96 h-96 bg-sun-200/20 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-80 h-80 bg-forest-200/20 blur-3xl"></div>
      </div>

      <div className="relative px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-sun-400 to-sun-500">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">Population</h1>
              <p className="text-earth-600 font-body">Manage and view all registered residents</p>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="p-6 mb-8 border shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl border-forest-100 animate-fade-in-up">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative flex-1 w-full">
              <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-earth-400" />
              <input
                type="text"
                placeholder="Search residents by name, gender, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-earth-400"
              />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white transition-all duration-300 shadow-lg sm:w-auto bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 rounded-xl hover:shadow-xl"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-semibold">Add Resident</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden border shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl border-forest-100 animate-fade-in-up">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-16 text-center">
                <div className="inline-flex items-center gap-3">
                  <svg className="w-6 h-6 animate-spin text-forest-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-medium text-earth-600">Loading residents...</span>
                </div>
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="font-medium text-mahogany-600">{error}</p>
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
                      className="transition-colors cursor-pointer hover:bg-forest-50/50"
                    >
                      <td className="font-medium">{resident.first_name}</td>
                      <td className="font-medium">{resident.last_name}</td>
                      <td>
                        <span className="px-3 py-1 text-xs font-medium capitalize rounded-full bg-forest-100 text-forest-700">
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
            <div className="py-16 text-center">
              <p className="text-earth-500">No residents found matching your search.</p>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-6 text-sm font-medium text-earth-600">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        )}
      </div>

      {/* Add Resident Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full" style={{ maxWidth: '680px' }}>
            <div className="shadow-lg position-relative" style={{
              backgroundColor: '#FEF8E8',
              borderRadius: '20px',
              padding: '40px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.8em',
                  color: '#999',
                  cursor: 'pointer',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  lineHeight: 1
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                &times;
              </button>

              {/* Header */}
              <div className="mb-4 text-center">
                <h1 style={{
                  fontWeight: 'bold',
                  fontSize: '2em',
                  color: '#2d2d2d',
                  marginBottom: '8px'
                }}>Add New Resident</h1>
                <p style={{ color: '#C4956A', fontSize: '0.95em', marginBottom: '30px' }}>
                  Fill in the details below
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Household Selection */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Household <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="household_id"
                      value={formData.household_id}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="">Select Household</option>
                      {households.map((household) => (
                        <option key={household.household_id} value={household.household_id}>
                          Zone {household.zone_num} - {household.house_num} ({household.address})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* First Name */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      First Name <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                      placeholder="Enter first name"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Last Name <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                      placeholder="Enter last name"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Birth Date */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Birth Date <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Gender <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Civil Status */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Civil Status <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="civil_status"
                      value={formData.civil_status}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  {/* Educational Attainment */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Educational Attainment
                    </label>
                    <input
                      type="text"
                      name="educational_attainment"
                      value={formData.educational_attainment}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g., College Graduate, High School Level"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g., 09171234567"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="email@example.com"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 col-12">
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', marginTop: '30px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        style={{
                          background: 'white',
                          color: '#666',
                          fontWeight: 600,
                          fontSize: '1em',
                          padding: '12px 40px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          width: '48%'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          background: '#28a745',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1em',
                          padding: '12px 40px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          width: '48%',
                          opacity: submitting ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = '#218838')}
                        onMouseLeave={(e) => !submitting && (e.currentTarget.style.background = '#28a745')}
                      >
                        {submitting ? 'Adding...' : 'Add Resident'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resident Modal */}
      {showEditModal && selectedResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="w-full" style={{ maxWidth: '680px' }}>
            <div className="shadow-lg position-relative" style={{
              backgroundColor: '#FEF8E8',
              borderRadius: '20px',
              padding: '40px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              {/* Close button */}
              <button
                type="button"
                onClick={handleCloseEditModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.8em',
                  color: '#999',
                  cursor: 'pointer',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  lineHeight: 1
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                &times;
              </button>

              {/* Header */}
              <div className="mb-4 text-center">
                <h1 style={{
                  fontWeight: 'bold',
                  fontSize: '2em',
                  color: '#2d2d2d',
                  marginBottom: '8px'
                }}>Edit Resident</h1>
                <p style={{ color: '#C4956A', fontSize: '0.95em', marginBottom: '30px' }}>
                  Update resident information
                </p>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="row">
                  {/* Household Selection with Appoint as Head */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Household <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <div className="gap-2 d-flex">
                      <select
                        name="household_id"
                        value={editFormData.household_id}
                        onChange={handleEditInputChange}
                        required
                        className="form-select flex-grow-1"
                        style={{
                          border: '1px solid #E8D5C4',
                          borderRadius: '8px',
                          fontSize: '0.95em',
                          backgroundColor: '#FEF8E8',
                          color: '#2d2d2d'
                        }}
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
                        style={{
                          background: !editFormData.household_id ? '#ccc' : '#FFD700',
                          color: !editFormData.household_id ? '#666' : '#2d2d2d',
                          fontWeight: 600,
                          fontSize: '0.9em',
                          padding: '8px 16px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: !editFormData.household_id ? 'not-allowed' : 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => editFormData.household_id && (e.currentTarget.style.background = '#FFC700')}
                        onMouseLeave={(e) => editFormData.household_id && (e.currentTarget.style.background = '#FFD700')}
                        title="Appoint this resident as head of the selected household"
                      >
                        Appoint as Head
                      </button>
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      First Name <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={editFormData.first_name}
                      onChange={handleEditInputChange}
                      required
                      className="form-control"
                      placeholder="Enter first name"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Last Name <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={editFormData.last_name}
                      onChange={handleEditInputChange}
                      required
                      className="form-control"
                      placeholder="Enter last name"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Birth Date */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Birth Date <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      value={editFormData.birth_date}
                      onChange={handleEditInputChange}
                      required
                      className="form-control"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Gender <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="gender"
                      value={editFormData.gender}
                      onChange={handleEditInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Civil Status */}
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Civil Status <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="civil_status"
                      value={editFormData.civil_status}
                      onChange={handleEditInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Status <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditInputChange}
                      required
                      className="form-select"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="deceased">Deceased</option>
                      <option value="moved">Moved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Educational Attainment */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Educational Attainment
                    </label>
                    <input
                      type="text"
                      name="educational_attainment"
                      value={editFormData.educational_attainment}
                      onChange={handleEditInputChange}
                      className="form-control"
                      placeholder="e.g., College Graduate, High School Level"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact_number"
                      value={editFormData.contact_number}
                      onChange={handleEditInputChange}
                      className="form-control"
                      placeholder="e.g., 09171234567"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3 col-md-6 col-12">
                    <label className="form-label" style={{ color: '#2d2d2d', fontWeight: 400, fontSize: '0.9em' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      className="form-control"
                      placeholder="email@example.com"
                      style={{
                        border: '1px solid #E8D5C4',
                        borderRadius: '8px',
                        fontSize: '0.95em',
                        backgroundColor: '#FEF8E8',
                        color: '#2d2d2d'
                      }}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 col-12">
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', marginTop: '30px' }}>
                      <button
                        type="button"
                        onClick={handleDeleteClick}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1em',
                          padding: '12px 24px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </button>
                      <div style={{ flex: 1 }}></div>
                      <button
                        type="button"
                        onClick={handleCloseEditModal}
                        style={{
                          background: 'white',
                          color: '#666',
                          fontWeight: 600,
                          fontSize: '1em',
                          padding: '12px 24px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={editSubmitting}
                        style={{
                          background: '#28a745',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1em',
                          padding: '12px 24px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          opacity: editSubmitting ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => !editSubmitting && (e.currentTarget.style.background = '#218838')}
                        onMouseLeave={(e) => !editSubmitting && (e.currentTarget.style.background = '#28a745')}
                      >
                        {editSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-mahogany-100">
                  <AlertTriangle className="w-8 h-8 text-mahogany-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-forest-950 font-display">Delete Resident?</h3>
                <p className="mb-6 text-earth-600">
                  Are you sure you want to delete <span className="font-semibold">{selectedResident.first_name} {selectedResident.last_name}</span>? This action will archive the resident record and cannot be undone.
                </p>
                <div className="flex w-full gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 font-semibold transition-colors border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={deleting}
                    className="flex-1 px-6 py-3 font-semibold text-white transition-colors bg-mahogany-600 hover:bg-mahogany-500 rounded-xl disabled:bg-earth-400 disabled:cursor-not-allowed"
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
