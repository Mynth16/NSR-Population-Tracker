import { User } from 'lucide-react';

const Team = () => {
  const leadership = [
    {
      name: 'Hon. Yolanda M. Beriña',
      position: 'Punong Barangay',
      role: 'BNC Chairperson',
    },
    {
      name: 'Hon. Jennie A. Azor',
      position: 'Kagawad on Health',
      role: 'Q1 2025',
    },
    {
      name: 'Hon. Maximino B. Eloreta',
      position: 'Kagawad on Agriculture',
      role: 'Q2 2025',
    },
  ];

  const healthTeam = [
    { name: 'RN Catherine A. Villaflor', position: 'Barangay Nurse' },
    { name: 'Jane M. Teoxon', position: 'Barangay Nutrition Scholar' },
    { name: 'Mylene M. Jose', position: 'Barangay Nutrition Scholar' },
    { name: 'Jocelyn E. Ampongan', position: 'Barangay Health Worker' },
    { name: 'Rosemarie B. Pardiñas', position: 'Barangay Health Worker' },
    { name: 'Normita G. Samar', position: 'Barangay Health Worker' },
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated leaders and health workers committed to improving nutrition in our community
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Barangay Nutrition Committee Leadership</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-emerald-600 font-medium mb-1">{member.position}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Team */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-8 text-center">Barangay Health & Nutrition Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{member.name}</h4>
                    <p className="text-sm text-gray-300">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 animate-fade-in-left">
            <div className="text-6xl mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We embrace the theme <strong>"Masustansyang Pagkain, Kaagapay sa Bagong Kinabukasan!"</strong> because we believe that proper nutrition is not just about food—it is about giving our people the chance to live healthier, more productive, and more hopeful lives.
            </p>
            <p className="text-emerald-600 font-semibold">- Hon. Yolanda M. Beriña</p>
            <p className="text-sm text-gray-600">Punong Barangay</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 animate-fade-in-right">
            <div className="text-6xl mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A healthy barangay starts with healthy families, and it is our mission to ensure that every household has access to nutritious food, quality health services, and information that empowers them to make healthy choices.
            </p>
            <p className="text-teal-600 font-semibold">- Hon. Jennie A. Azor</p>
            <p className="text-sm text-gray-600">Kagawad on Health and Nutrition</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
