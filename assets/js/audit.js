// Audit Trail JavaScript
let auditData = [];

function loadAuditTrail() {
    const html = `
        <div class="mb-6">
            <h1 class="text-3xl font-display font-bold text-forest-900 mb-2">Audit Trail</h1>
            <p class="text-earth-600">Track all changes and activities in the system</p>
        </div>

        <!-- Filters -->
        <div class="glass-card p-4 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="text-sm font-semibold text-forest-900 mb-2 block">Record Type</label>
                    <select id="filter-record-type" class="form-select">
                        <option value="">All Types</option>
                        <option value="H">Household</option>
                        <option value="R">Resident</option>
                        <option value="S">Staff</option>
                        <option value="A">Account</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-semibold text-forest-900 mb-2 block">Change Type</label>
                    <select id="filter-change-type" class="form-select">
                        <option value="">All Changes</option>
                        <option value="C">Create</option>
                        <option value="U">Update</option>
                        <option value="D">Delete</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-semibold text-forest-900 mb-2 block">Limit</label>
                    <select id="filter-limit" class="form-select">
                        <option value="50">50 entries</option>
                        <option value="100" selected>100 entries</option>
                        <option value="200">200 entries</option>
                        <option value="500">500 entries</option>
                    </select>
                </div>
            </div>
            <div class="mt-4">
                <button onclick="fetchAuditTrail()" class="bg-forest-600 hover:bg-forest-700 text-white px-6 py-2 rounded-lg">
                    <i class="fas fa-filter mr-2"></i>
                    Apply Filters
                </button>
            </div>
        </div>

        <!-- Audit Trail Table -->
        <div class="glass-card overflow-hidden">
            <div class="overflow-x-auto custom-scrollbar">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>User</th>
                            <th>Type</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody id="audit-table-body">
                        <tr>
                            <td colspan="5" class="text-center py-12">
                                <i class="fas fa-spinner fa-spin text-4xl text-forest-600"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    $('#page-content').html(html);
    
    // Add change listeners
    $('#filter-record-type, #filter-change-type, #filter-limit').on('change', fetchAuditTrail);
    
    // Initial load
    fetchAuditTrail();
}

function fetchAuditTrail() {
    const recordType = $('#filter-record-type').val();
    const changeType = $('#filter-change-type').val();
    const limit = $('#filter-limit').val() || 100;

    const params = { limit };
    if (recordType) params.recordType = recordType;
    
    $.ajax({
        url: `${API_URL}/audit-trail.php`,
        method: 'GET',
        dataType: 'json',
        data: params,
        success: function(data) {
            console.log('Audit trail data received:', data);
            if (!Array.isArray(data)) {
                console.error('Audit trail is not an array:', data);
                $('#audit-table-body').html('<tr><td colspan="5" class="text-center py-8 text-mahogany-600">Error: Invalid data format</td></tr>');
                return;
            }
            // Filter by change type on client side if needed
            if (changeType) {
                data = data.filter(entry => entry.change_type === changeType);
            }
            
            auditData = data;
            renderAuditTrail(data);
        },
        error: function() {
            $('#audit-table-body').html('<tr><td colspan="5" class="text-center py-8 text-mahogany-600">Error loading audit trail</td></tr>');
        }
    });
}

function renderAuditTrail(data) {
    if (data.length === 0) {
        $('#audit-table-body').html('<tr><td colspan="5" class="text-center py-8 text-earth-600">No audit entries found</td></tr>');
        return;
    }

    const rows = data.map(entry => {
        const actionClass = entry.change_type === 'C' ? 'bg-green-100 text-green-800' :
                          entry.change_type === 'U' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800';
        
        const actionIcon = entry.change_type === 'C' ? 'plus-circle' :
                          entry.change_type === 'U' ? 'edit' :
                          'trash-alt';

        return `
            <tr>
                <td class="text-sm">${formatDateTime(entry.change_date)}</td>
                <td>${entry.username || 'System'}</td>
                <td><span class="px-2 py-1 rounded-full text-xs bg-earth-200 text-earth-800">${displayRecordType(entry.record_type)}</span></td>
                <td>
                    <span class="px-2 py-1 rounded-full text-xs ${actionClass} inline-flex items-center">
                        <i class="fas fa-${actionIcon} mr-1"></i>
                        ${displayChangeType(entry.change_type)}
                    </span>
                </td>
                <td class="text-sm">${entry.details}</td>
            </tr>
        `;
    }).join('');

    $('#audit-table-body').html(rows);
}
