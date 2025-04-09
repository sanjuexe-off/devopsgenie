
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
import { getProjectAISettings } from '@/api/aiService';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  ai_provider: string | null;
}

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resourceCount, setResourceCount] = useState<number>(0);
  const [estimatedCost, setEstimatedCost] = useState<string>('$0/month');
  const [cloudProvider, setCloudProvider] = useState<string>('AWS');
  
  const initialMessages = [
    {
      role: 'system' as const,
      content: project ? `Welcome to Project ${project.name}! How can I help you with your deployment strategy today?` : 
        `Welcome to this project! How can I help you with your deployment strategy today?`
    }
  ];

  useEffect(() => {
    if (projectId) {
      fetchProjectData();
      countResources();
    }
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

      // Get AI settings
      const settings = await getProjectAISettings(projectId);
      if (data.ai_provider !== settings.provider) {
        // Update our local copy if there's a mismatch
        setProject({ ...data, ai_provider: settings.provider });
      }
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

  const countResources = async () => {
    try {
      if (!projectId) return;
      
      // Count files as "resources"
      const { data, error } = await supabase
        .storage
        .from('project_files')
        .list(projectId);

      if (error) throw error;
      
      const count = data?.length || 0;
      setResourceCount(count);
      
      // Set a fake estimated cost based on resource count
      const estimatedMonthlyCost = Math.max(100, count * 50);
      setEstimatedCost(`$${estimatedMonthlyCost}/month`);
      
      // Randomly select a cloud provider for demo purposes
      const providers = ['AWS', 'Azure', 'GCP', 'Multi-cloud'];
      setCloudProvider(providers[Math.floor(Math.random() * providers.length)]);
    } catch (error) {
      console.error('Error counting resources:', error);
    }
  };

  const handleRefreshProject = async () => {
    setRefreshing(true);
    await fetchProjectData();
    await countResources();
    setRefreshing(false);
    toast({
      title: "Success",
      description: "Project data refreshed",
    });
  };

  const handlePromptUpdate = (newPrompt: string) => {
    // Update the local state with the new prompt
    if (project) {
      setProject({
        ...project,
        description: newPrompt
      });
    }
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
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
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
          <FileExplorer />
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
            resourceCount={resourceCount} 
            estimatedCost={estimatedCost} 
            cloudProvider={cloudProvider} 
            description={project?.description || "No description available"} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
