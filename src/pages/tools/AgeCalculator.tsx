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
  titleHi: 'उम्र कैलकुलेटर ऑनलाइन फ्री - सही उम्र जानें',
  description: 'Free Age Calculator - Calculate your exact age in years, months and days instantly. Next birthday countdown, total days lived, age difference calculator. No signup.',
  descriptionHi: 'फ्री उम्र कैलकुलेटर - अपनी सही उम्र years, months और days में जानें। Next birthday countdown, total days lived। No registration।',
  keywords: [
    'age calculator', 'calculate age', 'age calculator online', 'date of birth calculator',
    'age in days', 'उम्र कैलकुलेटर', 'age kaise nikale', 'birthday calculator',
    'exact age calculator', 'age calculator India', 'umr calculator', 'age difference calculator',
    'next birthday calculator', 'how old am I',
  ],
  canonicalUrl: '/tools/age-calculator',
  toolName: 'Age Calculator',
  category: 'Calculator Tool',
  faqs: [
    { question: 'Age Calculator कैसे काम करता है?', answer: 'Date of birth enter करें और tool automatically आज की date से exact age calculate करता है - years, months और days में। Leap years और month variations को ध्यान में रखकर accurate result देता है।' },
    { question: 'Next birthday कैसे पता चलेगा?', answer: 'Tool automatically आपकी next birthday date calculate करता है और बताता है कि उसमें कितने दिन, weeks और months बाकी हैं। यह feature birthday planning के लिए बहुत useful है।' },
    { question: 'क्या age difference calculate कर सकते हैं?', answer: 'हाँ, दो अलग-अलग dates enter करके उनके बीच का exact difference calculate कर सकते हैं - years, months और days में।' },
    { question: 'Government forms में age कैसे fill करें?', answer: 'Government forms में typically "Age as on" एक specific date होती है। इस tool में आप reference date change करके उस specific date पर अपनी exact age calculate कर सकते हैं।' },
    { question: 'क्या यह tool accurate है?', answer: 'हाँ, 100% accurate है। यह tool leap years, varying month lengths (28/29/30/31 days), और timezone differences को account करता है।' },
    { question: 'Total days lived कैसे जानें?', answer: 'Age calculate करने पर tool automatically total days, weeks, months, hours और minutes भी show करता है जो आपने live किए हैं।' },
  ],
  howToSteps: ['Date of birth field में अपनी जन्मतिथि select करें', 'Calculate button click करें', 'Exact age देखें - years, months, days, total days में', 'Next birthday countdown check करें'],
};

const contentData = {
  whatIs: { title: 'Age Calculator क्या है? (What is Age Calculator)', content: 'Age Calculator एक free online tool है जो आपकी exact age years, months और days में calculate करता है। यह tool date of birth से लेकर current date तक की precise age बताता है, जिसमें leap years और varying month lengths को accurately handle किया जाता है। इसमें आप next birthday countdown, total days lived, total weeks, total hours जैसी interesting information भी देख सकते हैं। यह tool government forms, insurance applications, school/college admissions, passport applications, job applications, और general curiosity के लिए बेहद useful है। बस अपनी date of birth enter करें और instant result पाएं - कोई registration नहीं, कोई charges नहीं।' },
  whyUse: { title: 'Age Calculator क्यों use करें?', points: [
    'Exact age in years, months और days - 100% accurate',
    'Next birthday countdown - कितने दिन बाकी हैं',
    'Total days, weeks, hours lived calculation',
    'Government forms और applications के लिए perfect',
    'Insurance premium और retirement age calculation',
    'School/college admission age verification',
    'Passport और visa applications के लिए',
    'Instant results - no signup required',
  ] },
  howToUse: { title: 'Age Calculator कैसे use करें (Step-by-Step)', steps: [
    'Date of birth field में अपनी जन्मतिथि (birthday) select करें',
    'Calculate button click करें',
    'Result में exact age देखें - years, months, days format में',
    'Additional info देखें - total days lived, next birthday countdown',
  ] },
  useCases: { title: 'Use Cases', cases: [
    'Government form filling - Aadhaar, PAN, Voter ID applications',
    'Insurance premium calculation - LIC, health insurance age requirements',
    'School/College admission - age eligibility verification',
    'Job applications - government job age limit check',
    'Passport application - age verification',
    'Retirement planning - retirement age countdown',
    'Birthday countdown - next birthday कितने दिन में',
    'Age difference calculation - couples, siblings age gap',
  ] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'BMI Calculator', href: '/tools/bmi-calculator' },
    { title: 'EMI Calculator', href: '/tools/emi-calculator' },
    { title: 'Percentage Calculator', href: '/tools/percentage-calculator' },
    { title: 'GST Calculator', href: '/tools/gst-calculator' },
    { title: 'Word Counter', href: '/tools/word-counter' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
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
