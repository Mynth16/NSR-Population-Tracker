import { Award, Users as UsersIcon, Heart } from 'lucide-react';

const Team = () => {
  const leadership = [
    {
      name: "Hon. Yolanda M. Beriña",
      position: "Punong Barangay",
      pic: "images/Picture3.jpg",
      alt: "Yolanda Berina",
    },
    {
      name: "Hon. Jennie A. Azor",
      position: "Committee on Health",
      pic: "images/Picture2.jpg",
      alt: "Jennie Azor",
    },
    {
      name: "Hon. Maximino B. Eloreta",
      position: "Committee on Health",
      pic: "images/Picture4.jpg",
      alt: "Maximino Eloreta",
    },
  ];

  const staff = [
    {
      name: "Hon. Hazel R. Nanale",
      position: "Committee on Solid Waste Management",
      pic: "images/Picture10.jpg",
      alt: "Hazel Nanale",
    },
    {
      name: "Hon. Ariel F. Fernando",
      position: "Committee on Agriculture",
      pic: "images/Picture11.jpg",
      alt: "Ariel Fernando",
    },
    {
      name: "Hon. Edwin D. Portades",
      position: "Committee on Education / Social Services",
      pic: "images/Picture12.jpg",
      alt: "Edwin Portades",
    },
    {
      name: "Hon. Jeru A. Adizas",
      position: "Committee on Peace and Order / Committee on Infrastructure",
      pic: "images/Picture13.jpg",
      alt: "Jeru Adizas",
    },
    {
      name: "Hon. Milagros V. Ballon",
      position: "Committee on Agriculture and Animals",
      pic: "images/Picture14.jpg",
      alt: "Milagros Ballon",
    },
    {
      name: "Hon. Joy A. Bequillo",
      position: "SK Chairperson / Committee on Youth and Sports",
      pic: "images/Picture15.jpg",
      alt: "Joy Bequillo",
    },
    {
      name: "Joy B. Catimbang",
      position: "Barangay Secretary",
      pic: "images/Picture16.jpg",
      alt: "Joy Catimbang",
    },
    {
      name: "Nora A. Penino",
      position: "Barangay Treasurer",
      pic: "images/Picture17.jpg",
      alt: "Nora Penino",
    },
    
  ];

  const health = [
    {
      name: "RN Catherine A. Villaflor",
      position: "Barangay Nurse",
      pic: "images/blank.jpg",
      alt: "Catherine Villaflor",
    },
    {
      name: "Jane M. Teoxon",
      position: "Barangay Nutrition Scholar",
      pic: "images/Picture8.jpg",
      alt: "Jane Teoxon",
    },
    {
      name: "Mylene M. Jose",
      position: "Barangay Nutrition Scholar",
      pic: "images/Picture9.jpg",
      alt: "Mylene Jose",
    },
    {
      name: "Jocelyn E. Ampongan",
      position: "Barangay Health Worker",
      pic: "images/Picture5.jpg",
      alt: "Jocelyn Ampongan",
    },
    {
      name: "Rosemarie B. Pardiñas",
      position: "Barangay Health Worker",
      pic: "images/Picture6.jpg",
      alt: "Rosemarie Pardiñas",
    },
    {
      name: "Normita G. Samar",
      position: "Barangay Health Worker",
      pic: "images/Picture7.jpg",
      alt: "Normita Samar",
    },
    {
      name: "Joy A. Ordiales",
      position: "Child Development Worker",
      pic: "images/Picture18.jpg",
      alt: "Joy Ordiales",
    },
    {
      name: "Marlita N. Lumabe",
      position: "Child Development Worker",
      pic: "images/Picture19.jpg",
      alt: "Marlita Lumabe",
    },
    {
      name: "Jennie O. Talag",
      position: "Barangay Rehab Worker",
      pic: "images/Picture20.jpg",
      alt: "Jennie Talag",
    },
    {
      name: "Rachelle R. Bulalacao",
      position: "Barangay Rehab Worker",
      pic: "images/Picture21.jpg",
      alt: "Rachelle Bulalacao",
    },
  ];

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

        {/* Leadership Section */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Award className="w-6 h-6 text-sun-500" />
            <h3 className="text-2xl font-bold text-center text-forest-900 font-display">
              Barangay Leadership
            </h3>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="group animate-fade-in-up"
              >
                <div className="relative p-8 text-center transition-all duration-500 glass-card hover:shadow-2xl hover:-translate-y-2">
                  {/* Golden ring effect */}
                  <div className="relative mx-auto mb-6 w-36 h-36">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sun-300 to-sun-500 p-1 shadow-lg group-hover:animate-pulse-glow">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={member.pic}
                          alt={member.alt}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-2 text-xl font-bold text-forest-950 font-display">
                    {member.name}
                  </h4>
                  <p className="px-4 py-1.5 inline-block rounded-full bg-gradient-to-r from-forest-600 to-forest-500 text-white text-sm font-medium">
                    {member.position}
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
            {staff.map((member) => (
              <div
                key={member.name}
                className="group animate-fade-in-up"
              >
                <div className="relative p-6 text-center transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 hover:border-sun-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Photo */}
                  <div className="relative mx-auto mb-4 w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 p-0.5 shadow-md">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={member.pic}
                          alt={member.alt}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-1 text-lg font-bold text-forest-900">
                    {member.name}
                  </h4>
                  <p className="text-sm text-earth-600 leading-tight">
                    {member.position}
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
                  key={member.name}
                  className="group p-5 transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-sun-400/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-sun-400 to-sun-500 p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-forest-900">
                        <img
                          src={member.pic}
                          alt={member.alt}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-forest-300">{member.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>  
      </div>
    </section>
  );
};

export default Team;