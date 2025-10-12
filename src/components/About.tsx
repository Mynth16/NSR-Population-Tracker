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
    { icon: Target, label: "Zones", value: "6", editable: false },
    { icon: TrendingUp, label: "Target Year", value: "2025", editable: false },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            About BNAP 2025
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-emerald-600"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            The Barangay Nutrition Action Plan is developed in alignment with
            national and local nutrition goals, providing a strategic framework
            to address nutritional needs in our community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-6 text-center transition-transform duration-300 transform bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-emerald-600" />

              {/* Editable Population Value */}
              {stat.editable && isAuthenticated && isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-2 py-1 text-2xl font-bold text-center text-gray-900 border-2 rounded-lg border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="p-1 text-white transition-colors rounded bg-emerald-600 hover:bg-emerald-700"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="mb-2 text-3xl font-bold text-gray-900">
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
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-left">
            <h3 className="mb-6 text-3xl font-bold text-gray-900">
              Our Commitment
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              Barangay New San Roque recognizes that nutrition is a fundamental
              pillar of health, development, and human dignity. Despite various
              interventions in recent years, cases of malnutrition,
              undernutrition, and food insecurity remain a concern.
            </p>
            <p className="mb-6 leading-relaxed text-gray-600">
              This plan reflects the barangay's commitment to achieving zero
              hunger, improving the overall health status of the population, and
              promoting sustainable food practices at the household level.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-emerald-600">
                  <span className="text-sm text-white">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Evidence-based nutrition education programs
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-emerald-600">
                  <span className="text-sm text-white">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Supplemental feeding and micronutrient support
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-emerald-600">
                  <span className="text-sm text-white">✓</span>
                </div>
                <p className="ml-4 text-gray-600">
                  Backyard gardening and sustainable food practices
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="p-8 text-white shadow-2xl bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl">
              <h3 className="mb-6 text-2xl font-bold">Key Focus Areas</h3>
              <div className="space-y-6">
                <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <h4 className="mb-2 font-semibold">Children & Youth</h4>
                  <p className="text-sm text-emerald-50">
                    Ensuring proper nutrition for preschool and school-aged
                    children through feeding programs and growth monitoring.
                  </p>
                </div>
                <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <h4 className="mb-2 font-semibold">Maternal Health</h4>
                  <p className="text-sm text-emerald-50">
                    Supporting pregnant and lactating mothers with nutrition
                    counseling and health services.
                  </p>
                </div>
                <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <h4 className="mb-2 font-semibold">Community Education</h4>
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
