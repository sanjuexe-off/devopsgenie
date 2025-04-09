
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import ProjectChat from '@/components/project/ProjectChat';
import FileExplorer from '@/components/project/FileExplorer';
import ProjectPrompt from '@/components/project/ProjectPrompt';
import ProjectSummary from '@/components/project/ProjectSummary';

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
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
      content: `Welcome to Project ${projectId}! How can I help you with your deployment strategy today?`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Project Workspace</h1>
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          <RefreshCw className="w-4 h-4 mr-2" />
          Update Project
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
          <ProjectPrompt currentPrompt="Create a microservice architecture for an e-commerce platform with autoscaling and CI/CD." />
        </TabsContent>
        
        <TabsContent value="summary">
          <ProjectSummary 
            name="E-commerce Platform" 
            createdAt="April 5, 2025" 
            updatedAt="April 8, 2025" 
            status="Completed" 
            resourceCount={12} 
            estimatedCost="$450/month" 
            cloudProvider="AWS" 
            description="This project implements a microservice architecture for an e-commerce platform with autoscaling capabilities and a robust CI/CD pipeline. The infrastructure includes containerized microservices, a message queue for asynchronous processing, and a CDN for static assets." 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
