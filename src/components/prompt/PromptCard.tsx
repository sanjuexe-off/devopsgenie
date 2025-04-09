
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Prompt } from '@/api/prompts';

interface PromptCardProps {
  prompt: Prompt;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onDelete, isDeleting }) => {
  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Prompt copied to clipboard",
    });
  };

  return (
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
              disabled={isDeleting}
              onClick={() => onDelete(prompt.id)}
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
};

export default PromptCard;
