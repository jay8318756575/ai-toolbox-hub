import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { GitCompare } from 'lucide-react';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Text Diff Checker Online Free - Compare Text',
  titleHi: 'टेक्स्ट डिफ चेकर ऑनलाइन',
  description: 'Free online text diff checker. Compare two texts side by side and highlight differences instantly.',
  descriptionHi: 'फ्री ऑनलाइन टेक्स्ट डिफ चेकर। दो texts को compare करें और differences highlight करें।',
  keywords: ['diff checker', 'text compare', 'compare text online', 'text diff', 'find differences'],
  canonicalUrl: '/tools/diff-checker',
  toolName: 'Diff Checker',
  category: 'Developer Tool',
  faqs: [
    { question: 'How does the diff checker work?', answer: 'It compares two texts line by line and highlights added, removed, and changed lines with different colors.' },
    { question: 'Can I compare code?', answer: 'Yes, it works great for comparing code, configurations, and any text content.' },
    { question: 'Is there a size limit?', answer: 'It works best with texts under 10,000 lines. All processing happens in your browser.' },
  ],
  howToSteps: ['Paste original text on the left', 'Paste modified text on the right', 'Differences are highlighted automatically'],
};

const contentData = {
  title: 'Free Text Diff Checker',
  introContent: `<p>Compare <strong>two texts</strong> side by side and see differences highlighted. Perfect for code reviews, document comparison, and finding changes between versions.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Line-by-Line Comparison', description: 'Highlights differences at the line level.' },
    { title: 'Color Coded', description: 'Green for additions, red for deletions.' },
    { title: 'Instant', description: 'Differences shown in real-time.' },
    { title: 'Private', description: 'No data sent to any server.' },
  ],
};

export default function DiffChecker() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const leftLines = left.split('\n');
  const rightLines = right.split('\n');
  const maxLines = Math.max(leftLines.length, rightLines.length);

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Diff Checker' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><GitCompare className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Text Diff Checker Online</h1>
            <p className="text-muted-foreground text-lg">दो texts को compare करें — Differences instantly highlight होंगी</p>
          </header>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Original Text</h3>
              <Textarea placeholder="Paste original text here..." value={left} onChange={e => setLeft(e.target.value)} className="min-h-[300px] resize-none font-mono text-sm" />
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Modified Text</h3>
              <Textarea placeholder="Paste modified text here..." value={right} onChange={e => setRight(e.target.value)} className="min-h-[300px] resize-none font-mono text-sm" />
            </Card>
          </div>
          {(left || right) && (
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-sm mb-3">Differences</h3>
              <div className="font-mono text-sm space-y-0.5 max-h-[400px] overflow-auto">
                {Array.from({ length: maxLines }).map((_, i) => {
                  const l = leftLines[i] ?? '';
                  const r = rightLines[i] ?? '';
                  if (l === r) return <div key={i} className="px-3 py-0.5 text-muted-foreground"><span className="text-xs mr-3">{i + 1}</span>{l}</div>;
                  return (
                    <div key={i}>
                      {l && <div className="px-3 py-0.5 bg-destructive/10 text-destructive"><span className="text-xs mr-3">{i + 1}</span>- {l}</div>}
                      {r && <div className="px-3 py-0.5 bg-green-500/10 text-green-700"><span className="text-xs mr-3">{i + 1}</span>+ {r}</div>}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
