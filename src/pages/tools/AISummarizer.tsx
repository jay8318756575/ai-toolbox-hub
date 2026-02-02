import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, FileText, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSummarizer } from '@/hooks/useAITools';

const seoData = {
  title: 'AI Text Summarizer Free - Summarize Articles Online',
  titleHi: 'AI टेक्स्ट समराइज़र फ्री',
  description: 'Free AI Summarizer - Summarize long articles, documents, and text instantly. Get key points in seconds. Hindi & English support.',
  descriptionHi: 'फ्री AI समराइज़र - लंबे articles और documents को instantly summarize करें।',
  keywords: [
    'text summarizer',
    'AI summarizer',
    'summarize article',
    'text summary tool',
    'article summarizer free',
    'टेक्स्ट समराइज़र',
  ],
  canonicalUrl: '/tools/ai-summarizer',
  toolName: 'AI Summarizer',
  category: 'AI Writing Tool',
  faqs: [
    {
      question: 'AI Summarizer कैसे काम करता है?',
      answer: 'AI आपके text को analyze करता है, key points identify करता है, और concise summary generate करता है।',
    },
  ],
  howToSteps: [
    'Long text paste करें',
    'Summarize button click करें',
    'AI generated summary receive करें',
    'Copy और use करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'AI Summarizer क्या है?',
    content: `AI Summarizer एक powerful tool है जो long text को short, concise summary में convert करता है। Articles, research papers, या किसी भी long content को quickly understand करने के लिए perfect है।`,
  },
  whyUse: {
    title: 'AI Summarizer क्यों use करें?',
    points: [
      'Time Saving - Long content को seconds में summarize करें',
      'Key Points - Important information extract करें',
      'Easy Understanding - Complex content को simple बनाएं',
      'Free & Fast - No charges, instant results',
    ],
  },
  howToUse: {
    title: 'Summarizer कैसे use करें',
    steps: [
      'Text box में long content paste करें।',
      'Summarize button पर click करें।',
      'AI generated summary को review करें।',
      'Copy button से summary copy करें।',
    ],
  },
  useCases: {
    title: 'Use Cases',
    cases: [
      'Research - Long papers summarize करें',
      'News - Articles quickly read करें',
      'Study - Notes prepare करें',
      'Work - Reports summarize करें',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
    { title: 'AI Paraphraser', href: '/tools/ai-paraphraser' },
  ],
};

export default function AISummarizer() {
  const { toast } = useToast();
  const { summary, isProcessing, error, summarize, clear } = useSummarizer();
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Text Required',
        description: 'Please enter text to summarize',
        variant: 'destructive',
      });
      return;
    }

    await summarize(inputText);
  };

  const copySummary = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast({ title: 'Copied! ✓', description: 'Summary copied' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'AI Summarizer' },
          ]} />

          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <FileText className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              AI Text Summarizer Free
            </h1>
            <p className="text-muted-foreground text-lg">
              Long text को instantly summarize करें
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Original Text</h3>
                <span className="text-xs text-muted-foreground">
                  {inputText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <Textarea
                placeholder="Paste your long text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleSummarize}
                  disabled={isProcessing}
                  className="btn-gradient flex-1"
                >
                  {isProcessing ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Summarizing...</>
                  ) : (
                    <><FileText className="h-4 w-4 mr-2" /> Summarize</>
                  )}
                </Button>
                <Button variant="outline" onClick={() => { setInputText(''); clear(); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Summary</h3>
                <Button size="sm" variant="ghost" onClick={copySummary} disabled={!summary}>
                  {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="min-h-[300px] bg-muted/30 rounded-lg p-4">
                {summary || (isProcessing && <span className="text-muted-foreground">Summarizing...</span>)}
                {isProcessing && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
                {!summary && !isProcessing && <span className="text-muted-foreground">Summary will appear here...</span>}
              </div>
            </Card>
          </div>

          {error && <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
