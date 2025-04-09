
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    const newMessage = {
      role: 'user' as const,
      content: promptInput
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          role: 'system',
          content: `I've processed your request: "${promptInput}". What specific aspect of your deployment strategy would you like to explore further?`
        }
      ]);
    }, 1000);
    
    setPromptInput('');
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
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input 
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask about your deployment strategy..."
            className="flex-1"
          />
          <Button type="submit" className="bg-devopsgenie-primary hover:bg-opacity-90">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectChat;
