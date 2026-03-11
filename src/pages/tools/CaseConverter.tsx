import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Type, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Case Converter Online Free - UPPERCASE lowercase Title Case',
  titleHi: 'केस कन्वर्टर ऑनलाइन फ्री',
  description: 'Free Case Converter - Convert text to UPPERCASE, lowercase, Title Case, Sentence case and more. Instant text transformation online.',
  descriptionHi: 'फ्री केस कन्वर्टर - Text को UPPERCASE, lowercase, Title Case में convert करें।',
  keywords: ['case converter', 'uppercase converter', 'lowercase converter', 'title case converter', 'text case changer'],
  canonicalUrl: '/tools/case-converter',
  toolName: 'Case Converter',
  category: 'Text Tool',
  faqs: [
    { question: 'Case Converter क्या करता है?', answer: 'यह tool text का case change करता है - uppercase, lowercase, title case, sentence case आदि में convert करता है।' },
    { question: 'Title Case क्या है?', answer: 'Title Case में हर word का first letter capital होता है, जैसे "This Is Title Case".' },
    { question: 'क्या Hindi text support है?', answer: 'Hindi text paste कर सकते हैं लेकिन case conversion mainly English letters पर काम करता है।' },
  ],
  howToSteps: ['Text box में text paste करें', 'Desired case button click करें', 'Converted text copy करें'],
};

const contentData = {
  whatIs: { title: 'Case Converter क्या है?', content: 'Case Converter एक free online tool है जो आपके text का case instantly change कर देता है। चाहे UPPERCASE चाहिए, lowercase चाहिए, Title Case चाहिए या Sentence case - एक click में conversion हो जाता है। यह tool writers, students और professionals के लिए बहुत useful है जिन्हें text formatting quickly करनी होती है।' },
  whyUse: { title: 'Case Converter क्यों use करें?', points: ['एक click में case change', 'Multiple case options available', 'Copy to clipboard feature', 'No signup, 100% free', 'Browser-based, completely private'] },
  howToUse: { title: 'कैसे use करें', steps: ['Text area में text paste या type करें', 'Case conversion button click करें', 'Copy button से converted text copy करें'] },
  useCases: { title: 'Use Cases', cases: ['Headings को Title Case में convert', 'Code variables के लिए case change', 'Email formatting', 'Document styling'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Word Counter', href: '/tools/word-counter' },
    { title: 'Grammar Checker', href: '/tools/grammar-checker' },
  ],
};

export default function CaseConverter() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convert = (type: string) => {
    let r = text;
    switch(type) {
      case 'upper': r = text.toUpperCase(); break;
      case 'lower': r = text.toLowerCase(); break;
      case 'title': r = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); break;
      case 'sentence': r = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
      case 'toggle': r = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
    }
    setResult(r);
  };

  const copy = () => {
    navigator.clipboard.writeText(result || text);
    toast({ title: 'Copied!' });
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Case Converter' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Type className="h-4 w-4" /><span>Text Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Case Converter Online Free</h1>
            <p className="text-muted-foreground text-lg">Text का case instantly change करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..." className="min-h-[150px]" />
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'UPPERCASE', type: 'upper' },
                { label: 'lowercase', type: 'lower' },
                { label: 'Title Case', type: 'title' },
                { label: 'Sentence case', type: 'sentence' },
                { label: 'tOGGLE cASE', type: 'toggle' },
              ].map(btn => (
                <Button key={btn.type} onClick={() => convert(btn.type)} variant="outline" size="sm">{btn.label}</Button>
              ))}
            </div>
            {result && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Result:</p>
                  <Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4 mr-1" />Copy</Button>
                </div>
                <Textarea value={result} readOnly className="min-h-[150px]" />
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
