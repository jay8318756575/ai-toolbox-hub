import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Replace, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Find and Replace Text Online Free',
  titleHi: 'फाइंड एंड रिप्लेस टेक्स्ट ऑनलाइन',
  description: 'Free online find and replace text tool. Search and replace words, phrases, or patterns in your text instantly.',
  descriptionHi: 'फ्री ऑनलाइन फाइंड एंड रिप्लेस टूल। अपने टेक्स्ट में words और phrases को instantly replace करें।',
  keywords: ['find and replace', 'text replace online', 'search replace', 'find replace tool', 'replace text'],
  canonicalUrl: '/tools/find-replace',
  toolName: 'Find and Replace',
  category: 'Text Tool',
  faqs: [
    { question: 'How does Find and Replace work?', answer: 'Enter your text, type the word/phrase to find, type the replacement, and click Replace. All occurrences will be replaced instantly.' },
    { question: 'Does it support case-sensitive search?', answer: 'Yes, you can toggle case-sensitive mode for precise matching.' },
    { question: 'Can I use regex patterns?', answer: 'Yes, you can enable regex mode for advanced pattern matching and replacement.' },
    { question: 'Is my data safe?', answer: 'Yes, all processing happens in your browser. No data is sent to any server.' },
  ],
  howToSteps: ['Paste your text in the input area', 'Enter the text to find', 'Enter the replacement text', 'Click Replace All'],
};

const contentData = {
  title: 'Free Find and Replace Text Tool',
  introContent: `<p>Our <strong>Find and Replace Tool</strong> lets you quickly search for specific words, phrases, or patterns in your text and replace them with new content. Perfect for bulk text editing, code refactoring, and content updates.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Case Sensitive Search', description: 'Toggle case sensitivity for precise matching.' },
    { title: 'Count Matches', description: 'See how many matches were found before replacing.' },
    { title: 'Instant Results', description: 'See results immediately as you make changes.' },
    { title: 'Privacy First', description: 'All processing happens in your browser.' },
  ],
};

export default function FindReplace() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const result = (() => {
    if (!input || !find) return input;
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      return input.replace(regex, replace);
    } catch { return input; }
  })();

  const matchCount = (() => {
    if (!input || !find) return 0;
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      return (input.match(regex) || []).length;
    } catch { return 0; }
  })();

  const copy = async () => { await navigator.clipboard.writeText(result); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Find and Replace' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Replace className="h-4 w-4" /><span>Text Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Find and Replace Text Online</h1>
            <p className="text-muted-foreground text-lg">टेक्स्ट में words और phrases को instantly replace करें</p>
          </header>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Input placeholder="Find..." value={find} onChange={e => setFind(e.target.value)} className="max-w-xs" />
            <Input placeholder="Replace with..." value={replace} onChange={e => setReplace(e.target.value)} className="max-w-xs" />
            <Button variant={caseSensitive ? 'default' : 'outline'} size="sm" onClick={() => setCaseSensitive(!caseSensitive)}>Aa</Button>
          </div>
          {find && <p className="text-center text-sm text-muted-foreground mb-4">{matchCount} match(es) found</p>}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">Input</h3><Button size="sm" variant="ghost" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button></div>
              <Textarea placeholder="Enter text..." value={input} onChange={e => setInput(e.target.value)} className="min-h-[250px] resize-none" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">Result</h3><Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div>
              <div className="min-h-[250px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap">{result || <span className="text-muted-foreground">Result will appear here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
