import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Image Resizer Online Free - Resize Images by Pixels or Percentage',
  titleHi: 'इमेज रिसाइज़र ऑनलाइन फ्री',
  description: 'Free Image Resizer - Resize PNG, JPG, WebP images to exact dimensions. Change width and height in pixels or percentage. No signup required.',
  descriptionHi: 'फ्री इमेज रिसाइज़र - PNG, JPG, WebP images को exact size में resize करें।',
  keywords: ['image resizer', 'resize image online', 'image resizer free', 'change image size', 'resize photo online', 'image resize pixels'],
  canonicalUrl: '/tools/image-resizer',
  toolName: 'Image Resizer',
  category: 'Image Tool',
  faqs: [
    { question: 'Image resize कैसे करें?', answer: 'Image upload करें, width और height enter करें, और Download button click करें। आपकी image resize होकर download हो जाएगी।' },
    { question: 'क्या image quality कम होती है?', answer: 'Resize करने पर quality maintain रहती है। लेकिन बहुत छोटी image को बहुत बड़ा करने पर pixelation हो सकता है।' },
    { question: 'कौन से formats support हैं?', answer: 'PNG, JPG, JPEG, WebP और GIF formats support हैं।' },
    { question: 'क्या aspect ratio lock कर सकते हैं?', answer: 'हाँ, aspect ratio lock करके width या height में से कोई एक change करें, दूसरा automatically adjust हो जाएगा।' },
  ],
  howToSteps: ['Image upload करें', 'Width और Height enter करें', 'Resize button click करें', 'Download resized image'],
};

const contentData = {
  whatIs: { title: 'Image Resizer क्या है?', content: 'Image Resizer एक free online tool है जो आपकी images को किसी भी size में resize कर सकता है। चाहे social media profile picture बनानी हो, website thumbnail create करना हो, या print-ready image चाहिए - यह tool सब कर सकता है। यह tool पूरी तरह browser-based है, यानी आपकी images कहीं upload नहीं होतीं और आपकी privacy पूरी तरह safe रहती है। Canvas API technology use करके यह tool high-quality resizing deliver करता है जिसमें image clarity maintain रहती है।' },
  whyUse: { title: 'Image Resizer क्यों use करें?', points: ['Exact pixel dimensions में resize करें', 'Aspect ratio lock/unlock option', '100% browser-based - completely private', 'No signup, no watermark, unlimited usage', 'PNG, JPG, WebP सब formats support'] },
  howToUse: { title: 'Image Resizer कैसे use करें', steps: ['Upload button click करके image select करें', 'Width और Height pixels में enter करें', 'Aspect ratio lock रखें या unlock करें', 'Download button click करके resized image save करें'] },
  useCases: { title: 'Use Cases', cases: ['Social media profile pictures resize करें', 'Website thumbnails और banners बनाएं', 'Email attachments के लिए image size adjust करें', 'Passport size photos create करें', 'Blog और article images optimize करें'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Image Compressor', href: '/tools/image-compressor' },
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'JPG to PNG', href: '/tools/jpg-to-png' },
  ],
};

export default function ImageResizer() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [resizedUrl, setResizedUrl] = useState('');
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please select an image file', variant: 'destructive' });
      return;
    }
    setOriginalFile(file);
    setOriginalUrl(URL.createObjectURL(file));
    const img = new Image();
    img.onload = () => { setOrigW(img.width); setOrigH(img.height); setWidth(img.width); setHeight(img.height); };
    img.src = URL.createObjectURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && origW > 0) setHeight(Math.round((val / origW) * origH));
  };
  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && origH > 0) setWidth(Math.round((val / origH) * origW));
  };

  const resizeImage = () => {
    if (!originalFile || width <= 0 || height <= 0) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setResizedUrl(URL.createObjectURL(blob));
        toast({ title: 'Image resized!', description: `${width} x ${height} pixels` });
      }, 'image/png');
    };
    img.src = URL.createObjectURL(originalFile);
  };

  const download = () => {
    if (!resizedUrl) return;
    const a = document.createElement('a');
    a.href = resizedUrl;
    a.download = `resized-${width}x${height}-${originalFile?.name || 'image'}.png`;
    a.click();
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Image Resizer' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <ImageIcon className="h-4 w-4" /><span>Image Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Image Resizer Online Free</h1>
            <p className="text-muted-foreground text-lg">Images को किसी भी size में resize करें</p>
          </header>

          <Card className="p-6 mb-6">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />
            {!originalUrl ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">Click to upload image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, WebP supported</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium mb-2">Original ({origW} x {origH})</p><img src={originalUrl} alt="Original" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>
                  {resizedUrl && <div><p className="text-sm font-medium mb-2">Resized ({width} x {height})</p><img src={resizedUrl} alt="Resized" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" /></div>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Width (px)</Label><Input type="number" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} min={1} /></div>
                  <div><Label>Height (px)</Label><Input type="number" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} min={1} /></div>
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} /> Lock Aspect Ratio</label>
                <div className="flex gap-3">
                  <Button onClick={resizeImage} className="flex-1">Resize Image</Button>
                  <Button onClick={download} variant="outline" disabled={!resizedUrl}><Download className="h-4 w-4 mr-2" />Download</Button>
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
