import {
  Users,
  Home,
  MapPin,
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
    { icon: Home, label: "Households", value: "987", editable: false },
    { icon: MapPin, label: "Zones/Puroks", value: "7", editable: false },
  ];

  return (
    <section id="population" className="py-24 text-white bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Population Statistics
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-white"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Current demographic information of Barangay New San Roque
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-6 text-center transition-all duration-300 bg-gray-800 border-2 border-gray-700 shadow-sm rounded-2xl hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-white" />

              {/* Editable Population Value */}
              {stat.editable && isAuthenticated && isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-2 py-1 text-2xl font-bold text-center text-gray-900 bg-white border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    autoFocus
                  />
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="p-1 text-gray-900 transition-colors bg-white rounded hover:bg-gray-200"
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
                  <div className="mb-2 text-3xl font-bold">
                    {stat.value}
                  </div>
                  {stat.editable && isAuthenticated && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute -top-2 -right-2 p-1.5 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
                      title="Edit Population"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-left">
            <h3 className="mb-6 text-3xl font-bold">
              About Our Barangay
            </h3>
            <p className="mb-6 leading-relaxed text-gray-300">
              Barangay New San Roque is a vibrant community located in the Municipality of Pili, Camarines Sur. 
              Our barangay is home to diverse families and individuals who work together to build a 
              progressive and peaceful community.
            </p>
            <p className="mb-6 leading-relaxed text-gray-300">
              We are committed to providing quality services, maintaining peace and order, 
              and creating opportunities for growth and development for all our residents. 
              Through active participation and cooperation, we continue to strengthen our community bonds.
            </p>
          </div>

          <div className="animate-fade-in-right">
            <div className="p-8 bg-gray-800 border-2 border-gray-700 shadow-sm rounded-2xl">
              <h3 className="mb-6 text-2xl font-bold">Services Offered</h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-700 border-2 border-gray-600 rounded-xl">
                  <h4 className="mb-2 font-semibold">Civil Registry</h4>
                  <p className="text-sm text-gray-300">
                    Birth, death, and marriage certificates, barangay clearances, and other documentary services.
                  </p>
                </div>
                <div className="p-4 bg-gray-700 border-2 border-gray-600 rounded-xl">
                  <h4 className="mb-2 font-semibold">Health Services</h4>
                  <p className="text-sm text-gray-300">
                    Basic health services, health education, and community wellness programs.
                  </p>
                </div>
                <div className="p-4 bg-gray-700 border-2 border-gray-600 rounded-xl">
                  <h4 className="mb-2 font-semibold">Peace & Order</h4>
                  <p className="text-sm text-gray-300">
                    Community safety programs, dispute resolution, and emergency response coordination.
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