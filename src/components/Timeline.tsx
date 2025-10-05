import { Calendar, CheckCircle } from 'lucide-react';

const Timeline = () => {
  const quarters = [
    {
      quarter: 'Q1 2025',
      period: 'January - March',
      activities: [
        'Launch supplemental feeding program',
        'Conduct baseline nutrition assessment',
        'Monthly nutrition education sessions',
        'Distribution of micronutrient supplements',
        'Establish community gardens',
      ],
    },
    {
      quarter: 'Q2 2025',
      period: 'April - June',
      activities: [
        'Continue feeding program monitoring',
        'Quarterly growth monitoring',
        'Parent education workshops',
        'Water and sanitation improvements',
        'School-based health screening',
      ],
    },
    {
      quarter: 'Q3 2025',
      period: 'July - September',
      activities: [
        'Mid-year nutrition assessment',
        'Harvest from community gardens',
        'Strengthened maternal care programs',
        'Expanded breastfeeding support',
        'Hygiene promotion campaigns',
      ],
    },
    {
      quarter: 'Q4 2025',
      period: 'October - December',
      activities: [
        'Final nutrition assessment',
        'Evaluation of program outcomes',
        'Community celebration of achievements',
        'Planning for BNAP 2026',
        'Documentation and reporting',
      ],
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            2025 Implementation Timeline
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our quarterly roadmap for achieving nutrition goals throughout the year
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-300 to-teal-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {quarters.map((item, index) => (
              <div
                key={index}
                className={`relative animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{item.quarter}</h3>
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
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h3>
            <p className="text-xl mb-8 text-emerald-50">
              Together, we can build a healthier, stronger, and more resilient Barangay New San Roque
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Get Involved
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
