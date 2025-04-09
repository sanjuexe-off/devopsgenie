
import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { sendAiMessage, getProjectAISettings, updateProjectAIProvider } from '@/api/aiService';

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
  const [aiProvider, setAiProvider] = useState<'openai' | 'anthropic'>('openai');
  const [aiModel, setAiModel] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectId) {
      fetchAISettings();
    }
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchAISettings = async () => {
    if (!projectId) return;
    
    try {
      const settings = await getProjectAISettings(projectId);
      if (settings.provider === 'anthropic' || settings.provider === 'openai') {
        setAiProvider(settings.provider);
      }
    } catch (error) {
      console.error('Error fetching AI settings:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isLoading || !projectId) return;

    const userMessage = {
      role: 'user' as const,
      content: promptInput
    };

    // Add the user message to the chat
    setMessages(prev => [...prev, userMessage]);
    setPromptInput('');
    setIsLoading(true);

    try {
      // Send the message to the AI service
      const response = await sendAiMessage({
        projectId,
        message: promptInput,
        provider: aiProvider,
        model: aiModel || undefined
      });
      
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

  const handleChangeProvider = async (value: 'openai' | 'anthropic') => {
    setAiProvider(value);
    
    if (projectId) {
      try {
        await updateProjectAIProvider(projectId, value);
        toast({
          title: "AI Provider Updated",
          description: `Now using ${value === 'openai' ? 'OpenAI' : 'Anthropic Claude'} for this project`,
        });
      } catch (error) {
        console.error('Error updating AI provider:', error);
        toast({
          title: "Error",
          description: "Failed to update AI provider",
          variant: "destructive",
        });
      }
    }
  };

  const getModelOptions = () => {
    if (aiProvider === 'openai') {
      return (
        <>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gpt-4o-mini" id="gpt-4o-mini" />
            <Label htmlFor="gpt-4o-mini">GPT-4o Mini (Fast)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gpt-4o" id="gpt-4o" />
            <Label htmlFor="gpt-4o">GPT-4o (Powerful)</Label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="claude-3-haiku-20240307" id="claude-haiku" />
            <Label htmlFor="claude-haiku">Claude 3 Haiku (Fast)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="claude-3-sonnet-20240229" id="claude-sonnet" />
            <Label htmlFor="claude-sonnet">Claude 3 Sonnet (Powerful)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="claude-3-opus-20240229" id="claude-opus" />
            <Label htmlFor="claude-opus">Claude 3 Opus (Most capable)</Label>
          </div>
        </>
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Project Chat</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              AI Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Choose AI Provider</h4>
              <RadioGroup 
                value={aiProvider}
                onValueChange={(value: 'openai' | 'anthropic') => handleChangeProvider(value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="openai" id="openai" />
                  <Label htmlFor="openai">OpenAI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anthropic" id="anthropic" />
                  <Label htmlFor="anthropic">Anthropic Claude</Label>
                </div>
              </RadioGroup>
              
              <h4 className="font-medium">Select Model</h4>
              <RadioGroup 
                value={aiModel}
                onValueChange={setAiModel}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="default" />
                  <Label htmlFor="default">Default</Label>
                </div>
                {getModelOptions()}
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
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
      </CardFooter>
    </Card>
  );
};

export default ProjectChat;
