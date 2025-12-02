const Hero = () => {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden bg-earth-50">
      {/* Layered Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-earth-100 via-earth-50 to-forest-50"></div>
        
        {/* Warm radial glow */}
        <div className="absolute inset-0 bg-warm-radial"></div>
        
        {/* Decorative circles */}
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 rounded-full bg-gradient-to-br from-sun-200/30 to-transparent blur-3xl"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-20 -left-20 rounded-full bg-gradient-to-tr from-forest-200/20 to-transparent blur-3xl"></div>
        
        {/* Dot pattern overlay */}
        <div className="pattern-overlay"></div>
      </div>

      
      <div className="relative z-10 w-full px-4 py-32 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Logo with glow effect */}
            <div className="animate-fade-in-up mb-10">
              <div className="inline-flex items-center justify-center w-36 h-36 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl warm-glow overflow-hidden">
                <img 
                  src="images/NSRLogo.png" 
                  alt="Barangay New San Roque Logo"
                  className="object-contain w-28 h-28"
                />
              </div>
            </div>

            

            {/* Main Heading */}
            <h1 className="animate-fade-in-up delay-200 mb-6 font-display">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-forest-950 leading-tight">
                Barangay
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-semibold text-gradient-gold mt-2">
                New San Roque
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-300 text-lg md:text-xl text-earth-700 mb-10 max-w-lg mx-auto lg:mx-0 font-body">
              A progressive community in Pili, Camarines Sur — building brighter futures through unity and service.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#vision"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-2xl bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-600 hover:to-forest-500 shadow-lg hover:shadow-xl hover:-translate-y-1 btn-shimmer overflow-hidden"
              >
                <span className="relative z-10">Discover Our Vision</span>
              </a>
              <a
                href="#population"
                className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-forest-800 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-forest-200 hover:border-sun-400 hover:bg-white shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <span>View Statistics</span>
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="animate-fade-in-right delay-300 relative">
            {/* Main image container */}
            <div className="relative">
              {/* Background decorative shapes */}
              <div className="absolute -top-8 -right-8 w-full h-full rounded-3xl bg-gradient-to-br from-sun-400 to-sun-500 transform rotate-3"></div>
              <div className="absolute -bottom-8 -left-8 w-full h-full rounded-3xl bg-gradient-to-br from-forest-600 to-forest-700 transform -rotate-3"></div>
              
              {/* Image frame */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                <img 
                  src="images/main.jpg"
                  alt="Barangay New San Roque"
                  className="w-full aspect-square object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 via-transparent to-transparent"></div>
              </div>

              

              
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;