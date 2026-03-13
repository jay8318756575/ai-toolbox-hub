import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Reverse Text Online Free - Text Reverser Tool',
  titleHi: 'टेक्स्ट रिवर्सर ऑनलाइन फ्री',
  description: 'Free online text reverser tool. Reverse the order of characters, words, or lines in your text instantly. No signup required.',
  descriptionHi: 'फ्री ऑनलाइन टेक्स्ट रिवर्सर टूल। अपने टेक्स्ट के characters, words या lines को instantly reverse करें।',
  keywords: ['reverse text', 'text reverser', 'reverse string online', 'flip text', 'backwards text generator', 'टेक्स्ट रिवर्सर'],
  canonicalUrl: '/tools/text-reverser',
  toolName: 'Text Reverser',
  category: 'Text Tool',
  faqs: [
    { question: 'What does the Text Reverser tool do?', answer: 'It reverses the order of characters in your text, so "Hello" becomes "olleH". You can also reverse by words or lines.' },
    { question: 'Is the Text Reverser tool free?', answer: 'Yes, our Text Reverser is 100% free with no signup or download required.' },
    { question: 'Can I reverse text by words instead of characters?', answer: 'Yes, you can choose to reverse by characters, words, or lines using the mode selector.' },
    { question: 'Does it work with Hindi and other languages?', answer: 'Yes, it works with all Unicode text including Hindi, Arabic, Chinese, and emoji.' },
    { question: 'Is my text data safe?', answer: 'Absolutely. All processing happens in your browser. No data is sent to any server.' },
  ],
  howToSteps: ['Enter or paste your text in the input area', 'Select reverse mode: Characters, Words, or Lines', 'Click Reverse to see the result', 'Copy the reversed text to clipboard'],
};

const contentData = {
  title: 'Free Online Text Reverser Tool',
  introContent: `<p>Our <strong>Free Online Text Reverser</strong> lets you instantly reverse text by characters, words, or lines. Whether you need to create backwards text for fun, decode reversed messages, or manipulate text data for programming, this tool handles it all with zero effort.</p>
  <p>The Text Reverser works entirely in your browser — no data is uploaded to any server, making it completely private and secure. It supports all languages including Hindi, Arabic, and emoji text.</p>`,
  featuresTitle: 'Key Features of Text Reverser',
  features: [
    { title: 'Multiple Reverse Modes', description: 'Reverse by characters, words, or lines — choose the mode that fits your needs.' },
    { title: 'Instant Processing', description: 'Results appear in real-time as you type or paste text.' },
    { title: 'Unicode Support', description: 'Works perfectly with Hindi, emoji, Chinese, Arabic, and all Unicode text.' },
    { title: '100% Private', description: 'All processing happens locally in your browser. No data leaves your device.' },
  ],
  useCasesTitle: 'Use Cases',
  useCases: ['Creating backwards/mirror text for social media', 'Reversing strings in programming tasks', 'Decoding reversed messages', 'Text manipulation for data processing', 'Fun and creative writing exercises'],
  tipsTitle: 'Tips for Using Text Reverser',
  tips: ['Use "Reverse by Words" to flip sentence word order while keeping words readable', 'Use "Reverse by Lines" for reversing multi-line text like lists or code', 'Combine with our Case Converter tool for more text transformations'],
};

export default function TextReverser() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('chars');

  const reversed = (() => {
    if (!input) return '';
    switch (mode) {
      case 'chars': return input.split('').reverse().join('');
      case 'words': return input.split(/\s+/).reverse().join(' ');
      case 'lines': return input.split('\n').reverse().join('\n');
    }
  })();

  const copy = async () => {
    if (!reversed) return;
    await navigator.clipboard.writeText(reversed);
    toast({ title: 'Copied! ✓' });
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Text Reverser' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <RotateCcw className="h-4 w-4" />
              <span>Text Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Reverse Text Online Free</h1>
            <p className="text-muted-foreground text-lg">अपने टेक्स्ट को instantly reverse करें — Characters, Words, या Lines</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            {(['chars', 'words', 'lines'] as const).map(m => (
              <Button key={m} variant={mode === m ? 'default' : 'outline'} size="sm" onClick={() => setMode(m)} className={mode === m ? 'btn-gradient' : ''}>
                {m === 'chars' ? 'Characters' : m === 'words' ? 'Words' : 'Lines'}
              </Button>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Input Text</h3>
                <Button size="sm" variant="ghost" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Textarea placeholder="Enter text to reverse..." value={input} onChange={e => setInput(e.target.value)} className="min-h-[250px] resize-none" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Reversed Text</h3>
                <Button size="sm" variant="ghost" onClick={copy} disabled={!reversed}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
              </div>
              <div className="min-h-[250px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap break-all">{reversed || <span className="text-muted-foreground">Reversed text will appear here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
