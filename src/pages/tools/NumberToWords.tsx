import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
const scales = ['','Thousand','Million','Billion','Trillion'];

function numberToWords(n: number): string {
  if (n === 0) return 'Zero';
  if (n < 0) return 'Negative ' + numberToWords(-n);
  let words = '';
  let scaleIdx = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk !== 0) {
      let chunkStr = '';
      const h = Math.floor(chunk / 100);
      const remainder = chunk % 100;
      if (h > 0) chunkStr += ones[h] + ' Hundred ';
      if (remainder < 20) chunkStr += ones[remainder];
      else chunkStr += tens[Math.floor(remainder / 10)] + ' ' + ones[remainder % 10];
      words = chunkStr.trim() + ' ' + scales[scaleIdx] + ' ' + words;
    }
    n = Math.floor(n / 1000);
    scaleIdx++;
  }
  return words.trim();
}

const seoData = {
  title: 'Number to Words Converter Online Free',
  titleHi: 'नंबर टू वर्ड्स कन्वर्टर',
  description: 'Free number to words converter. Convert any number to English words instantly. Perfect for cheque writing and documents.',
  descriptionHi: 'फ्री नंबर टू वर्ड्स कन्वर्टर। किसी भी number को English words में बदलें।',
  keywords: ['number to words', 'number to text', 'convert number to words', 'cheque writing', 'number converter'],
  canonicalUrl: '/tools/number-to-words',
  toolName: 'Number to Words',
  category: 'Number Tool',
  faqs: [
    { question: 'What numbers can this tool convert?', answer: 'It can convert numbers up to trillions into English words.' },
    { question: 'Is it useful for cheque writing?', answer: 'Yes! This tool is perfect for converting amounts to words for cheque writing.' },
    { question: 'Does it support decimals?', answer: 'Currently it supports whole numbers. Decimal support coming soon.' },
  ],
  howToSteps: ['Enter a number', 'See the words appear instantly', 'Copy the result'],
};

const contentData = {
  title: 'Free Number to Words Converter',
  introContent: `<p>Convert any <strong>number to English words</strong> instantly. Perfect for cheque writing, legal documents, invoices, and educational purposes.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Large Numbers', description: 'Supports numbers up to trillions.' },
    { title: 'Instant Conversion', description: 'Results appear as you type.' },
    { title: 'Cheque Ready', description: 'Perfect format for cheque writing.' },
    { title: 'Free & Private', description: 'No signup, all processing in browser.' },
  ],
};

export default function NumberToWords() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const num = parseInt(input);
  const words = !isNaN(num) ? numberToWords(num) : '';
  const copy = async () => { await navigator.clipboard.writeText(words); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Number to Words' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Hash className="h-4 w-4" /><span>Number Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Number to Words Converter</h1>
            <p className="text-muted-foreground text-lg">Numbers को English words में convert करें</p>
          </header>
          <Card className="p-6 mb-6 text-center">
            <Input type="number" placeholder="Enter a number..." value={input} onChange={e => setInput(e.target.value)} className="text-center text-2xl mb-4 max-w-md mx-auto" />
            {words && (
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-xl font-medium text-primary">{words}</p>
                <Button size="sm" variant="ghost" onClick={copy} className="mt-3"><Copy className="h-4 w-4 mr-1" /> Copy</Button>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
