
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Code, BarChart, Database, LineChart } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-devopsgenie-primary to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Transform Ideas into Deployment Strategies
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-lg">
                DevOpsGenie transforms natural language project descriptions into complete, 
                production-ready deployment strategies with infrastructure as code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-devopsgenie-primary hover:bg-white/90">
                    Get Started Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/78bec373-9f28-4fbf-9c4b-c0c38190f0c3.png" 
                alt="DevOpsGenie Dashboard Preview" 
                className="rounded-lg shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-devopsgenie-text mb-4">How DevOpsGenie Works</h2>
            <p className="text-lg text-devopsgenie-text-secondary max-w-2xl mx-auto">
              Our AI-powered platform analyzes your project requirements and generates deployment 
              strategies, infrastructure code, and architecture diagrams in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-devopsgenie-background-alt p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Infrastructure as Code</h3>
              <p className="text-devopsgenie-text-secondary">
                Generate production-ready infrastructure code from natural language descriptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-devopsgenie-background-alt p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Architecture Diagrams</h3>
              <p className="text-devopsgenie-text-secondary">
                Visualize your infrastructure with automatically generated architecture diagrams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-devopsgenie-background-alt p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">FinOps Analysis</h3>
              <p className="text-devopsgenie-text-secondary">
                Get cost estimates and optimize your cloud spending with our FinOps analysis.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-devopsgenie-background-alt p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Documentation</h3>
              <p className="text-devopsgenie-text-secondary">
                Auto-generated documentation ensures your team understands the deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-devopsgenie-background-alt">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-devopsgenie-text mb-6">Ready to transform your deployment process?</h2>
          <p className="text-lg text-devopsgenie-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of developers who are saving time and resources with DevOpsGenie.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-devopsgenie-primary hover:bg-opacity-90">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
