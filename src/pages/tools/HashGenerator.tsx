import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Hash Generator Online Free - SHA256, SHA512, MD5',
  titleHi: 'हैश जनरेटर ऑनलाइन फ्री',
  description: 'Free online Hash Generator - Generate SHA-1, SHA-256, SHA-512 hashes instantly. Secure, fast, no signup required.',
  descriptionHi: 'फ्री ऑनलाइन हैश जनरेटर - SHA-256, SHA-512 हैश instantly generate करें।',
  keywords: ['hash generator', 'SHA256 generator', 'MD5 hash online', 'hash generator free', 'SHA512 online'],
  canonicalUrl: '/tools/hash-generator',
  toolName: 'Hash Generator',
  category: 'Utility Tool',
  faqs: [
    { question: 'Hash Generator क्या है?', answer: 'Hash Generator एक tool है जो text को fixed-length encrypted string में convert करता है। यह data integrity verify करने के लिए use होता है।' },
    { question: 'SHA-256 और MD5 में क्या फर्क है?', answer: 'SHA-256 ज्यादा secure है और 256-bit output देता है, जबकि MD5 128-bit output देता है और अब secure नहीं माना जाता।' },
  ],
  howToSteps: ['Text enter करें', 'Algorithm select करें', 'Generate Hash click करें', 'Hash copy करें'],
};

const contentData = {
  whatIs: { title: 'Hash Generator क्या है?', content: 'Hash Generator एक cryptographic tool है जो किसी भी text को fixed-length hash string में convert करता है। यह one-way function है - hash से original text recover नहीं किया जा सकता। यह password storage, data integrity verification, और digital signatures में widely use होता है।' },
  whyUse: { title: 'Hash Generator क्यों use करें?', points: ['Data integrity verify करें', 'Passwords securely hash करें', 'File checksums generate करें', 'Multiple algorithms support', 'Instant results', 'No data stored - 100% private'] },
  howToUse: { title: 'कैसे use करें', steps: ['Input field में text type या paste करें', 'Dropdown से algorithm choose करें (SHA-256 recommended)', 'Generate button click करें', 'Generated hash copy करें'] },
  useCases: { title: 'Use Cases', cases: ['Password hashing', 'File integrity checks', 'Digital signatures', 'Blockchain applications', 'Data deduplication'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'URL Encoder', href: '/tools/url-encoder' },
  ],
};

const algorithms = [
  { value: 'SHA-1', label: 'SHA-1' },
  { value: 'SHA-256', label: 'SHA-256 (Recommended)' },
  { value: 'SHA-384', label: 'SHA-384' },
  { value: 'SHA-512', label: 'SHA-512' },
];

export default function HashGenerator() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    if (!input.trim()) {
      toast({ title: 'Input required', description: 'Please enter text to hash', variant: 'destructive' });
      return;
    }
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch {
      toast({ title: 'Error', description: 'Failed to generate hash', variant: 'destructive' });
    }
  };

  const copyHash = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    toast({ title: 'Copied! ✓' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Hash Generator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Hash className="h-4 w-4" />
              <span>Utility Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Hash Generator Online Free</h1>
            <p className="text-muted-foreground text-lg">SHA-256, SHA-512 hash instantly generate करें</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <Textarea placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[120px]" />
              <div className="flex gap-3">
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {algorithms.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={generateHash} className="flex-1">Generate Hash</Button>
              </div>
            </div>
          </Card>

          {hash && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{algorithm} Hash</h3>
                <Button size="sm" variant="ghost" onClick={copyHash}>
                  {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm break-all">{hash}</div>
            </Card>
          )}

          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
