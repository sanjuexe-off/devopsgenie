
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

// Get all prompts for the authenticated user
export const getPrompts = async (): Promise<Prompt[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
      category: prompt.category,
      createdAt: prompt.created_at,
      updatedAt: prompt.updated_at,
      userId: prompt.user_id
    }));
  } catch (error) {
    console.error('Error fetching prompts:', error);
    throw error;
  }
};

// Create a new prompt
export const createPrompt = async (data: CreatePromptData): Promise<Prompt> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const { data: prompt, error } = await supabase
      .from('prompts')
      .insert({
        title: data.title,
        content: data.content,
        category: data.category,
        user_id: user.id
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
      category: prompt.category,
      createdAt: prompt.created_at,
      updatedAt: prompt.updated_at,
      userId: prompt.user_id
    };
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw error;
  }
};

// Update an existing prompt
export const updatePrompt = async (promptId: string, data: Partial<CreatePromptData>): Promise<Prompt> => {
  try {
    const { data: prompt, error } = await supabase
      .from('prompts')
      .update(data)
      .eq('id', promptId)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
      category: prompt.category,
      createdAt: prompt.created_at,
      updatedAt: prompt.updated_at,
      userId: prompt.user_id
    };
  } catch (error) {
    console.error(`Error updating prompt ${promptId}:`, error);
    throw error;
  }
};

// Delete a prompt
export const deletePrompt = async (promptId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId);
      
    if (error) throw error;
  } catch (error) {
    console.error(`Error deleting prompt ${promptId}:`, error);
    throw error;
  }
};
