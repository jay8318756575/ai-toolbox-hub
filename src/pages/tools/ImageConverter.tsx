import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
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
              // For JPEG, fill with white background (no transparency)
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
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-converter/10 text-converter text-sm mb-4">
              <FileImage className="h-4 w-4" />
              <span>Free Image Converter</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Image Converter
            </h1>
            <p className="text-muted-foreground">
              PNG, JPG, WebP में convert करें - Batch support
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Upload Area */}
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

              {/* Selected Files */}
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

              {/* Options */}
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
        </div>
      </div>
    </Layout>
  );
}
