
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? "glass-panel" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">Transglotix</span>
        </NavLink>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => 
            `menu-link ${isActive ? 'active-menu-link' : ''}`
          }>
            Home
          </NavLink>
          <NavLink to="/translate" className={({ isActive }) => 
            `menu-link ${isActive ? 'active-menu-link' : ''}`
          }>
            Translate
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => 
            `menu-link ${isActive ? 'active-menu-link' : ''}`
          }>
            Team
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `menu-link ${isActive ? 'active-menu-link' : ''}`
          }>
            About
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 glass-panel rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 p-4 glass-panel rounded-xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            <NavLink to="/" className="menu-link">
              Home
            </NavLink>
            <NavLink to="/translate" className="menu-link">
              Translate
            </NavLink>
            <NavLink to="/team" className="menu-link">
              Team
            </NavLink>
            <NavLink to="/about" className="menu-link">
              About
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
