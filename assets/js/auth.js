// Authentication JavaScript
const API_URL = 'backend/api';

// Auth utility functions
const Auth = {
    login: function(username, password) {
        return $.ajax({
            url: `${API_URL}/auth.php?action=login`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password })
        });
    },

    logout: function() {
        return $.ajax({
            url: `${API_URL}/auth.php?action=logout`,
            method: 'POST'
        });
    },

    checkAuth: function() {
        return $.ajax({
            url: `${API_URL}/auth.php?action=check`,
            method: 'GET'
        });
    },

    setUser: function(user) {
        const authData = {
            isAuthenticated: true,
            user: user,
            activePage: 'dashboard'
        };
        localStorage.setItem('auth-storage', JSON.stringify(authData));
    },

    getUser: function() {
        const data = localStorage.getItem('auth-storage');
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return null;
            }
        }
        return null;
    },

    clearUser: function() {
        localStorage.removeItem('auth-storage');
    },

    isAuthenticated: function() {
        const authData = this.getUser();
        return authData && authData.isAuthenticated;
    },

    requireAuth: function() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.php';
        }
    },

    setActivePage: function(page) {
        const authData = this.getUser();
        if (authData) {
            authData.activePage = page;
            localStorage.setItem('auth-storage', JSON.stringify(authData));
        }
    },

    getActivePage: function() {
        const authData = this.getUser();
        return authData ? authData.activePage : 'dashboard';
    }
};

// Login form handling (for login.php)
$(document).ready(function() {
    // Check if already logged in
    if (Auth.isAuthenticated() && window.location.pathname.includes('login.php')) {
        window.location.href = 'admin.php';
        return;
    }

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val().trim();
        const password = $('#password').val();
        
        console.log('Login attempt for username:', username);
        
        // Show loading state
        $('#login-button').prop('disabled', true);
        $('#login-text').addClass('hidden');
        $('#login-spinner').removeClass('hidden');
        $('#error-message').addClass('hidden');
        
        Auth.login(username, password)
            .done(function(response) {
                console.log('Login response:', response);
                if (response.success) {
                    // Save user to localStorage
                    Auth.setUser(response.user);
                    
                    // Redirect to admin page
                    window.location.href = 'admin.php';
                } else {
                    console.error('Login failed:', response.message);
                    showError(response.message || 'Login failed');
                }
            })
            .fail(function(xhr) {
                console.error('Login request failed:', xhr.status, xhr.responseText);
                const error = xhr.responseJSON?.error || 'Login failed. Please try again.';
                showError(error);
            })
            .always(function() {
                // Reset button state
                $('#login-button').prop('disabled', false);
                $('#login-text').removeClass('hidden');
                $('#login-spinner').addClass('hidden');
            });
    });
    
    function showError(message) {
        $('#error-text').text(message);
        $('#error-message').removeClass('hidden');
    }
});

// Logout function (for admin.php)
function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        Auth.logout()
            .always(function() {
                Auth.clearUser();
                window.location.href = 'login.php';
            });
    }
}
