
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreatePromptModal from '@/components/prompt/CreatePromptModal';

interface EmptyPromptStateProps {
  category?: string;
  onPromptCreated: () => void;
}

const EmptyPromptState: React.FC<EmptyPromptStateProps> = ({ category, onPromptCreated }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-gray-500 mb-4">
        {category 
          ? `No ${category} prompts yet.`
          : "You don't have any prompts yet."
        }
      </p>
      <CreatePromptModal onPromptCreated={onPromptCreated}>
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          {category 
            ? `Create ${category} Prompt`
            : "Create Your First Prompt"
          }
        </Button>
      </CreatePromptModal>
    </div>
  );
};

export default EmptyPromptState;
