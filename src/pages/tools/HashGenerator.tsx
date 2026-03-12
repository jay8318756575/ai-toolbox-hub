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
  titleHi: 'हैश जनरेटर ऑनलाइन फ्री - SHA256, MD5 हैश बनाएं',
  description: 'Free online Hash Generator - Generate SHA-1, SHA-256, SHA-512 hashes instantly. Secure cryptographic hashing for passwords, file integrity. No data stored.',
  descriptionHi: 'फ्री ऑनलाइन हैश जनरेटर - SHA-256, SHA-512 हैश instantly generate करें। Passwords और file integrity के लिए। 100% Secure।',
  keywords: [
    'hash generator', 'SHA256 generator', 'MD5 hash online', 'hash generator free',
    'SHA512 online', 'SHA-1 generator', 'cryptographic hash', 'हैश जनरेटर',
    'hash kaise banaye', 'password hash generator', 'checksum generator', 'hash function online',
  ],
  canonicalUrl: '/tools/hash-generator',
  toolName: 'Hash Generator',
  category: 'Developer Tool',
  faqs: [
    { question: 'Hash Generator क्या है?', answer: 'Hash Generator एक cryptographic tool है जो text को fixed-length encrypted string (hash) में convert करता है। यह one-way function है - hash से original text recover करना mathematically impossible है। Data integrity verify करने, passwords store करने, और digital signatures में use होता है।' },
    { question: 'SHA-256 और MD5 में क्या फर्क है?', answer: 'SHA-256 बहुत ज्यादा secure है और 256-bit (64 character hex) output देता है। MD5 सिर्फ 128-bit (32 character hex) output देता है और अब collision attacks के कारण secure नहीं माना जाता। Security-critical applications में हमेशा SHA-256 या SHA-512 use करें।' },
    { question: 'कौन सा hash algorithm best है?', answer: 'General purpose के लिए SHA-256 recommended है। Maximum security के लिए SHA-512 use करें। MD5 और SHA-1 legacy systems में ही use करें, नए projects में avoid करें।' },
    { question: 'क्या hash से original text पता चल सकता है?', answer: 'नहीं, cryptographic hash functions one-way हैं। Hash से original text mathematically reverse करना practically impossible है। यही property इसे passwords store करने के लिए ideal बनाती है।' },
    { question: 'क्या मेरा data safe है?', answer: 'बिल्कुल! Hash generation पूरी तरह आपके browser में होती है। आपका text कभी हमारे servers पर नहीं भेजा जाता - 100% client-side processing।' },
  ],
  howToSteps: ['Input field में text type या paste करें', 'Dropdown से hash algorithm select करें (SHA-256 recommended)', 'Generate Hash button click करें', 'Generated hash copy करें और use करें'],
};

const contentData = {
  whatIs: { title: 'Hash Generator क्या है? (What is Hash Generator)', content: 'Hash Generator एक powerful cryptographic tool है जो किसी भी text string को fixed-length hash value में convert करता है। यह one-way mathematical function use करता है - एक बार hash बन जाने के बाद उससे original text recover करना mathematically impossible है। Hash functions data integrity verification, password storage, digital signatures, blockchain technology, और file checksums में extensively use होते हैं। SmartToolsHub का Hash Generator SHA-1, SHA-256, SHA-384, SHA-512 algorithms support करता है और पूरी processing आपके browser में locally होती है - आपका data कभी हमारे servers तक नहीं पहुँचता।' },
  whyUse: { title: 'Hash Generator क्यों use करें?', points: [
    'Data integrity verify करें - files और messages tamper-proof बनाएं',
    'Passwords securely hash करें - plain text store करने से बचें',
    'File checksums generate और verify करें',
    'Multiple algorithms support - SHA-1, SHA-256, SHA-384, SHA-512',
    'Instant results - milliseconds में hash generate',
    '100% browser-based - आपका data private रहता है',
    'Developers और security professionals के लिए essential tool',
    'Blockchain और cryptocurrency applications के लिए',
  ] },
  howToUse: { title: 'Hash Generator कैसे use करें (Step-by-Step)', steps: [
    'Input field में वो text type या paste करें जिसका hash generate करना है',
    'Dropdown menu से hash algorithm choose करें - SHA-256 most recommended है',
    'Generate Hash button click करें',
    'Generated hash output में दिखेगा - Copy button से clipboard में copy करें',
  ] },
  useCases: { title: 'Use Cases', cases: [
    'Password hashing - user passwords securely store करें databases में',
    'File integrity verification - downloaded files verify करें कि corrupt तो नहीं',
    'Digital signatures - documents की authenticity verify करें',
    'Blockchain और cryptocurrency applications',
    'Data deduplication - duplicate data identify करें',
    'API authentication - HMAC signatures generate करें',
    'Software distribution - release files का checksum provide करें',
  ] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'URL Encoder/Decoder', href: '/tools/url-encoder' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
    { title: 'Word Counter', href: '/tools/word-counter' },
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
