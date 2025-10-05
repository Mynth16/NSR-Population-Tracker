import { TrendingDown, Users, Heart, Activity } from 'lucide-react';

const Statistics = () => {
  const achievements = [
    {
      year: '2024',
      normal: '98%',
      improvement: '+13%',
      icon: TrendingDown,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      year: '2023',
      normal: '97%',
      improvement: '+12%',
      icon: Activity,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      year: '2022',
      normal: '85%',
      improvement: 'Baseline',
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section id="statistics" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Progress & Impact
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tracking our journey towards zero malnutrition in Barangay New San Roque
          </p>
        </div>

        {/* Achievement Timeline */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-gradient-to-r ${item.color}`}></div>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-500">{item.year}</span>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">{item.normal}</div>
              <p className="text-gray-600 mb-4">Normal Nutritional Status (WFA)</p>
              <div className="flex items-center">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {item.improvement}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 animate-fade-in-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Indicators (2024)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-700 font-medium">Normal Weight</span>
                <span className="text-2xl font-bold text-emerald-600">289 children</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-700 font-medium">Stunting Reduced</span>
                <span className="text-2xl font-bold text-emerald-600">96%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-700 font-medium">Normal Height</span>
                <span className="text-2xl font-bold text-emerald-600">281 children</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                <span className="text-gray-700 font-medium">Healthy Weight/Height</span>
                <span className="text-2xl font-bold text-emerald-600">99%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white animate-fade-in-right">
            <h3 className="text-2xl font-bold mb-6">Water & Sanitation Access</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">With Sanitary Toilets</span>
                  <span className="font-bold">424 HH</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Safe Water Supply (Level I)</span>
                  <span className="font-bold">476 HH</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Safe Water Supply (Level III)</span>
                  <span className="font-bold">28 HH</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full" style={{ width: '6%' }}></div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-gray-200">
                  Continuous improvement in access to sanitary facilities and safe drinking water
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
