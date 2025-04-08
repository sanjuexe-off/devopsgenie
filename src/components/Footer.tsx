
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-devopsgenie-background-alt border-t border-devopsgenie-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-devopsgenie-text font-bold text-lg mb-2">DevOpsGenie</h3>
            <p className="text-devopsgenie-text-secondary max-w-md">
              Transform natural language project descriptions into complete deployment strategies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="font-medium text-devopsgenie-text mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Features</Link></li>
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Pricing</Link></li>
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-devopsgenie-text mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">About</Link></li>
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Blog</Link></li>
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-2 col-span-2 md:col-span-1">
              <h4 className="font-medium text-devopsgenie-text mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Terms</Link></li>
                <li><Link to="/" className="text-devopsgenie-text-secondary hover:text-devopsgenie-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-devopsgenie-border mt-8 pt-6">
          <p className="text-devopsgenie-text-secondary text-sm text-center">
            © {new Date().getFullYear()} DevOpsGenie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
