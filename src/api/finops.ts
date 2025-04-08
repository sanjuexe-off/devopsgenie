
export interface CostEstimate {
  projectId: string;
  totalMonthlyCost: number;
  currency: string;
  breakdown: {
    serviceName: string;
    cost: number;
    details: string;
  }[];
  recommendations: {
    title: string;
    description: string;
    potentialSavings: number;
  }[];
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

// Get cost estimates for a specific project
export const getProjectCostEstimate = async (projectId: string): Promise<CostEstimate> => {
  try {
    return await fetchWithAuth(`/finops/cost-estimate/${projectId}`);
  } catch (error) {
    console.error(`Error fetching cost estimate for project ${projectId}:`, error);
    throw error;
  }
};

// Get optimization recommendations for a project
export const getOptimizationRecommendations = async (projectId: string): Promise<CostEstimate['recommendations']> => {
  try {
    const response = await fetchWithAuth(`/finops/recommendations/${projectId}`);
    return response.recommendations;
  } catch (error) {
    console.error(`Error fetching recommendations for project ${projectId}:`, error);
    throw error;
  }
};

// Generate a new cost estimate for a project
export const generateCostEstimate = async (projectId: string): Promise<CostEstimate> => {
  try {
    return await fetchWithAuth(`/finops/generate-estimate/${projectId}`, {
      method: 'POST',
    });
  } catch (error) {
    console.error(`Error generating cost estimate for project ${projectId}:`, error);
    throw error;
  }
};
