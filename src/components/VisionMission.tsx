import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <section id="vision" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 mx-auto bg-emerald-600"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="p-8 transition-shadow duration-300 bg-white shadow-xl rounded-3xl md:p-12 hover:shadow-2xl animate-fade-in-left">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center mr-4 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl">
                <Eye className="text-white w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              An independent and progressive Barangay advocating principles and practices of good governance that help build and 
              nurture honesty and responsibility among its public officials and employees and take appropriate measures
              to promote transparency in transacting with the public.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 transition-shadow duration-300 bg-white shadow-xl rounded-3xl md:p-12 hover:shadow-2xl animate-fade-in-right">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center mr-4 w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl">
                <Target className="text-white w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              To be able to actively carry out the mandates and ensure transparency, honesty, and efficiency 
              in the delivery of services in the Barangay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
