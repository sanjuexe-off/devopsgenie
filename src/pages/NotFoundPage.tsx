
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-devopsgenie-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-devopsgenie-text mb-4">Page Not Found</h2>
        <p className="text-devopsgenie-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
