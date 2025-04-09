
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';

interface ProjectPromptProps {
  currentPrompt: string;
  onPromptUpdate?: (newPrompt: string) => void;
}

const ProjectPrompt: React.FC<ProjectPromptProps> = ({ 
  currentPrompt, 
  onPromptUpdate 
}) => {
  const [newPrompt, setNewPrompt] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();

  const handleUpdatePrompt = async () => {
    if (!newPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a new prompt before updating.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUpdating(true);
      
      // Update the project description in Supabase
      const { error } = await supabase
        .from('projects')
        .update({ description: newPrompt })
        .eq('id', projectId);

      if (error) throw error;

      // Call the callback if provided
      if (onPromptUpdate) {
        onPromptUpdate(newPrompt);
      }

      toast({
        title: "Success",
        description: "Project prompt has been updated successfully.",
      });
      
      setNewPrompt(''); // Clear the input field
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to update project prompt. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Update Project Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="font-medium mb-2">Current Prompt:</p>
          <p className="text-devopsgenie-text-secondary">{currentPrompt}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="new-prompt">
            New Prompt:
          </label>
          <textarea
            id="new-prompt"
            rows={5}
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            className="w-full border border-devopsgenie-border rounded-md p-2"
            placeholder="Enter your new project description..."
          ></textarea>
        </div>
        
        <Button 
          className="bg-devopsgenie-primary hover:bg-opacity-90" 
          onClick={handleUpdatePrompt}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Prompt"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectPrompt;
