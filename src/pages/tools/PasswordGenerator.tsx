import { useState, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Key, Copy, RefreshCw, CheckCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Password Generator Online Free',
  titleHi: 'पासवर्ड जनरेटर ऑनलाइन फ्री',
  description: 'Free Strong Password Generator - Create secure, random passwords instantly. Customize length, characters. Cryptographically secure. No data stored.',
  descriptionHi: 'मुफ्त पासवर्ड जनरेटर - मजबूत और सुरक्षित पासवर्ड बनाएं। Length और characters customize करें। 100% Secure, कोई data store नहीं।',
  keywords: [
    'password generator',
    'strong password generator',
    'random password generator',
    'secure password generator',
    'password generator online free',
    'पासवर्ड जनरेटर',
    'password kaise banaye',
    'strong password kaise banaye',
    'best password generator',
    'password maker',
    'random password',
    'password generator India',
  ],
  canonicalUrl: '/tools/password-generator',
  toolName: 'Password Generator',
  category: 'Security Tool',
  faqs: [
    {
      question: 'Strong Password क्या होता है?',
      answer: 'एक strong password में minimum 12-16 characters होने चाहिए जिसमें uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), और special characters (!@#$%) शामिल हों। यह predictable patterns या personal information से बचना चाहिए।',
    },
    {
      question: 'क्या यह Password Generator secure है?',
      answer: 'हाँ, 100% secure है। हम Web Crypto API (crypto.getRandomValues) use करते हैं जो cryptographically secure random numbers generate करता है। आपका password कहीं भी store या transmit नहीं होता - सब कुछ आपके browser में locally होता है।',
    },
    {
      question: 'Password कितना लंबा होना चाहिए?',
      answer: 'Minimum 12 characters recommended है, लेकिन 16+ characters ideal है। जितना लंबा password, उतना secure। Important accounts (banking, email) के लिए 20+ characters use करें।',
    },
    {
      question: 'क्या मुझे हर account के लिए अलग password use करना चाहिए?',
      answer: 'हाँ, absolutely! हर account के लिए unique password use करें। अगर एक password leak हो जाए, तो बाकी accounts safe रहेंगे। Password manager use करें सब याद रखने के लिए।',
    },
    {
      question: 'Generated password कैसे याद रखें?',
      answer: 'Password manager जैसे Bitwarden (free), 1Password, या browser built-in password manager use करें। ये securely आपके सभी passwords store करते हैं और auto-fill भी करते हैं।',
    },
    {
      question: 'क्या special characters जरूरी हैं?',
      answer: 'Special characters password को significantly stronger बनाते हैं। हालांकि कुछ websites specific characters allow नहीं करतीं, इसलिए हमारा tool आपको choose करने देता है कि कौन से character types include करने हैं।',
    },
  ],
  howToSteps: [
    'Password length slider से length select करें (12-64 characters)',
    'Character types choose करें - Uppercase, Lowercase, Numbers, Special Characters',
    'Generate Password button click करें',
    'Password strength indicator देखें',
    'Copy button से password copy करें',
    'Password manager में save करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'Password Generator क्या है?',
    content: `Password Generator एक online security tool है जो strong, random passwords create करता है जिन्हें hackers के लिए guess करना virtually impossible होता है।

    हमारा free password generator cryptographically secure random number generation (Web Crypto API) use करता है - यही technology banks और government organizations use करते हैं। आपके passwords कहीं भी store या send नहीं होते - complete privacy guarantee।

    Weak passwords आज भी सबसे बड़ी security vulnerability है। "123456", "password", या अपना birthday use करने से hackers seconds में accounts hack कर लेते हैं। Dictionary attacks और brute force attacks से बचने का एक ही तरीका है - truly random, long, complex passwords। यही काम यह tool करता है।`,
  },
  whyUse: {
    title: 'हमारा Password Generator क्यों use करें?',
    points: [
      'Cryptographically Secure - Web Crypto API से truly random passwords',
      '100% Private - कोई data server पर नहीं जाता, browser में locally generate',
      'Customizable - Length, character types अपनी जरूरत के हिसाब से',
      'Strength Indicator - Real-time password strength analysis',
      'One-Click Copy - Instantly clipboard में copy करें',
      'No Registration - बिना signup के immediately use करें',
      'Mobile Friendly - Phone पर भी perfectly काम करता है',
      'Unlimited Usage - जितने चाहें उतने passwords generate करें',
    ],
  },
  howToUse: {
    title: 'Strong Password कैसे Generate करें',
    steps: [
      'सबसे पहले password length decide करें। Slider drag करके 8 से 64 characters के बीच choose करें। Important accounts के लिए 16+ recommended है।',
      'Character types select करें: Uppercase (A-Z) बड़े अक्षर, Lowercase (a-z) छोटे अक्षर, Numbers (0-9) अंक, और Special Characters (!@#$%) symbols',
      'All four character types ON रखना best practice है - इससे password सबसे strong बनता है',
      '"Generate Password" button पर click करें। Instant में random password generate हो जाएगा',
      'Password strength meter देखें - Green color और "Very Strong" label means excellent password',
      'Copy button (clipboard icon) click करें password copy करने के लिए',
      'Password को अपने password manager में save करें या directly use करें',
      'प्रत्येक account के लिए इस process को repeat करें - हर जगह unique password use करें',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'Email Accounts - Gmail, Outlook जैसे primary email accounts के लिए 16+ character strong passwords',
      'Banking & Financial - Net banking, UPI apps, investment platforms के लिए maximum security passwords',
      'Social Media - Facebook, Instagram, Twitter accounts protect करने के लिए',
      'E-commerce - Amazon, Flipkart, online shopping accounts के लिए unique passwords',
      'Work Accounts - Office email, Slack, project management tools के लिए',
      'WiFi Networks - Home और office WiFi passwords set करने के लिए',
      'Cloud Storage - Google Drive, Dropbox, OneDrive के लिए',
      'Gaming Accounts - Steam, PlayStation, Xbox accounts secure करने के लिए',
      'Subscription Services - Netflix, Spotify, Prime जैसी services के लिए',
      'Website Admin - WordPress, hosting panel, domain accounts के लिए extra strong passwords',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
  ],
};

export default function PasswordGenerator() {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = '';
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length[0]; i++) {
      result += chars[array[i] % chars.length];
    }
    
    setPassword(result);
    setCopied(false);
  }, [length, options, toast]);

  const copyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "Password copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    if (score <= 2) return { level: score, label: 'Weak', color: 'text-destructive' };
    if (score <= 3) return { level: score, label: 'Medium', color: 'text-yellow-500' };
    if (score <= 4) return { level: score, label: 'Strong', color: 'text-accent' };
    return { level: score, label: 'Very Strong', color: 'text-green-500' };
  };

  const strength = getStrength();

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Password Generator' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Strong Password Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Secure, random passwords - एक click में
            </p>
          </header>

          {/* Password Display */}
          <Card className="p-6 mb-6">
            <div className="relative">
              <Input
                type="text"
                value={password}
                readOnly
                placeholder="Click 'Generate' to create password"
                className="pr-24 h-14 text-lg font-mono bg-muted/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={copyPassword}
                  disabled={!password}
                  className="h-10 w-10"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={generatePassword}
                  className="h-10 w-10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Strength Indicator */}
            {password && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Password Strength</span>
                  <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      strength.level <= 2 ? 'bg-destructive' :
                      strength.level <= 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${(strength.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Options */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-6">Customize Password</h3>
            
            {/* Length Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <Label>Password Length</Label>
                <span className="text-2xl font-bold text-primary">{length[0]}</span>
              </div>
              <Slider
                value={length}
                onValueChange={setLength}
                min={8}
                max={64}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">ABC</span>
                  <span className="text-sm text-muted-foreground">Uppercase Letters</span>
                </div>
                <Switch
                  checked={options.uppercase}
                  onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">abc</span>
                  <span className="text-sm text-muted-foreground">Lowercase Letters</span>
                </div>
                <Switch
                  checked={options.lowercase}
                  onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">123</span>
                  <span className="text-sm text-muted-foreground">Numbers</span>
                </div>
                <Switch
                  checked={options.numbers}
                  onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">!@#</span>
                  <span className="text-sm text-muted-foreground">Special Characters</span>
                </div>
                <Switch
                  checked={options.symbols}
                  onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Generate Button */}
          <Button 
            onClick={generatePassword} 
            className="w-full btn-gradient h-14 text-lg"
          >
            <Key className="h-5 w-5 mr-2" />
            Generate Password
          </Button>

          {/* Info */}
          <div className="mt-8 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Your Privacy is Protected</h4>
                <p className="text-sm text-muted-foreground">
                  Passwords are generated locally in your browser using cryptographically secure random numbers. 
                  We never store or transmit your passwords.
                </p>
              </div>
            </div>
          </div>

          {/* SEO Content Sections */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
