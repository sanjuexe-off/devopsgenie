
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

interface HeaderProps {
  isDashboard?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDashboard = false, onMenuClick }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-devopsgenie-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isDashboard && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-xl text-devopsgenie-text">DevOpsGenie</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-devopsgenie-text hover:text-devopsgenie-primary transition-colors ${location.pathname === '/' ? 'font-medium text-devopsgenie-primary' : ''}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`text-devopsgenie-text hover:text-devopsgenie-primary transition-colors ${location.pathname.includes('/dashboard') ? 'font-medium text-devopsgenie-primary' : ''}`}>
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          {!isDashboard && isHome ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-devopsgenie-primary hover:bg-opacity-90 text-white">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
