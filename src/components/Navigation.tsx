
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";

const Navigation = ({ showBackButton = false }: { showBackButton?: boolean }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-cyber-background border-b border-cyber-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {showBackButton && location.pathname !== "/" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-2 text-cyber-primary hover:text-cyber-secondary"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-cyber-primary" />
              <span className="font-bold text-lg text-cyber-foreground">CyberToolHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <span className="text-sm text-cyber-foreground opacity-75">
                {user.email}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-cyber-border text-cyber-foreground hover:bg-cyber-muted"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-cyber-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-cyber-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-4 pb-4 md:hidden">
            {user && (
              <div className="py-3 px-4 text-sm text-cyber-foreground border-t border-cyber-border">
                Logged in as: {user.email}
              </div>
            )}
            <div className="border-t border-cyber-border pt-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-cyber-foreground hover:bg-cyber-muted"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
