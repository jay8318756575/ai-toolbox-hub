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
  title: 'Hex to RGB Color Converter Online Free',
  titleHi: 'Hex टू RGB कलर कन्वर्टर',
  description: 'Free Hex to RGB color converter. Convert hex color codes to RGB values and vice versa. Preview colors instantly.',
  descriptionHi: 'फ्री Hex टू RGB कलर कन्वर्टर। Hex color codes को RGB values में बदलें।',
  keywords: ['hex to rgb', 'color converter', 'hex color', 'rgb color', 'color picker', 'hex to rgba'],
  canonicalUrl: '/tools/hex-to-rgb',
  toolName: 'Hex to RGB Converter',
  category: 'Developer Tool',
  faqs: [
    { question: 'What is a hex color code?', answer: 'A hex color code is a 6-digit hexadecimal number used in web design, e.g., #FF5733 represents a red-orange color.' },
    { question: 'How do I convert hex to RGB?', answer: 'Enter a hex code (e.g., #FF5733) and the tool instantly shows the RGB values (R:255, G:87, B:51).' },
    { question: 'Does it support shorthand hex?', answer: 'Yes, 3-digit shorthand hex codes like #F00 are supported and expanded automatically.' },
  ],
  howToSteps: ['Enter a hex color code', 'See RGB values and color preview instantly', 'Copy RGB or HSL values'],
};

const contentData = {
  title: 'Free Hex to RGB Color Converter',
  introContent: `<p>Convert <strong>hex color codes to RGB</strong> and vice versa instantly. See live color preview, get HSL values, and copy CSS-ready color codes.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Live Preview', description: 'See the actual color as you type.' },
    { title: 'Multiple Formats', description: 'Get HEX, RGB, and HSL values.' },
    { title: 'Bidirectional', description: 'Convert HEX→RGB or RGB→HEX.' },
    { title: 'CSS Ready', description: 'Copy CSS-ready color values.' },
  ],
};

function hexToRgb(hex: string) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) return null;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function HexToRgb() {
  const { toast } = useToast();
  const [hex, setHex] = useState('#3B82F6');
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const copy = async (text: string) => { await navigator.clipboard.writeText(text); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Hex to RGB' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Palette className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Hex to RGB Color Converter</h1>
            <p className="text-muted-foreground text-lg">Hex color codes को RGB में convert करें — Live Preview</p>
          </header>
          <Card className="p-6 mb-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 w-full max-w-md">
                <input type="color" value={rgb ? hex.startsWith('#') ? hex : '#' + hex : '#000000'} onChange={e => setHex(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" />
                <Input value={hex} onChange={e => setHex(e.target.value)} placeholder="#FF5733" className="text-center text-xl font-mono" />
              </div>
              {rgb && (
                <div className="w-full max-w-md">
                  <div className="w-full h-24 rounded-xl mb-4 border" style={{ backgroundColor: hex.startsWith('#') ? hex : '#' + hex }} />
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'HEX', value: hex.startsWith('#') ? hex.toUpperCase() : '#' + hex.toUpperCase() },
                      { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                      { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
                    ].map(({ label, value }) => (
                      <button key={label} onClick={() => copy(value)} className="bg-muted/50 rounded-lg p-3 text-center hover:bg-muted transition-colors">
                        <p className="text-xs text-muted-foreground mb-1">{label}</p>
                        <p className="font-mono text-xs font-medium">{value}</p>
                        <Copy className="h-3 w-3 mx-auto mt-1 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">R</p><p className="text-lg font-bold text-primary">{rgb.r}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">G</p><p className="text-lg font-bold text-primary">{rgb.g}</p></div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">B</p><p className="text-lg font-bold text-primary">{rgb.b}</p></div>
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
