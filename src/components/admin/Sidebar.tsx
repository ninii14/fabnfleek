import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scissors, 
  Tag, 
  Image as ImageIcon, 
  Users, 
  FileText, 
  LogOut,
  Settings
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Scissors },
    { name: 'Promotions', path: '/admin/promotions', icon: Tag },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Website Content', path: '/admin/content', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div className="w-64 bg-brand-card border-r border-brand-border h-screen flex flex-col sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-brand-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center border border-brand-border">
            <span className="font-serif font-bold text-sm text-brand-pink">FF</span>
          </div>
          <span className="font-serif font-semibold text-lg tracking-wide">Admin Panel</span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Content Management
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-brand-pink/10 text-brand-pink'
                  : 'text-gray-400 hover:bg-brand-bg hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive(link.path) ? 'text-brand-pink' : 'text-gray-400'} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-brand-border space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-brand-bg hover:text-white transition-colors">
          <Settings size={18} />
          Settings
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
