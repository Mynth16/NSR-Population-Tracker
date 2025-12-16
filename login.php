<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Barangay New San Roque</title>
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
<body class="min-h-screen flex items-center justify-center bg-earth-50 relative overflow-hidden">
    
    <!-- Background Decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-0 w-64 h-64 bg-sun-400 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-forest-500 rounded-full opacity-20 blur-3xl"></div>
    </div>

    <!-- Login Container -->
    <div class="relative z-10 w-full max-w-md px-4">
        <div class="glass-card p-8">
            <!-- Logo and Title -->
            <div class="text-center mb-8">
                <img src="images/NSRLogo.png" alt="NSR Logo" class="w-24 h-24 mx-auto mb-4">
                <h1 class="text-3xl font-display font-bold text-forest-900 mb-2">Barangay New San Roque</h1>
                <p class="text-earth-600">Population Management System</p>
            </div>

            <!-- Error Message -->
            <div id="error-message" class="hidden mb-4 p-4 bg-mahogany-100 border border-mahogany-300 text-mahogany-800 rounded-lg">
                <i class="fas fa-exclamation-circle mr-2"></i>
                <span id="error-text">Invalid credentials</span>
            </div>

            <!-- Login Form -->
            <form id="login-form">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-semibold text-forest-900 mb-2">Username</label>
                    <div class="relative">
                        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400"></i>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            class="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                            placeholder="Enter your username"
                            required
                        >
                    </div>
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-semibold text-forest-900 mb-2">Password</label>
                    <div class="relative">
                        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400"></i>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        >
                    </div>
                </div>

                <button 
                    type="submit" 
                    id="login-button"
                    class="w-full bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 btn-shimmer"
                >
                    <span id="login-text">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Sign In
                    </span>
                    <span id="login-spinner" class="hidden">
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        Signing in...
                    </span>
                </button>
            </form>

            <div class="mt-6 text-center">
                <a href="index.php" class="text-forest-600 hover:text-forest-700 text-sm font-medium">
                    <i class="fas fa-arrow-left mr-1"></i>
                    Back to Home
                </a>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Login Script -->
    <script src="assets/js/auth.js"></script>
</body>
</html>
