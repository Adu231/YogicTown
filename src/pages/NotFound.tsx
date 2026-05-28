import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Leaf, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'hsl(133 20% 92%)' }}>
          <Leaf size={32} style={{ color: 'hsl(133 18% 59%)' }} />
        </div>

        {/* 404 */}
        <div className="text-8xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 88%)' }}>
          404
        </div>

        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like this page wandered off on its own retreat. Let us bring you back to your wellness journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Support</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
