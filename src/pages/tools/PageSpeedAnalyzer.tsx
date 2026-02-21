import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Gauge, Sparkles, Loader2, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { streamAIChat } from '@/hooks/useAIStream';

const seoData = {
  title: 'Page Speed Analyzer Free - Website Speed Test AI',
  titleHi: 'पेज स्पीड एनालाइज़र फ्री',
  description: 'Free AI Page Speed Analyzer - Get website performance analysis and optimization tips. Improve Core Web Vitals score.',
  descriptionHi: 'फ्री AI पेज स्पीड एनालाइज़र - website performance analysis और optimization tips पाएं।',
  keywords: ['page speed analyzer', 'website speed test', 'page speed test free', 'core web vitals', 'website performance'],
  canonicalUrl: '/tools/page-speed',
  toolName: 'Page Speed Analyzer',
  category: 'SEO Tool',
  faqs: [
    { question: 'Page Speed क्यों important है?', answer: 'Google page speed को ranking factor मानता है। Fast websites better user experience देती हैं और search results में higher rank करती हैं।' },
    { question: 'Core Web Vitals क्या हैं?', answer: 'Core Web Vitals Google के 3 metrics हैं: LCP (loading), FID (interactivity), CLS (visual stability) जो page experience measure करते हैं।' },
  ],
  howToSteps: ['Website URL enter करें', 'Analyze button click करें', 'AI recommendations review करें', 'Optimizations implement करें'],
};

const contentData = {
  whatIs: { title: 'Page Speed Analyzer क्या है?', content: 'Page Speed Analyzer एक AI-powered tool है जो आपकी website का performance analysis करता है और optimization suggestions देता है। यह Core Web Vitals, loading speed, और overall performance को analyze करके actionable tips provide करता है।' },
  whyUse: { title: 'क्यों use करें?', points: ['Google ranking improve करें', 'User experience better बनाएं', 'Core Web Vitals optimize करें', 'Bounce rate reduce करें', 'AI-powered insights'] },
  howToUse: { title: 'कैसे use करें', steps: ['URL box में website address enter करें', 'Analyze button click करें', 'AI generated report review करें', 'Suggested optimizations apply करें'] },
  useCases: { title: 'Use Cases', cases: ['Website optimization', 'SEO audit', 'Competitor analysis', 'Before/after redesign comparison'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'Keyword Research', href: '/tools/keyword-research' },
    { title: 'Backlink Checker', href: '/tools/backlink-checker' },
  ],
};

export default function PageSpeedAnalyzer() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({ title: 'URL required', description: 'Please enter a website URL', variant: 'destructive' });
      return;
    }
    setResult('');
    setIsLoading(true);

    const prompt = `You are a web performance expert. Analyze the website "${url}" and provide a comprehensive page speed analysis report:

1. **Performance Score Estimate** - Estimated score out of 100 based on common patterns for this type of website
2. **Core Web Vitals Analysis**:
   - LCP (Largest Contentful Paint) - tips to improve
   - FID/INP (Interaction to Next Paint) - tips to improve  
   - CLS (Cumulative Layout Shift) - tips to improve
3. **Speed Optimization Recommendations** (ranked by impact):
   - Image optimization
   - Code minification
   - Caching strategies
   - Server response time
   - Render-blocking resources
4. **Quick Wins** - 5 things to fix immediately
5. **Advanced Optimizations** - For even better performance

Provide actionable, specific recommendations. Include both English and Hindi explanations.`;

    await streamAIChat({
      messages: [{ role: 'user', content: prompt }],
      type: 'page-speed',
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
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Page Speed Analyzer' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
              <Sparkles className="h-4 w-4" /><span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Page Speed Analyzer Free</h1>
            <p className="text-muted-foreground text-lg">AI-powered website performance analysis और optimization tips</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="flex gap-3">
              <Input placeholder="Enter website URL (e.g., https://example.com)" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()} className="flex-1" />
              <Button onClick={handleAnalyze} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Gauge className="h-4 w-4 mr-2" /> Analyze</>}
              </Button>
            </div>
          </Card>

          {(result || isLoading) && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Speed Analysis Report</h3>
                {result && (
                  <Button size="sm" variant="ghost" onClick={copyResult}>
                    {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                  </Button>
                )}
              </div>
              <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg min-h-[200px] text-sm">
                {result || (isLoading && <span className="text-muted-foreground">AI is analyzing website performance...</span>)}
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
