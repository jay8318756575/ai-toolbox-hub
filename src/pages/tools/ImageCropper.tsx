import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, Crop, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Image Cropper Online Free - Crop Images Instantly',
  titleHi: 'इमेज क्रॉपर ऑनलाइन फ्री',
  description: 'Free online image cropper. Crop any image to exact dimensions. Supports PNG, JPG, WebP. No upload needed.',
  descriptionHi: 'फ्री ऑनलाइन इमेज क्रॉपर। किसी भी image को exact dimensions में crop करें।',
  keywords: ['image cropper', 'crop image online', 'image crop tool', 'photo cropper', 'crop photo'],
  canonicalUrl: '/tools/image-cropper',
  toolName: 'Image Cropper',
  category: 'Image Tool',
  faqs: [
    { question: 'How do I crop an image?', answer: 'Upload your image, set the crop dimensions (x, y, width, height), and download the cropped result.' },
    { question: 'What formats are supported?', answer: 'PNG, JPG, WebP, GIF, and BMP are all supported.' },
    { question: 'Is my image uploaded to a server?', answer: 'No, all processing happens in your browser. Your images never leave your device.' },
  ],
  howToSteps: ['Upload an image', 'Set crop area dimensions', 'Click Crop', 'Download the cropped image'],
};

const contentData = {
  title: 'Free Image Cropper Online',
  introContent: `<p>Crop any <strong>image</strong> to exact dimensions instantly. Works with PNG, JPG, WebP. All processing in your browser — no uploads needed.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Precise Cropping', description: 'Set exact X, Y, width, and height values.' },
    { title: 'All Formats', description: 'Supports PNG, JPG, WebP, GIF.' },
    { title: 'Instant Download', description: 'Download cropped image immediately.' },
    { title: 'Private', description: 'No server upload, 100% local processing.' },
  ],
};

export default function ImageCropper() {
  const { toast } = useToast();
  const [imgSrc, setImgSrc] = useState('');
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const [croppedUrl, setCroppedUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      setImgSrc(src);
      const img = new Image();
      img.onload = () => { setImgSize({ w: img.width, h: img.height }); setCrop({ x: 0, y: 0, w: Math.min(200, img.width), h: Math.min(200, img.height) }); };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const doCrop = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.w; canvas.height = crop.h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      setCroppedUrl(canvas.toDataURL('image/png'));
      toast({ title: 'Cropped! ✓' });
    };
    img.src = imgSrc;
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Image Cropper' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Crop className="h-4 w-4" /><span>Image Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Image Cropper Online Free</h1>
            <p className="text-muted-foreground text-lg">Image को exact dimensions में crop करें</p>
          </header>
          <Card className="p-6 mb-6">
            <input type="file" ref={fileRef} accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
            {!imgSrc ? (
              <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileRef.current?.click()}>
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium">Click or drag image here</p>
              </div>
            ) : (
              <>
                <img src={imgSrc} alt="Original" className="max-h-64 mx-auto rounded-lg mb-4" />
                <p className="text-sm text-muted-foreground text-center mb-4">Original: {imgSize.w} × {imgSize.h}px</p>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div><label className="text-xs mb-1 block">X</label><Input type="number" value={crop.x} onChange={e => setCrop({ ...crop, x: Number(e.target.value) })} min={0} /></div>
                  <div><label className="text-xs mb-1 block">Y</label><Input type="number" value={crop.y} onChange={e => setCrop({ ...crop, y: Number(e.target.value) })} min={0} /></div>
                  <div><label className="text-xs mb-1 block">Width</label><Input type="number" value={crop.w} onChange={e => setCrop({ ...crop, w: Number(e.target.value) })} min={1} /></div>
                  <div><label className="text-xs mb-1 block">Height</label><Input type="number" value={crop.h} onChange={e => setCrop({ ...crop, h: Number(e.target.value) })} min={1} /></div>
                </div>
                <div className="flex justify-center gap-3">
                  <Button onClick={doCrop} className="btn-gradient"><Crop className="h-4 w-4 mr-2" /> Crop</Button>
                  <Button variant="outline" onClick={() => { setImgSrc(''); setCroppedUrl(''); }}>Reset</Button>
                </div>
              </>
            )}
          </Card>
          {croppedUrl && (
            <Card className="p-6 mb-6 text-center">
              <h3 className="font-semibold mb-3">Cropped Result</h3>
              <img src={croppedUrl} alt="Cropped" className="max-h-64 mx-auto rounded-lg mb-4" />
              <a href={croppedUrl} download="cropped-image.png"><Button className="btn-gradient"><Download className="h-4 w-4 mr-2" /> Download</Button></a>
            </Card>
          )}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
