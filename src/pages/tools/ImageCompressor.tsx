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
  titleHi: 'इमेज कंप्रेसर ऑनलाइन फ्री - फोटो साइज कम करें',
  description: 'Free Image Compressor - Compress PNG, JPG, WebP images online without losing quality. Reduce file size up to 80%. Fast, secure, browser-based. No signup required.',
  descriptionHi: 'फ्री इमेज कंप्रेसर - PNG, JPG, WebP images online compress करें बिना quality loss के। File size 80% तक कम करें। No registration, 100% Private।',
  keywords: [
    'image compressor', 'compress image online', 'reduce image size', 'image compressor free',
    'compress JPG PNG', 'photo compressor', 'image size reducer', 'compress photo online',
    'image compression tool', 'फोटो कंप्रेसर', 'इमेज साइज कम करें', 'photo size kam kare',
    'online image compressor', 'bulk image compressor', 'compress images for website',
  ],
  canonicalUrl: '/tools/image-compressor',
  toolName: 'Image Compressor',
  category: 'Image Tool',
  faqs: [
    { question: 'Image compress कैसे होती है?', answer: 'Canvas API use करके image को re-render किया जाता है adjustable quality पर, जिससे file size significantly कम होती है बिना resolution change किए। यह lossy compression technique है जो visual quality maintain करती है।' },
    { question: 'Quality कितनी रखें?', answer: '70-80% quality recommended है - file size 50-70% तक कम होती है और visual difference नगण्य रहता है। Website images के लिए 60-70%, social media के लिए 75-85% ideal है।' },
    { question: 'क्या compressed image की quality खराब होती है?', answer: 'नहीं, 70%+ quality पर compressed images में visual difference बहुत कम होता है। Human eye 75% से ऊपर quality में difference नहीं पकड़ पाती।' },
    { question: 'कौन से formats support हैं?', answer: 'JPG/JPEG, PNG, और WebP formats fully supported हैं। PNG images में ज्यादा compression possible है क्योंकि वो typically larger files होती हैं।' },
    { question: 'क्या मेरी images server पर upload होती हैं?', answer: 'नहीं, बिल्कुल नहीं! सब कुछ आपके browser में locally process होता है। आपकी images कभी हमारे servers तक नहीं पहुँचतीं - 100% private और secure।' },
    { question: 'Maximum file size limit क्या है?', answer: 'कोई specific limit नहीं है, लेकिन बहुत बड़ी files (50MB+) में browser slow हो सकता है। 20MB तक की files smoothly process होती हैं।' },
  ],
  howToSteps: ['Image upload करें (drag & drop या browse)', 'Quality slider adjust करें (70-80% recommended)', 'Compressed image preview देखें', 'Download button से compressed image save करें'],
};

const contentData = {
  whatIs: { title: 'Image Compressor क्या है? (What is Image Compressor)', content: 'Image Compressor एक powerful free online tool है जो images की file size को significantly reduce करता है बिना visible quality loss के। यह HTML5 Canvas API use करता है जो आपके browser में ही image process करता है - आपकी images कभी हमारे servers पर upload नहीं होतीं, जिससे 100% privacy guaranteed है। चाहे आप website owner हों, blogger हों, social media manager हों, या student - Image Compressor आपके लिए बेहद useful tool है। बड़ी images website loading speed slow करती हैं, email attachments में problem create करती हैं, और storage space waste करती हैं। इस tool से आप seconds में image file size 50-80% तक reduce कर सकते हैं।' },
  whyUse: { title: 'Image Compressor क्यों use करें?', points: [
    'Website loading speed 2-3x improve करें - Google ranking boost',
    'File size 50-80% तक reduce करें without visible quality loss',
    'Storage space और bandwidth save करें',
    'Email attachments size limit में fit करें',
    '100% browser-based processing - complete privacy',
    'No signup, no login, no watermark - unlimited use',
    'JPG, PNG, WebP सभी popular formats support',
    'Mobile friendly - phone से भी compress करें',
  ] },
  howToUse: { title: 'Image Compressor कैसे use करें (Step-by-Step Guide)', steps: [
    'Upload button click करें या image drag & drop करें - JPG, PNG, WebP formats supported',
    'Quality slider adjust करें - 70-80% recommended (balance between size और quality)',
    'Preview में original और compressed image compare करें',
    'File size reduction percentage check करें',
    'Download button click करके compressed image save करें',
  ] },
  useCases: { title: 'Use Cases', cases: [
    'Website और blog images optimize करें - faster page loading और better Google ranking',
    'Social media (Instagram, Facebook, Twitter) uploads - faster upload speed',
    'Email attachments - 25MB limit में बड़ी images fit करें',
    'E-commerce product photos - hundreds of images quickly compress करें',
    'WhatsApp और Telegram status images - data save करें',
    'School/College assignments और presentations के लिए',
    'WordPress और other CMS platforms के लिए media optimization',
  ] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'Image Resizer', href: '/tools/image-resizer' },
    { title: 'JPG to PNG Converter', href: '/tools/jpg-to-png' },
    { title: 'PNG to JPG Converter', href: '/tools/png-to-jpg' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Word Counter', href: '/tools/word-counter' },
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
