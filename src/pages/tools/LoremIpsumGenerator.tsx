import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const SENTENCES = ['Curabitur pretium tincidunt lacus.', 'Nulla gravida orci a odio.', 'Nullam varius, turpis et commodo pharetra.', 'Est eros bibendum elit, nec luctus magna felis sollicitudin mauris.', 'Integer in mauris eu nibh euismod gravida.', 'Duis ac tellus et risus vulputate vehicula.', 'Donec lobortis risus a elit.', 'Etiam tempor.', 'Ut ullamcorper, ligula ut dictum pharetra.', 'Nunc ut tristique massa.', 'Nam sodales mi vitae dolor ullamcorper et vulputate enim accumsan.', 'Morbi orci magna, tincidunt vitae molestie nec, molestie at mi.', 'Nulla nulla lorem, suscipit in posuere in, interdum non magna.', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.'];

const seoData = {
  title: 'Lorem Ipsum Generator Online Free',
  titleHi: 'लोरेम इप्सम जनरेटर',
  description: 'Free Lorem Ipsum text generator. Generate placeholder text paragraphs, sentences, or words for design mockups.',
  descriptionHi: 'फ्री लोरेम इप्सम जनरेटर। डिज़ाइन mockups के लिए placeholder text generate करें।',
  keywords: ['lorem ipsum generator', 'dummy text generator', 'placeholder text', 'lorem ipsum', 'filler text'],
  canonicalUrl: '/tools/lorem-ipsum-generator',
  toolName: 'Lorem Ipsum Generator',
  category: 'Text Tool',
  faqs: [
    { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is placeholder text used in design and publishing since the 1500s. It looks like real text but has no meaning, helping designers focus on layout.' },
    { question: 'How many paragraphs can I generate?', answer: 'You can generate up to 50 paragraphs of Lorem Ipsum text at once.' },
    { question: 'Can I generate by words or sentences?', answer: 'Yes, choose between paragraphs, sentences, or words mode.' },
  ],
  howToSteps: ['Select generation mode (paragraphs, sentences, or words)', 'Choose the quantity', 'Click Generate', 'Copy the generated text'],
};

const contentData = {
  title: 'Free Lorem Ipsum Generator',
  introContent: `<p>Generate <strong>Lorem Ipsum placeholder text</strong> instantly for your design mockups, wireframes, and prototypes. Choose paragraphs, sentences, or words mode.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Multiple Modes', description: 'Generate by paragraphs, sentences, or words.' },
    { title: 'Custom Quantity', description: 'Choose exactly how much text you need.' },
    { title: 'Copy Instantly', description: 'One-click copy to clipboard.' },
    { title: 'Standard Text', description: 'Uses the classic Lorem Ipsum text.' },
  ],
};

export default function LoremIpsumGenerator() {
  const { toast } = useToast();
  const [count, setCount] = useState(3);
  const [mode, setMode] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');

  const generate = () => {
    if (mode === 'paragraphs') {
      const paras = Array.from({ length: count }, (_, i) => {
        if (i === 0) return LOREM;
        return SENTENCES.sort(() => Math.random() - 0.5).slice(0, 4 + Math.floor(Math.random() * 3)).join(' ');
      });
      setOutput(paras.join('\n\n'));
    } else if (mode === 'sentences') {
      const all = [LOREM, ...SENTENCES];
      const selected = Array.from({ length: count }, () => all[Math.floor(Math.random() * all.length)]);
      setOutput(selected.join(' '));
    } else {
      const words = LOREM.split(' ');
      const selected = Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]);
      setOutput(selected.join(' '));
    }
  };

  const copy = async () => { await navigator.clipboard.writeText(output); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Lorem Ipsum Generator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><FileText className="h-4 w-4" /><span>Text Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Lorem Ipsum Generator</h1>
            <p className="text-muted-foreground text-lg">Design mockups के लिए placeholder text generate करें</p>
          </header>
          <Card className="p-6 mb-6">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {(['paragraphs', 'sentences', 'words'] as const).map(m => (
                <Button key={m} variant={mode === m ? 'default' : 'outline'} size="sm" onClick={() => setMode(m)} className={mode === m ? 'btn-gradient' : ''}>{m.charAt(0).toUpperCase() + m.slice(1)}</Button>
              ))}
            </div>
            <div className="flex justify-center gap-3 items-center">
              <Input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, Number(e.target.value))))} className="w-24 text-center" min={1} max={50} />
              <Button onClick={generate} className="btn-gradient">Generate</Button>
              <Button variant="outline" onClick={copy} disabled={!output}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
            </div>
          </Card>
          {output && <Card className="p-6 mb-6"><div className="whitespace-pre-wrap text-sm leading-relaxed">{output}</div></Card>}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
