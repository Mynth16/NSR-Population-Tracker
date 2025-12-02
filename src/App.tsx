import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, Leaf } from "lucide-react";
import Hero from "./components/Hero";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PopulationTable from "./components/PopulationTable";
import HouseholdsTable from "./components/HouseholdsTable";
import AuditTrail from "./components/AuditTrail";
import Contact from "./components/Contact";
import { useAuthStore } from "./stores/authStore";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [population, setPopulation] = useState("3,946");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Zustand auth store - persists authentication state
  const { isAuthenticated, activePage, login, logout, setActivePage } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.user);
        setShowLoginModal(false);
        setLoginForm({ username: "", password: "" });
        setLoginError("");
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Failed to connect to server. Please make sure the backend is running.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Vision & Mission", href: "#vision" },
    { name: "Population", href: "#population" },
    { name: "Staff", href: "#team" },
  ];

  const adminNavItems: { name: string; page: 'dashboard' | 'population' | 'households' | 'audit-trail' | 'contact' }[] = [
    { name: "Dashboard", page: "dashboard" },
    { name: "Population", page: "population" },
    { name: "Households", page: "households" },
    { name: "Audit Trail", page: "audit-trail" },
    { name: "Contact", page: "contact" },
  ];

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-earth-50">
        {/* Admin Navigation */}
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 shadow-xl">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white font-display">
                    Barangay New San Roque
                  </div>
                  <div className="text-xs text-forest-300">
                    Population Tracking System
                  </div>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="items-center hidden space-x-2 md:flex">
                {adminNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActivePage(item.page)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      activePage === item.page
                        ? "bg-sun-400 text-forest-950 shadow-lg"
                        : "text-forest-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="w-px h-8 bg-white/20 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-5 py-2.5 space-x-2 text-white transition-all duration-300 bg-mahogany-600 hover:bg-mahogany-500 rounded-xl shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="p-2 md:hidden text-white rounded-xl hover:bg-white/10 transition-colors"
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="border-t border-white/10 md:hidden bg-forest-950/95 backdrop-blur-lg">
              <div className="px-4 py-4 space-y-2">
                {adminNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActivePage(item.page);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activePage === item.page
                        ? "bg-sun-400 text-forest-950"
                        : "text-forest-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white bg-mahogany-600 hover:bg-mahogany-500 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Admin Content */}
        {activePage === "dashboard" && (
          <Dashboard totalPopulation={Number.parseInt(population.replace(/,/g, ""))} />
        )}
        {activePage === "population" && <PopulationTable />}
        {activePage === "households" && <HouseholdsTable />}
        {activePage === "audit-trail" && <AuditTrail />}
        {activePage === "contact" && <Contact />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50">
      {/* Public Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-xl" 
            : "bg-transparent"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
                scrolled 
                  ? "bg-gradient-to-br from-forest-600 to-forest-700" 
                  : "bg-white/90 backdrop-blur-sm"
              }`}>
                <Leaf className={`w-5 h-5 transition-colors ${scrolled ? "text-white" : "text-forest-700"}`} />
              </div>
              <span className={`text-xl font-bold font-display transition-colors ${
                scrolled ? "text-forest-900" : "text-forest-950"
              }`}>
                New San Roque
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="items-center hidden space-x-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? "text-forest-700 hover:text-forest-900 hover:bg-forest-50"
                      : "text-forest-800 hover:text-forest-950 hover:bg-white/50"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className={`w-px h-6 mx-2 ${scrolled ? "bg-forest-200" : "bg-forest-300/50"}`}></div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 font-medium text-white bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-600 hover:to-forest-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className={`p-2 md:hidden rounded-xl transition-colors ${
                scrolled ? "text-forest-700 hover:bg-forest-50" : "text-forest-800 hover:bg-white/50"
              }`}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white/95 backdrop-blur-lg border-t border-forest-100 md:hidden">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-forest-700 hover:text-forest-900 hover:bg-forest-50 rounded-xl font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white bg-gradient-to-r from-forest-700 to-forest-600 rounded-xl font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="relative p-8 bg-white shadow-2xl rounded-3xl overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sun-200/50 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-forest-100/50 to-transparent rounded-tr-full"></div>
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-950 font-display">Admin Login</h2>
                    <p className="text-sm text-earth-500 mt-1">Enter your credentials to continue</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setLoginError("");
                      setLoginForm({ username: "", password: "" });
                    }}
                    className="p-2 text-earth-400 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Error message */}
                {loginError && (
                  <div className="mb-6 p-4 bg-mahogany-50 border border-mahogany-200 text-mahogany-700 rounded-xl text-sm flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mahogany-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-mahogany-600" />
                    </div>
                    {loginError}
                  </div>
                )}
                
                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label htmlFor="username-input" className="block mb-2 text-sm font-semibold text-forest-800">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username-input"
                      value={loginForm.username}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, username: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="Enter username"
                      required
                      disabled={loggingIn}
                    />
                  </div>
                  <div>
                    <label htmlFor="password-input" className="block mb-2 text-sm font-semibold text-forest-800">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password-input"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
                      placeholder="Enter password"
                      required
                      disabled={loggingIn}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loggingIn}
                    className="w-full py-3.5 font-semibold text-white bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-600 hover:to-forest-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-earth-400 disabled:to-earth-400 disabled:cursor-not-allowed"
                  >
                    {loggingIn ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Logging in...
                      </span>
                    ) : "Sign In"}
                  </button>
                  <p className="mt-6 text-xs text-center text-earth-400">
                    Contact administrator for account access
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <VisionMission />
      <About
        population={population}
        setPopulation={setPopulation}
      />
      <Team />
      <Footer />
    </div>
  );
}

export default App;