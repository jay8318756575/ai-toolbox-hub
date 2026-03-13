import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Color Picker Online Free - Pick Colors from Screen',
  titleHi: 'कलर पिकर ऑनलाइन फ्री',
  description: 'Free online color picker tool. Pick any color, get HEX, RGB, HSL values. Generate color palettes instantly.',
  descriptionHi: 'फ्री ऑनलाइन कलर पिकर टूल। कोई भी color pick करें, HEX, RGB, HSL values पाएं।',
  keywords: ['color picker', 'color picker online', 'hex color picker', 'rgb color picker', 'color chooser'],
  canonicalUrl: '/tools/color-picker',
  toolName: 'Color Picker',
  category: 'Design Tool',
  faqs: [
    { question: 'How do I use the color picker?', answer: 'Click on the color input to open the color picker, or type a hex code directly.' },
    { question: 'What color formats are provided?', answer: 'You get HEX, RGB, and HSL values for every color you pick.' },
    { question: 'Can I save colors?', answer: 'Yes, your recent color history is displayed for quick access.' },
  ],
  howToSteps: ['Click the color circle to open the picker', 'Choose your desired color', 'Copy HEX, RGB, or HSL values', 'View and reuse your color history'],
};

const contentData = {
  title: 'Free Online Color Picker',
  introContent: `<p>Pick any <strong>color</strong> and get instant HEX, RGB, and HSL values. Save your color history and build palettes for your design projects.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Multiple Formats', description: 'Get HEX, RGB, and HSL values instantly.' },
    { title: 'Color History', description: 'Your recent picks are saved for reuse.' },
    { title: 'Live Preview', description: 'See the color as you pick it.' },
    { title: 'CSS Ready', description: 'Copy CSS-ready color values.' },
  ],
};

export default function ColorPicker() {
  const { toast } = useToast();
  const [color, setColor] = useState('#3B82F6');
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (c: string) => {
    setColor(c);
    setHistory(prev => [c, ...prev.filter(x => x !== c)].slice(0, 12));
  };

  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
  };

  const rgb = hexToRgb(color);
  const copy = async (text: string) => { await navigator.clipboard.writeText(text); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Color Picker' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Palette className="h-4 w-4" /><span>Design Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Color Picker Online Free</h1>
            <p className="text-muted-foreground text-lg">कोई भी color pick करें — HEX, RGB, HSL values पाएं</p>
          </header>
          <Card className="p-6 mb-6">
            <div className="flex flex-col items-center gap-6">
              <input type="color" value={color} onChange={e => addToHistory(e.target.value)} className="w-32 h-32 rounded-xl cursor-pointer border-2 border-border" />
              <Input value={color} onChange={e => setColor(e.target.value)} className="max-w-xs text-center font-mono text-lg" />
              <div className="w-full h-20 rounded-xl" style={{ backgroundColor: color }} />
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                {[
                  { label: 'HEX', value: color.toUpperCase() },
                  { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                  { label: 'CSS', value: `background-color: ${color};` },
                ].map(({ label, value }) => (
                  <Button key={label} variant="outline" onClick={() => copy(value)} className="flex-col h-auto py-3">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs">{value}</span>
                  </Button>
                ))}
              </div>
              {history.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 text-center">Recent Colors</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {history.map((c, i) => (
                      <button key={i} onClick={() => setColor(c)} className="w-8 h-8 rounded-lg border border-border hover:scale-110 transition-transform" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
