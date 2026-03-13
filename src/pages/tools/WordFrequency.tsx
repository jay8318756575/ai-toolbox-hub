import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Word Frequency Counter Online Free',
  titleHi: 'वर्ड फ्रीक्वेंसी काउंटर',
  description: 'Free word frequency counter. Analyze text to find the most used words and their frequency counts.',
  descriptionHi: 'फ्री वर्ड फ्रीक्वेंसी काउंटर। Text में सबसे ज्यादा use होने वाले words find करें।',
  keywords: ['word frequency', 'word counter', 'word frequency counter', 'text analysis', 'word count'],
  canonicalUrl: '/tools/word-frequency',
  toolName: 'Word Frequency Counter',
  category: 'Text Tool',
  faqs: [
    { question: 'How does word frequency analysis work?', answer: 'The tool counts how many times each word appears in your text and ranks them by frequency.' },
    { question: 'Does it ignore common words?', answer: 'You can see all words including common ones (the, is, a, etc.) and filter as needed.' },
  ],
  howToSteps: ['Paste your text in the input area', 'See word frequencies automatically', 'View top words by count'],
};

const contentData = {
  title: 'Free Word Frequency Counter',
  introContent: `<p>Analyze your text to find <strong>word frequency</strong> — see which words appear most often. Useful for SEO, content analysis, writing, and research.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Instant Analysis', description: 'Frequencies calculated as you type.' },
    { title: 'Sorted Results', description: 'Words ranked by frequency.' },
    { title: 'Total Stats', description: 'See total words, unique words, and more.' },
    { title: 'Free', description: 'No signup or limits.' },
  ],
};

export default function WordFrequency() {
  const [input, setInput] = useState('');

  const frequencies = useMemo(() => {
    if (!input.trim()) return [];
    const words = input.toLowerCase().match(/\b[a-zA-Z\u0900-\u097F]+\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  }, [input]);

  const totalWords = frequencies.reduce((sum, [, c]) => sum + c, 0);
  const maxCount = frequencies.length > 0 ? frequencies[0][1] : 1;

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Word Frequency' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><BarChart3 className="h-4 w-4" /><span>Text Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Word Frequency Counter</h1>
            <p className="text-muted-foreground text-lg">Text में words की frequency analyze करें</p>
          </header>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Input Text</h3>
              <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your text here..." className="min-h-[350px] resize-none" />
              <p className="text-xs text-muted-foreground mt-2">{totalWords} total words, {frequencies.length} unique</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Word Frequencies</h3>
              <div className="max-h-[380px] overflow-auto space-y-1">
                {frequencies.slice(0, 100).map(([word, count], i) => (
                  <div key={word} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-6 text-right">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium">{word}</span>
                        <span className="text-xs text-muted-foreground">{count}x ({((count / totalWords) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                {frequencies.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">Word frequencies will appear here...</p>}
              </div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
