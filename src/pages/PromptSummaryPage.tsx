
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { getPrompts, deletePrompt, Prompt } from '@/api/prompts';
import CreatePromptModal from '@/components/prompt/CreatePromptModal';
import PromptTabContent from '@/components/prompt/PromptTabContent';
import { supabase } from '@/integrations/supabase/client';

const PromptSummaryPage: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const categories = ['Architecture', 'Infrastructure', 'Frontend'];

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
        if (!user && prompts.length === 0) {
          // Add dummy prompts if no user is authenticated (for demonstration)
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
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, []);

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
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <PromptTabContent
            isLoading={isLoading}
            prompts={prompts}
            isDeleting={isDeleting}
            onDeletePrompt={handleDeletePrompt}
            onPromptCreated={fetchPrompts}
          />
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <PromptTabContent
              isLoading={isLoading}
              prompts={prompts}
              category={category}
              isDeleting={isDeleting}
              onDeletePrompt={handleDeletePrompt}
              onPromptCreated={fetchPrompts}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromptSummaryPage;
