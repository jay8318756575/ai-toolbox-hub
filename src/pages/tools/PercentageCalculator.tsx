import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Percent } from 'lucide-react';

const seoData = {
  title: 'Percentage Calculator Online Free - Calculate Percent Increase Decrease',
  titleHi: 'प्रतिशत कैलकुलेटर ऑनलाइन फ्री',
  description: 'Free Percentage Calculator - Calculate percentage, percentage increase/decrease, percentage of a number. Multiple calculation modes.',
  descriptionHi: 'फ्री प्रतिशत कैलकुलेटर - Percentage, increase, decrease सब calculate करें।',
  keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percentage decrease', 'calculate percentage'],
  canonicalUrl: '/tools/percentage-calculator',
  toolName: 'Percentage Calculator',
  category: 'Calculator Tool',
  faqs: [
    { question: 'Percentage कैसे calculate करें?', answer: 'Percentage = (Part / Total) × 100। जैसे 25 out of 50 = (25/50) × 100 = 50%।' },
    { question: 'Percentage increase कैसे निकालें?', answer: 'Percentage Increase = ((New - Old) / Old) × 100।' },
  ],
  howToSteps: ['Calculation mode select करें', 'Values enter करें', 'Calculate button click करें'],
};

const contentData = {
  whatIs: { title: 'Percentage Calculator क्या है?', content: 'Percentage Calculator एक free online tool है जो multiple तरीकों से percentage calculate करता है। "X का Y% कितना है", "X, Y का कितने percent है", "percentage increase/decrease" - सभी calculations एक ही tool में। Students, shopkeepers, accountants और business people के लिए बहुत useful tool है।' },
  whyUse: { title: 'क्यों use करें?', points: ['Multiple calculation modes', 'Instant results', 'Percentage increase/decrease', 'Student friendly', 'No signup required'] },
  howToUse: { title: 'कैसे use करें', steps: ['Calculation mode choose करें', 'Numbers enter करें', 'Calculate button click करें', 'Result instantly देखें'] },
  useCases: { title: 'Use Cases', cases: ['Exam marks percentage', 'Discount calculation', 'Salary hike percentage', 'Profit/loss percentage', 'Tax calculation'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'GST Calculator', href: '/tools/gst-calculator' },
    { title: 'EMI Calculator', href: '/tools/emi-calculator' },
    { title: 'BMI Calculator', href: '/tools/bmi-calculator' },
  ],
};

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'of' | 'is' | 'change'>('of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (mode === 'of') setResult(`${x}% of ${y} = ${((x / 100) * y).toFixed(2)}`);
    else if (mode === 'is') setResult(`${x} is ${((x / y) * 100).toFixed(2)}% of ${y}`);
    else setResult(`Change from ${x} to ${y} = ${(((y - x) / x) * 100).toFixed(2)}%`);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Percentage Calculator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Percent className="h-4 w-4" /><span>Calculator Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Percentage Calculator Online Free</h1>
            <p className="text-muted-foreground text-lg">Percentage, increase, decrease सब calculate करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'of' as const, label: 'X% of Y' },
                { key: 'is' as const, label: 'X is what % of Y' },
                { key: 'change' as const, label: '% Change' },
              ].map(m => (
                <Button key={m.key} variant={mode === m.key ? 'default' : 'outline'} size="sm" onClick={() => { setMode(m.key); setResult(''); }}>{m.label}</Button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>{mode === 'of' ? 'Percentage (%)' : mode === 'is' ? 'Value' : 'Old Value'}</Label><Input type="number" value={a} onChange={e => setA(e.target.value)} /></div>
              <div><Label>{mode === 'of' ? 'Number' : mode === 'is' ? 'Total' : 'New Value'}</Label><Input type="number" value={b} onChange={e => setB(e.target.value)} /></div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate</Button>
            {result && <div className="text-center p-4 bg-primary/5 rounded-lg"><p className="text-xl font-bold text-primary">{result}</p></div>}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
