// Population Table JavaScript
let residents = [];
let households = [];
let currentResident = null;

function loadPopulation() {
    const html = `
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-display font-bold text-forest-900 mb-2">Population Management</h1>
                <p class="text-earth-600">Manage residents and their information</p>
            </div>
            <button onclick="showAddResidentModal()" class="bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white px-6 py-3 rounded-lg btn-shimmer">
                <i class="fas fa-user-plus mr-2"></i>
                Add Resident
            </button>
        </div>

        <!-- Search Bar -->
        <div class="glass-card p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-search text-earth-400 mr-3"></i>
                <input 
                    type="text" 
                    id="resident-search" 
                    placeholder="Search by name, gender, or civil status..." 
                    class="flex-1 bg-transparent border-none focus:outline-none"
                >
            </div>
        </div>

        <!-- Residents Table -->
        <div class="glass-card overflow-hidden">
            <div class="overflow-x-auto custom-scrollbar">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Civil Status</th>
                            <th>Household</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="residents-table-body">
                        <tr>
                            <td colspan="8" class="text-center py-12">
                                <i class="fas fa-spinner fa-spin text-4xl text-forest-600"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add Resident Modal -->
        <div id="add-resident-modal" class="modal-overlay">
            <div class="glass-card max-w-2xl w-full mx-4" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6 p-6 pb-0">
                    <h2 class="text-2xl font-display font-bold text-forest-900">Add New Resident</h2>
                    <button onclick="hideModal('add-resident-modal')" class="text-earth-600 hover:text-forest-900">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <form id="add-resident-form" class="p-6 pt-0">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">First Name *</label>
                            <input type="text" name="first_name" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Last Name *</label>
                            <input type="text" name="last_name" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Birth Date *</label>
                            <input type="date" name="birth_date" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Gender *</label>
                            <select name="gender" class="form-select" required>
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Civil Status *</label>
                            <select name="civil_status" class="form-select" required>
                                <option value="">Select Status</option>
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                                <option value="W">Widowed</option>
                                <option value="SEP">Separated</option>
                                <option value="D">Divorced</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Household</label>
                            <select name="household_id" id="add-household-select" class="form-select">
                                <option value="">No Household</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-sm font-semibold text-forest-900">Educational Attainment</label>
                            <input type="text" name="educational_attainment" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Contact Number</label>
                            <input type="tel" name="contact_number" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Email</label>
                            <input type="email" name="email" class="form-control">
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" onclick="hideModal('add-resident-modal')" class="px-6 py-2 border border-earth-300 rounded-lg hover:bg-earth-100">
                            Cancel
                        </button>
                        <button type="submit" class="bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white px-6 py-2 rounded-lg">
                            <i class="fas fa-save mr-2"></i>
                            Save Resident
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Edit Resident Modal (similar structure) -->
        <div id="edit-resident-modal" class="modal-overlay">
            <div class="glass-card max-w-2xl w-full mx-4" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6 p-6 pb-0">
                    <h2 class="text-2xl font-display font-bold text-forest-900">Edit Resident</h2>
                    <button onclick="hideModal('edit-resident-modal')" class="text-earth-600 hover:text-forest-900">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <form id="edit-resident-form" class="p-6 pt-0">
                    <input type="hidden" name="resident_id" id="edit-resident-id">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">First Name *</label>
                            <input type="text" name="first_name" id="edit-first-name" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Last Name *</label>
                            <input type="text" name="last_name" id="edit-last-name" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Birth Date *</label>
                            <input type="date" name="birth_date" id="edit-birth-date" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Gender *</label>
                            <select name="gender" id="edit-gender" class="form-select" required>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Civil Status *</label>
                            <select name="civil_status" id="edit-civil-status" class="form-select" required>
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                                <option value="W">Widowed</option>
                                <option value="SEP">Separated</option>
                                <option value="D">Divorced</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Status *</label>
                            <select name="status" id="edit-status" class="form-select" required>
                                <option value="A">Active</option>
                                <option value="D">Deceased</option>
                                <option value="M">Moved</option>
                                <option value="X">Archived</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-sm font-semibold text-forest-900">Household</label>
                            <select name="household_id" id="edit-household-select" class="form-select">
                                <option value="">No Household</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-sm font-semibold text-forest-900">Educational Attainment</label>
                            <input type="text" name="educational_attainment" id="edit-educational-attainment" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Contact Number</label>
                            <input type="tel" name="contact_number" id="edit-contact-number" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-sm font-semibold text-forest-900">Email</label>
                            <input type="email" name="email" id="edit-email" class="form-control">
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-6">
                        <button type="button" onclick="showDeleteConfirmation()" class="bg-mahogany-600 hover:bg-mahogany-700 text-white px-6 py-2 rounded-lg">
                            <i class="fas fa-trash mr-2"></i>
                            Delete
                        </button>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideModal('edit-resident-modal')" class="px-6 py-2 border border-earth-300 rounded-lg hover:bg-earth-100">
                                Cancel
                            </button>
                            <button type="submit" class="bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white px-6 py-2 rounded-lg">
                                <i class="fas fa-save mr-2"></i>
                                Update Resident
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div id="delete-resident-modal" class="modal-overlay" style="z-index: 60;">
            <div class="bg-white rounded-lg p-6 max-w-md mx-4" onclick="event.stopPropagation()">
                <div class="text-center mb-6">
                    <i class="fas fa-exclamation-triangle text-5xl text-mahogany-500 mb-4"></i>
                    <h3 class="text-xl font-bold text-forest-900 mb-2">Delete Resident?</h3>
                    <p class="text-earth-600" id="delete-resident-name">This action will archive the resident.</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="hideModal('delete-resident-modal')" class="flex-1 px-6 py-2 border border-earth-300 rounded-lg hover:bg-earth-100">
                        Cancel
                    </button>
                    <button onclick="deleteResident()" class="flex-1 bg-mahogany-600 hover:bg-mahogany-700 text-white px-6 py-2 rounded-lg">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;

    $('#page-content').html(html);

    // Load data
    fetchResidents();
    fetchHouseholds();

    // Search functionality
    $('#resident-search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        filterResidents(searchTerm);
    });

    // Form submissions
    $('#add-resident-form').on('submit', handleAddResident);
    $('#edit-resident-form').on('submit', handleEditResident);
}

function fetchResidents() {
    $.ajax({
        url: `${API_URL}/residents.php`,
        method: 'GET',
        dataType: 'json',
        data: { status: 'A' },
        success: function(data) {
            console.log('Residents received:', data);
            if (!Array.isArray(data)) {
                console.error('Residents is not an array:', data);
                $('#residents-table-body').html('<tr><td colspan="8" class="text-center py-8 text-mahogany-600">Error: Invalid data format</td></tr>');
                return;
            }
            residents = data;
            renderResidents(residents);
        },
        error: function() {
            $('#residents-table-body').html('<tr><td colspan="8" class="text-center py-8 text-mahogany-600">Error loading residents</td></tr>');
        }
    });
}

function fetchHouseholds() {
    $.ajax({
        url: `${API_URL}/households.php`,
        method: 'GET',
        dataType: 'json',
        data: { status: 'A' },
        success: function(data) {
            console.log('Households received:', data);
            if (!Array.isArray(data)) {
                console.error('Households is not an array:', data);
                return;
            }
            households = data;
            updateHouseholdSelects();
        }
    });
}

function updateHouseholdSelects() {
    const options = households.map(h => 
        `<option value="${h.household_id}">Zone ${h.zone_num} - House ${h.house_num}</option>`
    ).join('');
    $('#add-household-select, #edit-household-select').append(options);
}

function renderResidents(data) {
    if (data.length === 0) {
        $('#residents-table-body').html('<tr><td colspan="8" class="text-center py-8 text-earth-600">No residents found</td></tr>');
        return;
    }

    const rows = data.map(resident => `
        <tr>
            <td class="font-semibold">${resident.first_name} ${resident.last_name}</td>
            <td>${calculateAge(resident.birth_date)}</td>
            <td>${displayGender(resident.gender)}</td>
            <td>${displayCivilStatus(resident.civil_status)}</td>
            <td>${resident.house_num && resident.zone_num ? `Zone ${resident.zone_num} - ${resident.house_num}` : 'N/A'}</td>
            <td>${resident.contact_number || 'N/A'}</td>
            <td><span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">${displayResidentStatus(resident.status)}</span></td>
            <td>
                <button onclick='editResident(${JSON.stringify(resident).replace(/'/g, "&apos;")})' class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');

    $('#residents-table-body').html(rows);
}

function filterResidents(searchTerm) {
    const filtered = residents.filter(r => 
        `${r.first_name} ${r.last_name}`.toLowerCase().includes(searchTerm) ||
        r.gender.toLowerCase().includes(searchTerm) ||
        r.civil_status.toLowerCase().includes(searchTerm)
    );
    renderResidents(filtered);
}

function showAddResidentModal() {
    $('#add-resident-form')[0].reset();
    showModal('add-resident-modal');
}

function handleAddResident(e) {
    e.preventDefault();
    
    const formData = {};
    $(this).serializeArray().forEach(field => {
        formData[field.name] = field.value || null;
    });

    $.ajax({
        url: `${API_URL}/residents.php`,
        method: 'POST',
        contentType: 'application/json',
        headers: { 'X-User-Id': getUserId() },
        data: JSON.stringify(formData),
        success: function() {
            hideModal('add-resident-modal');
            fetchResidents();
        },
        error: function() {
            alert('Error adding resident');
        }
    });
}

function editResident(resident) {
    currentResident = resident;
    $('#edit-resident-id').val(resident.resident_id);
    $('#edit-first-name').val(resident.first_name);
    $('#edit-last-name').val(resident.last_name);
    $('#edit-birth-date').val(resident.birth_date);
    $('#edit-gender').val(resident.gender);
    $('#edit-civil-status').val(resident.civil_status);
    $('#edit-status').val(resident.status);
    $('#edit-household-select').val(resident.household_id || '');
    $('#edit-educational-attainment').val(resident.educational_attainment || '');
    $('#edit-contact-number').val(resident.contact_number || '');
    $('#edit-email').val(resident.email || '');
    
    showModal('edit-resident-modal');
}

function handleEditResident(e) {
    e.preventDefault();
    
    const formData = {};
    $(this).serializeArray().forEach(field => {
        if (field.name !== 'resident_id') {
            formData[field.name] = field.value || null;
        }
    });

    const residentId = $('#edit-resident-id').val();

    $.ajax({
        url: `${API_URL}/residents.php/${residentId}`,
        method: 'PUT',
        contentType: 'application/json',
        headers: { 'X-User-Id': getUserId() },
        data: JSON.stringify(formData),
        success: function() {
            hideModal('edit-resident-modal');
            fetchResidents();
        },
        error: function() {
            alert('Error updating resident');
        }
    });
}

function showDeleteConfirmation() {
    $('#delete-resident-name').text(`Delete ${currentResident.first_name} ${currentResident.last_name}?`);
    showModal('delete-resident-modal');
}

function deleteResident() {
    const residentId = currentResident.resident_id;

    $.ajax({
        url: `${API_URL}/residents.php/${residentId}`,
        method: 'DELETE',
        headers: { 'X-User-Id': getUserId() },
        success: function() {
            hideModal('delete-resident-modal');
            hideModal('edit-resident-modal');
            fetchResidents();
        },
        error: function() {
            alert('Error deleting resident');
        }
    });
}
