
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Failed';
  createdAt: string;
  updatedAt: string;
  ai_provider?: string;
}

interface CreateProjectData {
  name: string;
  description: string;
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

// Get all projects for the authenticated user
export const getProjects = async (): Promise<Project[]> => {
  try {
    return await fetchWithAuth('/projects');
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get a single project by ID
export const getProject = async (projectId: string): Promise<Project> => {
  try {
    return await fetchWithAuth(`/projects/${projectId}`);
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

// Create a new project
export const createProject = async (data: CreateProjectData): Promise<Project> => {
  try {
    return await fetchWithAuth('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectId: string, data: Partial<CreateProjectData>): Promise<Project> => {
  try {
    return await fetchWithAuth(`/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await fetchWithAuth(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};
