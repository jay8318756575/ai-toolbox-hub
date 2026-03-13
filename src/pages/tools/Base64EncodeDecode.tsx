import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Base64 Encode Decode Online Free Tool',
  titleHi: 'Base64 एनकोड डिकोड ऑनलाइन',
  description: 'Free Base64 encoder and decoder. Convert text to Base64 and Base64 to text online instantly.',
  descriptionHi: 'फ्री Base64 एनकोडर और डिकोडर। टेक्स्ट को Base64 में बदलें।',
  keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'base64 online', 'encode decode'],
  canonicalUrl: '/tools/base64-encode-decode',
  toolName: 'Base64 Encode/Decode',
  category: 'Developer Tool',
  faqs: [
    { question: 'What is Base64 encoding?', answer: 'Base64 is a binary-to-text encoding scheme that converts binary data into ASCII characters. It is commonly used in email, data URLs, and API authentication.' },
    { question: 'How do I encode text to Base64?', answer: 'Paste your text in the input field and select "Encode" mode. The Base64 encoded output will appear instantly.' },
    { question: 'Is Base64 encryption?', answer: 'No, Base64 is encoding, not encryption. It does not provide security — anyone can decode it. Use it for data transport, not security.' },
    { question: 'What are common uses of Base64?', answer: 'Data URLs in HTML/CSS, email attachments (MIME), JSON Web Tokens (JWT), embedding images in code, and API authentication headers.' },
  ],
  howToSteps: ['Enter text in the input area', 'Select Encode or Decode mode', 'See the result instantly', 'Copy the result'],
};

const contentData = {
  title: 'Free Base64 Encode/Decode Tool',
  introContent: `<p><strong>Base64 Encode/Decode</strong> tool lets you convert text to Base64 and vice versa instantly. Essential for web developers, API testing, and data encoding tasks.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Encode & Decode', description: 'Switch between encoding and decoding with one click.' },
    { title: 'UTF-8 Support', description: 'Full Unicode and UTF-8 text support.' },
    { title: 'Instant Conversion', description: 'Real-time encoding/decoding as you type.' },
    { title: 'Developer Friendly', description: 'Perfect for JWT debugging, data URLs, and API testing.' },
  ],
};

export default function Base64EncodeDecode() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const output = (() => {
    if (!input) return '';
    setError('');
    try {
      if (mode === 'encode') return btoa(unescape(encodeURIComponent(input)));
      else return decodeURIComponent(escape(atob(input)));
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 input' : 'Encoding error');
      return '';
    }
  })();

  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Base64 Encode/Decode' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Lock className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Base64 Encode/Decode Online</h1>
            <p className="text-muted-foreground text-lg">Base64 encoding और decoding — Free & Instant</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={mode === 'encode' ? 'default' : 'outline'} size="sm" onClick={() => { setMode('encode'); setInput(''); }} className={mode === 'encode' ? 'btn-gradient' : ''}>Encode</Button>
            <Button variant={mode === 'decode' ? 'default' : 'outline'} size="sm" onClick={() => { setMode('decode'); setInput(''); }} className={mode === 'decode' ? 'btn-gradient' : ''}>Decode</Button>
          </div>
          {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">{mode === 'encode' ? 'Text Input' : 'Base64 Input'}</h3>
              <Textarea placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} value={input} onChange={e => setInput(e.target.value)} className="min-h-[250px] resize-none font-mono" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</h3><Button size="sm" variant="ghost" onClick={copy} disabled={!output}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div>
              <div className="min-h-[250px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono break-all">{output || <span className="text-muted-foreground">Output appears here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
