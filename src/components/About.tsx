import {
  Heart,
  Users,
  Target,
  TrendingUp,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";

interface AboutProps {
  isAuthenticated: boolean;
  population: string;
  setPopulation: (value: string) => void;
}

const About = ({ isAuthenticated, population, setPopulation }: AboutProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(population);

  const handleSave = () => {
    setPopulation(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(population);
    setIsEditing(false);
  };

  const stats = [
    {
      icon: Users,
      label: "Total Population",
      value: population,
      editable: true,
    },
    { icon: Heart, label: "Households", value: "987", editable: false },
    { icon: Target, label: "Zones", value: "7", editable: false },
    { icon: TrendingUp, label: "Target Year", value: "2025", editable: false },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About BNAP 2025
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Barangay Nutrition Action Plan is developed in alignment with
            national and local nutrition goals, providing a strategic framework
            to address nutritional needs in our community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-10 h-10 text-emerald-600 mx-auto mb-4" />

              {/* Editable Population Value */}
              {stat.editable && isAuthenticated && isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="text-2xl font-bold text-gray-900 text-center w-full px-2 py-1 border-2 border-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  {stat.editable && isAuthenticated && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute -top-2 -right-2 p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
                      title="Edit Population"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Barangay New San Roque recognizes that nutrition is a fundamental
              pillar of health, development, and human dignity. Despite various
              interventions in recent years, cases of malnutrition,
              undernutrition, and food insecurity remain a concern.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This plan reflects the barangay's commitment to achieving zero
              hunger, improving the overall health status of the population, and
              promoting sustainable food practices at the household level.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Evidence-based nutrition education programs
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Supplemental feeding and micronutrient support
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Backyard gardening and sustainable food practices
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Key Focus Areas</h3>
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Children & Youth</h4>
                  <p className="text-sm text-emerald-50">
                    Ensuring proper nutrition for preschool and school-aged
                    children through feeding programs and growth monitoring.
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Maternal Health</h4>
                  <p className="text-sm text-emerald-50">
                    Supporting pregnant and lactating mothers with nutrition
                    counseling and health services.
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Community Education</h4>
                  <p className="text-sm text-emerald-50">
                    Empowering families with knowledge on proper nutrition,
                    hygiene, and sustainable food practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
