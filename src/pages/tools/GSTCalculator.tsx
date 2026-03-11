import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

const seoData = {
  title: 'GST Calculator Online Free - Calculate GST Amount CGST SGST IGST',
  titleHi: 'GST कैलकुलेटर ऑनलाइन फ्री',
  description: 'Free GST Calculator - Calculate GST amount, CGST, SGST, IGST. Add or remove GST from any price. All GST rates supported.',
  descriptionHi: 'फ्री GST कैलकुलेटर - GST amount, CGST, SGST, IGST calculate करें।',
  keywords: ['GST calculator', 'GST calculator online', 'calculate GST', 'CGST SGST calculator', 'GST India'],
  canonicalUrl: '/tools/gst-calculator',
  toolName: 'GST Calculator',
  category: 'Calculator Tool',
  faqs: [
    { question: 'GST कैसे calculate करें?', answer: 'GST Amount = Price × (GST Rate / 100)। जैसे ₹1000 पर 18% GST = ₹180, Total = ₹1180।' },
    { question: 'CGST और SGST क्या है?', answer: 'Intra-state transaction में GST दो हिस्सों में divide होता है - CGST (Central) और SGST (State), दोनों equal होते हैं।' },
    { question: 'IGST कब लगता है?', answer: 'Inter-state transactions में IGST लगता है जो full GST rate के equal होता है।' },
  ],
  howToSteps: ['Amount enter करें', 'GST rate select करें', 'Add GST या Remove GST choose करें', 'Result देखें'],
};

const contentData = {
  whatIs: { title: 'GST Calculator क्या है?', content: 'GST Calculator एक free online tool है जो किसी भी amount पर GST (Goods and Services Tax) calculate करता है। India में GST rates 5%, 12%, 18% और 28% हैं। यह tool CGST, SGST और IGST breakup भी दिखाता है। Shopkeepers, accountants, business owners और CA professionals के लिए daily use tool है।' },
  whyUse: { title: 'GST Calculator क्यों use करें?', points: ['Instant GST calculation', 'CGST/SGST/IGST breakup', 'Add or Remove GST option', 'All GST rates supported', 'Invoice preparation में helpful'] },
  howToUse: { title: 'कैसे use करें', steps: ['Amount (₹) enter करें', 'GST rate select करें (5%, 12%, 18%, 28%)', 'Add GST या Remove GST mode choose करें', 'CGST, SGST, IGST breakup देखें'] },
  useCases: { title: 'Use Cases', cases: ['Invoice preparation', 'Product pricing', 'Tax filing', 'Business accounting', 'Billing calculation'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'EMI Calculator', href: '/tools/emi-calculator' },
    { title: 'Percentage Calculator', href: '/tools/percentage-calculator' },
    { title: 'BMI Calculator', href: '/tools/bmi-calculator' },
  ],
};

export default function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    if (!amt) return;
    if (mode === 'add') {
      const gstAmt = (amt * gstRate) / 100;
      const total = amt + gstAmt;
      setResult({ original: amt, gstAmount: gstAmt, total, cgst: gstAmt / 2, sgst: gstAmt / 2, igst: gstAmt });
    } else {
      const original = (amt * 100) / (100 + gstRate);
      const gstAmt = amt - original;
      setResult({ original, gstAmount: gstAmt, total: amt, cgst: gstAmt / 2, sgst: gstAmt / 2, igst: gstAmt });
    }
  };

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'GST Calculator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Calculator className="h-4 w-4" /><span>Calculator Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">GST Calculator Online Free</h1>
            <p className="text-muted-foreground text-lg">GST Amount, CGST, SGST, IGST calculate करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div className="flex gap-2">
              <Button variant={mode === 'add' ? 'default' : 'outline'} onClick={() => { setMode('add'); setResult(null); }}>Add GST</Button>
              <Button variant={mode === 'remove' ? 'default' : 'outline'} onClick={() => { setMode('remove'); setResult(null); }}>Remove GST</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Amount (₹)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" /></div>
              <div>
                <Label>GST Rate (%)</Label>
                <div className="flex gap-2 mt-1">
                  {[5, 12, 18, 28].map(r => (
                    <Button key={r} size="sm" variant={gstRate === r ? 'default' : 'outline'} onClick={() => { setGstRate(r); setResult(null); }}>{r}%</Button>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate GST</Button>
            {result && (
              <div className="grid sm:grid-cols-2 gap-3">
                <Card className="p-3"><p className="text-xs text-muted-foreground">Base Amount</p><p className="text-lg font-bold">{fmt(result.original)}</p></Card>
                <Card className="p-3"><p className="text-xs text-muted-foreground">GST Amount ({gstRate}%)</p><p className="text-lg font-bold text-destructive">{fmt(result.gstAmount)}</p></Card>
                <Card className="p-3"><p className="text-xs text-muted-foreground">CGST ({gstRate/2}%)</p><p className="text-lg font-bold">{fmt(result.cgst)}</p></Card>
                <Card className="p-3"><p className="text-xs text-muted-foreground">SGST ({gstRate/2}%)</p><p className="text-lg font-bold">{fmt(result.sgst)}</p></Card>
                <Card className="p-3 sm:col-span-2 text-center"><p className="text-xs text-muted-foreground">Total Amount</p><p className="text-2xl font-bold text-primary">{fmt(result.total)}</p></Card>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
