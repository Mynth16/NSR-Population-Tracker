// Households Table JavaScript
let householdsData = [];

function loadHouseholds() {
    const html = `
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-display font-bold text-forest-900 mb-2">Household Management</h1>
                <p class="text-earth-600">Manage households and their residents</p>
            </div>
            <button onclick="showAddHouseholdModal()" class="bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white px-6 py-3 rounded-lg btn-shimmer">
                <i class="fas fa-home mr-2"></i>
                Add Household
            </button>
        </div>

        <div class="glass-card p-4 mb-6">
            <input type="text" id="household-search" placeholder="Search by house or zone number..." class="w-full bg-transparent border-none focus:outline-none">
        </div>

        <div class="glass-card overflow-hidden">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>House Number</th>
                        <th>Head of Household</th>
                        <th>Residents</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="households-table-body">
                    <tr><td colspan="6" class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-forest-600"></i></td></tr>
                </tbody>
            </table>
        </div>

        <!-- Add Household Modal -->
        <div id="add-household-modal" class="modal-overlay">
            <div class="glass-card max-w-lg w-full mx-4" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6 p-6 pb-0">
                    <h2 class="text-2xl font-display font-bold text-forest-900">Add New Household</h2>
                    <button onclick="hideModal('add-household-modal')" class="text-earth-600 hover:text-forest-900">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <form id="add-household-form" class="p-6 pt-0">
                    <div class="mb-4">
                        <label class="form-label">Zone Number *</label>
                        <input type="number" name="zone_num" class="form-control" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label">House Number *</label>
                        <input type="text" name="house_num" class="form-control" required>
                    </div>
                    <div class="flex justify-end gap-3">
                        <button type="button" onclick="hideModal('add-household-modal')" class="px-6 py-2 border border-earth-300 rounded-lg">Cancel</button>
                        <button type="submit" class="bg-forest-600 hover:bg-forest-700 text-white px-6 py-2 rounded-lg">Save</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Edit Household Modal -->
        <div id="edit-household-modal" class="modal-overlay">
            <div class="glass-card max-w-lg w-full mx-4" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6 p-6 pb-0">
                    <h2 class="text-2xl font-display font-bold text-forest-900">Edit Household</h2>
                    <button onclick="hideModal('edit-household-modal')" class="text-earth-600 hover:text-forest-900">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <form id="edit-household-form" class="p-6 pt-0">
                    <input type="hidden" name="household_id" id="edit-household-id">
                    <div class="mb-4">
                        <label class="form-label">Zone Number *</label>
                        <input type="number" name="zone_num" id="edit-zone-num" class="form-control" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label">House Number *</label>
                        <input type="text" name="house_num" id="edit-house-num" class="form-control" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label">Status *</label>
                        <select name="status" id="edit-household-status" class="form-select" required>
                            <option value="A">Active</option>
                            <option value="I">Inactive</option>
                            <option value="X">Archived</option>
                        </select>
                    </div>
                    <div class="flex justify-between items-center">
                        <button type="button" onclick="deleteHousehold()" class="bg-mahogany-600 hover:bg-mahogany-700 text-white px-6 py-2 rounded-lg">Delete</button>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideModal('edit-household-modal')" class="px-6 py-2 border border-earth-300 rounded-lg">Cancel</button>
                            <button type="submit" class="bg-forest-600 hover:bg-forest-700 text-white px-6 py-2 rounded-lg">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

    $('#page-content').html(html);
    fetchHouseholdsData();

    $('#household-search').on('input', function() {
        filterHouseholds($(this).val().toLowerCase());
    });

    $('#add-household-form').on('submit', handleAddHousehold);
    $('#edit-household-form').on('submit', handleEditHousehold);
}

function fetchHouseholdsData() {
    $.ajax({
        url: `${API_URL}/households.php`,
        method: 'GET',
        dataType: 'json',
        data: { status: 'A' },
        success: function(data) {
            console.log('Households data received:', data);
            if (!Array.isArray(data)) {
                console.error('Households is not an array:', data);
                $('#households-table-body').html('<tr><td colspan="6" class="text-center py-8 text-mahogany-600">Error: Invalid data format</td></tr>');
                return;
            }
            householdsData = data;
            renderHouseholds(data);
        },
        error: function() {
            $('#households-table-body').html('<tr><td colspan="6" class="text-center py-8 text-mahogany-600">Error loading households</td></tr>');
        }
    });
}

function renderHouseholds(data) {
    if (data.length === 0) {
        $('#households-table-body').html('<tr><td colspan="6" class="text-center py-8 text-earth-600">No households found</td></tr>');
        return;
    }

    const rows = data.map(h => `
        <tr>
            <td class="font-semibold">Zone ${h.zone_num}</td>
            <td>${h.house_num}</td>
            <td>${h.head_first_name && h.head_last_name ? `${h.head_first_name} ${h.head_last_name}` : 'Not assigned'}</td>
            <td><span class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">${h.resident_count || 0} residents</span></td>
            <td><span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">${displayHouseholdStatus(h.status)}</span></td>
            <td>
                <button onclick='editHousehold(${JSON.stringify(h).replace(/'/g, "&apos;")})' class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');

    $('#households-table-body').html(rows);
}

function filterHouseholds(searchTerm) {
    const filtered = householdsData.filter(h => 
        h.house_num.toLowerCase().includes(searchTerm) ||
        h.zone_num.toString().includes(searchTerm)
    );
    renderHouseholds(filtered);
}

function showAddHouseholdModal() {
    $('#add-household-form')[0].reset();
    showModal('add-household-modal');
}

function handleAddHousehold(e) {
    e.preventDefault();
    
    const formData = {};
    $(this).serializeArray().forEach(field => {
        formData[field.name] = field.value;
    });

    $.ajax({
        url: `${API_URL}/households.php`,
        method: 'POST',
        contentType: 'application/json',
        headers: { 'X-User-Id': getUserId() },
        data: JSON.stringify(formData),
        success: function() {
            hideModal('add-household-modal');
            fetchHouseholdsData();
        },
        error: function() {
            alert('Error adding household');
        }
    });
}

function editHousehold(household) {
    $('#edit-household-id').val(household.household_id);
    $('#edit-zone-num').val(household.zone_num);
    $('#edit-house-num').val(household.house_num);
    $('#edit-household-status').val(household.status);
    showModal('edit-household-modal');
}

function handleEditHousehold(e) {
    e.preventDefault();
    
    const formData = {};
    $(this).serializeArray().forEach(field => {
        if (field.name !== 'household_id') {
            formData[field.name] = field.value;
        }
    });

    const householdId = $('#edit-household-id').val();

    $.ajax({
        url: `${API_URL}/households.php/${householdId}`,
        method: 'PUT',
        contentType: 'application/json',
        headers: { 'X-User-Id': getUserId() },
        data: JSON.stringify(formData),
        success: function() {
            hideModal('edit-household-modal');
            fetchHouseholdsData();
        },
        error: function() {
            alert('Error updating household');
        }
    });
}

function deleteHousehold() {
    if (!confirm('Are you sure you want to delete this household?')) return;

    const householdId = $('#edit-household-id').val();

    $.ajax({
        url: `${API_URL}/households.php/${householdId}`,
        method: 'DELETE',
        headers: { 'X-User-Id': getUserId() },
        success: function() {
            hideModal('edit-household-modal');
            fetchHouseholdsData();
        },
        error: function() {
            alert('Error deleting household');
        }
    });
}
