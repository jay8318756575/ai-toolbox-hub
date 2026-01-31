import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Copy, QrCode, Link, User, Wifi, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

type QRType = 'url' | 'text' | 'vcard' | 'wifi';

const seoData = {
  title: 'QR Code Generator Online Free',
  titleHi: 'क्यूआर कोड जनरेटर ऑनलाइन फ्री',
  description: 'Free QR Code Generator - Create QR codes for URLs, Text, WiFi, Contact (vCard) instantly. Download as PNG/JPG. No registration required.',
  descriptionHi: 'मुफ्त क्यूआर कोड जनरेटर - URL, टेक्स्ट, WiFi, Contact के लिए QR code बनाएं। PNG/JPG में download करें। कोई registration नहीं।',
  keywords: [
    'QR code generator',
    'QR code generator online free',
    'free QR code maker',
    'QR code creator',
    'QR code download',
    'WiFi QR code',
    'vCard QR code',
    'URL QR code',
    'क्यूआर कोड जनरेटर',
    'QR code kaise banaye',
    'best QR code generator',
    'custom QR code',
    'QR code generator India',
  ],
  canonicalUrl: '/tools/qr-generator',
  toolName: 'QR Code Generator',
  category: 'Utility Tool',
  faqs: [
    {
      question: 'QR Code क्या होता है?',
      answer: 'QR Code (Quick Response Code) एक 2D barcode है जिसे smartphone camera से scan करके information access की जा सकती है। इसमें URL, text, contact details, WiFi credentials आदि store किए जा सकते हैं।',
    },
    {
      question: 'क्या यह QR Code Generator free है?',
      answer: 'हाँ, यह 100% free है। कोई registration, login, या hidden charges नहीं हैं। आप unlimited QR codes generate और download कर सकते हैं।',
    },
    {
      question: 'QR Code कितने समय तक valid रहता है?',
      answer: 'हमारे static QR codes lifetime valid रहते हैं। जब तक linked content (URL, text) available है, QR code काम करता रहेगा।',
    },
    {
      question: 'क्या मैं QR Code को customize कर सकता हूँ?',
      answer: 'हाँ, आप QR code का color, background color, और size customize कर सकते हैं। Custom colors से आप branded QR codes बना सकते हैं।',
    },
    {
      question: 'कौन से formats में download कर सकते हैं?',
      answer: 'आप PNG और JPG formats में high-quality QR code download कर सकते हैं। PNG transparent background के साथ आता है, JPG में white background होता है।',
    },
    {
      question: 'WiFi QR Code कैसे काम करता है?',
      answer: 'WiFi QR Code में आपके network का SSID (नाम), password, और encryption type encoded होता है। Scan करने पर device automatically WiFi से connect हो जाता है।',
    },
  ],
  howToSteps: [
    'QR Code type चुनें (URL, Text, Contact, या WiFi)',
    'Required information enter करें',
    'Colors और size customize करें (optional)',
    'Generate QR Code button पर click करें',
    'PNG या JPG format में download करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'QR Code Generator क्या है?',
    content: `QR Code Generator एक online tool है जो आपको instantly QR codes बनाने की सुविधा देता है। QR (Quick Response) code एक two-dimensional barcode है जिसे किसी भी smartphone के camera से scan किया जा सकता है। 
    
    हमारा free QR code generator आपको URLs, plain text, contact information (vCard), और WiFi credentials के लिए QR codes बनाने की अनुमति देता है। यह tool पूरी तरह से browser-based है, जिसका मतलब है कि आपका data कहीं upload नहीं होता - सब कुछ आपके device पर locally process होता है।
    
    Business cards, marketing materials, product packaging, या personal use के लिए - QR codes information share करने का modern और efficient तरीका है। एक scan में users directly आपकी website, contact card, या WiFi network पर पहुंच सकते हैं।`,
  },
  whyUse: {
    title: 'हमारा QR Code Generator क्यों use करें?',
    points: [
      '100% Free - कोई hidden charges या premium plans नहीं',
      'No Registration - बिना account बनाए instantly use करें',
      'Privacy First - Data locally process होता है, server पर नहीं जाता',
      'Multiple Types - URL, Text, vCard, WiFi सब supported',
      'Custom Colors - Brand colors के साथ personalize करें',
      'High Quality Download - PNG और JPG में crystal clear output',
      'Mobile Friendly - Phone से भी easily use कर सकते हैं',
      'Instant Generation - Real-time preview, no waiting',
    ],
  },
  howToUse: {
    title: 'QR Code कैसे बनाएं - Step by Step Guide',
    steps: [
      'सबसे पहले QR Code type select करें: URL (website link), Text (कोई भी message), Contact (vCard format), या WiFi (network credentials)',
      'अपनी required information fill करें। URL के लिए complete link (https:// सहित), Contact के लिए name, phone, email',
      'Optional: QR code और background का color customize करें। Dark colors QR में और light colors background में best work करते हैं',
      'Size select करें - printing के लिए larger size (400-500px) recommended है',
      '"Generate QR Code" button पर click करें और instantly preview देखें',
      'PNG (transparent background) या JPG (white background) format में download करें',
      'Print करें या digitally share करें - QR code ready है!',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'Business Cards - Contact details instantly share करें, recipient को manually type नहीं करना पड़ेगा',
      'Restaurant Menus - Contactless digital menu access के लिए tables पर QR codes रखें',
      'Event Tickets - Entry verification और attendee information के लिए',
      'Product Packaging - Product page, manual, या warranty registration link करें',
      'WiFi Sharing - Guests को password बताए बिना easily connect करने दें',
      'Payment Links - UPI या payment gateway link share करें',
      'Social Media - Instagram, YouTube, LinkedIn profile directly open करें',
      'Marketing Campaigns - Print ads से website traffic drive करें',
      'Educational Materials - Students को additional resources provide करें',
      'Real Estate - Property listing page directly open करें sign boards से',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
  ],
};

export default function QRGenerator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState('300');

  // Form states
  const [urlInput, setUrlInput] = useState('https://');
  const [textInput, setTextInput] = useState('');
  const [vcardData, setVcardData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
  });
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
  });

  const generateQRData = () => {
    switch (qrType) {
      case 'url':
        return urlInput;
      case 'text':
        return textInput;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.name}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
ORG:${vcardData.company}
END:VCARD`;
      case 'wifi':
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
      default:
        return '';
    }
  };

  const generateQR = async () => {
    const data = generateQRData();
    if (!data || data === 'https://') {
      toast({
        title: "Error",
        description: "Please enter valid data",
        variant: "destructive",
      });
      return;
    }

    if (canvasRef.current) {
      try {
        await QRCode.toCanvas(canvasRef.current, data, {
          width: parseInt(size),
          margin: 2,
          color: {
            dark: qrColor,
            light: bgColor,
          },
        });
        setQrGenerated(true);
        toast({
          title: "QR Code Generated! ✓",
          description: "आपका QR code ready है",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to generate QR code",
          variant: "destructive",
        });
      }
    }
  };

  const downloadQR = (format: 'png' | 'jpg') => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `qrcode.${format}`;
    
    if (format === 'jpg') {
      const canvas = document.createElement('canvas');
      canvas.width = canvasRef.current.width;
      canvas.height = canvasRef.current.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(canvasRef.current, 0, 0);
        link.href = canvas.toDataURL('image/jpeg', 0.9);
      }
    } else {
      link.href = canvasRef.current.toDataURL('image/png');
    }
    
    link.click();
    toast({
      title: "Downloaded! ✓",
      description: `QR code saved as ${format.toUpperCase()}`,
    });
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      toast({
        title: "Copied! ✓",
        description: "QR code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy - try downloading instead",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'QR Code Generator' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <QrCode className="h-4 w-4" />
              <span>100% Free & Working</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              QR Code Generator Online Free
            </h1>
            <p className="text-muted-foreground text-lg">
              URL, Text, Contact या WiFi के लिए QR code बनाएं - Instant Download
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <Tabs value={qrType} onValueChange={(v) => setQrType(v as QRType)}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="url" className="text-xs">
                      <Link className="h-4 w-4 mr-1" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="text" className="text-xs">
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="vcard" className="text-xs">
                      <User className="h-4 w-4 mr-1" />
                      Contact
                    </TabsTrigger>
                    <TabsTrigger value="wifi" className="text-xs">
                      <Wifi className="h-4 w-4 mr-1" />
                      WiFi
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="text">Text Content</Label>
                      <Textarea
                        id="text"
                        placeholder="Enter any text here..."
                        rows={4}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="vcard" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={vcardData.name}
                          onChange={(e) => setVcardData({ ...vcardData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={vcardData.phone}
                          onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={vcardData.email}
                        onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Company Name"
                        value={vcardData.company}
                        onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="wifi" className="space-y-4">
                    <div>
                      <Label htmlFor="ssid">Network Name (SSID)</Label>
                      <Input
                        id="ssid"
                        placeholder="My WiFi Network"
                        value={wifiData.ssid}
                        onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="WiFi Password"
                        value={wifiData.password}
                        onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="encryption">Encryption</Label>
                      <Select
                        value={wifiData.encryption}
                        onValueChange={(v) => setWifiData({ ...wifiData, encryption: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Customization */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Customize QR Code</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="qrColor">QR Color</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        id="qrColor"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="h-10 w-full rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bgColor">Background</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        id="bgColor"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-full rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="size">Size (px)</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="300">300</SelectItem>
                        <SelectItem value="400">400</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Button onClick={generateQR} className="w-full btn-gradient h-12 text-base">
                <QrCode className="h-5 w-5 mr-2" />
                Generate QR Code
              </Button>
            </div>

            {/* Output Section */}
            <div>
              <Card className="p-6 text-center">
                <h3 className="font-semibold mb-4">Your QR Code</h3>
                
                <div className="bg-muted/30 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[320px]">
                  {qrGenerated ? (
                    <canvas ref={canvasRef} className="max-w-full" />
                  ) : (
                    <div className="text-center">
                      <canvas ref={canvasRef} className="hidden" />
                      <QrCode className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        QR code यहाँ दिखेगा
                      </p>
                    </div>
                  )}
                </div>

                {qrGenerated && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => downloadQR('png')} 
                        className="flex-1"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PNG
                      </Button>
                      <Button 
                        onClick={() => downloadQR('jpg')} 
                        className="flex-1"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        JPG
                      </Button>
                      <Button 
                        onClick={copyToClipboard}
                        variant="outline"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-accent">
                      <CheckCircle className="h-4 w-4" />
                      <span>Ready to download!</span>
                    </div>
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
