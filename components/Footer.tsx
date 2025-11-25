import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-cherie-soft pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-cherie-soft p-2 rounded-full">
                    {/* Custom Professional Logo Icon */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="h-8 w-8 text-cherie-rose"
                    >
                      <path d="M12 2.5C12 2.5 7.5 8.5 7.5 13.5C7.5 16.5 9.5 19 12 19C14.5 19 16.5 16.5 16.5 13.5C16.5 8.5 12 2.5 12 2.5Z" />
                      <path d="M12 19C12 19 5.5 17 3 12.5" />
                      <path d="M12 19C12 19 18.5 17 21 12.5" />
                      <path d="M12 22V19" />
                      <circle cx="12" cy="12" r="9" strokeWidth="0.5" className="opacity-30" />
                    </svg>
                </div>
                <h3 className="font-serif text-3xl font-medium text-cherie-dark tracking-[0.2em]">EXOTICA</h3>
            </div>
            <p className="text-cherie-text text-sm leading-7 max-w-xs">
              Bringing the sanctuary of the spa to your private villa. 
              We blend traditional Balinese healing with modern luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col justify-start md:items-center">
            <div>
                <h4 className="font-serif text-xl font-medium text-cherie-dark mb-8 relative inline-block">
                    Explore
                    <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cherie-rose"></span>
                </h4>
                <ul className="space-y-4 text-sm text-cherie-text font-medium">
                  <li><Link to="/" className="hover:text-cherie-rose transition-colors">Home</Link></li>
                  <li><Link to="/prices" className="hover:text-cherie-rose transition-colors">Price List</Link></li>
                  <li><Link to="/about" className="hover:text-cherie-rose transition-colors">Our Story</Link></li>
                  <li><Link to="/contact" className="hover:text-cherie-rose transition-colors">Book Now</Link></li>
                </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-medium text-cherie-dark mb-8 relative inline-block">
                Contact
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cherie-rose"></span>
            </h4>
            <ul className="space-y-6 text-sm text-cherie-text">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-cherie-rose shrink-0 mt-0.5" />
                <span className="leading-relaxed">Seminyak • Canggu • Ubud • Uluwatu • All Bali Areas</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-cherie-rose shrink-0" />
                <span className="tracking-wide">+{WHATSAPP_NUMBER}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-cherie-rose shrink-0" />
                <span>book@exoticabalispa.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cherie-soft mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cherie-text/60">
          <p>&copy; {new Date().getFullYear()} Exotica Bali Home Spa.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;