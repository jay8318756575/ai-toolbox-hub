import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, ArrowUpDown, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Sort List Online Free - List Sorter Tool',
  titleHi: 'लिस्ट सॉर्टर ऑनलाइन फ्री',
  description: 'Free online list sorter. Sort text lines alphabetically, reverse, remove duplicates, shuffle randomly.',
  descriptionHi: 'फ्री ऑनलाइन लिस्ट सॉर्टर। Text lines को alphabetically sort करें।',
  keywords: ['sort list online', 'list sorter', 'alphabetical sort', 'sort text lines', 'remove duplicates'],
  canonicalUrl: '/tools/list-sorter',
  toolName: 'List Sorter',
  category: 'List Tool',
  faqs: [
    { question: 'How does the list sorter work?', answer: 'Enter each item on a new line, choose sort order, and click Sort. Items are sorted alphabetically or numerically.' },
    { question: 'Can I remove duplicates?', answer: 'Yes, enable the "Remove Duplicates" option to keep only unique items.' },
    { question: 'Does it sort numbers correctly?', answer: 'Yes, use "Numeric" mode for proper number sorting (so 10 comes after 9, not after 1).' },
  ],
  howToSteps: ['Enter list items (one per line)', 'Choose sort order', 'Click Sort', 'Copy the sorted list'],
};

const contentData = {
  title: 'Free Online List Sorter',
  introContent: `<p>Sort your <strong>list items</strong> alphabetically, numerically, or randomly. Remove duplicates, reverse order, and more — all free and instant.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Multiple Sort Modes', description: 'Alphabetical, numeric, reverse, and random shuffle.' },
    { title: 'Remove Duplicates', description: 'One click to remove duplicate items.' },
    { title: 'Case Options', description: 'Case-sensitive or case-insensitive sorting.' },
    { title: 'Instant Results', description: 'Sort happens immediately in your browser.' },
  ],
};

export default function ListSorter() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'az' | 'za' | 'numeric' | 'shuffle'>('az');
  const [removeDups, setRemoveDups] = useState(false);

  const sort = () => {
    let lines = input.split('\n').filter(l => l.trim());
    if (removeDups) lines = [...new Set(lines)];
    switch (mode) {
      case 'az': lines.sort((a, b) => a.localeCompare(b)); break;
      case 'za': lines.sort((a, b) => b.localeCompare(a)); break;
      case 'numeric': lines.sort((a, b) => parseFloat(a) - parseFloat(b)); break;
      case 'shuffle': lines.sort(() => Math.random() - 0.5); break;
    }
    setInput(lines.join('\n'));
  };

  const copy = async () => { await navigator.clipboard.writeText(input); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'List Sorter' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><ArrowUpDown className="h-4 w-4" /><span>List Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Sort List Online Free</h1>
            <p className="text-muted-foreground text-lg">List items को alphabetically, numerically या randomly sort करें</p>
          </header>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[{ k: 'az' as const, l: 'A → Z' }, { k: 'za' as const, l: 'Z → A' }, { k: 'numeric' as const, l: 'Numeric' }, { k: 'shuffle' as const, l: 'Shuffle' }].map(({ k, l }) => (
              <Button key={k} variant={mode === k ? 'default' : 'outline'} size="sm" onClick={() => setMode(k)} className={mode === k ? 'btn-gradient' : ''}>{l}</Button>
            ))}
            <Button variant={removeDups ? 'default' : 'outline'} size="sm" onClick={() => setRemoveDups(!removeDups)}>{removeDups ? 'Unique ✓' : 'Remove Duplicates'}</Button>
          </div>
          <div className="flex justify-center gap-3 mb-6">
            <Button onClick={sort} className="btn-gradient"><ArrowUpDown className="h-4 w-4 mr-2" /> Sort</Button>
            <Button variant="outline" onClick={copy}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
            <Button variant="outline" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Card className="p-4">
            <Textarea placeholder="Enter list items (one per line)..." value={input} onChange={e => setInput(e.target.value)} className="min-h-[350px] resize-none" />
            <p className="text-xs text-muted-foreground mt-2">{input.split('\n').filter(l => l.trim()).length} items</p>
          </Card>
          <div className="mt-8"><ToolContentSection {...contentData} /></div>
        </div>
      </div>
    </Layout>
  );
}
