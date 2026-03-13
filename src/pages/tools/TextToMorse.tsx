import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const MORSE: Record<string, string> = { A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',' ':'/','?':'..--..','!':'-.-.--','.':'.-.-.-',',':'--..--' };
const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE).map(([k,v]) => [v,k]));

const seoData = {
  title: 'Text to Morse Code Converter Online Free',
  titleHi: 'टेक्स्ट टू मोर्स कोड कन्वर्टर',
  description: 'Free online text to Morse code converter. Convert text to Morse code and Morse code to text instantly.',
  descriptionHi: 'फ्री ऑनलाइन टेक्स्ट टू मोर्स कोड कन्वर्टर। टेक्स्ट को मोर्स कोड में बदलें।',
  keywords: ['morse code converter', 'text to morse', 'morse to text', 'morse code translator', 'मोर्स कोड'],
  canonicalUrl: '/tools/text-to-morse',
  toolName: 'Text to Morse Code',
  category: 'Text Tool',
  faqs: [
    { question: 'What is Morse Code?', answer: 'Morse code is a method of encoding text using dots (.) and dashes (-). It was invented by Samuel Morse in the 1830s for telegraph communication.' },
    { question: 'How do I convert text to Morse code?', answer: 'Simply type or paste your text in the input box and the tool will instantly convert it to Morse code.' },
    { question: 'Can I convert Morse code back to text?', answer: 'Yes! Switch to "Morse to Text" mode to decode Morse code back into readable text.' },
    { question: 'What characters are supported?', answer: 'All English letters (A-Z), numbers (0-9), and common punctuation marks are supported.' },
  ],
  howToSteps: ['Enter text in the input box', 'See the Morse code output instantly', 'Switch modes to decode Morse to text', 'Copy the result'],
};

const contentData = {
  title: 'Free Text to Morse Code Converter',
  introContent: `<p>Convert <strong>text to Morse code</strong> and <strong>Morse code to text</strong> instantly with our free online tool. Perfect for learning Morse code, sending coded messages, or educational purposes.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Bidirectional Conversion', description: 'Convert text to Morse and Morse to text.' },
    { title: 'Instant Results', description: 'See conversion in real-time as you type.' },
    { title: 'All Characters', description: 'Supports letters, numbers, and punctuation.' },
    { title: 'Free & Private', description: 'No signup needed, all processing in browser.' },
  ],
};

export default function TextToMorse() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode'
    ? input.toUpperCase().split('').map(c => MORSE[c] || c).join(' ')
    : input.split(' ').map(c => c === '/' ? ' ' : REVERSE_MORSE[c] || c).join('');

  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Text to Morse Code' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Radio className="h-4 w-4" /><span>Text Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Text to Morse Code Converter</h1>
            <p className="text-muted-foreground text-lg">टेक्स्ट को मोर्स कोड में convert करें — Free & Instant</p>
          </header>
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={mode === 'encode' ? 'default' : 'outline'} size="sm" onClick={() => { setMode('encode'); setInput(''); }} className={mode === 'encode' ? 'btn-gradient' : ''}>Text → Morse</Button>
            <Button variant={mode === 'decode' ? 'default' : 'outline'} size="sm" onClick={() => { setMode('decode'); setInput(''); }} className={mode === 'decode' ? 'btn-gradient' : ''}>Morse → Text</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">{mode === 'encode' ? 'Text Input' : 'Morse Input'}</h3>
              <Textarea placeholder={mode === 'encode' ? 'Enter text...' : 'Enter morse code (use . and -, space between letters, / between words)...'} value={input} onChange={e => setInput(e.target.value)} className="min-h-[250px] resize-none" />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm">{mode === 'encode' ? 'Morse Code' : 'Decoded Text'}</h3><Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4 mr-1" /> Copy</Button></div>
              <div className="min-h-[250px] bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono text-lg break-all">{output || <span className="text-muted-foreground">Output will appear here...</span>}</div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
