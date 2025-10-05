import { Calendar, CheckCircle } from "lucide-react";

const Timeline = () => {
  const quarters = [
    {
      quarter: "Q1 2025",
      period: "January - March",
      activities: [
        "Launch supplemental feeding program",
        "Conduct baseline nutrition assessment",
        "Monthly nutrition education sessions",
        "Distribution of micronutrient supplements",
        "Establish community gardens",
      ],
    },
    {
      quarter: "Q2 2025",
      period: "April - June",
      activities: [
        "Continue feeding program monitoring",
        "Quarterly growth monitoring",
        "Parent education workshops",
        "Water and sanitation improvements",
        "School-based health screening",
      ],
    },
    {
      quarter: "Q3 2025",
      period: "July - September",
      activities: [
        "Mid-year nutrition assessment",
        "Harvest from community gardens",
        "Strengthened maternal care programs",
        "Expanded breastfeeding support",
        "Hygiene promotion campaigns",
      ],
    },
    {
      quarter: "Q4 2025",
      period: "October - December",
      activities: [
        "Final nutrition assessment",
        "Evaluation of program outcomes",
        "Community celebration of achievements",
        "Planning for BNAP 2026",
        "Documentation and reporting",
      ],
    },
  ];

  return (
    <section
      id="timeline"
      className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            2025 Implementation Timeline
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-emerald-600"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Our quarterly roadmap for achieving nutrition goals throughout the
            year
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute hidden w-1 h-full transform -translate-x-1/2 md:block left-1/2 bg-gradient-to-b from-emerald-300 to-teal-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {quarters.map((item, index) => (
              <div
                key={index}
                className={`relative animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`md:flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="p-8 transition-shadow duration-300 bg-white shadow-xl rounded-3xl hover:shadow-2xl">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {item.quarter}
                          </h3>
                          <p className="text-sm text-gray-600">{item.period}</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {item.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="justify-center hidden w-2/12 md:flex">
                    <div className="z-10 w-8 h-8 border-4 border-white rounded-full shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500"></div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
