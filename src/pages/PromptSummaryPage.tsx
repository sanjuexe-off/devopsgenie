
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Save, Copy, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { getPrompts, deletePrompt, Prompt } from '@/api/prompts';
import CreatePromptModal from '@/components/prompt/CreatePromptModal';
import { supabase } from '@/integrations/supabase/client';

const PromptSummaryPage: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setIsLoading(true);
      const promptsData = await getPrompts();
      setPrompts(promptsData);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast({
        title: "Error",
        description: "Failed to load prompts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Prompt copied to clipboard",
    });
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      setIsDeleting(id);
      await deletePrompt(id);
      setPrompts(prompts.filter(prompt => prompt.id !== id));
      toast({
        title: "Success",
        description: "Prompt deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to delete prompt",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Check for authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Add dummy prompts if no user is authenticated (for demonstration)
          if (prompts.length === 0) {
            const dummyPrompts = [
              {
                id: '1',
                title: 'E-commerce Backend',
                content: 'Create a microservice architecture for an e-commerce platform with autoscaling and CI/CD.',
                category: 'Architecture',
                createdAt: '2025-04-02',
                updatedAt: '2025-04-05',
                userId: 'demo'
              },
              {
                id: '2',
                title: 'Content Management System',
                content: 'Serverless CMS platform with CDN integration and dynamic scaling.',
                category: 'Infrastructure',
                createdAt: '2025-04-03',
                updatedAt: '2025-04-07',
                userId: 'demo'
              },
              {
                id: '3',
                title: 'Analytics Dashboard',
                content: 'Real-time data analytics platform with visualization tools.',
                category: 'Frontend',
                createdAt: '2025-03-28',
                updatedAt: '2025-04-01',
                userId: 'demo'
              }
            ];
            setPrompts(dummyPrompts);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, []);

  const renderPromptCard = (prompt: Prompt) => (
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
            <p>Created: {new Date(prompt.createdAt).toLocaleDateString()}</p>
            <p>Last updated: {new Date(prompt.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCopyPrompt(prompt.content)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isDeleting === prompt.id}
              onClick={() => handleDeletePrompt(prompt.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
              <MessageSquare className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Prompt Summary</h1>
        <CreatePromptModal onPromptCreated={fetchPrompts}>
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            New Prompt
          </Button>
        </CreatePromptModal>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Prompts</TabsTrigger>
          <TabsTrigger value="Architecture">Architecture</TabsTrigger>
          <TabsTrigger value="Infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="Frontend">Frontend</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading prompts...</p>
            </div>
          ) : (
            prompts.length > 0 ? (
              prompts.map(renderPromptCard)
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-500 mb-4">You don't have any prompts yet.</p>
                <CreatePromptModal onPromptCreated={fetchPrompts}>
                  <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Prompt
                  </Button>
                </CreatePromptModal>
              </div>
            )
          )}
        </TabsContent>
        
        {['Architecture', 'Infrastructure', 'Frontend'].map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p>Loading prompts...</p>
              </div>
            ) : (
              prompts.filter(p => p.category === category).length > 0 ? (
                prompts.filter(p => p.category === category).map(renderPromptCard)
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-gray-500 mb-4">No {category} prompts yet.</p>
                  <CreatePromptModal onPromptCreated={fetchPrompts}>
                    <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Create {category} Prompt
                    </Button>
                  </CreatePromptModal>
                </div>
              )
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromptSummaryPage;
