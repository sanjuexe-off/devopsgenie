
import { supabase } from '@/integrations/supabase/client';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface CreatePromptData {
  title: string;
  content: string;
  category: string;
}

// Mock data for local development 
const mockPrompts: Prompt[] = [
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

// Get all prompts for the authenticated user
export const getPrompts = async (): Promise<Prompt[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // If there's no authenticated user, return the mock data
    if (!user) {
      return mockPrompts;
    }

    // For authenticated users, we'll implement this once the 'prompts' table exists
    // Currently returning mock data for both authenticated and unauthenticated users
    return mockPrompts.map(prompt => ({
      ...prompt,
      userId: user.id
    }));
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return mockPrompts; // Fallback to mock data on error
  }
};

// Create a new prompt
export const createPrompt = async (data: CreatePromptData): Promise<Prompt> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    // Generate a mock prompt until the 'prompts' table exists
    const newPrompt: Prompt = {
      id: Math.random().toString(36).substring(2, 15),
      title: data.title,
      content: data.content,
      category: data.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id
    };

    // Add to local mock data for this session
    mockPrompts.push(newPrompt);
    
    return newPrompt;
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw error;
  }
};

// Update an existing prompt
export const updatePrompt = async (promptId: string, data: Partial<CreatePromptData>): Promise<Prompt> => {
  try {
    // Find the prompt in mock data
    const promptIndex = mockPrompts.findIndex(p => p.id === promptId);
    
    if (promptIndex === -1) {
      throw new Error(`Prompt with ID ${promptId} not found`);
    }
    
    // Update the prompt
    mockPrompts[promptIndex] = {
      ...mockPrompts[promptIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockPrompts[promptIndex];
  } catch (error) {
    console.error(`Error updating prompt ${promptId}:`, error);
    throw error;
  }
};

// Delete a prompt
export const deletePrompt = async (promptId: string): Promise<void> => {
  try {
    const promptIndex = mockPrompts.findIndex(p => p.id === promptId);
    
    if (promptIndex === -1) {
      throw new Error(`Prompt with ID ${promptId} not found`);
    }
    
    // Remove from mock data
    mockPrompts.splice(promptIndex, 1);
  } catch (error) {
    console.error(`Error deleting prompt ${promptId}:`, error);
    throw error;
  }
};
