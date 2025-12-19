// Dashboard JavaScript
function loadDashboard() {
    const html = `
        <div class="mb-6">
            <h1 class="text-3xl font-display font-bold text-forest-900 mb-2">Dashboard</h1>
            <p class="text-earth-600">Overview of Barangay New San Roque Population</p>
        </div>

        <!-- Statistics Cards -->
        <div id="stats-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-users text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">Total Population</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-total-population">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>

            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-sun-500 to-sun-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-home text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">Total Households</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-total-households">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>

            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-male text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">Male</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-male">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>

            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-female text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">Female</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-female">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>
            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-vote-yea text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">Registered Voters</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-registered-voters">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>
            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-wheelchair text-white text-xl"></i>
                    </div>
                </div>
                <p class="text-sm text-earth-600 mb-1">PWD</p>
                <p class="text-3xl font-bold text-forest-900" id="stat-pwd">
                    <i class="fas fa-spinner fa-spin"></i>
                </p>
            </div>
        </div>

        <!-- Zone Statistics and Age Distribution -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Zone Statistics -->
            <div class="glass-card p-6">
                <h2 class="text-xl font-display font-bold text-forest-900 mb-4">
                    <i class="fas fa-map-marked-alt mr-2"></i>
                    Population by Zone
                </h2>
                <div id="zone-stats-container" class="space-y-3">
                    <div class="text-center py-8">
                        <i class="fas fa-spinner fa-spin text-2xl text-forest-600"></i>
                    </div>
                </div>
            </div>

            <!-- Age Distribution -->
            <div class="glass-card p-6">
                <h2 class="text-xl font-display font-bold text-forest-900 mb-4">
                    <i class="fas fa-chart-bar mr-2"></i>
                    Age Distribution
                </h2>
                <div id="age-distribution-container" class="space-y-3">
                    <div class="text-center py-8">
                        <i class="fas fa-spinner fa-spin text-2xl text-forest-600"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="glass-card p-6 mt-6">
            <h2 class="text-xl font-display font-bold text-forest-900 mb-4">
                <i class="fas fa-clock mr-2"></i>
                Recent Activity
            </h2>
            <div id="recent-activity-container">
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-2xl text-forest-600"></i>
                </div>
            </div>
        </div>
    `;

    $('#page-content').html(html);

    // Load all dashboard data
    loadPopulationStats();
    loadZoneStats();
    loadAgeDistribution();
    loadRecentActivity();
}

function loadPopulationStats() {
    $.ajax({
        url: `${API_URL}/statistics.php/population`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Population stats received:', data);
            $('#stat-total-population').text(data.total_population || 0);
            $('#stat-total-households').text(data.total_households || 0);
            $('#stat-male').text(data.male_count || 0);
            $('#stat-female').text(data.female_count || 0);
            $('#stat-registered-voters').text(data.registered_voter_count || 0);
            $('#stat-pwd').text(data.pwd_count || 0);
        },
        error: function(xhr, status, error) {
            console.error('Population stats error:', status, error);
            $('#stat-total-population, #stat-total-households, #stat-male, #stat-female').text('Error');
        }
    });
}

function loadZoneStats() {
    $.ajax({
        url: `${API_URL}/statistics.php/zones`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Zone stats received:', data);
            
            // Check if data is an array
            if (!Array.isArray(data)) {
                console.error('Zone stats is not an array:', data);
                $('#zone-stats-container').html('<p class="text-center text-mahogany-600">Error: Invalid data format</p>');
                return;
            }
            
            if (data.length === 0) {
                $('#zone-stats-container').html('<p class="text-center text-earth-600">No zone data available</p>');
                return;
            }

            const html = data.map(zone => `
                <div class="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center mr-3">
                            <span class="text-white font-bold">${zone.zone_num}</span>
                        </div>
                        <div>
                            <p class="font-semibold text-forest-900">Zone ${zone.zone_num}</p>
                            <p class="text-xs text-earth-600">${zone.household_count} households</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-forest-900">${zone.population}</p>
                        <p class="text-xs text-earth-600">people</p>
                    </div>
                </div>
            `).join('');

            $('#zone-stats-container').html(html);
        },
        error: function() {
            $('#zone-stats-container').html('<p class="text-center text-mahogany-600">Error loading zone statistics</p>');
        }
    });
}

function loadAgeDistribution() {
    $.ajax({
        url: `${API_URL}/statistics.php/age-distribution`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Age distribution received:', data);
            
            // Check if data is an array
            if (!Array.isArray(data)) {
                console.error('Age distribution is not an array:', data);
                $('#age-distribution-container').html('<p class="text-center text-mahogany-600">Error: Invalid data format</p>');
                return;
            }
            
            if (data.length === 0) {
                $('#age-distribution-container').html('<p class="text-center text-earth-600">No age data available</p>');
                return;
            }

            const total = data.reduce((sum, item) => sum + parseInt(item.count), 0);

            const html = data.map(item => {
                const percentage = total > 0 ? (item.count / total * 100).toFixed(1) : 0;
                return `
                    <div class="mb-3">
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium text-forest-900">${item.age_group}</span>
                            <span class="text-sm text-earth-600">${item.count} (${percentage}%)</span>
                        </div>
                        <div class="w-full bg-earth-200 rounded-full h-2.5">
                            <div class="bg-gradient-to-r from-forest-500 to-forest-600 h-2.5 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            }).join('');

            $('#age-distribution-container').html(html);
        },
        error: function() {
            $('#age-distribution-container').html('<p class="text-center text-mahogany-600">Error loading age distribution</p>');
        }
    });
}

function loadRecentActivity() {
    $.ajax({
        url: `${API_URL}/audit-trail.php?limit=5`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Recent activity:', data);
            if (!Array.isArray(data)) {
                $('#recent-activity-container').html('<p class="text-center text-mahogany-600">Error: Invalid data</p>');
                return;
            }
            if (data.length === 0) {
                $('#recent-activity-container').html('<p class="text-center text-earth-600 py-4">No recent activity</p>');
                return;
            }

            const html = data.map(entry => {
                const icon = entry.change_type === 'C' ? 'plus-circle' : 
                             entry.change_type === 'U' ? 'edit' : 'trash-alt';
                const color = entry.change_type === 'C' ? 'text-green-600' : 
                              entry.change_type === 'U' ? 'text-blue-600' : 'text-red-600';

                return `
                    <div class="flex items-start py-3 border-b border-earth-200 last:border-0">
                        <i class="fas fa-${icon} ${color} mt-1 mr-3"></i>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-forest-900">${entry.details}</p>
                            <p class="text-xs text-earth-600">
                                ${entry.username || 'System'} • ${formatDateTime(entry.change_date)}
                            </p>
                        </div>
                    </div>
                `;
            }).join('');

            $('#recent-activity-container').html(html);
        },
        error: function() {
            $('#recent-activity-container').html('<p class="text-center text-mahogany-600 py-4">Error loading recent activity</p>');
        }
    });
}
