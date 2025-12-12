import { useState, useEffect } from "react";
import { Search, Home, Building, ChevronDown, ChevronUp, Users, X, Trash2, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

interface Resident {
  resident_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  civil_status: string;
  birth_date: string;
}

interface Household {
  household_id: string;
  zone_num: number;
  house_num: string;
  status: string;
  head_resident_id?: string;
  resident_count?: number;
  residents?: Resident[];
}

interface HouseholdFormData {
  zone_num: number;
  house_num: string;
  status: string;
  head_resident_id: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const HouseholdsTable = () => {
  const { setActivePage, user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedHouseholds, setExpandedHouseholds] = useState<Set<string>>(new Set());
  const [loadingResidents, setLoadingResidents] = useState<Set<string>>(new Set());
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [editFormData, setEditFormData] = useState<HouseholdFormData>({
    zone_num: 1,
    house_num: "",
    status: "active",
    head_resident_id: "",
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Add household modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormData, setAddFormData] = useState<Omit<HouseholdFormData, 'status' | 'head_resident_id'>>({
    zone_num: 1,
    house_num: "",
  });
  const [addSubmitting, setAddSubmitting] = useState(false);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const response = await fetch(`${API_URL}/api/households?status=active`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch households');
        }
        
        const data = await response.json();
        setHouseholds(data);
      } catch (err) {
        console.error("Error fetching households:", err);
        setError("Failed to load households. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouseholds();
  }, []);

  const toggleHouseholdExpand = async (householdId: string) => {
    const isExpanded = expandedHouseholds.has(householdId);
    
    if (isExpanded) {
      // Collapse
      setExpandedHouseholds(prev => {
        const newSet = new Set(prev);
        newSet.delete(householdId);
        return newSet;
      });
    } else {
      // Expand and fetch residents if not already loaded
      const household = households.find(h => h.household_id === householdId);
      
      if (household && !household.residents) {
        setLoadingResidents(prev => new Set(prev).add(householdId));
        
        try {
          const response = await fetch(`${API_URL}/api/households/${householdId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched household data:', data);
            setHouseholds(prev => prev.map(h => 
              h.household_id === householdId 
                ? { ...h, residents: data.residents || [] }
                : h
            ));
          } else {
            console.error('Failed to fetch household:', response.status);
          }
        } catch (err) {
          console.error("Error fetching residents:", err);
        } finally {
          setLoadingResidents(prev => {
            const newSet = new Set(prev);
            newSet.delete(householdId);
            return newSet;
          });
        }
      }
      
      setExpandedHouseholds(prev => new Set(prev).add(householdId));
    }
  };

  const handleResidentClick = () => {
    // Navigate to the Population page
    setActivePage('population');
  };

  // Open edit modal for a household
  const handleHouseholdClick = async (household: Household) => {
    // Fetch residents if not already loaded
    let householdWithResidents = household;
    if (!household.residents) {
      try {
        const response = await fetch(`${API_URL}/api/households/${household.household_id}`);
        if (response.ok) {
          const data = await response.json();
          householdWithResidents = { ...household, residents: data.residents || [] };
          setHouseholds(prev => prev.map(h => 
            h.household_id === household.household_id ? householdWithResidents : h
          ));
        }
      } catch (err) {
        console.error("Error fetching residents:", err);
      }
    }
    
    setSelectedHousehold(householdWithResidents);
    setEditFormData({
      zone_num: household.zone_num,
      house_num: household.house_num,
      status: household.status,
      head_resident_id: household.head_resident_id || "",
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: name === 'zone_num' ? Number.parseInt(value, 10) : value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHousehold) return;
    
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/households/${selectedHousehold.household_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error('Failed to update household');

      const updatedHousehold = await response.json();
      setHouseholds(prev => prev.map(h => 
        h.household_id === selectedHousehold.household_id 
          ? { ...h, ...updatedHousehold }
          : h
      ));
      setShowEditModal(false);
      setSelectedHousehold(null);
    } catch (err) {
      console.error("Error updating household:", err);
      alert("Failed to update household. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedHousehold) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/households/${selectedHousehold.household_id}`, {
        method: 'DELETE',
        headers: {
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
      });

      if (!response.ok) throw new Error('Failed to delete household');

      setHouseholds(prev => prev.filter(h => h.household_id !== selectedHousehold.household_id));
      setShowDeleteConfirm(false);
      setShowEditModal(false);
      setSelectedHousehold(null);
    } catch (err) {
      console.error("Error deleting household:", err);
      alert("Failed to delete household. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteConfirm(false);
    setSelectedHousehold(null);
  };

  // Add household handlers
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: name === 'zone_num' ? Number.parseInt(value, 10) : value }));
  };

  const resetAddForm = () => {
    setAddFormData({
      zone_num: 1,
      house_num: "",
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/households`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.acc_id && { 'X-User-Id': String(user.acc_id) }),
        },
        body: JSON.stringify(addFormData),
      });

      if (!response.ok) throw new Error('Failed to create household');

      const newHousehold = await response.json();
      setHouseholds(prev => [...prev, { ...newHousehold, resident_count: 0 }]);
      setShowAddModal(false);
      resetAddForm();
    } catch (err) {
      console.error("Error creating household:", err);
      alert("Failed to create household. Please try again.");
    } finally {
      setAddSubmitting(false);
    }
  };

  const filteredHouseholds = households.filter(
    (household) =>
      household.house_num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.zone_num.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-forest-50">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full top-20 right-20 w-96 h-96 bg-forest-200/20 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-80 h-80 bg-sun-200/20 blur-3xl"></div>
      </div>

      <div className="relative px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-forest-600 to-forest-700">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">Households</h1>
              <p className="text-earth-600 font-body">Manage and view all registered households</p>
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
                placeholder="Search by house number or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-earth-400"
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white transition-all duration-300 shadow-lg sm:w-auto bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 rounded-xl hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Add Household</span>
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
                  <span className="font-medium text-earth-600">Loading households...</span>
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
                    <th>Zone</th>
                    <th>House Number</th>
                    <th>Residents</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {filteredHouseholds.map((household) => (
                    <tr 
                      key={household.household_id}
                      onClick={() => handleHouseholdClick(household)}
                      className="transition-colors cursor-pointer hover:bg-forest-50/50"
                    >
                      <td>
                        <span className="inline-flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-lg bg-forest-100 text-forest-700">
                            {household.zone_num}
                          </span>
                          <span className="font-medium">Zone {household.zone_num}</span>
                        </span>
                      </td>
                      <td className="font-medium">{household.house_num}</td>
                      <td>
                        <div className="space-y-2">
                          {/* Resident count badge with expand button */}
                          <button
                            onClick={() => toggleHouseholdExpand(household.household_id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sun-100 text-sun-700 hover:bg-sun-200 transition-colors cursor-pointer"
                          >
                            <Users className="w-4 h-4" />
                            <span className="font-medium">
                              {household.resident_count || 0} {(household.resident_count || 0) === 1 ? 'resident' : 'residents'}
                            </span>
                            {expandedHouseholds.has(household.household_id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          
                          {/* Expanded residents list */}
                          {expandedHouseholds.has(household.household_id) && (
                            <div className="pl-2 space-y-1 animate-fade-in-up">
                              {loadingResidents.has(household.household_id) ? (
                                <div className="flex items-center gap-2 text-sm text-earth-500">
                                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  <span>Loading...</span>
                                </div>
                              ) : household.residents && household.residents.length > 0 ? (
                                household.residents.map((resident) => (
                                  <button
                                    key={resident.resident_id}
                                    onClick={() => handleResidentClick()}
                                    className="block w-full text-left px-3 py-1.5 text-sm rounded-lg hover:bg-forest-50 text-forest-700 hover:text-forest-900 transition-colors"
                                  >
                                    <span className="font-medium">{resident.first_name} {resident.last_name}</span>
                                    <span className="ml-2 text-earth-400">
                                      ({resident.gender === 'male' ? 'M' : 'F'}, {resident.civil_status})
                                    </span>
                                  </button>
                                ))
                              ) : (
                                <p className="px-3 py-1 text-sm italic text-earth-400">No residents found</p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-forest-100 text-forest-700">
                          {household.status.charAt(0).toUpperCase() + household.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && filteredHouseholds.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-earth-500">No households found matching your search.</p>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-6 text-sm font-medium text-earth-600">
            Showing {filteredHouseholds.length} of {households.length} households
          </div>
        )}
      </div>

      {/* Edit Household Modal */}
      {showEditModal && selectedHousehold && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-gradient-to-bl from-sun-200/50 to-transparent"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-950 font-display">Edit Household</h2>
                    <p className="mt-1 text-sm text-earth-500">Update household information</p>
                  </div>
                  <button
                    onClick={handleCloseModals}
                    className="p-2 transition-colors text-earth-400 hover:text-forest-700 hover:bg-forest-50 rounded-xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-6">
                  {/* Zone and House Number */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Zone Number <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="zone_num"
                        value={editFormData.zone_num}
                        onChange={handleEditInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        House Number <span className="text-mahogany-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="house_num"
                        value={editFormData.house_num}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-earth-400"
                        placeholder="Enter house number"
                      />
                    </div>
                  </div>

                  {/* Status and Head Resident */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Status <span className="text-mahogany-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-forest-800">
                        Head of Household
                      </label>
                      <select
                        name="head_resident_id"
                        value={editFormData.head_resident_id}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      >
                        <option value="">No head assigned</option>
                        {selectedHousehold.residents?.map((resident) => (
                          <option key={resident.resident_id} value={resident.resident_id}>
                            {resident.first_name} {resident.last_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-mahogany-600 hover:bg-mahogany-500 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="px-6 py-3 font-semibold transition-colors border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 rounded-xl hover:shadow-xl disabled:from-earth-400 disabled:to-earth-400 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Household Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl">
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetAddForm();
                }}
                className="absolute flex items-center justify-center w-10 h-10 transition-colors top-6 right-6 rounded-xl bg-earth-100 hover:bg-earth-200 text-earth-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-forest-600 to-forest-700">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-forest-950 font-display">Add New Household</h2>
                </div>
                <p className="text-earth-600 font-body">Create a new household record</p>
              </div>

              {/* Form */}
              <form onSubmit={handleAddSubmit} className="space-y-6">
                {/* Zone and House Number */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      Zone Number <span className="text-mahogany-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="zone_num"
                      value={addFormData.zone_num}
                      onChange={handleAddInputChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      placeholder="Enter zone number"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-forest-800">
                      House Number <span className="text-mahogany-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="house_num"
                      value={addFormData.house_num}
                      onChange={handleAddInputChange}
                      required
                      className="w-full px-4 py-3 transition-all border bg-earth-50 border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      placeholder="Enter house number"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetAddForm();
                    }}
                    className="flex-1 px-6 py-3 font-semibold transition-colors border-2 border-earth-200 text-earth-700 rounded-xl hover:bg-earth-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addSubmitting}
                    className="flex-1 px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 rounded-xl hover:shadow-xl disabled:from-earth-400 disabled:to-earth-400 disabled:cursor-not-allowed"
                  >
                    {addSubmitting ? "Creating..." : "Create Household"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedHousehold && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-mahogany-100">
                  <AlertTriangle className="w-8 h-8 text-mahogany-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-forest-950 font-display">Delete Household?</h3>
                <p className="mb-6 text-earth-600">
                  Are you sure you want to delete the household <span className="font-semibold">House #{selectedHousehold.house_num} (Zone {selectedHousehold.zone_num})</span>? This action will archive the household and cannot be undone.
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

export default HouseholdsTable;
