import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, ImageIcon, X, CheckCircle, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OutputFormat = 'png' | 'jpeg' | 'webp';

interface ConvertedImage {
  name: string;
  url: string;
  size: number;
  format: string;
}

const seoData = {
  title: 'Image Converter Online Free - PNG JPG WebP',
  titleHi: 'इमेज कन्वर्टर ऑनलाइन फ्री',
  description: 'Free Online Image Converter - Convert images to PNG, JPG, WebP formats. Batch conversion supported. Adjust quality. No upload limit. Privacy guaranteed.',
  descriptionHi: 'मुफ्त इमेज कन्वर्टर - PNG, JPG, WebP में images convert करें। Batch conversion support। Quality adjust करें। Privacy guaranteed।',
  keywords: [
    'image converter',
    'image converter online free',
    'PNG to JPG converter',
    'JPG to PNG converter',
    'WebP converter',
    'image format converter',
    'इमेज कन्वर्टर',
    'photo converter',
    'picture converter',
    'batch image converter',
    'free image converter',
    'online image converter',
    'convert image to PNG',
    'convert image to WebP',
  ],
  canonicalUrl: '/tools/image-converter',
  toolName: 'Image Converter',
  category: 'Converter Tool',
  faqs: [
    {
      question: 'PNG, JPG और WebP में क्या difference है?',
      answer: 'PNG lossless format है जो transparency support करता है - logos और graphics के लिए best। JPG lossy compression use करता है - photos के लिए ideal, smaller file size। WebP Google का modern format है जो best quality-to-size ratio देता है और transparency भी support करता है।',
    },
    {
      question: 'Image convert करने से quality कम होती है?',
      answer: 'PNG में convert करने से quality loss नहीं होता (lossless)। JPG और WebP में आप quality slider से control कर सकते हैं - 80-90% quality पर minimal visible difference होता है लेकिन file size काफी कम हो जाता है।',
    },
    {
      question: 'क्या batch conversion free है?',
      answer: 'हाँ, आप unlimited images एक साथ convert कर सकते हैं। कोई limit नहीं है। सभी files browser में locally process होती हैं।',
    },
    {
      question: 'क्या मेरी images upload होती हैं?',
      answer: 'नहीं, आपकी images कहीं upload नहीं होतीं। सब कुछ आपके browser में locally HTML5 Canvas API से process होता है। 100% private और secure।',
    },
    {
      question: 'WebP format क्यों use करें?',
      answer: 'WebP images JPG से 25-35% छोटी होती हैं same quality पर। Modern browsers सभी WebP support करते हैं। Website speed improve करने के लिए WebP best choice है।',
    },
    {
      question: 'Transparent background कैसे रखें?',
      answer: 'Transparency के लिए PNG या WebP format choose करें। JPG transparency support नहीं करता - वह transparent areas को white background से replace कर देता है।',
    },
  ],
  howToSteps: [
    'Upload area में click करें या images drag & drop करें',
    'Multiple images select कर सकते हैं batch conversion के लिए',
    'Output format choose करें - PNG, JPG, या WebP',
    'JPG/WebP के लिए quality slider adjust करें',
    'Convert button click करें',
    'Individual या Download All से files save करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'Image Converter क्या है?',
    content: `Image Converter एक free online tool है जो आपकी images को different formats में convert करता है। PNG, JPG, और WebP - तीनों popular formats में conversion support है।

    यह tool HTML5 Canvas API use करता है जिसका मतलब है कि आपकी images आपके browser में locally process होती हैं। कोई server upload नहीं, कोई privacy concern नहीं। आप sensitive images भी safely convert कर सकते हैं।

    Batch conversion support के साथ, आप multiple images एक साथ convert कर सकते हैं। Quality slider से आप file size और quality के बीच perfect balance find कर सकते हैं। Web developers, designers, और regular users सभी के लिए useful tool।`,
  },
  whyUse: {
    title: 'हमारा Image Converter क्यों use करें?',
    points: [
      '100% Free - कोई hidden charges या watermarks नहीं',
      'Privacy First - Images upload नहीं होतीं, browser में locally process',
      'Batch Support - Multiple images एक साथ convert करें',
      'Quality Control - Slider से precise quality adjustment',
      'Modern Formats - WebP support for better compression',
      'No Registration - Instantly use करें, कोई signup नहीं',
      'Fast Processing - Instant conversion, no waiting',
      'Unlimited Usage - Convert as many images as you want',
    ],
  },
  howToUse: {
    title: 'Images कैसे Convert करें - Complete Guide',
    steps: [
      'Page पर upload area दिखेगा। इस पर click करें या अपनी images drag & drop करें',
      'File picker open होगा - एक या multiple images select कर सकते हैं। PNG, JPG, WebP, GIF सभी supported हैं',
      'Selected files की list दिखेगी। किसी file को remove करने के लिए X button click करें',
      'Output Format dropdown से target format choose करें: PNG (lossless, transparency), JPG (photos), या WebP (best compression)',
      'अगर JPG या WebP select किया है, तो Quality slider adjust करें। 85% आमतौर पर best balance देता है',
      '"Convert Images" button पर click करें। Processing instantly होगी',
      'Converted images की list दिखेगी original vs new size के साथ। Individual download करें या "Download All" use करें',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'Website Optimization - JPG/PNG को WebP में convert करें for faster loading',
      'Social Media - Different platforms के requirements के हिसाब से format change करें',
      'Email Attachments - Large images को compressed JPG में convert करें smaller size के लिए',
      'Transparent Logos - JPG logo को PNG में convert करें transparency के लिए',
      'Print Preparation - WebP images को high-quality PNG में convert करें printing के लिए',
      'E-commerce - Product images को optimized WebP में convert करें',
      'Portfolio - Photos को web-ready formats में convert करें',
      'Documentation - Screenshots को appropriate format में convert करें',
      'App Development - Assets को required formats में batch convert करें',
      'Archive - Old formats को modern WebP में convert करें space saving के लिए',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
  ],
};

export default function ImageConverter() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png');
  const [quality, setQuality] = useState([85]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select valid image files",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    setConvertedImages([]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertImages = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    const results: ConvertedImage[] = [];

    for (const file of selectedFiles) {
      try {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            if (ctx) {
              if (outputFormat === 'jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
              
              ctx.drawImage(img, 0, 0);
              
              const mimeType = `image/${outputFormat}`;
              const qualityValue = outputFormat === 'png' ? undefined : quality[0] / 100;
              
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    const originalName = file.name.replace(/\.[^/.]+$/, '');
                    results.push({
                      name: `${originalName}.${outputFormat}`,
                      url,
                      size: blob.size,
                      format: outputFormat.toUpperCase(),
                    });
                  }
                  resolve();
                },
                mimeType,
                qualityValue
              );
            }
          };
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });
      } catch (err) {
        console.error('Error converting image:', err);
      }
    }

    setConvertedImages(results);
    setIsConverting(false);
    
    toast({
      title: "Conversion Complete! ✓",
      description: `${results.length} image(s) converted to ${outputFormat.toUpperCase()}`,
    });
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.click();
  };

  const downloadAll = () => {
    convertedImages.forEach(image => {
      setTimeout(() => downloadImage(image), 100);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Image Converter' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-converter/10 text-converter text-sm mb-4">
              <FileImage className="h-4 w-4" />
              <span>Free Image Converter</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Image Converter Online Free
            </h1>
            <p className="text-muted-foreground text-lg">
              PNG, JPG, WebP में convert करें - Batch Support
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card 
                className="p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Drop images here</h3>
                  <p className="text-sm text-muted-foreground">
                    या click करके select करें
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG, WebP, GIF supported
                  </p>
                </div>
              </Card>

              {selectedFiles.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Selected Files ({selectedFiles.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Conversion Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label>Output Format</Label>
                    <Select
                      value={outputFormat}
                      onValueChange={(v) => setOutputFormat(v as OutputFormat)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG (Lossless)</SelectItem>
                        <SelectItem value="jpeg">JPG (Smaller size)</SelectItem>
                        <SelectItem value="webp">WebP (Best quality/size)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {outputFormat !== 'png' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Quality</Label>
                        <span className="text-sm font-medium">{quality[0]}%</span>
                      </div>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        min={10}
                        max={100}
                        step={5}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Button 
                onClick={convertImages} 
                className="w-full btn-gradient h-12"
                disabled={selectedFiles.length === 0 || isConverting}
              >
                {isConverting ? (
                  "Converting..."
                ) : (
                  <>
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Convert {selectedFiles.length} Image(s)
                  </>
                )}
              </Button>
            </div>

            {/* Output Section */}
            <div>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Converted Images</h3>
                  {convertedImages.length > 1 && (
                    <Button size="sm" variant="outline" onClick={downloadAll}>
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  )}
                </div>

                {convertedImages.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Converted images यहाँ दिखेंगी
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {convertedImages.map((image, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                            <CheckCircle className="h-5 w-5 text-accent" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{image.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {image.format} • {formatFileSize(image.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadImage(image)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* SEO Content Sections */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
