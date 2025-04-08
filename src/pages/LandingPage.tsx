
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Terminal, Cpu, GitBranch, CloudCog } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Transform Project Ideas into Deployment Strategies
              </h1>
              <p className="text-xl mb-8 text-gray-100 animate-fade-in" style={{animationDelay: "0.1s"}}>
                DevOpsGenie uses AI to convert your natural language project descriptions 
                into complete, ready-to-use deployment plans.
              </p>
              <div className="flex space-x-4 animate-fade-in" style={{animationDelay: "0.2s"}}>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-devopsgenie-primary hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in" style={{animationDelay: "0.3s"}}>
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-devopsgenie-secondary rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="p-8 bg-white rounded-lg shadow-xl">
                    <div className="text-devopsgenie-text font-mono text-sm">
                      <pre className="text-left overflow-x-auto">
                        <code>
                          {`# DevOpsGenie Prompt
"Create a microservice 
architecture for an 
e-commerce platform with 
autoscaling and CI/CD."

# Generating deployment plan...
# Infrastructure code ready!
# Architecture diagram created!
# FinOps report generated!`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-devopsgenie-text">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-devopsgenie-border hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary bg-opacity-10 p-3 rounded-full mb-4">
                <Terminal className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-devopsgenie-text">Infrastructure as Code</h3>
              <p className="text-devopsgenie-text-secondary">Generate deployment-ready infrastructure code from natural language descriptions.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-devopsgenie-border hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary bg-opacity-10 p-3 rounded-full mb-4">
                <GitBranch className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-devopsgenie-text">Architecture Diagrams</h3>
              <p className="text-devopsgenie-text-secondary">Visualize your infrastructure with automatically generated architecture diagrams.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-devopsgenie-border hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary bg-opacity-10 p-3 rounded-full mb-4">
                <Cpu className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-devopsgenie-text">FinOps Analysis</h3>
              <p className="text-devopsgenie-text-secondary">Get cost estimates and optimization recommendations for your infrastructure.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-devopsgenie-border hover:shadow-md transition-shadow">
              <div className="bg-devopsgenie-primary bg-opacity-10 p-3 rounded-full mb-4">
                <CloudCog className="h-6 w-6 text-devopsgenie-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-devopsgenie-text">Complete Documentation</h3>
              <p className="text-devopsgenie-text-secondary">Comprehensive documentation for your deployment strategy and infrastructure.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-devopsgenie-background-alt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-devopsgenie-text">Ready to transform your project description into reality?</h2>
          <p className="text-xl mb-8 text-devopsgenie-text-secondary max-w-2xl mx-auto">
            Get started with DevOpsGenie today and streamline your deployment process.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-devopsgenie-primary hover:bg-opacity-90 text-white">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
