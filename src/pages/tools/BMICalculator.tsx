import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

const seoData = {
  title: 'BMI Calculator Online Free - Body Mass Index Calculator',
  titleHi: 'BMI कैलकुलेटर ऑनलाइन फ्री',
  description: 'Free BMI Calculator - Calculate your Body Mass Index. Know if you are underweight, normal, overweight or obese. Health tips included.',
  descriptionHi: 'फ्री BMI कैलकुलेटर - अपना Body Mass Index जानें।',
  keywords: ['BMI calculator', 'body mass index calculator', 'BMI check online', 'weight calculator', 'health calculator'],
  canonicalUrl: '/tools/bmi-calculator',
  toolName: 'BMI Calculator',
  category: 'Health Tool',
  faqs: [
    { question: 'BMI क्या है?', answer: 'BMI (Body Mass Index) एक number है जो height और weight से calculate होता है। यह बताता है कि आपका weight healthy range में है या नहीं।' },
    { question: 'Normal BMI कितना होना चाहिए?', answer: '18.5 से 24.9 के बीच BMI normal माना जाता है।' },
    { question: 'BMI कैसे calculate होता है?', answer: 'BMI = Weight (kg) / (Height (m))²। जैसे 70 kg weight और 1.75m height = 70/(1.75²) = 22.86।' },
  ],
  howToSteps: ['Weight (kg) enter करें', 'Height (cm) enter करें', 'Calculate button click करें', 'BMI result और category देखें'],
};

const contentData = {
  whatIs: { title: 'BMI Calculator क्या है?', content: 'BMI (Body Mass Index) Calculator एक free online health tool है जो आपके weight और height से BMI calculate करता है। BMI एक indicator है जो बताता है कि आपका body weight healthy range में है या नहीं। WHO (World Health Organization) के अनुसार BMI categories हैं - Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+)। यह tool health awareness और fitness planning के लिए useful है।' },
  whyUse: { title: 'BMI Calculator क्यों use करें?', points: ['Quick health assessment', 'WHO standards based', 'Weight management planning', 'Free और instant result', 'Health category classification'] },
  howToUse: { title: 'कैसे use करें', steps: ['Weight kilogram (kg) में enter करें', 'Height centimeter (cm) में enter करें', 'Calculate BMI button click करें', 'BMI value और health category देखें'] },
  useCases: { title: 'Use Cases', cases: ['Personal health tracking', 'Fitness goal planning', 'Diet planning', 'Health checkup preparation', 'Insurance health assessment'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Age Calculator', href: '/tools/age-calculator' },
    { title: 'Percentage Calculator', href: '/tools/percentage-calculator' },
  ],
};

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height) / 100;
    if (!w || !h) return;
    const bmi = w / (h * h);
    let category = '', color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal Weight'; color = 'text-green-500'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-500'; }
    else { category = 'Obese'; color = 'text-red-500'; }
    setResult({ bmi: bmi.toFixed(1), category, color });
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'BMI Calculator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Heart className="h-4 w-4" /><span>Health Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">BMI Calculator Online Free</h1>
            <p className="text-muted-foreground text-lg">अपना Body Mass Index (BMI) जानें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70" /></div>
              <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175" /></div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate BMI</Button>
            {result && (
              <div className="text-center p-6 bg-primary/5 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Your BMI</p>
                <p className="text-5xl font-bold text-primary">{result.bmi}</p>
                <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Underweight: &lt;18.5 | Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: 30+</p>
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
