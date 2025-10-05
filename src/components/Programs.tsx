import { Apple, BookOpen, Heart, Sprout, Users, Shield } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: Apple,
      title: 'Supplemental Feeding Program',
      description: '120-day feeding program for identified undernourished children with nutritious meals and growth monitoring.',
      color: 'from-rose-500 to-pink-500',
      features: ['Daily nutritious meals', 'Growth monitoring', 'Parental education'],
    },
    {
      icon: BookOpen,
      title: 'Nutrition Education',
      description: 'Monthly education sessions for parents and caregivers on proper nutrition, meal planning, and hygiene practices.',
      color: 'from-blue-500 to-cyan-500',
      features: ['Parent workshops', 'IYCF training', 'Meal planning guides'],
    },
    {
      icon: Heart,
      title: 'Maternal & Child Health',
      description: 'Comprehensive care for pregnant women, lactating mothers, and children 0-59 months with regular monitoring.',
      color: 'from-purple-500 to-pink-500',
      features: ['Prenatal care', 'Breastfeeding support', 'Micronutrient supplements'],
    },
    {
      icon: Sprout,
      title: 'Community Gardening',
      description: 'Establishing backyard and community gardens to provide fresh vegetables and promote sustainable food practices.',
      color: 'from-emerald-500 to-teal-500',
      features: ['Vegetable seeds', 'Gardening training', 'Harvest sharing'],
    },
    {
      icon: Users,
      title: 'School-Based Programs',
      description: 'Nutrition programs in schools including feeding, growth monitoring, and health education for school-aged children.',
      color: 'from-orange-500 to-amber-500',
      features: ['School feeding', 'Health screening', 'Hygiene promotion'],
    },
    {
      icon: Shield,
      title: 'Water & Sanitation',
      description: 'Improving access to safe drinking water and sanitary facilities to support better health outcomes.',
      color: 'from-cyan-500 to-blue-500',
      features: ['Sanitary toilets', 'Water supply', 'Hygiene facilities'],
    },
  ];

  return (
    <section id="programs" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Programs & Activities
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive interventions designed to address malnutrition and promote healthy lifestyles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform duration-300`}>
                <program.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
              <div className="space-y-2">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Goals Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in-up">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">2025 Goals & Objectives</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-emerald-600 mb-4">For Preschool Children (0-5 years)</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-700">Reduce underweight, stunting, and wasting by at least <strong>40%</strong></p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">Achieve <strong>100% enrollment</strong> in supplemental feeding program</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">Conduct monthly weight and height monitoring for <strong>90%</strong> of children</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-teal-600 mb-4">For School Children</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-700">Reduce undernutrition by at least <strong>30%</strong> by December 2025</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">Quarterly growth monitoring for <strong>90%</strong> of enrolled children</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">Monthly nutrition education sessions in schools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
