
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, FolderOpen, Send, RefreshCw } from 'lucide-react';

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `Welcome to Project ${projectId}! How can I help you with your deployment strategy today?`
    }
  ]);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    const newMessage = {
      role: 'user',
      content: promptInput
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          role: 'system',
          content: `I've processed your request: "${promptInput}". What specific aspect of your deployment strategy would you like to explore further?`
        }
      ]);
    }, 1000);
    
    setPromptInput('');
  };

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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Project Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 overflow-y-auto border border-devopsgenie-border rounded-lg p-4 mb-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user' 
                        ? 'ml-auto bg-devopsgenie-primary text-white' 
                        : 'mr-auto bg-gray-100 text-devopsgenie-text'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask about your deployment strategy..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-devopsgenie-primary hover:bg-opacity-90">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">File Explorer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(folderStructure).map(([folder, files]) => (
                  <div key={folder} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium flex items-center">
                      <FolderOpen className="w-4 h-4 mr-2 text-devopsgenie-primary" />
                      {folder}
                    </div>
                    <div className="divide-y">
                      {files.map(file => (
                        <div key={file} className="px-4 py-2 flex items-center hover:bg-gray-50">
                          <FileText className="w-4 h-4 mr-2 text-devopsgenie-text-secondary" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Project Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="font-medium mb-2">Current Prompt:</p>
                <p className="text-devopsgenie-text-secondary">Create a microservice architecture for an e-commerce platform with autoscaling and CI/CD.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="new-prompt">
                  New Prompt:
                </label>
                <textarea
                  id="new-prompt"
                  rows={5}
                  className="w-full border border-devopsgenie-border rounded-md p-2"
                  placeholder="Enter your new project description..."
                ></textarea>
              </div>
              
              <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                Update Prompt
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 text-devopsgenie-text">Project Details</h3>
                  <p className="text-sm text-devopsgenie-text-secondary mb-1">
                    <span className="font-medium">Name:</span> E-commerce Platform
                  </p>
                  <p className="text-sm text-devopsgenie-text-secondary mb-1">
                    <span className="font-medium">Created:</span> April 5, 2025
                  </p>
                  <p className="text-sm text-devopsgenie-text-secondary mb-1">
                    <span className="font-medium">Last Updated:</span> April 8, 2025
                  </p>
                  <p className="text-sm text-devopsgenie-text-secondary">
                    <span className="font-medium">Status:</span> Completed
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 text-devopsgenie-text">Infrastructure Overview</h3>
                  <p className="text-sm text-devopsgenie-text-secondary mb-1">
                    <span className="font-medium">Resources:</span> 12
                  </p>
                  <p className="text-sm text-devopsgenie-text-secondary mb-1">
                    <span className="font-medium">Estimated Cost:</span> $450/month
                  </p>
                  <p className="text-sm text-devopsgenie-text-secondary">
                    <span className="font-medium">Cloud Provider:</span> AWS
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2 text-devopsgenie-text">Description</h3>
                <p className="text-sm text-devopsgenie-text-secondary">
                  This project implements a microservice architecture for an e-commerce platform with autoscaling capabilities and a robust CI/CD pipeline. The infrastructure includes containerized microservices, a message queue for asynchronous processing, and a CDN for static assets.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
