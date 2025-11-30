import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, Users as UsersIcon } from "lucide-react";
import Hero from "./components/Hero";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PopulationTable from "./components/PopulationTable";
import HouseholdsTable from "./components/HouseholdsTable";
import Contact from "./components/Contact";

type AdminPage = "dashboard" | "population" | "households" | "contact";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [population, setPopulation] = useState("3,946");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [activePage, setActivePage] = useState<AdminPage>("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setLoginForm({ username: "", password: "" });
    } else {
      alert("Invalid credentials. Use username: admin, password: admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage("dashboard");
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Vision & Mission", href: "#vision" },
    { name: "Population", href: "#population" },
    { name: "Staff", href: "#team" },
  ];

  const adminNavItems: { name: string; page: AdminPage }[] = [
    { name: "Dashboard", page: "dashboard" },
    { name: "Population", page: "population" },
    { name: "Households", page: "households" },
    { name: "Contact", page: "contact" },
  ];

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="text-white bg-gray-900 shadow-lg">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <UsersIcon className="w-8 h-8" />
                <div>
                  <div className="text-lg font-bold">
                    Barangay New San Roque
                  </div>
                  <div className="text-xs text-gray-400">
                    Population Tracking System
                  </div>
                </div>
              </div>

              <div className="items-center hidden space-x-6 md:flex">
                {adminNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActivePage(item.page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activePage === item.page
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Admin Logout</span>
                </button>
              </div>

              <button
                className="p-2 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="border-t border-gray-700 md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {adminNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActivePage(item.page);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activePage === item.page
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-3 py-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Admin Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {activePage === "dashboard" && (
          <Dashboard totalPopulation={Number.parseInt(population.replace(/,/g, ""))} />
        )}
        {activePage === "population" && <PopulationTable />}
        {activePage === "households" && <HouseholdsTable />}
        {activePage === "contact" && <Contact />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-gray-900">Barangay New San Roque</div>
            </div>

            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            </div>

            <button
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="bg-white border-t md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username-input" className="block mb-2 text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password-input" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Login
              </button>
              <p className="mt-4 text-xs text-center text-gray-500">
                Demo credentials: admin / admin123
              </p>
            </form>
          </div>
        </div>
      )}

      <Hero />
      <VisionMission />
      <About
        isAuthenticated={isAuthenticated}
        population={population}
        setPopulation={setPopulation}
      />
      <Team />
      <Footer />
    </div>
  );
}

export default App;