import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, CheckSquare, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGrammarChecker } from '@/hooks/useAITools';

const seoData = {
  title: 'AI Grammar Checker Free - Fix Grammar Online',
  titleHi: 'AI ग्रामर चेकर फ्री',
  description: 'Free AI Grammar Checker - Fix grammar, spelling, and punctuation errors instantly. Hindi & English support.',
  descriptionHi: 'फ्री AI ग्रामर चेकर - Grammar और spelling errors को instantly fix करें।',
  keywords: ['grammar checker', 'grammar checker free', 'spell check', 'AI grammar', 'ग्रामर चेकर'],
  canonicalUrl: '/tools/grammar-checker',
  toolName: 'Grammar Checker',
  category: 'AI Writing Tool',
  faqs: [],
  howToSteps: [],
};

export default function GrammarChecker() {
  const { toast } = useToast();
  const { correctedText, isProcessing, error, check, clear } = useGrammarChecker();
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!inputText.trim()) {
      toast({ title: 'Text Required', description: 'Please enter text to check', variant: 'destructive' });
      return;
    }
    await check(inputText);
  };

  const copyResult = async () => {
    if (!correctedText) return;
    try {
      await navigator.clipboard.writeText(correctedText);
      setCopied(true);
      toast({ title: 'Copied! ✓' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Grammar Checker' }]} />

          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <CheckSquare className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">AI Grammar Checker Free</h1>
            <p className="text-muted-foreground text-lg">Grammar और spelling errors को instantly fix करें</p>
          </header>

          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={handleCheck} disabled={isProcessing} className="btn-gradient">
              {isProcessing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Checking...</> : <><CheckSquare className="h-4 w-4 mr-2" /> Check Grammar</>}
            </Button>
            <Button variant="outline" onClick={() => { setInputText(''); clear(); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center">{error}</div>}

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Original Text</h3>
                <span className="text-xs text-muted-foreground">{inputText.split(/\s+/).filter(Boolean).length} words</span>
              </div>
              <Textarea
                placeholder="Enter text to check for grammar errors..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Corrected Text</h3>
                <Button size="sm" variant="ghost" onClick={copyResult} disabled={!correctedText}>
                  {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="min-h-[300px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap">
                {correctedText || (isProcessing && <span className="text-muted-foreground">Checking...</span>)}
                {isProcessing && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
                {!correctedText && !isProcessing && <span className="text-muted-foreground">Corrected text will appear here...</span>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
