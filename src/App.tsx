import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Users, Target, FileText, Calendar, TrendingUp } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Statistics from './components/Statistics';
import Programs from './components/Programs';
import Team from './components/Team';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Vision & Mission', href: '#vision' },
    { name: 'Programs', href: '#programs' },
    { name: 'Team', href: '#team' },
    { name: 'Timeline', href: '#timeline' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-emerald-600">BNAP</div>
              <div className="hidden md:block text-sm text-gray-600">
                Barangay New San Roque
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                    scrolled ? 'text-gray-700' : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Sections */}
      <Hero />
      <About />
      <VisionMission />
      <Statistics />
      <Programs />
      <Team />
      <Timeline />
      <Footer />
    </div>
  );
}

export default App;
