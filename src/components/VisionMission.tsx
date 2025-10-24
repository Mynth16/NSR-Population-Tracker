import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <section id="vision" className="py-24 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 mx-auto bg-gray-900"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="p-8 transition-shadow duration-300 bg-gray-100 border-2 border-gray-300 shadow-sm rounded-2xl md:p-12 hover:shadow-md animate-fade-in-left">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center mr-4 bg-white border-2 border-gray-300 w-14 h-14 rounded-2xl">
                <Eye className="text-gray-900 w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              A progressive, peaceful, and self-reliant barangay where every resident enjoys a high quality of life through sustainable development, good governance, and active community participation.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 transition-shadow duration-300 bg-gray-100 border-2 border-gray-300 shadow-sm rounded-2xl md:p-12 hover:shadow-md animate-fade-in-right">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center mr-4 bg-white border-2 border-gray-300 w-14 h-14 rounded-2xl">
                <Target className="text-gray-900 w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              To provide efficient and responsive public services, promote inclusive economic opportunities, maintain peace and order, protect the environment, and empower every resident to actively participate in community development and decision-making processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;