import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, GENERATE_WA_LINK } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `fixed w-full z-50 transition-all duration-500 ${
    scrolled 
      ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
      : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
                whileHover={{ rotate: 120 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className={`p-2 rounded-full transition-colors border border-transparent ${scrolled ? 'bg-cherie-soft group-hover:border-cherie-rose/30' : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'}`}
            >
                {/* Custom Professional Lotus/Abstract Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`h-6 w-6 md:h-8 md:w-8 transition-colors ${scrolled ? 'text-cherie-dark' : 'text-cherie-dark md:text-white'}`}
                >
                  <path d="M12 2.5C12 2.5 7.5 8.5 7.5 13.5C7.5 16.5 9.5 19 12 19C14.5 19 16.5 16.5 16.5 13.5C16.5 8.5 12 2.5 12 2.5Z" />
                  <path d="M12 19C12 19 5.5 17 3 12.5" />
                  <path d="M12 19C12 19 18.5 17 21 12.5" />
                  <path d="M12 22V19" />
                  <circle cx="12" cy="12" r="9" strokeWidth="0.5" className="opacity-30" />
                </svg>
            </motion.div>
            <div className="flex flex-col">
                <span className={`font-serif text-2xl md:text-3xl font-medium tracking-[0.2em] leading-none transition-colors ${scrolled ? 'text-cherie-dark' : 'text-cherie-dark md:text-white'}`}>
                    EXOTICA
                </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-cherie-rose relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-cherie-rose after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ${
                  location.pathname === link.path 
                    ? 'text-cherie-rose' 
                    : scrolled ? 'text-cherie-dark' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
                href={GENERATE_WA_LINK()}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${
                    scrolled 
                    ? 'bg-cherie-dark text-white hover:bg-cherie-rose' 
                    : 'bg-white text-cherie-dark hover:bg-cherie-soft'
                }`}
            >
                Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-cherie-dark' : 'text-cherie-dark'} hover:text-cherie-rose focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-cherie-soft"
          >
            <div className="px-6 pt-4 pb-8 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-cherie-soft text-cherie-dark'
                      : 'text-cherie-text hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
                <a 
                    href={GENERATE_WA_LINK()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center mt-6 bg-cherie-rose text-white px-6 py-4 rounded-2xl font-bold tracking-widest uppercase shadow-md shadow-cherie-rose/30"
                >
                    Book on WhatsApp
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;