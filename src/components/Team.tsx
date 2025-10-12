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
    <section id="team" className="py-24 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Barangay Officials & Staff
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-gray-900"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Dedicated leaders and staff serving our community
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">
            Barangay Leadership
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="p-8 text-center transition-shadow duration-300 bg-white border-2 border-gray-300 shadow-sm rounded-2xl hover:shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-6 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src={member.pic}
                    alt={member.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">
                  {member.name}
                </h4>
                <p className="mb-1 font-medium text-gray-700">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Barangay Council */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">
            Barangay Officials & Staff
          </h3>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {staff.map((member, index) => (
              <div
                key={index}
                className="p-6 text-center transition-shadow duration-300 bg-white border-2 border-gray-300 shadow-sm rounded-2xl hover:shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src={member.pic}
                    alt={member.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="mb-1 text-lg font-bold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-sm font-medium text-gray-700">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Team */}
        <div className="p-8 text-white bg-gray-900 rounded-2xl md:p-12 animate-fade-in-up">
          <h3 className="mb-8 text-2xl font-bold text-center">
            Barangay Health & Support Staff
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {health.map((member, index) => (
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
      </div>
    </section>
  );
};

export default Team;