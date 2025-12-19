// Main Application JavaScript
// Note: API_URL is already declared in auth.js

// Test if jQuery is loaded
if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded!');
    alert('jQuery failed to load. Please check your internet connection.');
} else {
    console.log('jQuery version:', jQuery.fn.jquery);
}

// Initialize app on page load
$(document).ready(function() {
    console.log('App.js loaded - DOM ready');
    console.log('Current pathname:', window.location.pathname);
    console.log('Current href:', window.location.href);
    
    // Check authentication for admin page - check multiple conditions
    const isAdminPage = window.location.pathname.includes('admin.php') || 
                        window.location.href.includes('admin.php') ||
                        document.title.includes('Admin');
    
    console.log('Is admin page?', isAdminPage);
    
    if (isAdminPage) {
        console.log('Admin page detected - initializing');
        
        // Check if Auth is available
        if (typeof Auth === 'undefined') {
            console.error('Auth object not found!');
            alert('Authentication module failed to load');
            return;
        }
        
        Auth.requireAuth();
        
        // Set user info
        const authData = Auth.getUser();
        console.log('Auth data:', authData);
        if (authData && authData.user) {
            $('#user-name').text(authData.user.username);
            $('#user-role').text(authData.user.role.charAt(0).toUpperCase() + authData.user.role.slice(1));
        }
        
        // Add event listeners for navigation links using event delegation
        $(document).on('click', '.nav-item', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const page = $(this).data('page');
            console.log('Navigation clicked:', page);
            if (page) {
                loadPage(page);
            }
            return false;
        });
        
        // Add event listener for logout button
        $(document).on('click', '#logout-btn', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Logout clicked');
            handleLogout();
            return false;
        });
        
        console.log('Event listeners attached');
        
        // Load initial page
        const activePage = Auth.getActivePage();
        console.log('Loading initial page:', activePage);
        loadPage(activePage);
    } else {
        console.log('Not admin page, skipping initialization');
    }
});

// Page loading function
function loadPage(page) {
    // Update active navigation
    $('.nav-item').removeClass('bg-forest-700');
    $(`.nav-item[data-page="${page}"]`).addClass('bg-forest-700');
    
    // Save active page
    Auth.setActivePage(page);
    
    // Load page content
    $('#page-content').html('<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-forest-600"></i></div>');
    
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'population':
            loadPopulation();
            break;
        case 'households':
            loadHouseholds();
            break;
        case 'accounts':
            loadAccounts();
            break;
        case 'audit-trail':
            loadAuditTrail();
            break;
        default:
            $('#page-content').html('<div class="text-center py-12"><p class="text-xl text-earth-600">Page not found</p></div>');
    }
}

// Utility function to format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Utility function to format datetime
function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Utility function to calculate age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Utility function to get user ID for audit trail
function getUserId() {
    const authData = Auth.getUser();
    return authData && authData.user ? authData.user.acc_id : null;
}

// Modal helper functions
function showModal(modalId) {
    $(`#${modalId}`).addClass('active').fadeIn(300);
    $('body').addClass('modal-open');
}

function hideModal(modalId) {
    $(`#${modalId}`).removeClass('active').fadeOut(300);
    $('body').removeClass('modal-open');
}

// Close modal on backdrop click
$(document).on('click', '.modal-overlay', function(e) {
    if ($(e.target).hasClass('modal-overlay')) {
        $(this).removeClass('active').fadeOut(300);
        $('body').removeClass('modal-open');
    }
});

// Close modal on escape key
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('.modal-overlay.active').removeClass('active').fadeOut(300);
        $('body').removeClass('modal-open');
    }
});

/**
 * Display mapping objects for optimized database fields
 * Maps short codes to full display text
 */
const DisplayMaps = {
    gender: {
        'M': 'Male',
        'F': 'Female'
    },
    civilStatus: {
        'S': 'Single',
        'M': 'Married',
        'W': 'Widowed',
        'SEP': 'Separated',
        'D': 'Divorced'
    },
    residentStatus: {
        'A': 'Active',
        'D': 'Deceased',
        'M': 'Moved',
        'X': 'Archived'
    },
    householdStatus: {
        'A': 'Active',
        'I': 'Inactive',
        'X': 'Archived'
    },
    staffCategory: {
        'L': 'Leadership',
        'O': 'Official',
        'H': 'Health'
    },
    role: {
        'A': 'Admin',
        'S': 'Staff',
        'V': 'Viewer'
    },
    recordType: {
        'H': 'Household',
        'R': 'Resident',
        'S': 'Staff',
        'A': 'Account'
    },
    changeType: {
        'C': 'Create',
        'U': 'Update',
        'D': 'Delete'
    }
};

// Helper functions to get display text
function displayGender(code) {
    return DisplayMaps.gender[code] || code;
}

function displayCivilStatus(code) {
    return DisplayMaps.civilStatus[code] || code;
}

function displayResidentStatus(code) {
    return DisplayMaps.residentStatus[code] || code;
}

function displayHouseholdStatus(code) {
    return DisplayMaps.householdStatus[code] || code;
}

function displayStaffCategory(code) {
    return DisplayMaps.staffCategory[code] || code;
}

function displayRole(code) {
    return DisplayMaps.role[code] || code;
}

function displayRecordType(code) {
    return DisplayMaps.recordType[code] || code;
}

function displayChangeType(code) {
    return DisplayMaps.changeType[code] || code;
}
