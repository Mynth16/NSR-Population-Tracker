import { MapPin, Phone, Mail, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">BNAP 2025</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Barangay Nutrition Action Plan for New San Roque, committed to building a well-nourished,
              healthy, and empowered community through sustainable programs and community participation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-emerald-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">
                  Barangay New San Roque<br />
                  Municipality of Pili<br />
                  Camarines Sur
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-400 mr-3" />
                <span className="text-gray-400 text-sm">Contact your local barangay</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-400 mr-3" />
                <span className="text-gray-400 text-sm">newsanroque@pili.gov.ph</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  About BNAP
                </a>
              </li>
              <li>
                <a href="#vision" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Vision & Mission
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Programs
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Barangay New San Roque. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Republic of the Philippines | Province of Camarines Sur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
