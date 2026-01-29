import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
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

export default function QRGenerator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrData, setQrData] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState('300');

  // Form states for different types
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

    setQrData(data);
    
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
      // Convert to JPG with white background
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
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <QrCode className="h-4 w-4" />
              <span>100% Free & Working</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              QR Code Generator
            </h1>
            <p className="text-muted-foreground">
              URL, Text, Contact या WiFi के लिए QR code बनाएं - Instant Download
            </p>
          </div>

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
                <h3 className="font-semibold mb-4">Customize</h3>
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
        </div>
      </div>
    </Layout>
  );
}
