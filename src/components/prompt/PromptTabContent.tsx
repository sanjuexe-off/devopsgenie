
import React from 'react';
import { Prompt } from '@/api/prompts';
import PromptCard from '@/components/prompt/PromptCard';
import EmptyPromptState from '@/components/prompt/EmptyPromptState';

interface PromptTabContentProps {
  isLoading: boolean;
  prompts: Prompt[];
  category?: string;
  isDeleting: string | null;
  onDeletePrompt: (id: string) => Promise<void>;
  onPromptCreated: () => void;
}

const PromptTabContent: React.FC<PromptTabContentProps> = ({
  isLoading,
  prompts,
  category,
  isDeleting,
  onDeletePrompt,
  onPromptCreated
}) => {
  // Filter prompts by category if provided
  const filteredPrompts = category
    ? prompts.filter(p => p.category === category)
    : prompts;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading prompts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPrompts.length > 0 ? (
        filteredPrompts.map(prompt => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onDelete={onDeletePrompt}
            isDeleting={isDeleting === prompt.id}
          />
        ))
      ) : (
        <EmptyPromptState 
          category={category} 
          onPromptCreated={onPromptCreated} 
        />
      )}
    </div>
  );
};

export default PromptTabContent;
