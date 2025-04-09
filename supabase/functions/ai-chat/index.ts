
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

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
    const { projectId, message, provider, model } = await req.json();

    if (!projectId || !message) {
      return new Response(
        JSON.stringify({ error: 'Project ID and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let response;
    
    // Choose the AI provider based on the request
    if (provider === 'anthropic') {
      if (!ANTHROPIC_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'Anthropic API key not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      response = await callAnthropic(message, model || 'claude-3-haiku-20240307');
    } else {
      // Default to OpenAI
      if (!OPENAI_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'OpenAI API key not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      response = await callOpenAI(message, model || 'gpt-4o-mini');
    }

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

async function callOpenAI(message: string, model: string) {
  console.log(`Calling OpenAI with model: ${model}`);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a DevOps expert helping with cloud deployment strategies. Provide concise, practical advice about infrastructure, CI/CD, cost optimization, and architecture.'
        },
        { role: 'user', content: message }
      ],
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    console.error('OpenAI API Error:', data.error);
    throw new Error(data.error.message || 'Error calling OpenAI API');
  }
  
  return data.choices[0].message.content;
}

async function callAnthropic(message: string, model: string) {
  console.log(`Calling Anthropic with model: ${model}`);
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'anthropic-version': '2023-06-01',
      'x-api-key': ANTHROPIC_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      system: 'You are a DevOps expert helping with cloud deployment strategies. Provide concise, practical advice about infrastructure, CI/CD, cost optimization, and architecture.',
      messages: [
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    console.error('Anthropic API Error:', data.error);
    throw new Error(data.error.message || 'Error calling Anthropic API');
  }
  
  return data.content[0].text;
}
