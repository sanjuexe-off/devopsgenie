
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generateDeploymentStrategy } from '@/api/aiService';

interface CreateProjectModalProps {
  children: React.ReactNode;
  onProjectCreated?: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ children, onProjectCreated }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [aiProvider, setAiProvider] = useState<string>('openai');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Project name and description are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Insert a new project
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          owner_id: user.id,
          ai_provider: aiProvider
        })
        .select()
        .single();

      if (error) throw error;
      
      // Create initial folders in storage
      const projectId = data.id;
      
      // Create project directories
      const folders = ['infra', 'diagrams', 'docs', 'finops'];
      
      for (const folder of folders) {
        // Create an empty placeholder file to represent the folder
        await supabase
          .storage
          .from('project_files')
          .upload(`${projectId}/${folder}/.gitkeep`, new Blob([''], { type: 'text/plain' }));
      }

      // Try to initiate an AI generation for the project
      try {
        await generateDeploymentStrategy({
          prompt: description,
          projectId: projectId
        });
      } catch (genError) {
        console.error("Error starting generation:", genError);
        // Continue even if generation fails
      }

      // Close the modal and reset fields
      setOpen(false);
      setName('');
      setDescription('');

      // Navigate to the new project
      navigate(`/dashboard/project/${projectId}`);
      
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      
      // Call callback if provided
      if (onProjectCreated) {
        onProjectCreated();
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create New Project</DialogTitle>
          <DialogDescription>
            Create a new deployment project and the AI will generate infrastructure, architecture diagrams, and cost estimates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProject} className="space-y-4 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., E-commerce Platform"
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to deploy. E.g., A containerized microservice architecture for an e-commerce platform with autoscaling capabilities and CI/CD pipeline..."
              rows={5}
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label>AI Provider</Label>
            <RadioGroup 
              value={aiProvider}
              onValueChange={setAiProvider}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="openai" id="modal-openai" />
                <Label htmlFor="modal-openai">OpenAI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anthropic" id="modal-anthropic" />
                <Label htmlFor="modal-anthropic">Anthropic Claude</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-devopsgenie-primary hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
