import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageIcon, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'PNG to JPG Converter Online Free - Convert PNG to JPEG',
  titleHi: 'PNG to JPG कन्वर्टर ऑनलाइन फ्री',
  description: 'Free PNG to JPG Converter - Convert PNG images to JPG format. Reduce file size significantly. Instant conversion online.',
  descriptionHi: 'फ्री PNG to JPG कन्वर्टर - PNG images को JPG format में convert करें।',
  keywords: ['png to jpg', 'png to jpeg converter', 'convert png to jpg', 'png to jpg online'],
  canonicalUrl: '/tools/png-to-jpg',
  toolName: 'PNG to JPG Converter',
  category: 'Image Tool',
  faqs: [
    { question: 'PNG to JPG convert क्यों करें?', answer: 'JPG files PNG से काफी smaller होती हैं, websites पर faster load होती हैं।' },
    { question: 'Transparency क्या होगा?', answer: 'JPG transparency support नहीं करता, transparent areas white background बन जाएगा।' },
  ],
  howToSteps: ['PNG image upload करें', 'Automatically JPG में convert होगा', 'JPG image download करें'],
};

const contentData = {
  whatIs: { title: 'PNG to JPG Converter क्या है?', content: 'PNG to JPG Converter एक free online tool है जो PNG images को JPG/JPEG format में convert करता है। JPG format smaller file size produce करता है जो websites, emails और social media के लिए ideal है। यह tool Canvas API use करता है और पूरी तरह browser-based है, आपकी privacy safe रहती है।' },
  whyUse: { title: 'क्यों use करें?', points: ['File size significantly reduce', 'Website loading speed improve', 'Email attachment friendly', 'Instant browser-based conversion', 'No signup required'] },
  howToUse: { title: 'कैसे use करें', steps: ['Upload area में PNG image select करें', 'Automatically JPG में convert होगा', 'Download button click करें'] },
  useCases: { title: 'Use Cases', cases: ['Website image optimization', 'Email attachments', 'Social media uploads', 'Storage space saving'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'JPG to PNG', href: '/tools/jpg-to-png' },
    { title: 'Image Compressor', href: '/tools/image-compressor' },
    { title: 'Image Resizer', href: '/tools/image-resizer' },
  ],
};

export default function PNGtoJPG() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ''));
    setOriginalUrl(URL.createObjectURL(file));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); toast({ title: 'Converted to JPG!' }); }
      }, 'image/jpeg', 0.92);
    };
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    if (!convertedUrl) return;
    const a = document.createElement('a'); a.href = convertedUrl; a.download = `${fileName}.jpg`; a.click();
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'PNG to JPG' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><ImageIcon className="h-4 w-4" /><span>Image Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">PNG to JPG Converter Online Free</h1>
            <p className="text-muted-foreground text-lg">PNG images को JPG format में convert करें</p>
          </header>
          <Card className="p-6 mb-6">
            <input type="file" ref={fileInputRef} accept="image/png" onChange={handleFileSelect} className="hidden" />
            {!originalUrl ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">Click to upload PNG image</p>
                <p className="text-sm text-muted-foreground">PNG files supported</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium mb-2">Original (PNG)</p><img src={originalUrl} alt="Original" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>
                  {convertedUrl && <div><p className="text-sm font-medium mb-2">Converted (JPG)</p><img src={convertedUrl} alt="JPG" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>}
                </div>
                <div className="flex gap-3">
                  <Button onClick={download} className="flex-1" disabled={!convertedUrl}><Download className="h-4 w-4 mr-2" />Download JPG</Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4 mr-2" />New</Button>
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
