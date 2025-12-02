import { Award, Users as UsersIcon, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StaffMember {
  staff_id: string;
  first_name: string;
  last_name: string;
  title: string;
  category: 'leadership' | 'official' | 'health';
  picture: string | null;
}

const Team = () => {
  const [leadership, setLeadership] = useState<StaffMember[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [health, setHealth] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/staff');
        if (!response.ok) {
          throw new Error('Failed to fetch staff data');
        }
        const data: StaffMember[] = await response.json();
        
        // Categorize staff by their category field
        setLeadership(data.filter(s => s.category === 'leadership'));
        setStaff(data.filter(s => s.category === 'official'));
        setHealth(data.filter(s => s.category === 'health'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Helper to get full name
  const getFullName = (member: StaffMember) => `${member.first_name} ${member.last_name}`;
  
  // Helper to get picture path with fallback
  const getPicture = (member: StaffMember) => member.picture || 'images/blank.jpg';

  return (
    <section id="team" className="relative py-32 overflow-hidden bg-gradient-to-b from-forest-50/30 via-earth-50 to-earth-100">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-sun-200/30 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-forest-200/20 blur-3xl"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center animate-fade-in-up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-forest-100 text-forest-700">
            Our Team
          </span>
          <h2 className="mb-6 text-4xl font-bold text-forest-950 md:text-5xl lg:text-6xl font-display">
            Barangay Officials & Staff
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-forest-600 to-forest-400"></div>
            <div className="w-3 h-3 rounded-full bg-sun-400"></div>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-forest-600 to-forest-400"></div>
          </div>
          <p className="max-w-2xl mx-auto text-xl text-earth-600">
            Dedicated leaders and staff serving our community with integrity and compassion
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Leadership Section */}
            <div className="mb-24">
              <div className="flex items-center justify-center gap-3 mb-12">
                <Award className="w-6 h-6 text-sun-500" />
                <h3 className="text-2xl font-bold text-center text-forest-900 font-display">
                  Barangay Leadership
                </h3>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3">
                {leadership.toReversed().map((member) => (
                  <div
                    key={member.staff_id}
                    className="group animate-fade-in-up"
                  >
                    <div className="relative p-8 text-center transition-all duration-500 glass-card hover:shadow-2xl hover:-translate-y-2">
                      {/* Golden ring effect */}
                      <div className="relative mx-auto mb-6 w-36 h-36">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sun-300 to-sun-500 p-1 shadow-lg group-hover:animate-pulse-glow">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <img
                              src={getPicture(member)}
                              alt={getFullName(member)}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="mb-2 text-xl font-bold text-forest-950 font-display">
                        {getFullName(member)}
                      </h4>
                      <p className="px-4 py-1.5 inline-block rounded-full bg-gradient-to-r from-forest-600 to-forest-500 text-white text-sm font-medium">
                        {member.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officials Section */}
            <div className="mb-24">
              <div className="flex items-center justify-center gap-3 mb-12">
                <UsersIcon className="w-6 h-6 text-forest-600" />
                <h3 className="text-2xl font-bold text-center text-forest-900 font-display">
                  Barangay Officials
                </h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {staff.toReversed().map((member) => (
                  <div
                    key={member.staff_id}
                    className="group animate-fade-in-up"
                  >
                    <div className="relative p-6 text-center transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 hover:border-sun-300 hover:shadow-xl hover:-translate-y-1">
                      {/* Photo */}
                      <div className="relative mx-auto mb-4 w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 p-0.5 shadow-md">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <img
                              src={getPicture(member)}
                              alt={getFullName(member)}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="mb-1 text-lg font-bold text-forest-900">
                        {getFullName(member)}
                      </h4>
                      <p className="text-sm text-earth-600 leading-tight">
                        {member.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Staff Section */}
            <div className="relative p-10 lg:p-16 rounded-3xl overflow-hidden animate-fade-in-up">
              {/* Dark forest background */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900"></div>
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}></div>
              </div>
              
              {/* Decorative glows */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sun-400/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-forest-400/10 blur-3xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-12">
                  <Heart className="w-6 h-6 text-sun-400" />
                  <h3 className="text-2xl font-bold text-center text-white font-display">
                    Barangay Health & Support Staff
                  </h3>
                </div>
                
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {health.map((member) => (
                    <div
                      key={member.staff_id}
                      className="group p-5 transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-sun-400/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-sun-400 to-sun-500 p-0.5 shadow-lg">
                          <div className="w-full h-full rounded-[10px] overflow-hidden bg-forest-900">
                            <img
                              src={getPicture(member)}
                              alt={getFullName(member)}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{getFullName(member)}</h4>
                          <p className="text-sm text-forest-300">{member.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;