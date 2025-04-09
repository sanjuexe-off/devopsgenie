
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { createPrompt } from '@/api/prompts';

interface CreatePromptModalProps {
  children: React.ReactNode;
  onPromptCreated?: () => void;
}

const CreatePromptModal: React.FC<CreatePromptModalProps> = ({ children, onPromptCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Prompt title and content are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      await createPrompt({
        title,
        content,
        category
      });
      
      setOpen(false);
      setTitle('');
      setContent('');
      setCategory('Architecture');
      
      toast({
        title: "Success",
        description: "Prompt created successfully",
      });
      
      if (onPromptCreated) {
        onPromptCreated();
      }
    } catch (error: any) {
      console.error('Error creating prompt:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create prompt",
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
          <DialogTitle className="text-lg font-bold">Create New Prompt</DialogTitle>
          <DialogDescription>
            Create a new prompt template for generating infrastructure or architecture designs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreatePrompt} className="space-y-4 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="title">Prompt Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Kubernetes Cluster Setup"
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="content">Prompt Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your prompt template here..."
              rows={5}
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={isLoading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Architecture">Architecture</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="FinOps">FinOps</SelectItem>
              </SelectContent>
            </Select>
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
              {isLoading ? "Creating..." : "Create Prompt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptModal;
