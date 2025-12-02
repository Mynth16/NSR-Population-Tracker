import { Eye, Target} from 'lucide-react';

const VisionMission = () => {
  

  return (
    <section id="vision" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-50 via-white to-forest-50/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-600 via-sun-400 to-forest-600"></div>
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-sun-200/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-forest-200/20 blur-3xl"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center animate-fade-in-up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-forest-100 text-forest-700">
            Our Purpose
          </span>
          <h2 className="mb-6 text-4xl font-bold text-forest-950 md:text-5xl lg:text-6xl font-display">
            Vision & Mission
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-forest-600 to-forest-400"></div>
            <div className="w-3 h-3 rounded-full bg-sun-400"></div>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-forest-600 to-forest-400"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
          {/* Vision Card */}
          <div className="group animate-fade-in-left delay-200">
            <div className="relative h-full p-8 transition-all duration-500 glass-card golden-border md:p-12 hover:shadow-2xl hover:-translate-y-2">
              {/* Card Background Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sun-200/40 to-transparent rounded-bl-[100px]"></div>
              
              {/* Icon */}
              <div className="relative flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 shadow-lg group-hover:animate-pulse-glow">
                <Eye className="w-10 h-10 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="relative mb-6 text-3xl font-bold text-forest-950 font-display">
                Our Vision
              </h3>
              <p className="relative text-lg leading-relaxed text-earth-700 font-body">
                A <span className="font-semibold text-forest-700">progressive, peaceful, and self-reliant</span> barangay where every resident enjoys a high quality of life through sustainable development, good governance, and active community participation.
              </p>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-12 right-12 h-1 rounded-full bg-gradient-to-r from-transparent via-sun-400 to-transparent opacity-50"></div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group animate-fade-in-right delay-300">
            <div className="relative h-full p-8 transition-all duration-500 glass-card-dark md:p-12 hover:shadow-2xl hover:-translate-y-2">
              {/* Card Background Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-forest-400/20 to-transparent rounded-bl-[100px]"></div>
              
              {/* Icon */}
              <div className="relative flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 shadow-lg group-hover:animate-pulse-glow">
                <Target className="w-10 h-10 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="relative mb-6 text-3xl font-bold text-white font-display">
                Our Mission
              </h3>
              <p className="relative text-lg leading-relaxed text-forest-100 font-body">
                To provide <span className="font-semibold text-sun-300">efficient and responsive</span> public services, promote inclusive economic opportunities, maintain peace and order, protect the environment, and empower every resident to actively participate in community development.
              </p>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-12 right-12 h-1 rounded-full bg-gradient-to-r from-transparent via-sun-400 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default VisionMission;