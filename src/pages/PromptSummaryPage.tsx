
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Save, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PromptSummaryPage: React.FC = () => {
  const prompts = [
    {
      id: 1,
      title: 'E-commerce Backend',
      content: 'Create a microservice architecture for an e-commerce platform with autoscaling and CI/CD.',
      createdAt: '2025-04-02',
      updatedAt: '2025-04-05',
      category: 'Architecture'
    },
    {
      id: 2,
      title: 'Content Management System',
      content: 'Serverless CMS platform with CDN integration and dynamic scaling.',
      createdAt: '2025-04-03',
      updatedAt: '2025-04-07',
      category: 'Infrastructure'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      content: 'Real-time data analytics platform with visualization tools.',
      createdAt: '2025-03-28',
      updatedAt: '2025-04-01',
      category: 'Frontend'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Prompt Summary</h1>
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Prompt
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Prompts</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {prompts.map((prompt) => (
            <Card key={prompt.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{prompt.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {prompt.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{prompt.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-devopsgenie-text-secondary">
                    <p>Created: {prompt.createdAt}</p>
                    <p>Last updated: {prompt.updatedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="architecture" className="space-y-4">
          {prompts.filter(p => p.category === 'Architecture').map((prompt) => (
            <Card key={prompt.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{prompt.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {prompt.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{prompt.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-devopsgenie-text-secondary">
                    <p>Created: {prompt.createdAt}</p>
                    <p>Last updated: {prompt.updatedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="infrastructure" className="space-y-4">
          {prompts.filter(p => p.category === 'Infrastructure').map((prompt) => (
            <Card key={prompt.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{prompt.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {prompt.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{prompt.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-devopsgenie-text-secondary">
                    <p>Created: {prompt.createdAt}</p>
                    <p>Last updated: {prompt.updatedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="frontend" className="space-y-4">
          {prompts.filter(p => p.category === 'Frontend').map((prompt) => (
            <Card key={prompt.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{prompt.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {prompt.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{prompt.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-devopsgenie-text-secondary">
                    <p>Created: {prompt.createdAt}</p>
                    <p>Last updated: {prompt.updatedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptSummaryPage;
