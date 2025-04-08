
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Microservice architecture for an e-commerce platform with autoscaling and CI/CD',
      lastUpdated: '2025-04-05',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Content Management System',
      description: 'Serverless CMS platform with CDN integration and dynamic scaling',
      lastUpdated: '2025-04-07',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      description: 'Real-time data analytics platform with visualization tools',
      lastUpdated: '2025-04-01',
      status: 'Completed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Dashboard</h1>
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projects</CardTitle>
            <CardDescription>Your active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-devopsgenie-primary">{projects.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-devopsgenie-primary">7</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resources</CardTitle>
            <CardDescription>Total infrastructure resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-devopsgenie-primary">24</div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold text-devopsgenie-text mt-8">Your Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{project.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.status}
                </span>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <span className="text-devopsgenie-text-secondary">Last updated: {project.lastUpdated}</span>
                <Link to={`/dashboard/project/${project.id}`}>
                  <Button variant="ghost" size="sm" className="text-devopsgenie-primary">
                    <span className="mr-1">View</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="flex items-center justify-center border-dashed">
          <CardContent className="p-8 text-center">
            <Button variant="outline" size="lg" className="w-full">
              <Plus className="h-5 w-5 mr-2" />
              Create New Project
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-devopsgenie-text mb-4">Recent Documents</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-devopsgenie-border">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-devopsgenie-text-secondary mr-3" />
                    <div>
                      <p className="font-medium text-devopsgenie-text">Deployment Strategy {item}</p>
                      <p className="text-sm text-devopsgenie-text-secondary">Updated 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
