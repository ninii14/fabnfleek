import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Footer() {
  const { content } = useAppContext();

  return (
    <footer className="bg-brand-card border-t border-brand-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center border border-brand-border">
                <span className="font-serif font-bold text-xl text-brand-pink">FF</span>
              </div>
              <span className="font-serif font-semibold text-xl tracking-wide">Fab & Fleek</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {content.tagline}
            </p>
            <div className="flex space-x-4">
              <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-pink transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-brand-teal text-sm transition-colors">Services</Link></li>
              <li><Link to="/promotions" className="text-gray-400 hover:text-brand-teal text-sm transition-colors">Promotions</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-brand-teal text-sm transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-teal text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-brand-pink shrink-0 mt-0.5" />
                <span>{content.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-brand-teal shrink-0" />
                <span>{content.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-brand-pink shrink-0" />
                <span>{content.contactEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-white">Hours</h3>
            <div className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">
              {content.businessHours.split('|').map((line, i) => (
                <div key={i} className="mb-2">{line.trim()}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Fab and Fleek Beauty Center. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
