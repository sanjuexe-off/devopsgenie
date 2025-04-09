export interface GenerationRequest {
  prompt: string;
  projectId?: string;
}

export interface GenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    infrastructureCode?: string;
    architectureDiagram?: string;
    documentation?: string;
    costEstimate?: object;
  };
  error?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://api.devopsgenie.example';

// Helper function for API requests
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `API request failed with status ${response.status}`,
    }));
    
    throw new Error(error.message || 'Unknown error occurred');
  }

  return response.json();
};

// Start a deployment strategy generation
export const generateDeploymentStrategy = async (data: GenerationRequest): Promise<GenerationResponse> => {
  try {
    return await fetchWithAuth('/ai/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error generating deployment strategy:', error);
    throw error;
  }
};

// Get the status and result of a generation request
export const getGenerationStatus = async (generationId: string): Promise<GenerationResponse> => {
  try {
    return await fetchWithAuth(`/ai/status/${generationId}`);
  } catch (error) {
    console.error(`Error fetching generation status for ${generationId}:`, error);
    throw error;
  }
};

// Regenerate specific parts of a deployment strategy
export const regeneratePart = async (
  generationId: string,
  part: 'infrastructure' | 'diagram' | 'documentation' | 'cost'
): Promise<GenerationResponse> => {
  try {
    return await fetchWithAuth(`/ai/regenerate/${generationId}`, {
      method: 'POST',
      body: JSON.stringify({ part }),
    });
  } catch (error) {
    console.error(`Error regenerating ${part} for ${generationId}:`, error);
    throw error;
  }
};

import { supabase } from '@/integrations/supabase/client';

// Send a message to the AI about a specific project
export const sendAiMessage = async (projectId: string, message: string): Promise<{
  message: string;
  response: string;
}> => {
  try {
    // Use Supabase Edge Function instead of direct API call
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { projectId, message }
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error sending AI message for project ${projectId}:`, error);
    throw error;
  }
};
