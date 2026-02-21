import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Sparkles, Loader2, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { streamAIChat } from '@/hooks/useAIStream';

const seoData = {
  title: 'Backlink Checker Free - AI SEO Backlink Analysis',
  titleHi: 'बैकलिंक चेकर फ्री',
  description: 'Free AI Backlink Checker - Analyze backlink profile, find link building opportunities, and improve domain authority.',
  descriptionHi: 'फ्री AI बैकलिंक चेकर - backlink profile analyze करें और domain authority improve करें।',
  keywords: ['backlink checker', 'backlink checker free', 'SEO backlink analysis', 'link building tool', 'domain authority checker'],
  canonicalUrl: '/tools/backlink-checker',
  toolName: 'Backlink Checker',
  category: 'SEO Tool',
  faqs: [
    { question: 'Backlinks क्या हैं?', answer: 'Backlinks दूसरी websites से आपकी website की ओर आने वाले links हैं। Google इन्हें "votes of confidence" मानता है जो ranking improve करते हैं।' },
    { question: 'Quality backlinks कैसे बनाएं?', answer: 'Guest posting, broken link building, resource pages, और high-quality content create करके natural backlinks attract करें।' },
  ],
  howToSteps: ['Website URL enter करें', 'Analyze button click करें', 'Backlink strategy review करें', 'Link building start करें'],
};

const contentData = {
  whatIs: { title: 'Backlink Checker क्या है?', content: 'Backlink Checker एक AI-powered SEO tool है जो आपकी website के backlink profile को analyze करता है। यह link building opportunities identify करता है, competitor analysis provide करता है, और domain authority improve करने के लिए actionable strategies suggest करता है।' },
  whyUse: { title: 'क्यों use करें?', points: ['Backlink profile analyze करें', 'Link building opportunities find करें', 'Competitor backlinks study करें', 'Domain authority improve करें', 'Toxic links identify करें', 'AI-powered suggestions'] },
  howToUse: { title: 'कैसे use करें', steps: ['URL box में website address enter करें', 'Analyze button click करें', 'AI generated backlink report review करें', 'Suggested strategies implement करें'] },
  useCases: { title: 'Use Cases', cases: ['SEO audit', 'Competitor analysis', 'Link building campaign', 'Domain authority improvement', 'Penalty recovery'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Keyword Research', href: '/tools/keyword-research' },
    { title: 'Page Speed Analyzer', href: '/tools/page-speed' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
  ],
};

export default function BacklinkChecker() {
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

    const prompt = `You are an SEO expert specializing in link building and backlink analysis. For the website "${url}", provide a comprehensive backlink analysis and strategy report:

1. **Domain Authority Estimate** - Based on the type of website and niche
2. **Backlink Profile Analysis**:
   - Types of backlinks typically found for this niche
   - Quality indicators to look for
   - Common anchor text distribution
3. **Link Building Opportunities** (10+ specific strategies):
   - Guest posting targets
   - Resource page opportunities
   - Broken link building
   - Directory submissions
   - Social bookmarking
4. **Competitor Analysis Tips** - How to find and replicate competitor backlinks
5. **Actionable Link Building Plan** - Step-by-step 30-day plan
6. **Toxic Link Warning Signs** - What to avoid

Include Hindi explanations where helpful. Be specific and actionable.`;

    await streamAIChat({
      messages: [{ role: 'user', content: prompt }],
      type: 'backlink-checker',
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
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Backlink Checker' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
              <Sparkles className="h-4 w-4" /><span>AI-Powered SEO</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Backlink Checker Free</h1>
            <p className="text-muted-foreground text-lg">AI-powered backlink analysis और link building strategy</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="flex gap-3">
              <Input placeholder="Enter website URL (e.g., https://example.com)" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()} className="flex-1" />
              <Button onClick={handleAnalyze} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Globe className="h-4 w-4 mr-2" /> Analyze</>}
              </Button>
            </div>
          </Card>

          {(result || isLoading) && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Backlink Analysis Report</h3>
                {result && (
                  <Button size="sm" variant="ghost" onClick={copyResult}>
                    {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                  </Button>
                )}
              </div>
              <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg min-h-[200px] text-sm">
                {result || (isLoading && <span className="text-muted-foreground">AI is analyzing backlink opportunities...</span>)}
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
