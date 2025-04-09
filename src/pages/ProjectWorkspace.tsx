
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProjectChat from '@/components/project/ProjectChat';
import FileExplorer from '@/components/project/FileExplorer';
import ProjectPrompt from '@/components/project/ProjectPrompt';
import ProjectSummary from '@/components/project/ProjectSummary';

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const folderStructure = {
    'infra': [
      'main.tf',
      'variables.tf',
      'outputs.tf',
      'modules/',
      'environments/'
    ],
    'diagrams': [
      'architecture.png',
      'network.png',
      'data-flow.png'
    ],
    'docs': [
      'README.md',
      'deployment-guide.md',
      'monitoring.md',
      'scaling.md'
    ],
    'finops': [
      'cost-estimate.json',
      'optimization-report.md',
      'forecast.csv'
    ]
  };
  
  const initialMessages = [
    {
      role: 'system' as const,
      content: project ? `Welcome to Project ${project.name}! How can I help you with your deployment strategy today?` : 
        `Welcome to this project! How can I help you with your deployment strategy today?`
    }
  ];

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      
      if (!projectId) {
        toast({
          title: "Error",
          description: "Project ID is missing",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      setProject(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshProject = async () => {
    setRefreshing(true);
    await fetchProjectData();
    setRefreshing(false);
    toast({
      title: "Success",
      description: "Project data refreshed",
    });
  };

  const handlePromptUpdate = (newPrompt: string) => {
    // Update the local state with the new prompt
    setProject((prev: any) => ({
      ...prev,
      description: newPrompt
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading project data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">
          {project?.name || "Project Workspace"}
        </h1>
        <Button 
          className="bg-devopsgenie-primary hover:bg-opacity-90" 
          onClick={handleRefreshProject}
          disabled={refreshing}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {refreshing ? "Refreshing..." : "Update Project"}
        </Button>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="chat">Project Chat</TabsTrigger>
          <TabsTrigger value="files">File Explorer</TabsTrigger>
          <TabsTrigger value="prompt">Update Prompt</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <ProjectChat initialMessages={initialMessages} projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="files">
          <FileExplorer folderStructure={folderStructure} />
        </TabsContent>
        
        <TabsContent value="prompt">
          <ProjectPrompt 
            currentPrompt={project?.description || "No prompt available"} 
            onPromptUpdate={handlePromptUpdate}
          />
        </TabsContent>
        
        <TabsContent value="summary">
          <ProjectSummary 
            name={project?.name || "Unnamed Project"} 
            createdAt={project?.created_at ? new Date(project.created_at).toLocaleDateString() : "Unknown"} 
            updatedAt={project?.updated_at ? new Date(project.updated_at).toLocaleDateString() : "Unknown"} 
            status={project?.status || "In Progress"} 
            resourceCount={12} 
            estimatedCost="$450/month" 
            cloudProvider="AWS" 
            description={project?.description || "No description available"} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
