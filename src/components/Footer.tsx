import { MapPin, Mail} from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 mb-12 md:grid-cols-4">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">
              Barangay New San Roque
            </h3>
            <p className="mb-6 leading-relaxed text-gray-400">
              A progressive community in Pili, Camarines Sur, committed to 
              providing quality services and building a better future for all residents 
              through transparent governance and active community participation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-bold">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Barangay New San Roque
                  <br />
                  Municipality of Pili
                  <br />
                  Camarines Sur
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm text-gray-400">
                  lgunewsanroque@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Vision & Mission
                </a>
              </li>
              <li>
                <a
                  href="#population"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Population
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Officials & Staff
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