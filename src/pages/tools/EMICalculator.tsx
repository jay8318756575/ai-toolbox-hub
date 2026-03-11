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
  title: 'EMI Calculator Online Free - Home Loan Car Loan Personal Loan EMI',
  titleHi: 'EMI कैलकुलेटर ऑनलाइन फ्री',
  description: 'Free EMI Calculator - Calculate monthly EMI for home loan, car loan, personal loan. See total interest and payment breakup instantly.',
  descriptionHi: 'फ्री EMI कैलकुलेटर - Home loan, car loan, personal loan की monthly EMI calculate करें।',
  keywords: ['EMI calculator', 'loan EMI calculator', 'home loan EMI', 'car loan EMI', 'personal loan EMI calculator'],
  canonicalUrl: '/tools/emi-calculator',
  toolName: 'EMI Calculator',
  category: 'Calculator Tool',
  faqs: [
    { question: 'EMI कैसे calculate होती है?', answer: 'EMI = [P x R x (1+R)^N] / [(1+R)^N - 1] formula use होता है, जहाँ P = Principal, R = Monthly Rate, N = Months।' },
    { question: 'Home loan पर कितनी EMI आएगी?', answer: 'यह loan amount, interest rate और tenure पर depend करता है। Example: 30 lakh @ 8.5% for 20 years = ~26,049/month।' },
    { question: 'Prepayment करने से क्या फायदा?', answer: 'Prepayment से total interest significantly कम होता है और loan जल्दी close हो जाता है।' },
  ],
  howToSteps: ['Loan amount enter करें', 'Interest rate enter करें', 'Loan tenure (years) enter करें', 'EMI, total interest और total payment देखें'],
};

const contentData = {
  whatIs: { title: 'EMI Calculator क्या है?', content: 'EMI (Equated Monthly Installment) Calculator एक free tool है जो आपको बताता है कि किसी loan पर हर महीने कितनी EMI देनी होगी। इसमें total interest payable और total payment amount भी दिखता है। Home loan, car loan, personal loan, education loan - सभी के लिए use कर सकते हैं। यह tool standard EMI formula use करता है जो सभी banks follow करते हैं।' },
  whyUse: { title: 'EMI Calculator क्यों use करें?', points: ['Instant EMI calculation', 'Total interest payable देखें', 'Loan comparison करें', 'Financial planning में मदद', 'All loan types support'] },
  howToUse: { title: 'कैसे use करें', steps: ['Loan amount (₹) enter करें', 'Annual interest rate (%) enter करें', 'Loan tenure years में enter करें', 'Calculate button click करें'] },
  useCases: { title: 'Use Cases', cases: ['Home loan EMI planning', 'Car loan comparison', 'Personal loan affordability check', 'Education loan planning', 'Business loan calculation'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'GST Calculator', href: '/tools/gst-calculator' },
    { title: 'Percentage Calculator', href: '/tools/percentage-calculator' },
    { title: 'Age Calculator', href: '/tools/age-calculator' },
  ],
};

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    if (!p || !r || !n) return;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    setResult({ emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest), interestPercent: ((totalInterest / p) * 100).toFixed(1) });
  };

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'EMI Calculator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Calculator className="h-4 w-4" /><span>Calculator Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">EMI Calculator Online Free</h1>
            <p className="text-muted-foreground text-lg">Home Loan, Car Loan, Personal Loan की EMI calculate करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Loan Amount (₹)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 3000000" /></div>
              <div><Label>Interest Rate (% p.a.)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 8.5" step="0.1" /></div>
              <div><Label>Tenure (Years)</Label><Input type="number" value={tenure} onChange={e => setTenure(e.target.value)} placeholder="e.g. 20" /></div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate EMI</Button>
            {result && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                  <p className="text-4xl font-bold text-primary">{fmt(result.emi)}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="p-3 text-center"><p className="text-lg font-bold">{fmt(parseFloat(principal))}</p><p className="text-xs text-muted-foreground">Principal</p></Card>
                  <Card className="p-3 text-center"><p className="text-lg font-bold text-destructive">{fmt(result.totalInterest)}</p><p className="text-xs text-muted-foreground">Total Interest ({result.interestPercent}%)</p></Card>
                  <Card className="p-3 text-center"><p className="text-lg font-bold">{fmt(result.totalPayment)}</p><p className="text-xs text-muted-foreground">Total Payment</p></Card>
                </div>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
