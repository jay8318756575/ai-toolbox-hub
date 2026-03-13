import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Type } from 'lucide-react';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Text to Image Converter Online Free',
  titleHi: 'टेक्स्ट टू इमेज कन्वर्टर',
  description: 'Free text to image converter. Convert any text to a downloadable PNG image with custom fonts, colors, and sizes.',
  descriptionHi: 'फ्री टेक्स्ट टू इमेज कन्वर्टर। किसी भी text को PNG image में बदलें।',
  keywords: ['text to image', 'convert text to image', 'text image generator', 'text to png', 'create text image'],
  canonicalUrl: '/tools/text-to-image',
  toolName: 'Text to Image',
  category: 'Image Tool',
  faqs: [
    { question: 'How do I convert text to an image?', answer: 'Enter your text, customize font size, color, and background, then download as PNG.' },
    { question: 'What formats are supported?', answer: 'The output is a high-quality PNG image.' },
    { question: 'Can I customize the font?', answer: 'Yes, you can change font size, text color, and background color.' },
  ],
  howToSteps: ['Enter your text', 'Customize font size and colors', 'Click Generate', 'Download the image'],
};

const contentData = {
  title: 'Free Text to Image Converter',
  introContent: `<p>Convert any <strong>text to a downloadable image</strong>. Customize font size, colors, and padding. Perfect for social media posts, quotes, and text-based graphics.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Custom Styling', description: 'Set font size, text color, and background.' },
    { title: 'High Quality PNG', description: 'Download crisp, high-resolution images.' },
    { title: 'Multi-line', description: 'Supports multi-line text with word wrapping.' },
    { title: 'Instant', description: 'No server processing needed.' },
  ],
};

export default function TextToImage() {
  const [text, setText] = useState('Hello World!\nSmartToolsHub');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#3B82F6');
  const [imgUrl, setImgUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const padding = 40;
    ctx.font = `${fontSize}px sans-serif`;
    const lines = text.split('\n');
    const lineHeight = fontSize * 1.4;
    const maxWidth = Math.max(...lines.map(l => ctx.measureText(l).width), 200);
    canvas.width = maxWidth + padding * 2;
    canvas.height = lines.length * lineHeight + padding * 2;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = 'top';
    lines.forEach((line, i) => ctx.fillText(line, padding, padding + i * lineHeight));
    setImgUrl(canvas.toDataURL('image/png'));
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Text to Image' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Type className="h-4 w-4" /><span>Image Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Text to Image Converter</h1>
            <p className="text-muted-foreground text-lg">Text को PNG image में convert करें</p>
          </header>
          <Card className="p-6 mb-6">
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." className="mb-4 min-h-[100px]" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div><label className="text-xs mb-1 block">Font Size</label><Input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} min={12} max={120} /></div>
              <div><label className="text-xs mb-1 block">Text Color</label><div className="flex gap-1"><input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-9 rounded cursor-pointer" /><Input value={textColor} onChange={e => setTextColor(e.target.value)} className="font-mono text-xs" /></div></div>
              <div><label className="text-xs mb-1 block">Background</label><div className="flex gap-1"><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-9 rounded cursor-pointer" /><Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="font-mono text-xs" /></div></div>
              <div className="flex items-end"><Button onClick={generate} className="btn-gradient w-full">Generate</Button></div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </Card>
          {imgUrl && (
            <Card className="p-6 mb-6 text-center">
              <img src={imgUrl} alt="Generated" className="max-w-full mx-auto rounded-lg mb-4" />
              <a href={imgUrl} download="text-image.png"><Button className="btn-gradient"><Download className="h-4 w-4 mr-2" /> Download PNG</Button></a>
            </Card>
          )}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
