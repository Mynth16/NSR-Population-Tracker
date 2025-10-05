import { User } from "lucide-react";

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
      position: "Kagawad on Health",
      pic: "images/Picture2.jpg",
      alt: "Jennie Azor",
    },
    {
      name: "Hon. Maximino B. Eloreta",
      position: "Kagawad on Agriculture",
      pic: "images/Picture4.jpg",
      alt: "Maximino Eloreta",
    },
  ];

  const healthTeam = [
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
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Our Team
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-emerald-600"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Dedicated leaders and health workers committed to improving
            nutrition in our community
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">
            Barangay Nutrition Committee Leadership
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="p-8 text-center transition-shadow duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-6 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src={member.pic}
                    alt={member.alt}
                    className="object-cover w-full h-full"
                  />
                  {/* Replace with actual image: <img src="/path/to/image.jpg" alt={member.name} className="object-cover w-full h-full" /> */}
                  <User className="w-16 h-16 text-gray-400" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">
                  {member.name}
                </h4>
                <p className="mb-1 font-medium text-emerald-600">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Team */}
        <div className="p-8 text-white bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl md:p-12 animate-fade-in-up">
          <h3 className="mb-8 text-2xl font-bold text-center">
            Barangay Health & Nutrition Team
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthTeam.map((member, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl hover:bg-opacity-20"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                    <img
                      src={member.pic}
                      alt={member.alt}
                      className="object-cover w-full h-full"
                    />
                    <User className="w-8 h-8 text-gray-400" />
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
        <div className="grid gap-8 mt-16 md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl animate-fade-in-left">
            <div className="mb-4 text-6xl">"</div>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              We embrace the theme{" "}
              <strong>
                "Masustansyang Pagkain, Kaagapay sa Bagong Kinabukasan!"
              </strong>{" "}
              because we believe that proper nutrition is not just about food—it
              is about giving our people the chance to live healthier, more
              productive, and more hopeful lives.
            </p>
            <p className="font-semibold text-emerald-600">
              - Hon. Yolanda M. Beriña
            </p>
            <p className="text-sm text-gray-600">Punong Barangay</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl animate-fade-in-right">
            <div className="mb-4 text-6xl">"</div>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              A healthy barangay starts with healthy families, and it is our
              mission to ensure that every household has access to nutritious
              food, quality health services, and information that empowers them
              to make healthy choices.
            </p>
            <p className="font-semibold text-teal-600">- Hon. Jennie A. Azor</p>
            <p className="text-sm text-gray-600">
              Kagawad on Health and Nutrition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
