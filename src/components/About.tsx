import {
  Users,
  Home,
  MapPin,
  Edit2,
  Check,
  X,
  FileText,
  HeartPulse,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

interface AboutProps {
  population: string;
  setPopulation: (value: string) => void;
}

const About = ({ population, setPopulation }: AboutProps) => {
  const { isAuthenticated } = useAuthStore();
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
      gradient: "from-sun-400 to-sun-500",
    },
    { 
      icon: Home, 
      label: "Households", 
      value: "987", 
      editable: false,
      gradient: "from-forest-500 to-forest-600",
    },
    { 
      icon: MapPin, 
      label: "Zones/Puroks", 
      value: "7", 
      editable: false,
      gradient: "from-earth-500 to-earth-600",
    },
  ];

  const services = [
    {
      icon: FileText,
      title: "Civil Registry",
      description: "Birth, death, and marriage certificates, barangay clearances, and other documentary services.",
    },
    {
      icon: HeartPulse,
      title: "Health Services",
      description: "Basic health services, health education, and community wellness programs.",
    },
    {
      icon: Shield,
      title: "Peace & Order",
      description: "Community safety programs, dispute resolution, and emergency response coordination.",
    },
  ];

  return (
    <section id="population" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-sun-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest-400/10 blur-3xl"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center animate-fade-in-up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-sun-400/20 text-sun-300">
            Demographics
          </span>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-display">
            Population Statistics
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-sun-400 to-sun-300"></div>
            <div className="w-3 h-3 rounded-full bg-sun-400 animate-pulse"></div>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-sun-400 to-sun-300"></div>
          </div>
          <p className="max-w-2xl mx-auto text-xl text-forest-200">
            Current demographic information of Barangay New San Roque
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 mb-24 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative animate-fade-in-up"
            >
              <div className="relative p-8 text-center transition-all duration-500 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-sun-400/30">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Editable Population Value */}
                {stat.editable && isAuthenticated && isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-2 text-3xl font-bold text-center rounded-xl bg-white/10 border border-sun-400 text-white focus:outline-none focus:ring-2 focus:ring-sun-400"
                      autoFocus
                    />
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={handleSave}
                        className="p-3 text-white transition-colors rounded-xl bg-forest-500 hover:bg-forest-400"
                        title="Save"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-3 text-white transition-colors bg-mahogany-600 rounded-xl hover:bg-mahogany-500"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="mb-2 text-5xl font-bold text-white font-display">
                      {stat.value}
                    </div>
                    {stat.editable && isAuthenticated && !isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="absolute -top-2 -right-2 p-2 bg-sun-400 text-forest-900 rounded-xl hover:bg-sun-300 transition-colors shadow-lg"
                        title="Edit Population"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                <div className="text-sm font-medium uppercase tracking-wider text-forest-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* About Text */}
          <div className="animate-fade-in-left">
            <h3 className="mb-8 text-3xl font-bold text-white font-display">
              About Our Barangay
            </h3>
            <div className="space-y-6 text-lg text-forest-200 font-body">
              <p className="leading-relaxed">
                Barangay New San Roque is a <span className="text-sun-300 font-semibold">vibrant community</span> located in the Municipality of Pili, Camarines Sur. Our barangay is home to diverse families and individuals who work together to build a progressive and peaceful community.
              </p>
              <p className="leading-relaxed">
                We are committed to providing quality services, maintaining peace and order, and creating opportunities for <span className="text-sun-300 font-semibold">growth and development</span> for all our residents. Through active participation and cooperation, we continue to strengthen our community bonds.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in-right">
            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sun-400/20 to-transparent rounded-bl-full"></div>
              
              <h3 className="relative mb-8 text-2xl font-bold text-white font-display">Services Offered</h3>
              
              <div className="relative space-y-6">
                {services.map((service) => (
                  <div 
                    key={service.title}
                    className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sun-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-white">{service.title}</h4>
                        <p className="text-sm text-forest-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;