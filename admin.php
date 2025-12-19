<?php
require_once 'backend/includes/auth.php';
Auth::startSession();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Barangay New San Roque</title>
    <link rel="icon" type="image" href="images/NSRLogo.png" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        sun: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
                        forest: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
                        earth: { 50: '#faf5f0', 100: '#f5ebe0', 200: '#e7d4c0', 300: '#d4b89e', 400: '#c09a7a', 500: '#a67c52', 600: '#8b6340', 700: '#6f4e33', 800: '#593f2b', 900: '#451a03' },
                        mahogany: { 50: '#fdf2f2', 100: '#fce4e4', 200: '#f9cbcb', 300: '#f5a9a9', 400: '#ee7b7b', 500: '#e35151', 600: '#cd3737', 700: '#ad2929', 800: '#8f2626', 900: '#762525' }
                    },
                    fontFamily: {
                        'display': ['Fraunces', 'serif'],
                        'body': ['Outfit', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-earth-50">
    
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="fixed w-64 h-full text-white admin-sidebar">
            <div class="p-6">
                <div class="flex items-center mb-8">
                    <img src="images/NSRLogo.png" alt="Logo" class="w-12 h-12 mr-3">
                    <div>
                        <h2 class="text-lg font-bold font-display">NSR Admin</h2>
                        <p class="text-xs text-forest-200" id="user-role">Administrator</p>
                    </div>
                </div>

                <!-- Navigation -->
                <nav>
                    <a href="javascript:void(0)" class="flex items-center px-4 py-3 mb-2 transition-colors rounded-lg nav-item hover:bg-forest-800" data-page="dashboard">
                        <i class="w-5 mr-3 fas fa-chart-line"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="javascript:void(0)" class="flex items-center px-4 py-3 mb-2 transition-colors rounded-lg nav-item hover:bg-forest-800" data-page="population">
                        <i class="w-5 mr-3 fas fa-users"></i>
                        <span>Population</span>
                    </a>
                    <a href="javascript:void(0)" class="flex items-center px-4 py-3 mb-2 transition-colors rounded-lg nav-item hover:bg-forest-800" data-page="households">
                        <i class="w-5 mr-3 fas fa-home"></i>
                        <span>Households</span>
                    </a>
                    <a href="javascript:void(0)" class="flex items-center px-4 py-3 mb-2 transition-colors rounded-lg nav-item hover:bg-forest-800" data-page="accounts">
                        <i class="w-5 mr-3 fas fa-user-cog"></i>
                        <span>Account Management</span>
                    </a>
                    <a href="javascript:void(0)" class="flex items-center px-4 py-3 mb-2 transition-colors rounded-lg nav-item hover:bg-forest-800" data-page="audit-trail">
                        <i class="w-5 mr-3 fas fa-history"></i>
                        <span>Audit Trail</span>
                    </a>
                </nav>
            </div>

            <!-- User Section -->
            <div class="absolute bottom-0 w-64 p-6 border-t border-forest-700">
                <div class="flex items-center mb-3">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-forest-700">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-semibold" id="user-name">Admin</p>
                        <p class="text-xs text-forest-200">Online</p>
                    </div>
                </div>
                <button id="logout-btn" class="w-full px-4 py-2 text-sm transition-colors rounded-lg bg-mahogany-600 hover:bg-mahogany-700">
                    <i class="mr-2 fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8 ml-64">
            <div id="page-content">
                <!-- Content will be loaded here dynamically -->
            </div>
        </main>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Scripts -->
    <script src="assets/js/auth.js"></script>
    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/population.js"></script>
    <script src="assets/js/households.js"></script>
    <script src="assets/js/accounts.js"></script>
    <script src="assets/js/audit.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>
