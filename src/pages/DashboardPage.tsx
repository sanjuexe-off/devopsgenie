
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CreateProjectModal from '@/components/project/CreateProjectModal';

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <CreateProjectModal onProjectCreated={fetchProjects}>
            <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </CreateProjectModal>
        </div>
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
            <div className="text-3xl font-bold text-devopsgenie-primary">
              {projects.filter(p => 
                new Date(p.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resources</CardTitle>
            <CardDescription>Total infrastructure resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-devopsgenie-primary">
              {/* Placeholder for actual resource count */}
              {projects.length * 8}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold text-devopsgenie-text mt-8">Your Projects</h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading projects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{project.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : project.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </CardTitle>
                  <CardDescription>{project.description || "No description provided"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-devopsgenie-text-secondary">
                      Last updated: {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                    <Link to={`/dashboard/project/${project.id}`}>
                      <Button variant="ghost" size="sm" className="text-devopsgenie-primary">
                        <span className="mr-1">View</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-3 flex items-center justify-center border-dashed p-8">
              <CardContent className="text-center">
                <p className="text-gray-500 mb-4">You don't have any projects yet.</p>
                <CreateProjectModal onProjectCreated={fetchProjects}>
                  <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Project
                  </Button>
                </CreateProjectModal>
              </CardContent>
            </Card>
          )}
          
          {projects.length > 0 && (
            <CreateProjectModal onProjectCreated={fetchProjects}>
              <Card className="flex items-center justify-center border-dashed h-full cursor-pointer hover:bg-gray-50">
                <CardContent className="p-8 text-center">
                  <Button variant="outline" size="lg" className="w-full">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Project
                  </Button>
                </CardContent>
              </Card>
            </CreateProjectModal>
          )}
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-devopsgenie-text mb-4">Recent Documents</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-devopsgenie-border">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-devopsgenie-text-secondary mr-3" />
                    <div>
                      <p className="font-medium text-devopsgenie-text">{project.name}</p>
                      <p className="text-sm text-devopsgenie-text-secondary">
                        Updated {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/dashboard/project/${project.id}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No documents available yet. Create a project to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
