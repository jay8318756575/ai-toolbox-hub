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
  title: 'Age Calculator Online Free - Calculate Exact Age in Years Months Days',
  titleHi: 'उम्र कैलकुलेटर ऑनलाइन फ्री',
  description: 'Free Age Calculator - Calculate your exact age in years, months and days. Find age difference, next birthday countdown and more.',
  descriptionHi: 'फ्री उम्र कैलकुलेटर - अपनी सही उम्र years, months और days में जानें।',
  keywords: ['age calculator', 'calculate age', 'age calculator online', 'date of birth calculator', 'age in days'],
  canonicalUrl: '/tools/age-calculator',
  toolName: 'Age Calculator',
  category: 'Calculator Tool',
  faqs: [
    { question: 'Age Calculator कैसे काम करता है?', answer: 'Date of birth enter करें और आज की date से exact age calculate होती है - years, months और days में।' },
    { question: 'Next birthday कैसे पता चलेगा?', answer: 'Tool automatically आपकी next birthday date और उसमें कितने दिन बाकी हैं, बता देता है।' },
    { question: 'क्या age difference calculate कर सकते हैं?', answer: 'हाँ, दो dates के बीच का difference calculate कर सकते हैं।' },
  ],
  howToSteps: ['Date of birth select करें', 'Calculate button click करें', 'Exact age देखें years, months, days में'],
};

const contentData = {
  whatIs: { title: 'Age Calculator क्या है?', content: 'Age Calculator एक free online tool है जो आपकी exact age years, months और days में calculate करता है। इसमें आप next birthday countdown भी देख सकते हैं। यह tool government forms, insurance applications, school admissions और general curiosity के लिए बहुत useful है। बस date of birth enter करें और instant result पाएं।' },
  whyUse: { title: 'Age Calculator क्यों use करें?', points: ['Exact age in years, months, days', 'Next birthday countdown', 'Total days lived calculation', 'Government forms के लिए', 'Insurance और admission purposes'] },
  howToUse: { title: 'कैसे use करें', steps: ['Date of birth field में birthday select करें', 'Calculate button click करें', 'Result में exact age, total days और next birthday देखें'] },
  useCases: { title: 'Use Cases', cases: ['Government form filling', 'Insurance premium calculation', 'School admission age verification', 'Retirement planning', 'Birthday countdown'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'BMI Calculator', href: '/tools/bmi-calculator' },
    { title: 'EMI Calculator', href: '/tools/emi-calculator' },
    { title: 'Percentage Calculator', href: '/tools/percentage-calculator' },
  ],
};

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    // Next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday <= today) nextBday.setFullYear(nextBday.getFullYear() + 1);
    const daysUntilBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, daysUntilBday, nextBday: nextBday.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) });
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Age Calculator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Calculator className="h-4 w-4" /><span>Calculator Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Age Calculator Online Free</h1>
            <p className="text-muted-foreground text-lg">अपनी सही उम्र जानें - Years, Months और Days में</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div><Label>Date of Birth</Label><Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split('T')[0]} /></div>
            <Button onClick={calculate} className="w-full">Calculate Age</Button>
            {result && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <p className="text-3xl font-bold text-primary">{result.years} Years, {result.months} Months, {result.days} Days</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Months', value: result.totalMonths },
                    { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
                    { label: 'Total Days', value: result.totalDays.toLocaleString() },
                    { label: 'Days to Birthday', value: result.daysUntilBday },
                  ].map(s => (
                    <Card key={s.label} className="p-3 text-center">
                      <p className="text-xl font-bold text-primary">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center">🎂 Next Birthday: {result.nextBday}</p>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
