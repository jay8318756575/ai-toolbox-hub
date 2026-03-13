import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Minimize2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'JSON Minifier Online Free - Minify JSON',
  titleHi: 'JSON मिनीफायर ऑनलाइन',
  description: 'Free JSON minifier tool. Compress and minify JSON data by removing whitespace. Reduce JSON file size instantly.',
  descriptionHi: 'फ्री JSON मिनीफायर टूल। JSON data को compress और minify करें।',
  keywords: ['json minifier', 'minify json', 'compress json', 'json compressor', 'json minify online'],
  canonicalUrl: '/tools/json-minifier',
  toolName: 'JSON Minifier',
  category: 'Developer Tool',
  faqs: [
    { question: 'What does JSON minification do?', answer: 'It removes all unnecessary whitespace, newlines, and indentation from JSON data, making it as compact as possible.' },
    { question: 'Does minification change the data?', answer: 'No, the data remains exactly the same. Only formatting whitespace is removed.' },
    { question: 'How much size reduction can I expect?', answer: 'Typically 20-40% reduction in file size depending on how much formatting the original JSON has.' },
  ],
  howToSteps: ['Paste your JSON in the input area', 'See the minified output instantly', 'Copy the compressed JSON'],
};

const contentData = {
  title: 'Free JSON Minifier Tool',
  introContent: `<p><strong>Minify JSON</strong> data by removing all whitespace and formatting. Reduce file size for faster API responses, smaller payloads, and optimized data transfer.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Instant Minification', description: 'JSON is compressed as you paste it.' },
    { title: 'Size Comparison', description: 'See original vs minified size.' },
    { title: 'Validation', description: 'Invalid JSON is detected and reported.' },
    { title: 'Safe', description: 'Data never leaves your browser.' },
  ],
};

export default function JsonMinifier() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const output = (() => {
    if (!input.trim()) return '';
    try {
      setError('');
      return JSON.stringify(JSON.parse(input));
    } catch (e) {
      setError('Invalid JSON');
      return '';
    }
  })();

  const savedBytes = input.length - output.length;
  const savedPercent = input.length > 0 ? ((savedBytes / input.length) * 100).toFixed(1) : '0';
  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'JSON Minifier' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Minimize2 className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">JSON Minifier Online Free</h1>
            <p className="text-muted-foreground text-lg">JSON data को compress और minify करें</p>
          </header>
          {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
          {output && <p className="text-center text-sm text-muted-foreground mb-4">Saved {savedBytes} bytes ({savedPercent}% reduction)</p>}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">Input JSON</h3><Button size="sm" variant="ghost" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button></div>
              <Textarea placeholder='{"name": "John", "age": 30}' value={input} onChange={e => setInput(e.target.value)} className="min-h-[300px] resize-none font-mono text-sm" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">Minified Output</h3><Button size="sm" variant="ghost" onClick={copy} disabled={!output}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div>
              <div className="min-h-[300px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm break-all overflow-auto">{output || <span className="text-muted-foreground">Minified JSON appears here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
