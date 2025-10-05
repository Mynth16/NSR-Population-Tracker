import { MapPin, Mail, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 mb-12 md:grid-cols-4">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold text-emerald-400">
              BNAP 2025
            </h3>
            <p className="mb-6 leading-relaxed text-gray-400">
              Barangay Nutrition Action Plan for New San Roque, committed to
              building a well-nourished, healthy, and empowered community
              through sustainable programs and community participation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-emerald-600 hover:bg-emerald-500"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-emerald-400">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-emerald-400" />
                <span className="text-sm text-gray-400">
                  Barangay New San Roque
                  <br />
                  Municipality of Pili
                  <br />
                  Camarines Sur
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-emerald-400" />
                <span className="text-sm text-gray-400">
                  lgunewsanroque@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                >
                  About BNAP
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Vision & Mission
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Our Team
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
