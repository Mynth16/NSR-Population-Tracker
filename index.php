<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barangay New San Roque - Population Tracker</title>
    <link rel="icon" type="image" href="images/NSRLogo.png" />
    <base href="/NSR-Population-Tracker/">
    
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
    
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center min-h-screen overflow-hidden">
        <!-- Background Decorations -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-0 rounded-full w-96 h-96 bg-sun-400 opacity-20 blur-3xl animate-pulse-glow"></div>
            <div class="absolute bottom-0 right-0 delay-500 rounded-full w-96 h-96 bg-forest-500 opacity-20 blur-3xl animate-pulse-glow"></div>
        </div>

        <div class="container relative z-10 px-4 mx-auto">
            <div class="grid items-center gap-12 lg:grid-cols-2">
                <!-- Left Side: Content -->
                <div class="text-center lg:text-left">
                    <!-- Logo -->
                    <div class="mb-8 animate-fade-in-up">
                        <img src="images/NSRLogo.png" alt="Barangay New San Roque Logo" class="w-32 h-32 mx-auto mb-6 lg:mx-0 animate-float">
                    </div>

                    <!-- Title -->
                    <h1 class="mb-6 text-5xl font-bold delay-200 md:text-6xl lg:text-7xl font-display text-forest-900 animate-fade-in-up">
                        Barangay New San Roque
                    </h1>
                    
                    <p class="max-w-2xl mx-auto mb-8 text-xl delay-300 md:text-2xl lg:mx-0 text-earth-600 animate-fade-in-up">
                        Population Management System
                    </p>

                    <!-- Call to Action -->
                    <div class="flex flex-col justify-center gap-4 sm:flex-row animate-fade-in-up delay-400">
                        <a href="login.php" class="inline-block px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 btn-shimmer">
                            <i class="mr-2 fas fa-sign-in-alt"></i>
                            Admin Login
                        </a>
                        <a href="#about" class="inline-block px-8 py-4 font-semibold transition-all duration-300 bg-white border-2 rounded-lg hover:bg-earth-100 text-forest-900 border-forest-600">
                            <i class="mr-2 fas fa-info-circle"></i>
                            Learn More
                        </a>
                    </div>
                </div>

                <!-- Right Side: Image -->
                <div class="hidden delay-300 lg:block animate-fade-in-right">
                    <div class="relative">
                        <!-- Decorative border -->
                        <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-sun-400 to-forest-600 opacity-20 blur-2xl"></div>
                        <div class="relative overflow-hidden shadow-2xl rounded-3xl">
                            <img src="images/main.jpg" alt="Barangay New San Roque" class="object-cover w-full h-auto transition-transform duration-700 hover:scale-105">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
            <i class="text-3xl fas fa-chevron-down text-forest-600"></i>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
        <div class="container px-4 mx-auto">
            <div class="max-w-4xl mx-auto">
                <h2 class="mb-12 text-4xl font-bold text-center font-display text-forest-900">
                    About the System
                </h2>
                
                <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div class="p-6 text-center glass-card">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-forest-500 to-forest-600">
                            <i class="text-2xl text-white fas fa-users"></i>
                        </div>
                        <h3 class="mb-3 text-xl font-bold font-display text-forest-900">Population Tracking</h3>
                        <p class="text-earth-600">Efficiently manage and track all residents in the barangay with comprehensive demographic data.</p>
                    </div>

                    <div class="p-6 text-center glass-card">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-sun-500 to-sun-600">
                            <i class="text-2xl text-white fas fa-home"></i>
                        </div>
                        <h3 class="mb-3 text-xl font-bold font-display text-forest-900">Household Management</h3>
                        <p class="text-earth-600">Organize households by zones and maintain accurate records of all family members.</p>
                    </div>

                    <div class="p-6 text-center glass-card">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                            <i class="text-2xl text-white fas fa-chart-line"></i>
                        </div>
                        <h3 class="mb-3 text-xl font-bold font-display text-forest-900">Analytics & Reports</h3>
                        <p class="text-earth-600">Generate insights with population statistics, demographics, and trend analysis.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Vision & Mission Section -->
    <section id="vision" class="relative py-32 overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-gradient-to-b from-earth-50 via-white to-forest-50/30"></div>
        
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-600 via-sun-400 to-forest-600"></div>
        <div class="absolute rounded-full top-20 right-10 w-72 h-72 bg-sun-200/20 blur-3xl"></div>
        <div class="absolute rounded-full bottom-20 left-10 w-96 h-96 bg-forest-200/20 blur-3xl"></div>

        <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-20 text-center animate-fade-in-up">
                <span class="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-forest-100 text-forest-700">
                    Our Purpose
                </span>
                <h2 class="mb-6 text-4xl font-bold text-forest-950 md:text-5xl lg:text-6xl font-display">
                    Vision & Mission
                </h2>
                <div class="flex items-center justify-center gap-2">
                    <div class="w-16 h-1 rounded-full bg-gradient-to-r from-forest-600 to-forest-400"></div>
                    <div class="w-3 h-3 rounded-full bg-sun-400"></div>
                    <div class="w-16 h-1 rounded-full bg-gradient-to-l from-forest-600 to-forest-400"></div>
                </div>
            </div>

            <!-- Cards Grid -->
            <div class="grid gap-8 lg:gap-12 md:grid-cols-2">
                <!-- Vision Card -->
                <div class="delay-200 group animate-fade-in-left">
                    <div class="relative h-full p-8 transition-all duration-500 glass-card golden-border md:p-12 hover:shadow-2xl hover:-translate-y-2">
                        <!-- Card Background Accent -->
                        <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sun-200/40 to-transparent rounded-bl-[100px]"></div>
                        
                        <!-- Icon -->
                        <div class="relative flex items-center justify-center w-20 h-20 mb-8 shadow-lg rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 group-hover:animate-pulse-glow">
                            <i class="text-3xl text-white fas fa-eye"></i>
                        </div>
                        
                        <!-- Content -->
                        <h3 class="relative mb-6 text-3xl font-bold text-forest-950 font-display">
                            Our Vision
                        </h3>
                        <p class="relative text-lg leading-relaxed text-earth-700 font-body">
                            A <span class="font-semibold text-forest-700">progressive, peaceful, and self-reliant</span> barangay where every resident enjoys a high quality of life through sustainable development, good governance, and active community participation.
                        </p>
                        
                        <!-- Decorative line -->
                        <div class="absolute bottom-0 h-1 rounded-full opacity-50 left-12 right-12 bg-gradient-to-r from-transparent via-sun-400 to-transparent"></div>
                    </div>
                </div>

                <!-- Mission Card -->
                <div class="delay-300 group animate-fade-in-right">
                    <div class="relative h-full p-8 transition-all duration-500 glass-card-dark md:p-12 hover:shadow-2xl hover:-translate-y-2">
                        <!-- Card Background Accent -->
                        <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-forest-400/20 to-transparent rounded-bl-[100px]"></div>
                        
                        <!-- Icon -->
                        <div class="relative flex items-center justify-center w-20 h-20 mb-8 shadow-lg rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 group-hover:animate-pulse-glow">
                            <i class="text-3xl text-white fas fa-bullseye"></i>
                        </div>
                        
                        <!-- Content -->
                        <h3 class="relative mb-6 text-3xl font-bold text-white font-display">
                            Our Mission
                        </h3>
                        <p class="relative text-lg leading-relaxed text-forest-100 font-body">
                            To provide <span class="font-semibold text-sun-300">efficient and responsive</span> public services, promote inclusive economic opportunities, maintain peace and order, protect the environment, and empower every resident to actively participate in community development.
                        </p>
                        
                        <!-- Decorative line -->
                        <div class="absolute bottom-0 h-1 rounded-full opacity-50 left-12 right-12 bg-gradient-to-r from-transparent via-sun-400 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="relative py-32 overflow-hidden bg-gradient-to-b from-forest-50/30 via-earth-50 to-earth-100">
        <!-- Background decorations -->
        <div class="absolute rounded-full top-20 left-10 w-80 h-80 bg-sun-200/30 blur-3xl"></div>
        <div class="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-forest-200/20 blur-3xl"></div>

        <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-20 text-center animate-fade-in-up">
                <span class="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-forest-100 text-forest-700">
                    Our Team
                </span>
                <h2 class="mb-6 text-4xl font-bold text-forest-950 md:text-5xl lg:text-6xl font-display">
                    Barangay Officials & Staff
                </h2>
                <div class="flex items-center justify-center gap-2 mb-8">
                    <div class="w-16 h-1 rounded-full bg-gradient-to-r from-forest-600 to-forest-400"></div>
                    <div class="w-3 h-3 rounded-full bg-sun-400"></div>
                    <div class="w-16 h-1 rounded-full bg-gradient-to-l from-forest-600 to-forest-400"></div>
                </div>
                <p class="max-w-2xl mx-auto text-xl text-earth-600">
                    Dedicated leaders and staff serving our community with integrity and compassion
                </p>
            </div>

            <!-- Loading State -->
            <div id="team-loading" class="flex items-center justify-center py-20">
                <div class="w-12 h-12 border-4 rounded-full border-forest-200 border-t-forest-600 animate-spin"></div>
            </div>

            <!-- Error State -->
            <div id="team-error" class="hidden py-10 text-center">
                <p class="text-red-500">Failed to load team members. Please try again later.</p>
            </div>

            <!-- Team Content -->
            <div id="team-content" class="hidden">
                <!-- Leadership Section -->
                <div class="mb-24">
                    <div class="flex items-center justify-center gap-3 mb-12">
                        <i class="text-xl fas fa-award text-sun-500"></i>
                        <h3 class="text-2xl font-bold text-center text-forest-900 font-display">
                            Barangay Leadership
                        </h3>
                    </div>
                    
                    <div id="leadership-grid" class="grid gap-8 md:grid-cols-3"></div>
                </div>

                <!-- Officials Section -->
                <div class="mb-24">
                    <div class="flex items-center justify-center gap-3 mb-12">
                        <i class="text-xl fas fa-users text-forest-600"></i>
                        <h3 class="text-2xl font-bold text-center text-forest-900 font-display">
                            Barangay Officials
                        </h3>
                    </div>
                    
                    <div id="officials-grid" class="grid gap-6 md:grid-cols-2 lg:grid-cols-4"></div>
                </div>

                <!-- Health Staff Section -->
                <div class="relative p-10 overflow-hidden lg:p-16 rounded-3xl animate-fade-in-up">
                    <!-- Dark forest background -->
                    <div class="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900"></div>
                    
                    <!-- Pattern overlay -->
                    <div class="absolute inset-0 opacity-5">
                        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
                    </div>
                    
                    <!-- Decorative glows -->
                    <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-sun-400/10 blur-3xl"></div>
                    <div class="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-forest-400/10 blur-3xl"></div>
                    
                    <div class="relative">
                        <div class="flex items-center justify-center gap-3 mb-12">
                            <i class="text-xl fas fa-heart text-sun-400"></i>
                            <h3 class="text-2xl font-bold text-center text-white font-display">
                                Barangay Health & Support Staff
                            </h3>
                        </div>
                        
                        <div id="health-grid" class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 text-white bg-forest-950">
        <div class="container px-4 mx-auto text-center">
            <div class="mb-6">
                <img src="images/NSRLogo.png" alt="Logo" class="w-16 h-16 mx-auto mb-4">
                <h3 class="text-xl font-bold font-display">Barangay New San Roque</h3>
                <p class="text-forest-200">Population Management System</p>
            </div>
            
            <div class="pt-6 mt-6 border-t border-forest-800">
                <p class="text-sm text-forest-300">
                    &copy; <?php echo date('Y'); ?> Barangay New San Roque. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Smooth Scroll -->
    <script>
        $(document).ready(function() {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                const target = $(this.getAttribute('href'));
                if (target.length) {
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
            });

            // Load team members
            loadTeamMembers();
        });

        function loadTeamMembers() {
            $.ajax({
                url: 'backend/api/staff.php',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data && data.length > 0) {
                        // Categorize staff (L=Leadership, O=Official, H=Health)
                        const leadership = data.filter(s => s.category === 'L').reverse();
                        const officials = data.filter(s => s.category === 'O').reverse();
                        const health = data.filter(s => s.category === 'H');

                        // Render each category
                        renderLeadership(leadership);
                        renderOfficials(officials);
                        renderHealth(health);

                        // Show content, hide loading
                        $('#team-loading').hide();
                        $('#team-content').removeClass('hidden');
                    } else {
                        $('#team-loading').hide();
                        $('#team-error').removeClass('hidden');
                    }
                },
                error: function() {
                    $('#team-loading').hide();
                    $('#team-error').removeClass('hidden');
                }
            });
        }

        function getPicture(member) {
            return member.picture || 'images/blank.jpg';
        }

        function getFullName(member) {
            return member.first_name + ' ' + member.last_name;
        }

        function renderLeadership(members) {
            const grid = $('#leadership-grid');
            grid.empty();

            members.forEach(member => {
                const html = `
                    <div class="group animate-fade-in-up">
                        <div class="relative p-8 text-center transition-all duration-500 glass-card hover:shadow-2xl hover:-translate-y-2">
                            <!-- Golden ring effect -->
                            <div class="relative mx-auto mb-6 w-36 h-36">
                                <div class="absolute inset-0 p-1 rounded-full shadow-lg bg-gradient-to-br from-sun-300 to-sun-500 group-hover:animate-pulse-glow">
                                    <div class="w-full h-full overflow-hidden bg-white rounded-full">
                                        <img src="${getPicture(member)}" alt="${getFullName(member)}" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110">
                                    </div>
                                </div>
                            </div>
                            
                            <h4 class="mb-2 text-xl font-bold text-forest-950 font-display">
                                ${getFullName(member)}
                            </h4>
                            <p class="px-4 py-1.5 inline-block rounded-full bg-gradient-to-r from-forest-600 to-forest-500 text-white text-sm font-medium">
                                ${member.title}
                            </p>
                        </div>
                    </div>
                `;
                grid.append(html);
            });
        }

        function renderOfficials(members) {
            const grid = $('#officials-grid');
            grid.empty();

            members.forEach(member => {
                const html = `
                    <div class="group animate-fade-in-up">
                        <div class="relative p-6 text-center transition-all duration-500 border bg-white/80 backdrop-blur-sm rounded-2xl border-forest-100 hover:border-sun-300 hover:shadow-xl hover:-translate-y-1">
                            <!-- Photo -->
                            <div class="relative w-24 h-24 mx-auto mb-4">
                                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 p-0.5 shadow-md">
                                    <div class="w-full h-full overflow-hidden bg-white rounded-full">
                                        <img src="${getPicture(member)}" alt="${getFullName(member)}" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110">
                                    </div>
                                </div>
                            </div>
                            
                            <h4 class="mb-1 text-lg font-bold text-forest-900">
                                ${getFullName(member)}
                            </h4>
                            <p class="text-sm leading-tight text-earth-600">
                                ${member.title}
                            </p>
                        </div>
                    </div>
                `;
                grid.append(html);
            });
        }

        function renderHealth(members) {
            const grid = $('#health-grid');
            grid.empty();

            members.forEach(member => {
                const html = `
                    <div class="p-5 transition-all duration-300 border group rounded-2xl bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-sun-400/30">
                        <div class="flex items-center gap-4">
                            <div class="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-sun-400 to-sun-500 p-0.5 shadow-lg">
                                <div class="w-full h-full rounded-[10px] overflow-hidden bg-forest-900">
                                    <img src="${getPicture(member)}" alt="${getFullName(member)}" class="object-cover w-full h-full">
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-white">${getFullName(member)}</h4>
                                <p class="text-sm text-forest-300">${member.title}</p>
                            </div>
                        </div>
                    </div>
                `;
                grid.append(html);
            });
        }
    </script>
</body>
</html>
