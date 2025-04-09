
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sendAiMessage } from '@/api/aiService'; 

interface Message {
  role: 'user' | 'system';
  content: string;
}

interface ProjectChatProps {
  initialMessages: Message[];
  projectId?: string;
}

const ProjectChat: React.FC<ProjectChatProps> = ({ initialMessages, projectId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: promptInput
    };

    // Add the user message to the chat
    setMessages(prev => [...prev, userMessage]);
    setPromptInput('');
    setIsLoading(true);

    try {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      
      // Send the message to the AI service
      const response = await sendAiMessage(projectId, promptInput);
      
      // Add the AI response to the chat
      setMessages(prev => [
        ...prev, 
        {
          role: 'system',
          content: response.response
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add a fallback response if the API call fails
      setMessages(prev => [
        ...prev, 
        {
          role: 'system',
          content: "I'm sorry, I couldn't process your request at this time. Please try again later."
        }
      ]);
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Project Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-96 overflow-y-auto border border-devopsgenie-border rounded-lg p-4 mb-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                message.role === 'user' 
                  ? 'ml-auto bg-devopsgenie-primary text-white' 
                  : 'mr-auto bg-gray-100 text-devopsgenie-text'
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input 
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask about your deployment strategy..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-devopsgenie-primary hover:bg-opacity-90"
            disabled={isLoading}
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectChat;
