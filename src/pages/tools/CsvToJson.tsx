import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Table, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'CSV to JSON Converter Online Free',
  titleHi: 'CSV टू JSON कन्वर्टर ऑनलाइन',
  description: 'Free CSV to JSON converter. Convert CSV data to JSON format instantly online. Supports custom delimiters.',
  descriptionHi: 'फ्री CSV टू JSON कन्वर्टर। CSV data को JSON format में convert करें।',
  keywords: ['csv to json', 'csv converter', 'csv to json online', 'convert csv', 'data converter'],
  canonicalUrl: '/tools/csv-to-json',
  toolName: 'CSV to JSON Converter',
  category: 'Developer Tool',
  faqs: [
    { question: 'How does CSV to JSON conversion work?', answer: 'The first row is treated as headers. Each subsequent row becomes a JSON object with header names as keys.' },
    { question: 'What delimiters are supported?', answer: 'Comma, semicolon, tab, and pipe delimiters are supported.' },
    { question: 'Can I convert large CSV files?', answer: 'Yes, the tool handles large CSV data efficiently in your browser.' },
  ],
  howToSteps: ['Paste CSV data in the input area', 'Select the delimiter if not comma', 'See JSON output instantly', 'Copy the JSON result'],
};

const contentData = {
  title: 'Free CSV to JSON Converter',
  introContent: `<p>Convert <strong>CSV data to JSON</strong> format instantly. The tool auto-detects headers and creates properly structured JSON objects. Perfect for data migration, API testing, and development.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Auto Header Detection', description: 'First row automatically used as JSON keys.' },
    { title: 'Custom Delimiters', description: 'Supports comma, semicolon, tab, and pipe.' },
    { title: 'Pretty Output', description: 'JSON output is properly formatted and indented.' },
    { title: 'Instant Processing', description: 'No upload needed, works locally in browser.' },
  ],
};

export default function CsvToJson() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const output = (() => {
    if (!input.trim()) return '';
    try {
      const lines = input.trim().split('\n');
      if (lines.length < 2) return '[]';
      const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
      const data = lines.slice(1).map(line => {
        const values = line.split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => { obj[h] = values[i] || ''; });
        return obj;
      });
      return JSON.stringify(data, null, 2);
    } catch { return 'Error parsing CSV'; }
  })();

  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'CSV to JSON' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Table className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">CSV to JSON Converter</h1>
            <p className="text-muted-foreground text-lg">CSV data को JSON format में instantly convert करें</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            {[{ v: ',', l: 'Comma' }, { v: ';', l: 'Semicolon' }, { v: '\t', l: 'Tab' }, { v: '|', l: 'Pipe' }].map(({ v, l }) => (
              <Button key={l} variant={delimiter === v ? 'default' : 'outline'} size="sm" onClick={() => setDelimiter(v)} className={delimiter === v ? 'btn-gradient' : ''}>{l}</Button>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">CSV Input</h3><Button size="sm" variant="ghost" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button></div>
              <Textarea placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA" value={input} onChange={e => setInput(e.target.value)} className="min-h-[300px] resize-none font-mono text-sm" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">JSON Output</h3><Button size="sm" variant="ghost" onClick={copy} disabled={!output}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div>
              <div className="min-h-[300px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm overflow-auto">{output || <span className="text-muted-foreground">JSON output appears here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
