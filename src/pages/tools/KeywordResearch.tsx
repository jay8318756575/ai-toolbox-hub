import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Sparkles, Loader2, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { streamAIChat } from '@/hooks/useAIStream';

const seoData = {
  title: 'Keyword Research Tool Free - AI Keyword Generator',
  titleHi: 'कीवर्ड रिसर्च टूल फ्री',
  description: 'Free AI Keyword Research Tool - Find profitable keywords, search volume estimates, and SEO difficulty. Hindi & English support.',
  descriptionHi: 'फ्री AI कीवर्ड रिसर्च टूल - profitable keywords, search volume और difficulty find करें।',
  keywords: ['keyword research tool', 'keyword research free', 'AI keyword generator', 'SEO keyword tool', 'keyword finder'],
  canonicalUrl: '/tools/keyword-research',
  toolName: 'Keyword Research Tool',
  category: 'SEO Tool',
  faqs: [
    { question: 'Keyword Research क्या है?', answer: 'Keyword Research वो process है जिसमें हम ऐसे words और phrases find करते हैं जो लोग Google पर search करते हैं। इससे SEO strategy बनाने में मदद मिलती है।' },
    { question: 'AI Keyword Research कैसे काम करता है?', answer: 'AI आपके seed keyword को analyze करके related keywords, estimated search volume, और competition level suggest करता है।' },
  ],
  howToSteps: ['Seed keyword enter करें', 'Research button click करें', 'AI generated keywords review करें', 'Best keywords select करें'],
};

const contentData = {
  whatIs: { title: 'Keyword Research Tool क्या है?', content: 'Keyword Research Tool एक AI-powered SEO tool है जो आपके seed keyword से related profitable keywords find करता है। यह search volume estimates, competition level, और content ideas provide करता है जो आपकी SEO strategy को strong बनाते हैं।' },
  whyUse: { title: 'क्यों use करें?', points: ['Profitable keywords discover करें', 'Competition analysis', 'Long-tail keywords find करें', 'Content ideas generate करें', 'SEO strategy improve करें', 'Hindi + English keywords'] },
  howToUse: { title: 'कैसे use करें', steps: ['Seed keyword enter करें (जैसे "digital marketing")', 'Research button click करें', 'AI generated keyword list review करें', 'Apne content strategy में use करें'] },
  useCases: { title: 'Use Cases', cases: ['Blog content planning', 'PPC campaign keywords', 'YouTube SEO', 'E-commerce product keywords', 'Local SEO keywords'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
    { title: 'Page Speed Analyzer', href: '/tools/page-speed' },
  ],
};

export default function KeywordResearch() {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleResearch = async () => {
    if (!keyword.trim()) {
      toast({ title: 'Keyword required', description: 'Please enter a seed keyword', variant: 'destructive' });
      return;
    }
    setResult('');
    setIsLoading(true);

    const prompt = `You are an SEO keyword research expert. For the seed keyword "${keyword}", provide a comprehensive keyword research report in a well-formatted table/list format:

1. **Primary Keywords** (5-8) - Main keywords with estimated monthly search volume and competition level (Low/Medium/High)
2. **Long-tail Keywords** (8-10) - Longer, more specific phrases with lower competition
3. **Question Keywords** (5-7) - Questions people ask related to this topic
4. **LSI Keywords** (5-7) - Semantically related terms
5. **Content Ideas** (3-5) - Blog post titles targeting these keywords

Format each keyword with estimated search volume and difficulty. Include both English and Hindi variants if applicable.`;

    await streamAIChat({
      messages: [{ role: 'user', content: prompt }],
      type: 'keyword-research',
      onDelta: (delta) => setResult(prev => prev + delta),
      onDone: () => setIsLoading(false),
      onError: (err) => { toast({ title: 'Error', description: err, variant: 'destructive' }); setIsLoading(false); },
    });
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast({ title: 'Copied! ✓' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Keyword Research' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
              <Sparkles className="h-4 w-4" /><span>AI-Powered SEO</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">AI Keyword Research Tool Free</h1>
            <p className="text-muted-foreground text-lg">Profitable keywords AI से instantly discover करें</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="flex gap-3">
              <Input placeholder="Enter seed keyword (e.g., digital marketing, blogging tips)" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleResearch()} className="flex-1" />
              <Button onClick={handleResearch} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4 mr-2" /> Research</>}
              </Button>
            </div>
          </Card>

          {(result || isLoading) && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Keyword Research Results</h3>
                {result && (
                  <Button size="sm" variant="ghost" onClick={copyResult}>
                    {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                  </Button>
                )}
              </div>
              <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg min-h-[200px] text-sm">
                {result || (isLoading && <span className="text-muted-foreground">AI is researching keywords...</span>)}
                {isLoading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
              </div>
            </Card>
          )}

          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
