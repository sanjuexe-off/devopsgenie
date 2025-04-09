
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectPromptProps {
  currentPrompt: string;
}

const ProjectPrompt: React.FC<ProjectPromptProps> = ({ currentPrompt }) => {
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
            className="w-full border border-devopsgenie-border rounded-md p-2"
            placeholder="Enter your new project description..."
          ></textarea>
        </div>
        
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          Update Prompt
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectPrompt;
