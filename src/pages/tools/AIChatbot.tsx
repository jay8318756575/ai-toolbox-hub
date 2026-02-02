import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Loader2, Trash2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { streamAIChat } from '@/hooks/useAIStream';

const seoData = {
  title: 'AI Chatbot Free - Smart Assistant Online',
  titleHi: 'AI चैटबॉट फ्री',
  description: 'Free AI Chatbot - Get instant answers, help with tasks, and have conversations. Hindi & English support. No signup required.',
  descriptionHi: 'फ्री AI चैटबॉट - Instant answers पाएं, tasks में help लें। Hindi और English support।',
  keywords: [
    'AI chatbot',
    'AI chatbot free',
    'online chatbot',
    'AI assistant',
    'chat with AI',
    'AI चैटबॉट',
    'free AI chat',
    'smart assistant',
  ],
  canonicalUrl: '/tools/ai-chatbot',
  toolName: 'AI Chatbot',
  category: 'AI Tool',
  faqs: [],
  howToSteps: [],
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'नमस्ते! 👋 मैं AI Tools Hub का assistant हूं। मैं आपकी कैसे help कर सकता हूं? आप मुझसे Hindi, English या Hinglish में बात कर सकते हैं।' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2]?.role === 'user') {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      await streamAIChat({
        messages: [...messages, userMessage],
        type: 'chatbot',
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast({ title: 'Error', description: err, variant: 'destructive' });
          setIsLoading(false);
        },
      });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Chat cleared! मैं आपकी कैसे help कर सकता हूं?' }
    ]);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'AI Chatbot' },
          ]} />

          {/* Header */}
          <header className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              AI Chatbot Free
            </h1>
            <p className="text-muted-foreground">
              Smart AI assistant से बात करें - Hindi & English में
            </p>
          </header>

          {/* Chat Container */}
          <Card className="h-[500px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-muted rounded-bl-md'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {isLoading && index === messages.length - 1 && message.role === 'assistant' && (
                      <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={clearChat}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {['Tools के बारे में पूछें', 'Tips और tricks जानें', 'किसी भी topic पर बात करें'].map((tip, i) => (
              <button
                key={i}
                onClick={() => setInput(tip)}
                className="p-3 text-sm text-left rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                💡 {tip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
