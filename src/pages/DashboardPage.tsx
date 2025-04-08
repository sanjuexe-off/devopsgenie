
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage: React.FC = () => {
  // Mock data for projects
  const projects = [
    { id: '1', name: 'E-commerce Platform', status: 'Active', lastUpdated: '2 days ago' },
    { id: '2', name: 'Microservices Backend', status: 'Completed', lastUpdated: '1 week ago' },
    { id: '3', name: 'Serverless API', status: 'Draft', lastUpdated: '3 hours ago' }
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-devopsgenie-text">Welcome to DevOpsGenie</h1>
          <p className="text-devopsgenie-text-secondary">
            Manage your deployment projects and view insights
          </p>
        </div>
        <Link to="/dashboard/project/new">
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-xs text-devopsgenie-text-secondary mt-1">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Active Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-devopsgenie-text-secondary mt-1">
              -1 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Resources Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-devopsgenie-text-secondary mt-1">
              +6 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Estimated Cost Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,450</div>
            <p className="text-xs text-devopsgenie-text-secondary mt-1">
              +14% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment Activity</CardTitle>
            <CardDescription>Your project deployments over time</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <LineChart className="h-16 w-16 text-devopsgenie-text-secondary opacity-50" />
              <span className="ml-4 text-devopsgenie-text-secondary">
                Chart visualization would appear here
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Cloud resource allocation by project</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <BarChart className="h-16 w-16 text-devopsgenie-text-secondary opacity-50" />
              <span className="ml-4 text-devopsgenie-text-secondary">
                Chart visualization would appear here
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link to={`/dashboard/project/${project.id}`} key={project.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <CardDescription>Last updated {project.lastUpdated}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-devopsgenie-text-secondary">Resources</p>
                        <p className="font-medium">8 items</p>
                      </div>
                      <div>
                        <p className="text-sm text-devopsgenie-text-secondary">Est. Cost</p>
                        <p className="font-medium">$350/mo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          {/* New Project Card */}
          <Link to="/dashboard/project/new">
            <Card className="border-dashed border-2 hover:border-devopsgenie-primary hover:bg-devopsgenie-background-alt transition-all cursor-pointer flex flex-col items-center justify-center p-6 h-full">
              <PlusCircle className="h-12 w-12 text-devopsgenie-text-secondary mb-2" />
              <p className="font-medium text-center text-devopsgenie-text">Create New Project</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="flex items-start gap-4">
              <div className="bg-devopsgenie-primary/10 p-2 rounded-full">
                <PlusCircle className="h-4 w-4 text-devopsgenie-primary" />
              </div>
              <div>
                <p className="font-medium">Created new project "Serverless API"</p>
                <p className="text-sm text-devopsgenie-text-secondary">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <LineChart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Updated architecture diagram for "E-commerce Platform"</p>
                <p className="text-sm text-devopsgenie-text-secondary">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Generated FinOps report for "Microservices Backend"</p>
                <p className="text-sm text-devopsgenie-text-secondary">1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
