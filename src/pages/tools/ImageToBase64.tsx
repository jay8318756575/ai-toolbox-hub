import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, Upload, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Image to Base64 Converter Online Free',
  titleHi: 'इमेज टू Base64 कन्वर्टर',
  description: 'Free image to Base64 converter. Convert any image (PNG, JPG, WebP, GIF) to Base64 encoded string instantly.',
  descriptionHi: 'फ्री इमेज टू Base64 कन्वर्टर। किसी भी image को Base64 string में बदलें।',
  keywords: ['image to base64', 'base64 image converter', 'convert image to base64', 'base64 encode image', 'data url'],
  canonicalUrl: '/tools/image-to-base64',
  toolName: 'Image to Base64',
  category: 'Developer Tool',
  faqs: [
    { question: 'What is Base64 image encoding?', answer: 'Base64 encoding converts binary image data into ASCII text, allowing images to be embedded directly in HTML, CSS, or JSON.' },
    { question: 'What image formats are supported?', answer: 'PNG, JPG, WebP, GIF, SVG, and BMP formats are all supported.' },
    { question: 'Is there a file size limit?', answer: 'For best performance, images under 5MB are recommended. Processing happens in your browser.' },
  ],
  howToSteps: ['Click Upload or drag an image file', 'The Base64 string is generated instantly', 'Copy the Base64 string or Data URL', 'Use it in your HTML, CSS, or code'],
};

const contentData = {
  title: 'Free Image to Base64 Converter',
  introContent: `<p>Convert any <strong>image to Base64</strong> encoded string instantly. Perfect for embedding images in HTML, CSS, emails, or JSON APIs without hosting separate files.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'All Formats', description: 'Supports PNG, JPG, WebP, GIF, SVG, BMP.' },
    { title: 'Data URL Ready', description: 'Get a complete data URL for direct embedding.' },
    { title: 'Preview', description: 'See the image preview before converting.' },
    { title: 'Private', description: 'No upload to server — all local processing.' },
  ],
};

export default function ImageToBase64() {
  const { toast } = useToast();
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const copy = async (text: string) => { await navigator.clipboard.writeText(text); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Image to Base64' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><ImageIcon className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Image to Base64 Converter</h1>
            <p className="text-muted-foreground text-lg">Image को Base64 encoded string में convert करें</p>
          </header>
          <Card className="p-6 mb-6">
            <input type="file" ref={fileRef} accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}>
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">{fileName || 'Click or drag image here'}</p>
              <p className="text-sm text-muted-foreground mt-1">Supports PNG, JPG, WebP, GIF, SVG</p>
            </div>
          </Card>
          {preview && (
            <>
              <Card className="p-4 mb-4">
                <h3 className="font-semibold text-sm mb-3">Preview</h3>
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
              </Card>
              <Card className="p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Base64 Data URL</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => copy(base64)}><Copy className="h-4 w-4 mr-1" /> Copy Data URL</Button>
                    <Button size="sm" variant="ghost" onClick={() => copy(base64.split(',')[1] || '')}><Copy className="h-4 w-4 mr-1" /> Copy Base64 Only</Button>
                  </div>
                </div>
                <Textarea value={base64} readOnly className="min-h-[150px] font-mono text-xs" />
                <p className="text-xs text-muted-foreground mt-2">{(base64.length / 1024).toFixed(1)} KB encoded</p>
              </Card>
            </>
          )}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
