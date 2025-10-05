import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="mb-8 flex justify-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
              <span className="text-3xl">🥗</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Barangay Nutrition
            <br />
            <span className="text-emerald-600">Action Plan 2025</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Masustansyang Pagkain, Kaagapay sa Bagong Kinabukasan!
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Barangay New San Roque, Municipality of Pili, Camarines Sur
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Learn More
            </a>
            <a
              href="#programs"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border-2 border-emerald-600"
            >
              View Programs
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-emerald-600" />
      </a>
    </section>
  );
};

export default Hero;
