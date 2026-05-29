import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, ChevronDown, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Instructors', href: '/instructors' },
  { label: 'Retreats', href: '/retreats' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
            <Leaf size={16} className="text-white" />
          </div>
          <span style={{ fontFamily: 'Playfair Display, serif' }} className="text-[#101f18] dark:text-foreground">
            Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-primary' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm font-medium max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-1 z-50">
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <User size={15} /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <Settings size={15} /> Settings
                  </Link>
                  <hr className="my-1 border-border" />
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full">
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Start Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href ? 'bg-sage-light text-primary' : 'hover:bg-muted'
                }`}
                style={pathname === link.href ? { background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 35%)' } : {}}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <Link to="/profile" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                  <User size={15} /> Profile
                </Link>
                <button onClick={handleLogout} className="px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-muted transition-colors flex items-center gap-2 w-full text-left">
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="px-3 py-2.5 rounded-lg text-sm font-medium text-center border border-border hover:bg-muted transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary justify-center">
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
