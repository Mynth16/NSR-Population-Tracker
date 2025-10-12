import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 w-full px-4 py-32 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-left">
            <div className="mb-8">
              <div className="flex items-center justify-center w-32 h-32 overflow-hidden">
                <img 
                  src="images/NSRLogo.png" 
                  alt="Barangay New San Roque Logo"
                  className="object-contain w-full h-full p-2"
                />
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
              Barangay
              <br />
              <span className="text-gray-700">New San Roque</span>
            </h1>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#vision"
                className="inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all transform bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 hover:scale-105"
              >
                Our Vision
              </a>
              <a
                href="#population"
                className="inline-flex items-center justify-center px-8 py-4 font-medium text-gray-900 transition-all transform bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 hover:scale-105"
              >
                View Statistics
              </a>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="relative">
              <div className="overflow-hidden bg-white border-4 border-gray-300 shadow-xl aspect-square rounded-2xl">
                <img 
                  src="images/main.jpg"
                  alt="Barangay New San Roque"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute w-24 h-24 bg-gray-900 -top-4 -right-4 rounded-2xl -z-10"></div>
              <div className="absolute w-24 h-24 bg-gray-300 -bottom-4 -left-4 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#vision"
        className="absolute transform -translate-x-1/2 bottom-10 left-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-gray-900" />
      </a>
    </section>
  );
};

export default Hero;