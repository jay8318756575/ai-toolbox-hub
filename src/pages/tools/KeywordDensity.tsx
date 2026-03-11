import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';

const seoData = {
  title: 'Keyword Density Checker Online Free - Analyze SEO Keywords',
  titleHi: 'कीवर्ड डेंसिटी चेकर ऑनलाइन फ्री',
  description: 'Free Keyword Density Checker - Analyze keyword frequency and density in your content. Optimize SEO with ideal keyword distribution.',
  descriptionHi: 'फ्री कीवर्ड डेंसिटी चेकर - Content में keyword frequency और density analyze करें।',
  keywords: ['keyword density checker', 'keyword density tool', 'SEO keyword analyzer', 'keyword frequency checker', 'content SEO tool'],
  canonicalUrl: '/tools/keyword-density',
  toolName: 'Keyword Density Checker',
  category: 'SEO Tool',
  faqs: [
    { question: 'Keyword density कितनी होनी चाहिए?', answer: 'Ideal keyword density 1-3% मानी जाती है। 3% से ज़्यादा keyword stuffing माना जा सकता है।' },
    { question: 'Keyword density कैसे calculate होती है?', answer: 'Keyword Density = (Keyword Count / Total Words) × 100।' },
  ],
  howToSteps: ['Content paste करें', 'Analyze button click करें', 'Top keywords और density देखें'],
};

const contentData = {
  whatIs: { title: 'Keyword Density Checker क्या है?', content: 'Keyword Density Checker एक free SEO tool है जो आपके content में हर keyword की frequency और density percentage बताता है। यह tool SEO optimization के लिए बहुत important है क्योंकि ideal keyword density (1-3%) maintain करना Google ranking के लिए ज़रूरी है। Over-optimization (keyword stuffing) से बचने के लिए भी यह tool useful है।' },
  whyUse: { title: 'क्यों use करें?', points: ['SEO optimization', 'Keyword stuffing detect करें', 'Content quality improve करें', 'Top keywords identify करें', 'Competitor content analyze करें'] },
  howToUse: { title: 'कैसे use करें', steps: ['Text area में content paste करें', 'Analyze button click करें', 'Top keywords, frequency और density देखें'] },
  useCases: { title: 'Use Cases', cases: ['Blog post SEO optimization', 'Competitor content analysis', 'Content audit', 'On-page SEO check', 'Article quality check'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'Word Counter', href: '/tools/word-counter' },
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
  ],
};

export default function KeywordDensity() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{ word: string; count: number; density: string }[]>([]);

  const analyze = () => {
    if (!text.trim()) return;
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const totalWords = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'that', 'this', 'with', 'from', 'they', 'been', 'said', 'each', 'which', 'their', 'will', 'other', 'about', 'many', 'then', 'them', 'these', 'some', 'would', 'make', 'like', 'into', 'could', 'time', 'very', 'when', 'come', 'than', 'more']);
    const sorted = Object.entries(freq).filter(([w]) => !stopWords.has(w)).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([word, count]) => ({
      word, count, density: ((count / totalWords) * 100).toFixed(2) + '%',
    }));
    setResults(sorted);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Keyword Density' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Search className="h-4 w-4" /><span>SEO Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Keyword Density Checker Online Free</h1>
            <p className="text-muted-foreground text-lg">Content में keyword density analyze करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your content here..." className="min-h-[200px]" />
            <Button onClick={analyze} className="w-full">Analyze Keywords</Button>
            {results.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left py-2 px-3">#</th><th className="text-left py-2 px-3">Keyword</th><th className="text-right py-2 px-3">Count</th><th className="text-right py-2 px-3">Density</th></tr></thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.word} className="border-b border-border/50">
                        <td className="py-2 px-3 text-muted-foreground">{i + 1}</td>
                        <td className="py-2 px-3 font-medium">{r.word}</td>
                        <td className="py-2 px-3 text-right">{r.count}</td>
                        <td className="py-2 px-3 text-right text-primary font-medium">{r.density}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
