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
  title: 'URL Encoder Decoder Online Free - Percent Encoding Tool',
  titleHi: 'URL एनकोडर डिकोडर ऑनलाइन फ्री',
  description: 'Free URL Encoder/Decoder - Encode and decode URLs with percent encoding instantly. Essential web developer tool. Handle special characters safely. No signup.',
  descriptionHi: 'फ्री URL एनकोडर/डिकोडर - URLs instantly encode और decode करें। Web developers के लिए essential tool।',
  keywords: [
    'URL encoder', 'URL decoder', 'URL encode online', 'percent encoding',
    'URL encoder free', 'URL एनकोडर', 'URL decode online', 'encodeURIComponent',
    'URL encoding tool', 'percent encode decode', 'URL safe characters',
    'query string encoder', 'URL parameter encoder',
  ],
  canonicalUrl: '/tools/url-encoder',
  toolName: 'URL Encoder/Decoder',
  category: 'Developer Tool',
  faqs: [
    { question: 'URL Encoding क्या है?', answer: 'URL Encoding (Percent Encoding) एक mechanism है जो special characters को %XX format में convert करता है ताकि वो safely URLs में use हो सकें। Example: space "%20" बन जाता है, & "%26" बन जाता है।' },
    { question: 'URL Encode क्यों करते हैं?', answer: 'URLs में कुछ characters reserved हैं (जैसे &, =, ?, #, space) जिनका special meaning होता है। Encoding इन्हें safe format में convert करता है ताकि data correctly transmit हो सके बिना URL structure break किए।' },
    { question: 'encodeURI और encodeURIComponent में क्या difference है?', answer: 'encodeURI पूरी URL encode करता है लेकिन :, /, ?, # जैसे URL-valid characters को preserve रखता है। encodeURIComponent सब कुछ encode करता है - query parameters encode करने के लिए यह better है।' },
    { question: 'क्या encoded URL decode करना possible है?', answer: 'हाँ, URL decoding reverse process है। %XX format के characters को वापस original characters में convert किया जाता है। यह tool दोनों operations - encode और decode - support करता है।' },
    { question: 'Common encoded characters कौन से हैं?', answer: 'Space = %20, & = %26, = = %3D, ? = %3F, # = %23, / = %2F, @ = %40, + = %2B। ये web development में सबसे commonly encountered encoded characters हैं।' },
  ],
  howToSteps: ['Input box में text, URL, या query string paste करें', 'Encode button से URL-safe format में convert करें', 'या Decode button से encoded URL को readable format में convert करें', 'Result copy करें और use करें'],
};

const contentData = {
  whatIs: { title: 'URL Encoder/Decoder क्या है? (What is URL Encoder)', content: 'URL Encoder/Decoder एक essential web development tool है जो text strings को URL-safe format (percent encoding) में convert करता है और vice versa। Web browsers और HTTP protocol में URLs में certain characters reserved हैं - जैसे space, &, =, ?, # - जिनका special meaning होता है। जब आपको इन characters को data के रूप में URL में pass करना हो, तो encoding ज़रूरी है। यह tool JavaScript के encodeURIComponent() और decodeURIComponent() functions use करता है जो RFC 3986 standard follow करते हैं। Web developers, API developers, SEO professionals, और digital marketers सभी के लिए यह daily-use tool है।' },
  whyUse: { title: 'URL Encoder/Decoder क्यों use करें?', points: [
    'URL-safe strings बनाएं - special characters safely handle करें',
    'API query parameters correctly encode करें',
    'Encoded URLs human-readable format में decode करें',
    'Instant results - real-time encoding/decoding',
    'Web development और API testing essential tool',
    'SEO-friendly URLs create करें',
    'Form data safely transmit करें',
    'RFC 3986 compliant encoding',
  ] },
  howToUse: { title: 'URL Encoder/Decoder कैसे use करें', steps: [
    'Input box में text, URL, या query string paste करें',
    'Encode button click करें URL-safe format में convert करने के लिए',
    'या Decode button click करें encoded text को readable format में बदलने के लिए',
    'Result automatically display होगा - Copy button से clipboard में copy करें',
  ] },
  useCases: { title: 'Use Cases', cases: [
    'API query parameters encode करें - safe data transmission',
    'Form data encoding - HTML forms se data submit करते समय',
    'Email links में special characters handle करें',
    'Social media sharing URLs - clean shareable links बनाएं',
    'Analytics tracking parameters encode करें',
    'Debugging encoded URLs - unreadable URLs decode करें',
    'Webhook और API integration में data safely pass करें',
  ] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Hash Generator', href: '/tools/hash-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Word Counter', href: '/tools/word-counter' },
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
