import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, Languages, Loader2, Trash2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslator } from '@/hooks/useAITools';

const seoData = {
  title: 'AI Translator Free - Translate Text Online',
  titleHi: 'AI ट्रांसलेटर फ्री',
  description: 'Free AI Translator - Translate text between languages instantly. Hindi, English, and 50+ languages supported.',
  descriptionHi: 'फ्री AI ट्रांसलेटर - Text को instantly translate करें।',
  keywords: ['AI translator', 'translate online', 'Hindi translator', 'English translator', 'free translation'],
  canonicalUrl: '/tools/ai-translator',
  toolName: 'AI Translator',
  category: 'AI Tool',
  faqs: [],
  howToSteps: [],
};

const languages = [
  { value: 'Hindi', label: 'हिंदी (Hindi)' },
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Español (Spanish)' },
  { value: 'French', label: 'Français (French)' },
  { value: 'German', label: 'Deutsch (German)' },
  { value: 'Chinese', label: '中文 (Chinese)' },
  { value: 'Japanese', label: '日本語 (Japanese)' },
  { value: 'Korean', label: '한국어 (Korean)' },
  { value: 'Arabic', label: 'العربية (Arabic)' },
  { value: 'Portuguese', label: 'Português (Portuguese)' },
  { value: 'Russian', label: 'Русский (Russian)' },
  { value: 'Italian', label: 'Italiano (Italian)' },
];

export default function AITranslator() {
  const { toast } = useToast();
  const { translatedText, isProcessing, error, translate, clear } = useTranslator();
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({ title: 'Text Required', description: 'Please enter text to translate', variant: 'destructive' });
      return;
    }
    await translate(inputText, targetLang);
  };

  const copyTranslation = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      toast({ title: 'Copied! ✓' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  const swapTexts = () => {
    if (translatedText) {
      setInputText(translatedText);
      clear();
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'AI Translator' }]} />

          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <Languages className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">AI Translator Free</h1>
            <p className="text-muted-foreground text-lg">50+ languages में translate करें</p>
          </header>

          <div className="flex justify-center gap-4 mb-6">
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((l) => (
                  <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleTranslate} disabled={isProcessing} className="btn-gradient">
              {isProcessing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Translating...</> : <><Languages className="h-4 w-4 mr-2" /> Translate</>}
            </Button>
          </div>

          {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center">{error}</div>}

          <div className="grid lg:grid-cols-2 gap-4 relative">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Original Text</h3>
                <Button size="sm" variant="ghost" onClick={() => { setInputText(''); clear(); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Enter text to translate..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[250px] resize-none"
              />
            </Card>

            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Button size="icon" variant="outline" onClick={swapTexts} disabled={!translatedText} className="rounded-full bg-background">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Translation ({targetLang})</h3>
                <Button size="sm" variant="ghost" onClick={copyTranslation} disabled={!translatedText}>
                  {copied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="min-h-[250px] bg-muted/30 rounded-lg p-4">
                {translatedText || (isProcessing && <span className="text-muted-foreground">Translating...</span>)}
                {isProcessing && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
                {!translatedText && !isProcessing && <span className="text-muted-foreground">Translation will appear here...</span>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
