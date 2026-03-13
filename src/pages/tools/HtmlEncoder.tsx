import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'HTML Encoder Decoder Online Free',
  titleHi: 'HTML एनकोडर डिकोडर ऑनलाइन',
  description: 'Free HTML encoder/decoder. Convert special characters to HTML entities and vice versa.',
  descriptionHi: 'फ्री HTML एनकोडर/डिकोडर। Special characters को HTML entities में बदलें।',
  keywords: ['html encoder', 'html decoder', 'html entities', 'encode html', 'decode html'],
  canonicalUrl: '/tools/html-encoder',
  toolName: 'HTML Encoder/Decoder',
  category: 'Developer Tool',
  faqs: [
    { question: 'What are HTML entities?', answer: 'HTML entities are special codes used to display reserved characters in HTML, like &lt; for < and &amp; for &.' },
    { question: 'Why encode HTML?', answer: 'Encoding prevents XSS attacks and ensures special characters display correctly in web pages.' },
  ],
  howToSteps: ['Enter text with HTML characters', 'Select Encode or Decode', 'Copy the result'],
};

const contentData = {
  title: 'Free HTML Encoder/Decoder',
  introContent: `<p>Convert <strong>special characters to HTML entities</strong> and decode HTML entities back to text. Essential for web development and security.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Encode & Decode', description: 'Switch between encoding and decoding.' },
    { title: 'All Entities', description: 'Handles all standard HTML entities.' },
    { title: 'XSS Prevention', description: 'Helps prevent cross-site scripting attacks.' },
    { title: 'Instant', description: 'Real-time conversion as you type.' },
  ],
};

function htmlEncode(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function htmlDecode(str: string): string {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.body.textContent || '';
}

export default function HtmlEncoder() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const output = input ? (mode === 'encode' ? htmlEncode(input) : htmlDecode(input)) : '';
  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'HTML Encoder/Decoder' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Code className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">HTML Encoder/Decoder Online</h1>
            <p className="text-muted-foreground text-lg">HTML entities को encode और decode करें</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={mode === 'encode' ? 'default' : 'outline'} size="sm" onClick={() => setMode('encode')} className={mode === 'encode' ? 'btn-gradient' : ''}>Encode</Button>
            <Button variant={mode === 'decode' ? 'default' : 'outline'} size="sm" onClick={() => setMode('decode')} className={mode === 'decode' ? 'btn-gradient' : ''}>Decode</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4"><h3 className="font-semibold text-sm mb-3">Input</h3><Textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '<h1>Hello</h1>' : '&lt;h1&gt;Hello&lt;/h1&gt;'} className="min-h-[250px] resize-none font-mono text-sm" /></Card>
            <Card className="p-4"><div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">Output</h3><Button size="sm" variant="ghost" onClick={copy} disabled={!output}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div><div className="min-h-[250px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm break-all">{output || <span className="text-muted-foreground">Output appears here...</span>}</div></Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
