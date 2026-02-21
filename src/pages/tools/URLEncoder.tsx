import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, Link2, ArrowDownUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'URL Encoder Decoder Online Free',
  titleHi: 'URL एनकोडर डिकोडर फ्री',
  description: 'Free URL Encoder/Decoder - Encode and decode URLs instantly. Perfect for web developers. No signup required.',
  descriptionHi: 'फ्री URL एनकोडर/डिकोडर - URLs instantly encode और decode करें।',
  keywords: ['URL encoder', 'URL decoder', 'URL encode online', 'percent encoding', 'URL encoder free'],
  canonicalUrl: '/tools/url-encoder',
  toolName: 'URL Encoder/Decoder',
  category: 'Utility Tool',
  faqs: [
    { question: 'URL Encoding क्या है?', answer: 'URL Encoding special characters को percent-encoded format में convert करता है ताकि वो safely URL में use हो सकें।' },
    { question: 'URL Encode क्यों करते हैं?', answer: 'URLs में कुछ characters (जैसे spaces, &, =) special meaning रखते हैं। Encoding उन्हें safe format में बदलता है।' },
  ],
  howToSteps: ['Text enter करें', 'Encode या Decode button click करें', 'Result copy करें'],
};

const contentData = {
  whatIs: { title: 'URL Encoder/Decoder क्या है?', content: 'URL Encoder/Decoder एक web development tool है जो text strings को URL-safe format में convert करता है और vice versa। Web browsers URLs में special characters handle नहीं कर पाते, इसलिए encoding ज़रूरी है।' },
  whyUse: { title: 'क्यों use करें?', points: ['URL-safe strings बनाएं', 'Query parameters encode करें', 'Encoded URLs decode करें', 'Instant results', 'Web development essential tool'] },
  howToUse: { title: 'कैसे use करें', steps: ['Input box में text या URL paste करें', 'Encode button से encode करें या Decode button से decode करें', 'Result copy करें'] },
  useCases: { title: 'Use Cases', cases: ['API query parameters', 'Form data encoding', 'Email links', 'Social media sharing URLs'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Hash Generator', href: '/tools/hash-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
  ],
};

export default function URLEncoder() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    if (!input.trim()) { toast({ title: 'Input required', variant: 'destructive' }); return; }
    try {
      setOutput(encodeURIComponent(input));
      setMode('encode');
    } catch { toast({ title: 'Encoding failed', variant: 'destructive' }); }
  };

  const handleDecode = () => {
    if (!input.trim()) { toast({ title: 'Input required', variant: 'destructive' }); return; }
    try {
      setOutput(decodeURIComponent(input));
      setMode('decode');
    } catch { toast({ title: 'Invalid encoded string', variant: 'destructive' }); }
  };

  const swap = () => { setInput(output); setOutput(''); };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast({ title: 'Copied! ✓' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'URL Encoder/Decoder' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Link2 className="h-4 w-4" /><span>Utility Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">URL Encoder/Decoder Online Free</h1>
            <p className="text-muted-foreground text-lg">URLs instantly encode और decode करें</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input</label>
                <Textarea placeholder="Enter text or URL to encode/decode..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[100px]" />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleEncode} className="flex-1">Encode</Button>
                <Button onClick={handleDecode} variant="secondary" className="flex-1">Decode</Button>
                {output && <Button variant="outline" onClick={swap}><ArrowDownUp className="h-4 w-4" /></Button>}
              </div>
            </div>
          </Card>

          {output && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{mode === 'encode' ? 'Encoded' : 'Decoded'} Result</h3>
                <Button size="sm" variant="ghost" onClick={copyOutput}>
                  {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm break-all">{output}</div>
            </Card>
          )}

          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
