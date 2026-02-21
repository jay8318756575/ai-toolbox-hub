import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Sparkles, Loader2, Copy, CheckCircle, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { streamAIChat } from '@/hooks/useAIStream';

const seoData = {
  title: 'Ghar Ka Naksha AI Free - House Plan Generator Online',
  titleHi: 'घर का नक्शा AI फ्री',
  description: 'Free House Plan AI Generator - Generate 2BHK, 3BHK house plans online. Ghar ka naksha free download. Print-ready floor plans.',
  descriptionHi: 'फ्री घर का नक्शा AI - 2BHK, 3BHK house plans online generate करें। Print-ready floor plans।',
  keywords: ['ghar ka naksha', 'house plan generator AI', 'ghar ka naksha online', '2BHK house plan', '3BHK house plan PDF', 'free home plan maker India', 'ghar ka naksha print', 'house plan free download', 'ghar ka design', 'makan ka naksha'],
  canonicalUrl: '/tools/house-planner',
  toolName: 'House Plan AI',
  category: 'Design Tool',
  faqs: [
    { question: 'Ghar ka naksha AI से कैसे बनाएं?', answer: 'बस plot size, rooms की संख्या, और budget select करें। AI automatically detailed floor plan generate कर देगा जिसे आप print कर सकते हैं।' },
    { question: 'क्या यह plan print-ready होता है?', answer: 'हाँ! Generated plan में room dimensions, door-window positions, और vastu tips शामिल होते हैं। आप इसे print करके architect को दिखा सकते हैं।' },
    { question: '2BHK house plan free में मिलेगा?', answer: 'बिल्कुल! यह tool 100% free है। 1BHK से 4BHK तक सभी plans generate कर सकते हैं।' },
    { question: 'Vastu compliant plan बनता है?', answer: 'हाँ, AI vastu principles follow करता है - kitchen south-east, master bedroom south-west, entrance north-east direction में suggest करता है।' },
  ],
  howToSteps: ['Plot size enter करें (feet में)', 'BHK type select करें', 'Budget range choose करें', 'Generate Plan click करें', 'Floor plan review करें', 'Print या copy करें'],
};

const contentData = {
  whatIs: { title: 'Ghar Ka Naksha AI क्या है?', content: `Ghar Ka Naksha AI एक revolutionary tool है जो AI की मदद से घर का पूरा floor plan generate करता है। चाहे आप 2BHK बना रहे हों या 4BHK - बस plot size और requirements बताएं, AI detailed naksha तैयार कर देगा।

  यह tool especially Indian homes के लिए design किया गया है - Vastu compliant plans, Indian standard room sizes, और local architecture style follow करता है। Generated plan में room dimensions, door-window placements, kitchen-bathroom positions सब शामिल होते हैं।` },
  whyUse: { title: 'AI House Plan क्यों use करें?', points: ['Instant floor plan generation', 'Vastu compliant designs', 'Indian home standards', 'Multiple BHK options', 'Budget-friendly suggestions', 'Print-ready output', 'Room dimensions included', 'Free - No architect fees for initial plan'] },
  howToUse: { title: 'House Plan कैसे बनाएं', steps: ['Plot size enter करें - length × width feet में', 'BHK type select करें - 1BHK, 2BHK, 3BHK, या 4BHK', 'Budget range choose करें', 'Generate button click करें', 'AI generated floor plan review करें - rooms, dimensions, placements', 'Print button से plan print करें या copy करके save करें'] },
  useCases: { title: 'Use Cases', cases: ['नया घर बनाने से पहले plan बनाएं', 'Architect को initial design दिखाएं', 'Renovation planning', 'Room layout optimization', 'Vastu consultation preparation', 'Budget estimation'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'AI Chatbot', href: '/tools/ai-chatbot' },
  ],
};

const bhkOptions = [
  { value: '1BHK', label: '1 BHK' },
  { value: '2BHK', label: '2 BHK' },
  { value: '3BHK', label: '3 BHK' },
  { value: '4BHK', label: '4 BHK' },
];

const budgetOptions = [
  { value: '10-20 Lakh', label: '₹10-20 Lakh' },
  { value: '20-40 Lakh', label: '₹20-40 Lakh' },
  { value: '40-70 Lakh', label: '₹40-70 Lakh' },
  { value: '70 Lakh+', label: '₹70 Lakh+' },
];

export default function HousePlanner() {
  const { toast } = useToast();
  const [plotLength, setPlotLength] = useState('');
  const [plotWidth, setPlotWidth] = useState('');
  const [bhk, setBhk] = useState('2BHK');
  const [budget, setBudget] = useState('20-40 Lakh');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!plotLength.trim() || !plotWidth.trim()) {
      toast({ title: 'Plot size required', description: 'Please enter plot length and width', variant: 'destructive' });
      return;
    }
    setResult('');
    setIsLoading(true);

    const prompt = `You are an expert Indian house architect. Create a detailed floor plan for:

Plot Size: ${plotLength} feet × ${plotWidth} feet
Type: ${bhk}
Budget: ₹${budget}

Generate a DETAILED floor plan with:

1. **ASCII Floor Plan** - Draw a text-based floor plan using characters (|, -, +, spaces) showing:
   - All rooms with labels
   - Doors (marked with D)
   - Windows (marked with W)
   - Exact dimensions in feet

2. **Room-wise Details**:
   - Each room name, size (L×W), area in sq ft
   - Purpose and placement reason

3. **Vastu Compliance**:
   - Kitchen: South-East
   - Master Bedroom: South-West
   - Entrance: North/East/North-East
   - Bathroom: West/North-West
   - Pooja Room: North-East

4. **Key Features**:
   - Parking space (if plot allows)
   - Staircase position
   - Balcony/Terrace
   - Garden/Open area

5. **Construction Tips**:
   - Foundation type recommended
   - Estimated construction cost breakdown
   - Material suggestions for budget

6. **Dimensions Summary Table**

Write in Hinglish (Hindi + English mix). Make the plan practical and builder-ready.`;

    await streamAIChat({
      messages: [{ role: 'user', content: prompt }],
      type: 'house-planner',
      onDelta: (delta) => setResult(prev => prev + delta),
      onDone: () => setIsLoading(false),
      onError: (err) => { toast({ title: 'Error', description: err, variant: 'destructive' }); setIsLoading(false); },
    });
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast({ title: 'Copied! ✓' });
    setTimeout(() => setCopied(false), 2000);
  };

  const printPlan = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>House Plan - ${plotLength}x${plotWidth} ${bhk}</title>
      <style>body{font-family:monospace;white-space:pre-wrap;padding:20px;font-size:14px;line-height:1.6;}h1{font-family:sans-serif;}</style>
      </head><body><h1>🏠 House Plan - ${plotLength}×${plotWidth} ft - ${bhk}</h1><hr>${result}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'House Plan AI' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
              <Sparkles className="h-4 w-4" /><span>AI-Powered Design</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Ghar Ka Naksha AI - House Plan Generator Free</h1>
            <p className="text-muted-foreground text-lg">AI से घर का नक्शा बनाएं - Vastu compliant, print-ready</p>
          </header>

          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Plot Length (feet)</label>
                  <Input placeholder="e.g., 30" value={plotLength} onChange={(e) => setPlotLength(e.target.value)} type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Plot Width (feet)</label>
                  <Input placeholder="e.g., 40" value={plotWidth} onChange={(e) => setPlotWidth(e.target.value)} type="number" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">BHK Type</label>
                  <Select value={bhk} onValueChange={setBhk}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{bhkOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{budgetOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Naksha Ban Raha Hai...</> : <><Home className="h-4 w-4 mr-2" /> Generate House Plan</>}
              </Button>
            </div>
          </Card>

          {(result || isLoading) && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">🏠 Your House Plan</h3>
                <div className="flex gap-2">
                  {result && (
                    <>
                      <Button size="sm" variant="ghost" onClick={copyResult}>
                        {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={printPlan}>
                        <Printer className="h-4 w-4 mr-1" /> Print
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg min-h-[300px] text-sm font-mono">
                {result || (isLoading && <span className="text-muted-foreground font-sans">AI ghar ka naksha bana raha hai...</span>)}
                {isLoading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
              </div>
            </Card>
          )}

          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
