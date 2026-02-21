import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ImageIcon, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Image Compressor Online Free - Compress PNG JPG WebP',
  titleHi: 'इमेज कंप्रेसर ऑनलाइन फ्री',
  description: 'Free Image Compressor - Compress PNG, JPG, WebP images online. Reduce file size without losing quality. No signup required.',
  descriptionHi: 'फ्री इमेज कंप्रेसर - PNG, JPG, WebP images online compress करें।',
  keywords: ['image compressor', 'compress image online', 'reduce image size', 'image compressor free', 'compress JPG PNG'],
  canonicalUrl: '/tools/image-compressor',
  toolName: 'Image Compressor',
  category: 'Converter Tool',
  faqs: [
    { question: 'Image compress कैसे होती है?', answer: 'Canvas API use करके image को re-render किया जाता है lower quality पर, जिससे file size कम होता है बिना resolution change किए।' },
    { question: 'Quality कितनी रखें?', answer: '70-80% quality recommended है - file size काफी कम होती है और visual difference minimal रहता है।' },
  ],
  howToSteps: ['Image upload करें', 'Quality slider adjust करें', 'Download compressed image'],
};

const contentData = {
  whatIs: { title: 'Image Compressor क्या है?', content: 'Image Compressor एक tool है जो images की file size को reduce करता है बिना visible quality loss के। यह Canvas API use करता है जो browser में ही image process करता है - आपकी images कहीं upload नहीं होतीं।' },
  whyUse: { title: 'क्यों use करें?', points: ['Website loading speed improve करें', 'Storage space save करें', 'Email attachments के लिए', '100% browser-based - private', 'No signup required'] },
  howToUse: { title: 'कैसे use करें', steps: ['Upload button click करके image select करें', 'Quality slider से compression level adjust करें', 'Download button से compressed image save करें'] },
  useCases: { title: 'Use Cases', cases: ['Website images optimize करें', 'Social media uploads', 'Email attachments', 'Blog post images'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
  ],
};

export default function ImageCompressor() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState([75]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please select an image file', variant: 'destructive' });
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setOriginalUrl(URL.createObjectURL(file));
    compressImage(file, quality[0] / 100);
  };

  const compressImage = (file: File, q: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setCompressedSize(blob.size);
          setCompressedUrl(URL.createObjectURL(blob));
        },
        'image/jpeg',
        q
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const handleQualityChange = (val: number[]) => {
    setQuality(val);
    if (originalFile) compressImage(originalFile, val[0] / 100);
  };

  const downloadCompressed = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${originalFile?.name || 'image'}.jpg`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Image Compressor' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <ImageIcon className="h-4 w-4" /><span>Converter Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Image Compressor Online Free</h1>
            <p className="text-muted-foreground text-lg">Images compress करें बिना quality lose किए</p>
          </header>

          <Card className="p-6 mb-6">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />
            {!originalUrl ? (
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">Click to upload image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, WebP supported</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Original ({formatSize(originalSize)})</p>
                    <img src={originalUrl} alt="Original" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Compressed ({formatSize(compressedSize)}) <span className="text-green-500">-{savings}%</span></p>
                    {compressedUrl && <img src={compressedUrl} alt="Compressed" className="rounded-lg max-h-[200px] object-contain w-full bg-muted/30" />}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quality: {quality[0]}%</label>
                  <Slider value={quality} onValueChange={handleQualityChange} min={10} max={100} step={5} />
                </div>

                <div className="flex gap-3">
                  <Button onClick={downloadCompressed} className="flex-1" disabled={!compressedUrl}>
                    <Download className="h-4 w-4 mr-2" /> Download Compressed
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" /> New Image
                  </Button>
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
