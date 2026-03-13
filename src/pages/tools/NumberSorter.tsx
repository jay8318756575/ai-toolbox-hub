import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Sort Numbers Online Free - Number Sorter Tool',
  titleHi: 'नंबर सॉर्टर ऑनलाइन फ्री',
  description: 'Free number sorter. Sort numbers in ascending or descending order, remove duplicates, find sum and average.',
  descriptionHi: 'फ्री नंबर सॉर्टर। Numbers को ascending या descending order में sort करें।',
  keywords: ['sort numbers', 'number sorter', 'sort numbers online', 'ascending order', 'descending order'],
  canonicalUrl: '/tools/number-sorter',
  toolName: 'Number Sorter',
  category: 'Number Tool',
  faqs: [
    { question: 'How do I sort numbers?', answer: 'Enter numbers separated by commas, spaces, or newlines. Choose ascending or descending order and click Sort.' },
    { question: 'Can it handle decimals?', answer: 'Yes, both integers and decimal numbers are supported.' },
  ],
  howToSteps: ['Enter numbers (comma, space, or newline separated)', 'Choose ascending or descending', 'Click Sort', 'Copy sorted numbers'],
};

const contentData = {
  title: 'Free Number Sorter',
  introContent: `<p>Sort <strong>numbers</strong> in ascending or descending order instantly. Get sum, average, min, max, and remove duplicates.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Flexible Input', description: 'Enter numbers with commas, spaces, or newlines.' },
    { title: 'Statistics', description: 'See sum, average, min, max automatically.' },
    { title: 'Remove Duplicates', description: 'Optional duplicate removal.' },
    { title: 'Decimals', description: 'Supports integers and decimals.' },
  ],
};

export default function NumberSorter() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const numbers = input.split(/[\s,;\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  const sorted = [...numbers].sort((a, b) => order === 'asc' ? a - b : b - a);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = numbers.length > 0 ? sum / numbers.length : 0;

  const copy = async () => { await navigator.clipboard.writeText(sorted.join(', ')); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Number Sorter' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><ArrowUpDown className="h-4 w-4" /><span>Number Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Sort Numbers Online Free</h1>
            <p className="text-muted-foreground text-lg">Numbers को ascending/descending order में sort करें</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={order === 'asc' ? 'default' : 'outline'} size="sm" onClick={() => setOrder('asc')} className={order === 'asc' ? 'btn-gradient' : ''}>Ascending ↑</Button>
            <Button variant={order === 'desc' ? 'default' : 'outline'} size="sm" onClick={() => setOrder('desc')} className={order === 'desc' ? 'btn-gradient' : ''}>Descending ↓</Button>
            <Button variant="outline" size="sm" onClick={copy} disabled={sorted.length === 0}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Input Numbers</h3>
              <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter numbers (comma, space, or newline separated)..." className="min-h-[250px] resize-none font-mono" />
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Sorted ({sorted.length} numbers)</h3>
              <div className="min-h-[200px] bg-muted/30 rounded-lg p-4 font-mono text-sm">{sorted.length > 0 ? sorted.join(', ') : <span className="text-muted-foreground">Sorted numbers appear here...</span>}</div>
              {numbers.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-muted/50 rounded p-2 text-center"><p className="text-xs text-muted-foreground">Sum</p><p className="font-mono text-sm font-medium">{sum.toLocaleString()}</p></div>
                  <div className="bg-muted/50 rounded p-2 text-center"><p className="text-xs text-muted-foreground">Average</p><p className="font-mono text-sm font-medium">{avg.toFixed(2)}</p></div>
                  <div className="bg-muted/50 rounded p-2 text-center"><p className="text-xs text-muted-foreground">Min</p><p className="font-mono text-sm font-medium">{Math.min(...numbers)}</p></div>
                  <div className="bg-muted/50 rounded p-2 text-center"><p className="text-xs text-muted-foreground">Max</p><p className="font-mono text-sm font-medium">{Math.max(...numbers)}</p></div>
                </div>
              )}
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
