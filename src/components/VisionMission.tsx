import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <section id="vision" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in-left">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              A well-nourished, healthy, and empowered community where every individual—especially
              children and vulnerable groups—has access to nutritious food, quality health services,
              and opportunities for sustainable well-being.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Health
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Nutrition
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Empowerment
              </span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in-right">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To implement responsive, inclusive, and sustainable nutrition programs and services
              that address malnutrition, promote healthy lifestyles, and strengthen community
              participation—ensuring that no one in Barangay New San Roque is left behind in
              achieving food and nutrition security.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Inclusive
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Sustainable
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Community-Based
              </span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Principles</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-sm text-gray-600">Working together with stakeholders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">Evidence-based approaches</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Compassion</h4>
              <p className="text-sm text-gray-600">Caring for every individual</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-sm text-gray-600">Long-term solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
