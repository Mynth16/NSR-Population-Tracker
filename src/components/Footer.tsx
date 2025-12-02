import { MapPin, Mail, ArrowUp, Leaf } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="relative bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-sun-400/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest-400/5 blur-3xl"></div>
        
        {/* Top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-600 via-sun-400 to-forest-600"></div>
        
        <div className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 mb-16 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Barangay New San Roque
                </h3>
              </div>
              <p className="max-w-md mb-8 leading-relaxed text-forest-200 font-body">
                A progressive community in Pili, Camarines Sur, committed to 
                providing quality services and building a better future for all residents 
                through transparent governance and active community participation.
              </p>
              
              {/* Decorative element */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-sun-400 to-sun-300"></div>
                <div className="w-2 h-2 rounded-full bg-sun-400"></div>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="mb-6 text-lg font-bold text-white font-display flex items-center gap-2">
                <span className="w-8 h-0.5 bg-sun-400 rounded-full"></span>
                Contact Us
              </h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-sun-400/20 transition-colors">
                    <MapPin className="w-5 h-5 text-sun-400" />
                  </div>
                  <div>
                    <p className="text-sm text-forest-200 leading-relaxed">
                      Barangay New San Roque<br />
                      Municipality of Pili<br />
                      Camarines Sur
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-sun-400/20 transition-colors">
                    <Mail className="w-5 h-5 text-sun-400" />
                  </div>
                  <a href="mailto:lgunewsanroque@gmail.com" className="text-sm text-forest-200 hover:text-sun-300 transition-colors">
                    lgunewsanroque@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="mb-6 text-lg font-bold text-white font-display flex items-center gap-2">
                <span className="w-8 h-0.5 bg-sun-400 rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Vision & Mission", href: "#vision" },
                  { label: "Population", href: "#population" },
                  { label: "Officials & Staff", href: "#team" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-forest-200 hover:text-sun-300 transition-colors"
                    >
                      <span className="w-0 h-0.5 bg-sun-400 rounded-full group-hover:w-4 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-forest-400">
              © {new Date().getFullYear()} Barangay New San Roque. All rights reserved.
            </p>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-sun-400/20 border border-white/10 hover:border-sun-400/30 transition-all duration-300"
            >
              <span className="text-sm text-forest-200 group-hover:text-sun-300">Back to top</span>
              <ArrowUp className="w-4 h-4 text-sun-400 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;