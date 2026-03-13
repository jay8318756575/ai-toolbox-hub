import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Repeat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Text Repeater Online Free - Repeat Text Tool',
  titleHi: 'टेक्स्ट रिपीटर ऑनलाइन फ्री',
  description: 'Free text repeater tool. Repeat any text or string multiple times with custom separator.',
  descriptionHi: 'फ्री टेक्स्ट रिपीटर टूल। किसी भी text को कई बार repeat करें।',
  keywords: ['text repeater', 'repeat text', 'string repeater', 'text multiplier', 'repeat words'],
  canonicalUrl: '/tools/text-repeater',
  toolName: 'Text Repeater',
  category: 'Text Tool',
  faqs: [
    { question: 'How many times can I repeat text?', answer: 'You can repeat text up to 10,000 times in one go.' },
    { question: 'Can I add a separator between repetitions?', answer: 'Yes, you can set a custom separator like newline, space, comma, or any text.' },
  ],
  howToSteps: ['Enter the text to repeat', 'Set the number of repetitions', 'Choose a separator', 'Copy the result'],
};

const contentData = {
  title: 'Free Text Repeater Tool',
  introContent: `<p>Repeat any <strong>text or string</strong> multiple times instantly. Set custom separators, generate bulk text for testing, or create repeated patterns.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Custom Count', description: 'Repeat up to 10,000 times.' },
    { title: 'Custom Separator', description: 'Use newline, space, comma, or any text between repetitions.' },
    { title: 'Instant', description: 'Results generated in real-time.' },
    { title: 'Copy Ready', description: 'One-click copy to clipboard.' },
  ],
};

export default function TextRepeater() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState('\\n');

  const actualSep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  const result = text ? Array(Math.min(count, 10000)).fill(text).join(actualSep) : '';

  const copy = async () => { await navigator.clipboard.writeText(result); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Text Repeater' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Repeat className="h-4 w-4" /><span>Text Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Text Repeater Online Free</h1>
            <p className="text-muted-foreground text-lg">किसी भी text को कई बार repeat करें</p>
          </header>
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div><label className="text-sm font-medium mb-1 block">Text to Repeat</label><Input value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Repeat Count</label><Input type="number" value={count} onChange={e => setCount(Math.max(1, Number(e.target.value)))} min={1} max={10000} /></div>
                <div><label className="text-sm font-medium mb-1 block">Separator</label><Input value={separator} onChange={e => setSeparator(e.target.value)} placeholder="\n" /></div>
              </div>
              <Button variant="outline" onClick={copy} disabled={!result} className="w-full"><Copy className="h-4 w-4 mr-2" /> Copy Result</Button>
            </div>
          </Card>
          {result && <Card className="p-4 mb-6"><div className="max-h-[300px] overflow-auto whitespace-pre-wrap text-sm font-mono">{result}</div></Card>}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
