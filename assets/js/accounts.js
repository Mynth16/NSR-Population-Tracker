// Account Management JavaScript

let accountsData = [];
let editingAccountId = null;

// Load accounts page
function loadAccounts() {
    const html = `
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-forest-800 font-display">Account Management</h1>
                    <p class="text-earth-600">Manage user accounts and permissions</p>
                </div>
                <button id="add-account-btn" class="px-4 py-2 text-white transition-colors rounded-lg bg-forest-600 hover:bg-forest-700">
                    <i class="mr-2 fas fa-plus"></i>
                    Add Account
                </button>
            </div>
        </div>

        <!-- Accounts Table -->
        <div class="overflow-hidden bg-white shadow-md rounded-xl">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-forest-50">
                        <tr>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-forest-700">Username</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-forest-700">Role</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-forest-700">Created</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-right uppercase text-forest-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="accounts-table-body" class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin"></i> Loading...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    $('#page-content').html(html);
    
    // Load accounts data
    fetchAccounts();
    
    // Add event listeners
    $(document).off('click', '#add-account-btn').on('click', '#add-account-btn', showAddAccountModal);
}

// Fetch accounts from API
function fetchAccounts() {
    $.ajax({
        url: `${API_URL}/accounts.php`,
        method: 'GET',
        success: function(data) {
            accountsData = data;
            renderAccountsTable();
        },
        error: function(xhr) {
            console.error('Error fetching accounts:', xhr);
            $('#accounts-table-body').html(`
                <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-red-500">
                        <i class="mr-2 fas fa-exclamation-circle"></i>
                        Error loading accounts: ${xhr.responseJSON?.error || 'Unknown error'}
                    </td>
                </tr>
            `);
        }
    });
}

// Render accounts table
function renderAccountsTable() {
    if (accountsData.length === 0) {
        $('#accounts-table-body').html(`
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                    No accounts found
                </td>
            </tr>
        `);
        return;
    }
    
    const rows = accountsData.map(account => {
        const roleColor = account.role === 'A' ? 'bg-mahogany-100 text-mahogany-700' :
                         account.role === 'S' ? 'bg-sun-100 text-sun-700' :
                         'bg-gray-100 text-gray-700';
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-forest-100">
                            <i class="text-sm fas fa-user text-forest-600"></i>
                        </div>
                        <span class="font-medium text-gray-900">${account.username}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${roleColor}">
                        ${displayRole(account.role)}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    ${formatDate(account.created_at)}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button class="mr-2 text-forest-600 hover:text-forest-900 edit-account-btn" data-id="${account.acc_id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="text-red-600 hover:text-red-900 delete-account-btn" data-id="${account.acc_id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    $('#accounts-table-body').html(rows);
    
    // Attach event listeners
    $('.edit-account-btn').off('click').on('click', function() {
        const accountId = $(this).data('id');
        showEditAccountModal(accountId);
    });
    
    $('.delete-account-btn').off('click').on('click', function() {
        const accountId = $(this).data('id');
        confirmDeleteAccount(accountId);
    });
}

// Show add account modal
function showAddAccountModal() {
    editingAccountId = null;
    
    const modalHtml = `
        <div id="account-modal" class="fixed inset-0 z-50 flex items-center justify-center modal-overlay" style="background-color: rgba(0,0,0,0.5);">
            <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-forest-800 font-display">Add New Account</h3>
                    <button class="text-gray-400 hover:text-gray-600 close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="account-form">
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Username *</label>
                        <input type="text" id="account-username" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent" required>
                        <p class="mt-1 text-xs text-gray-500">3-30 characters, letters, numbers, and underscores only</p>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Password *</label>
                        <div class="relative">
                            <input type="password" id="account-password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent" required>
                            <button type="button" class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 toggle-password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <div class="mt-2">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs text-gray-500">Password strength:</span>
                                <span id="password-strength-text" class="text-xs font-medium text-gray-500">-</span>
                            </div>
                            <div class="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                                <div id="password-strength-bar" class="h-full transition-all duration-300 bg-gray-300" style="width: 0%"></div>
                            </div>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Minimum 8 characters with at least one letter and one number</p>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Role *</label>
                        <select id="account-role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent" required>
                            <option value="">Select role...</option>
                            <option value="A">Admin - Full system access</option>
                            <option value="S">Staff - Standard user access</option>
                            <option value="V">Viewer - Read-only access</option>
                        </select>
                    </div>
                    
                    <div id="form-error" class="hidden p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        <i class="mr-2 fas fa-exclamation-circle"></i>
                        <span id="form-error-message"></span>
                    </div>
                    
                    <div class="flex justify-end space-x-3">
                        <button type="button" class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 close-modal">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 text-white transition-colors rounded-lg bg-forest-600 hover:bg-forest-700">
                            <i class="mr-2 fas fa-save"></i>
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    $('body').append(modalHtml);
    
    // Event listeners
    $('.close-modal').on('click', function() {
        $('#account-modal').remove();
    });
    
    $('.toggle-password').on('click', function() {
        const input = $('#account-password');
        const icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    $('#account-password').on('input', updatePasswordStrength);
    
    $('#account-form').on('submit', function(e) {
        e.preventDefault();
        handleSaveAccount();
    });
}

// Show edit account modal
function showEditAccountModal(accountId) {
    const account = accountsData.find(a => a.acc_id === accountId);
    if (!account) return;
    
    editingAccountId = accountId;
    
    const modalHtml = `
        <div id="account-modal" class="fixed inset-0 z-50 flex items-center justify-center modal-overlay" style="background-color: rgba(0,0,0,0.5);">
            <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-forest-800 font-display">Edit Account</h3>
                    <button class="text-gray-400 hover:text-gray-600 close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="account-form">
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Username *</label>
                        <input type="text" id="account-username" value="${account.username}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent" required>
                        <p class="mt-1 text-xs text-gray-500">3-30 characters, letters, numbers, and underscores only</p>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                        <div class="relative">
                            <input type="password" id="account-password" placeholder="Leave blank to keep current password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent">
                            <button type="button" class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 toggle-password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <div class="mt-2" id="password-strength-container" style="display: none;">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs text-gray-500">Password strength:</span>
                                <span id="password-strength-text" class="text-xs font-medium text-gray-500">-</span>
                            </div>
                            <div class="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                                <div id="password-strength-bar" class="h-full transition-all duration-300 bg-gray-300" style="width: 0%"></div>
                            </div>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Minimum 8 characters with at least one letter and one number</p>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Role *</label>
                        <select id="account-role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent" required>
                            <option value="A" ${account.role === 'A' ? 'selected' : ''}>Admin - Full system access</option>
                            <option value="S" ${account.role === 'S' ? 'selected' : ''}>Staff - Standard user access</option>
                            <option value="V" ${account.role === 'V' ? 'selected' : ''}>Viewer - Read-only access</option>
                        </select>
                    </div>
                    
                    <div id="form-error" class="hidden p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        <i class="mr-2 fas fa-exclamation-circle"></i>
                        <span id="form-error-message"></span>
                    </div>
                    
                    <div class="flex justify-end space-x-3">
                        <button type="button" class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 close-modal">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 text-white transition-colors rounded-lg bg-forest-600 hover:bg-forest-700">
                            <i class="mr-2 fas fa-save"></i>
                            Update Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    $('body').append(modalHtml);
    
    // Event listeners
    $('.close-modal').on('click', function() {
        $('#account-modal').remove();
    });
    
    $('.toggle-password').on('click', function() {
        const input = $('#account-password');
        const icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    $('#account-password').on('input', function() {
        if ($(this).val()) {
            $('#password-strength-container').show();
            updatePasswordStrength();
        } else {
            $('#password-strength-container').hide();
        }
    });
    
    $('#account-form').on('submit', function(e) {
        e.preventDefault();
        handleSaveAccount();
    });
}

// Update password strength indicator
function updatePasswordStrength() {
    const password = $('#account-password').val();
    const strength = calculatePasswordStrength(password);
    
    const colors = {
        0: { color: 'bg-gray-300', text: '-', textColor: 'text-gray-500' },
        1: { color: 'bg-red-500', text: 'Weak', textColor: 'text-red-600' },
        2: { color: 'bg-sun-500', text: 'Fair', textColor: 'text-sun-600' },
        3: { color: 'bg-forest-500', text: 'Good', textColor: 'text-forest-600' },
        4: { color: 'bg-forest-600', text: 'Strong', textColor: 'text-forest-700' }
    };
    
    const config = colors[strength];
    $('#password-strength-bar').removeClass().addClass(`h-full transition-all duration-300 ${config.color}`).css('width', `${strength * 25}%`);
    $('#password-strength-text').removeClass().addClass(`text-xs font-medium ${config.textColor}`).text(config.text);
}

// Calculate password strength (0-4)
function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Contains letter and number
    if (/[A-Za-z]/.test(password) && /[0-9]/.test(password)) strength++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Mixed case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

// Validate account form
function validateAccountForm() {
    const username = $('#account-username').val().trim();
    const password = $('#account-password').val();
    const role = $('#account-role').val();
    
    // Username validation
    if (!username) {
        showFormError('Username is required');
        return false;
    }
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
        showFormError('Username must be 3-30 characters and contain only letters, numbers, and underscores');
        return false;
    }
    
    // Password validation (only for new accounts or if password is provided)
    if (!editingAccountId || password) {
        if (!password && !editingAccountId) {
            showFormError('Password is required');
            return false;
        }
        if (password && password.length < 8) {
            showFormError('Password must be at least 8 characters long');
            return false;
        }
        if (password && (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))) {
            showFormError('Password must contain at least one letter and one number');
            return false;
        }
    }
    
    // Role validation
    if (!role) {
        showFormError('Role is required');
        return false;
    }
    
    return true;
}

// Show form error
function showFormError(message) {
    $('#form-error-message').text(message);
    $('#form-error').removeClass('hidden');
}

// Hide form error
function hideFormError() {
    $('#form-error').addClass('hidden');
}

// Handle save account
function handleSaveAccount() {
    hideFormError();
    
    if (!validateAccountForm()) {
        return;
    }
    
    const username = $('#account-username').val().trim();
    const password = $('#account-password').val();
    const role = $('#account-role').val();
    
    const data = {
        username: username,
        role: role
    };
    
    // Only include password if provided
    if (password) {
        data.password = password;
    }
    
    const isNew = !editingAccountId;
    const url = isNew ? `${API_URL}/accounts.php` : `${API_URL}/accounts.php/${editingAccountId}`;
    const method = isNew ? 'POST' : 'PUT';
    
    // Disable submit button
    $('#account-form button[type="submit"]').prop('disabled', true).html('<i class="mr-2 fas fa-spinner fa-spin"></i>Saving...');
    
    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {
            'X-User-Id': getUserId()
        },
        success: function(response) {
            $('#account-modal').remove();
            fetchAccounts();
            
            // Show success message
            showNotification(isNew ? 'Account created successfully' : 'Account updated successfully', 'success');
        },
        error: function(xhr) {
            console.error('Error saving account:', xhr);
            const errorMsg = xhr.responseJSON?.error || 'An error occurred while saving the account';
            showFormError(errorMsg);
            
            // Re-enable submit button
            const buttonText = isNew ? 'Create Account' : 'Update Account';
            $('#account-form button[type="submit"]').prop('disabled', false).html(`<i class="mr-2 fas fa-save"></i>${buttonText}`);
        }
    });
}

// Confirm delete account
function confirmDeleteAccount(accountId) {
    const account = accountsData.find(a => a.acc_id === accountId);
    if (!account) return;
    
    const currentUser = Auth.getUser();
    if (currentUser && currentUser.user && currentUser.user.acc_id === accountId) {
        showNotification('Cannot delete your own account', 'error');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete the account "${account.username}"? This action cannot be undone.`)) {
        return;
    }
    
    $.ajax({
        url: `${API_URL}/accounts.php/${accountId}`,
        method: 'DELETE',
        headers: {
            'X-User-Id': getUserId()
        },
        success: function(response) {
            fetchAccounts();
            showNotification('Account deleted successfully', 'success');
        },
        error: function(xhr) {
            console.error('Error deleting account:', xhr);
            const errorMsg = xhr.responseJSON?.error || 'An error occurred while deleting the account';
            showNotification(errorMsg, 'error');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const bgColor = type === 'success' ? 'bg-forest-500' :
                    type === 'error' ? 'bg-red-500' :
                    'bg-blue-500';
    
    const notificationHtml = `
        <div class="fixed z-50 notification top-4 right-4" style="display: none;">
            <div class="px-6 py-3 text-white rounded-lg shadow-lg ${bgColor}">
                <i class="mr-2 fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                ${message}
            </div>
        </div>
    `;
    
    $('body').append(notificationHtml);
    $('.notification').fadeIn(300);
    
    setTimeout(function() {
        $('.notification').fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}
