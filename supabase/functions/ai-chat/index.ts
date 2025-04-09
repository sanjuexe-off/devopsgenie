
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, message } = await req.json();

    if (!projectId || !message) {
      return new Response(
        JSON.stringify({ error: 'Project ID and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For now, we'll generate a mock response
    // In a real implementation, you might call an AI service or process data
    const response = generateResponse(message, projectId);

    return new Response(
      JSON.stringify({ message, response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateResponse(message: string, projectId: string): string {
  // Simple keyword-based response generation
  // In a real implementation, you'd use a proper NLP service
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('architecture') || lowerMessage.includes('design')) {
    return `I've analyzed your project requirements and recommend a microservices architecture with containerized deployments. This would provide better scalability and isolation for your services. Would you like me to provide more specific details for project ${projectId}?`;
  }
  
  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
    return `Based on the current architecture, I estimate monthly costs between $400-$600 for project ${projectId}. This includes compute, storage, and networking costs. We could optimize further by implementing auto-scaling policies and reserved instances.`;
  }
  
  if (lowerMessage.includes('deploy') || lowerMessage.includes('release')) {
    return `For deployment strategy, I recommend a CI/CD pipeline using GitHub Actions or Jenkins, with automated testing and staged deployments. This would ensure reliable releases for project ${projectId}. Would you like me to elaborate on specific steps?`;
  }
  
  if (lowerMessage.includes('security') || lowerMessage.includes('secure')) {
    return `To enhance security for project ${projectId}, consider implementing network segmentation, least privilege access controls, and regular security scanning. I'd also recommend enabling encryption at rest and in transit for all sensitive data.`;
  }

  // Default response
  return `That's an interesting question about project ${projectId}. Based on best practices for DevOps, I would recommend focusing on automation, monitoring, and continuous feedback. Could you provide more specific details about what you're trying to achieve?`;
}
