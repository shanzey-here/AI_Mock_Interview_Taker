import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Single source of truth for navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/blogs", label: "Blog" },
  ];

  // Active route detection for nested paths
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[80%] backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl px-4 py-2 flex justify-between items-center z-50 shadow-lg">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
        MockMate
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-6 text-white font-medium">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path}
              className={`hover:text-gray-300 transition-colors ${
                isActive(link.path) ? 'text-gray-300 font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link 
          to="/signin" 
          className="text-white hover:text-gray-300 transition-colors"
        >
          Sign in
        </Link>
        <Link 
          to="/signup" 
          className="bg-white text-black px-4 py-2 rounded-full font-sm hover:bg-gray-200 transition-colors"
        >
          Sign up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      <div 
        id="mobile-menu"
        className={`absolute top-full mt-3 right-0 w-full backdrop-blur-xl bg-black/70 rounded-2xl shadow-lg p-6 flex flex-col space-y-4 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                className={`text-white hover:text-gray-300 transition-colors ${
                  isActive(link.path) ? 'text-gray-300 font-semibold' : ''
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="border-white/20" />

        <div className="flex flex-col space-y-4">
          <Link 
            to="/signin" 
            className="text-white hover:text-gray-300 transition-colors text-left"
            onClick={handleLinkClick}
          >
            Sign in
          </Link>
          <Link 
            to="/signup" 
            className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors w-full text-center"
            onClick={handleLinkClick}
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
