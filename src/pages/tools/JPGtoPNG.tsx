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
  title: 'JPG to PNG Converter Online Free - Convert JPEG to PNG',
  titleHi: 'JPG to PNG कन्वर्टर ऑनलाइन फ्री',
  description: 'Free JPG to PNG Converter - Convert JPEG images to PNG format with transparency support. No quality loss, instant conversion.',
  descriptionHi: 'फ्री JPG to PNG कन्वर्टर - JPEG images को PNG format में convert करें।',
  keywords: ['jpg to png', 'jpeg to png converter', 'convert jpg to png', 'jpg to png online', 'image format converter'],
  canonicalUrl: '/tools/jpg-to-png',
  toolName: 'JPG to PNG Converter',
  category: 'Image Tool',
  faqs: [
    { question: 'JPG और PNG में क्या difference है?', answer: 'JPG lossy compression use करता है जबकि PNG lossless है। PNG transparency support करता है, JPG नहीं।' },
    { question: 'JPG to PNG convert करने से quality बढ़ेगी?', answer: 'Nahi, quality वही रहेगी। लेकिन further editing में PNG better quality maintain करता है।' },
  ],
  howToSteps: ['JPG image upload करें', 'Convert button click करें', 'PNG image download करें'],
};

const contentData = {
  whatIs: { title: 'JPG to PNG Converter क्या है?', content: 'JPG to PNG Converter एक free online tool है जो JPEG images को PNG format में convert करता है। PNG format transparency support करता है और lossless compression use करता है, इसलिए logos, graphics और transparent backgrounds के लिए PNG better है। यह tool browser-based है, आपकी images कहीं upload नहीं होतीं।' },
  whyUse: { title: 'क्यों use करें?', points: ['Transparency support', 'Lossless quality', 'Logos और graphics के लिए', 'Instant conversion', 'No signup required'] },
  howToUse: { title: 'कैसे use करें', steps: ['Upload area में JPG image select करें', 'Automatically PNG में convert होगा', 'Download button click करें'] },
  useCases: { title: 'Use Cases', cases: ['Logo design', 'Web graphics', 'Transparent background images', 'Social media graphics', 'Print design'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'PNG to JPG', href: '/tools/png-to-jpg' },
    { title: 'Image Compressor', href: '/tools/image-compressor' },
    { title: 'Image Resizer', href: '/tools/image-resizer' },
  ],
};

export default function JPGtoPNG() {
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
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); toast({ title: 'Converted to PNG!' }); }
      }, 'image/png');
    };
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    if (!convertedUrl) return;
    const a = document.createElement('a'); a.href = convertedUrl; a.download = `${fileName}.png`; a.click();
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'JPG to PNG' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><ImageIcon className="h-4 w-4" /><span>Image Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">JPG to PNG Converter Online Free</h1>
            <p className="text-muted-foreground text-lg">JPG images को PNG format में convert करें</p>
          </header>
          <Card className="p-6 mb-6">
            <input type="file" ref={fileInputRef} accept="image/jpeg,image/jpg" onChange={handleFileSelect} className="hidden" />
            {!originalUrl ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">Click to upload JPG image</p>
                <p className="text-sm text-muted-foreground">JPEG/JPG files supported</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium mb-2">Original (JPG)</p><img src={originalUrl} alt="Original" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>
                  {convertedUrl && <div><p className="text-sm font-medium mb-2">Converted (PNG)</p><img src={convertedUrl} alt="PNG" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>}
                </div>
                <div className="flex gap-3">
                  <Button onClick={download} className="flex-1" disabled={!convertedUrl}><Download className="h-4 w-4 mr-2" />Download PNG</Button>
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
