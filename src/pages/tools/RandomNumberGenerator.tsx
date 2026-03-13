import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Dice5, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Random Number Generator Online Free',
  titleHi: 'रैंडम नंबर जनरेटर ऑनलाइन',
  description: 'Free random number generator. Generate random numbers within a range, multiple numbers, unique numbers instantly.',
  descriptionHi: 'फ्री रैंडम नंबर जनरेटर। किसी भी range में random numbers generate करें।',
  keywords: ['random number generator', 'random number', 'number generator', 'rng', 'random picker'],
  canonicalUrl: '/tools/random-number-generator',
  toolName: 'Random Number Generator',
  category: 'Random Tool',
  faqs: [
    { question: 'How does the random number generator work?', answer: 'It uses cryptographic randomness (crypto.getRandomValues) to generate truly random numbers within your specified range.' },
    { question: 'Can I generate multiple random numbers?', answer: 'Yes, specify how many random numbers you want to generate at once.' },
    { question: 'Are the numbers unique?', answer: 'You can toggle unique mode to ensure no duplicate numbers are generated.' },
    { question: 'What is the maximum range?', answer: 'You can generate numbers between any two integers, up to very large numbers.' },
  ],
  howToSteps: ['Set minimum and maximum values', 'Choose how many numbers to generate', 'Click Generate', 'Copy results'],
};

const contentData = {
  title: 'Free Random Number Generator',
  introContent: `<p>Generate <strong>random numbers</strong> instantly with our free online tool. Set min/max range, generate multiple numbers, and choose unique or repeating mode.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Custom Range', description: 'Set any minimum and maximum value.' },
    { title: 'Multiple Numbers', description: 'Generate up to 1000 random numbers at once.' },
    { title: 'Unique Mode', description: 'Ensure no duplicates in generated numbers.' },
    { title: 'Cryptographic RNG', description: 'Uses secure randomness for fair results.' },
  ],
};

export default function RandomNumberGenerator() {
  const { toast } = useToast();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    if (min >= max) { toast({ title: 'Min must be less than Max', variant: 'destructive' }); return; }
    if (unique && count > (max - min + 1)) { toast({ title: 'Cannot generate that many unique numbers in range', variant: 'destructive' }); return; }
    const nums: number[] = [];
    const used = new Set<number>();
    while (nums.length < count) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (unique && used.has(n)) continue;
      nums.push(n);
      used.add(n);
    }
    setResults(nums);
  };

  const copy = async () => { await navigator.clipboard.writeText(results.join(', ')); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Random Number Generator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Dice5 className="h-4 w-4" /><span>Random Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Random Number Generator</h1>
            <p className="text-muted-foreground text-lg">किसी भी range में random numbers generate करें</p>
          </header>
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div><label className="text-sm font-medium mb-1 block">Min</label><Input type="number" value={min} onChange={e => setMin(Number(e.target.value))} /></div>
              <div><label className="text-sm font-medium mb-1 block">Max</label><Input type="number" value={max} onChange={e => setMax(Number(e.target.value))} /></div>
              <div><label className="text-sm font-medium mb-1 block">Count</label><Input type="number" value={count} onChange={e => setCount(Number(e.target.value))} min={1} max={1000} /></div>
              <div className="flex items-end"><Button variant={unique ? 'default' : 'outline'} onClick={() => setUnique(!unique)} className="w-full">{unique ? 'Unique ✓' : 'Allow Duplicates'}</Button></div>
            </div>
            <div className="flex justify-center gap-3">
              <Button onClick={generate} className="btn-gradient"><RefreshCw className="h-4 w-4 mr-2" /> Generate</Button>
              <Button variant="outline" onClick={copy} disabled={results.length === 0}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
            </div>
          </Card>
          {results.length > 0 && (
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-3">Generated Numbers ({results.length})</h3>
              <div className="flex flex-wrap gap-2">{results.map((n, i) => <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono">{n}</span>)}</div>
            </Card>
          )}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
