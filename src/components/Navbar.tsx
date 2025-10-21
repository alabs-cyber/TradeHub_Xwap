import { Link } from 'react-router-dom';
import { Package, MessageCircle, User, Plus, ShoppingBag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">TradeHub</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/browse">
            <Button variant="ghost" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Browse
            </Button>
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/add-item">
                <Button variant="ghost" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="ghost" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Offers
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              {user?.email === 'admin@example.com' && (
                <Link to="/admin">
                  <Button variant="ghost" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
