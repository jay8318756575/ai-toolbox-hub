import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, RefreshCw, Loader2, Trash2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParaphraser } from '@/hooks/useAITools';

const seoData = {
  title: 'AI Paraphrasing Tool Free - Rewrite Text Online',
  titleHi: 'AI पैराफ्रेज़िंग टूल फ्री',
  description: 'Free AI Paraphrasing Tool - Rewrite sentences, paragraphs, and articles instantly. Multiple tones available. Hindi & English support. No signup required.',
  descriptionHi: 'फ्री AI पैराफ्रेज़िंग टूल - वाक्यों और पैराग्राफ को instantly rewrite करें। Multiple tones available।',
  keywords: [
    'paraphrasing tool',
    'paraphrase online free',
    'rewrite text AI',
    'sentence rewriter',
    'article rewriter',
    'पैराफ्रेज़िंग टूल',
    'text rewriter free',
    'AI paraphraser',
    'plagiarism remover',
    'content rewriter',
  ],
  canonicalUrl: '/tools/ai-paraphraser',
  toolName: 'AI Paraphraser',
  category: 'AI Writing Tool',
  faqs: [
    {
      question: 'Paraphrasing का मतलब क्या है?',
      answer: 'Paraphrasing means rewriting text in different words while keeping the original meaning intact। यह plagiarism avoid करने और content को fresh बनाने के लिए useful है।',
    },
    {
      question: 'क्या paraphrased content unique होता है?',
      answer: 'हाँ, AI completely new sentence structures और words use करता है, जिससे output unique और plagiarism-free होता है।',
    },
    {
      question: 'कितना text एक बार में paraphrase कर सकते हैं?',
      answer: 'आप एक बार में 2000-3000 words तक का text paraphrase कर सकते हैं। Longer content के लिए parts में करें।',
    },
  ],
  howToSteps: [
    'Original text paste करें',
    'Tone select करें (Standard, Formal, Creative)',
    'Paraphrase button click करें',
    'AI rewritten text receive करें',
    'Review और copy करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'AI Paraphrasing Tool क्या है?',
    content: `AI Paraphrasing Tool एक smart rewriting assistant है जो आपके text को completely नए words में rewrite करता है while keeping the original meaning intact।

    Students, writers, और content creators के लिए यह tool बहुत useful है। Plagiarism avoid करने, content को fresh बनाने, और different styles में लिखने के लिए perfect है।`,
  },
  whyUse: {
    title: 'AI Paraphraser क्यों use करें?',
    points: [
      'Instant Rewriting - Seconds में complete rewrite',
      'Meaning Preserved - Original sense intact रहता है',
      'Multiple Tones - Different styles available',
      'Plagiarism Free - Unique output हर बार',
      'Natural Language - Human-like writing',
      'Free & Fast - No charges, instant results',
    ],
  },
  howToUse: {
    title: 'Paraphraser कैसे use करें',
    steps: [
      'Input box में वो text paste करें जिसे rewrite करना है।',
      'Tone dropdown से style choose करें - Standard, Formal, या Creative।',
      'Paraphrase button पर click करें।',
      'AI generated rewritten text को review करें।',
      'Copy button से output copy करें।',
    ],
  },
  useCases: {
    title: 'Use Cases',
    cases: [
      'Academic Writing - Essays और assignments के लिए',
      'Content Marketing - Blog posts refresh करने के लिए',
      'Social Media - Captions rewrite करने के लिए',
      'Email Writing - Professional emails के लिए',
      'Research Papers - Citations paraphrase करने के लिए',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
    { title: 'Grammar Checker', href: '/tools/grammar-checker' },
    { title: 'AI Summarizer', href: '/tools/ai-summarizer' },
  ],
};

const tones = [
  { value: 'standard', label: 'Standard' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'creative', label: 'Creative' },
  { value: 'academic', label: 'Academic' },
];

export default function AIParaphraser() {
  const { toast } = useToast();
  const { result, isProcessing, error, paraphrase, clear } = useParaphraser();
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('standard');
  const [copied, setCopied] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Text Required',
        description: 'Please enter text to paraphrase',
        variant: 'destructive',
      });
      return;
    }

    await paraphrase(inputText, tone);
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast({ title: 'Copied! ✓', description: 'Paraphrased text copied' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  const handleClear = () => {
    setInputText('');
    clear();
  };

  const swapTexts = () => {
    if (result) {
      setInputText(result);
      clear();
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'AI Paraphraser' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <RefreshCw className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              AI Paraphrasing Tool Free
            </h1>
            <p className="text-muted-foreground text-lg">
              Text को instantly rewrite करें - Same meaning, different words
            </p>
          </header>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tone:</span>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleParaphrase}
              disabled={isProcessing}
              className="btn-gradient"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rewriting...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Paraphrase
                </>
              )}
            </Button>

            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Editor */}
          <div className="grid lg:grid-cols-2 gap-4 relative">
            {/* Input */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Original Text</h3>
                <span className="text-xs text-muted-foreground">
                  {inputText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <Textarea
                placeholder="Paste the text you want to paraphrase here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </Card>

            {/* Swap Button */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Button
                size="icon"
                variant="outline"
                onClick={swapTexts}
                disabled={!result}
                className="rounded-full bg-background"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* Output */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Paraphrased Text</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyResult}
                  disabled={!result}
                >
                  {copied ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Copied</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
              <div className="min-h-[300px] bg-muted/30 rounded-lg p-4">
                {result || (isProcessing && <span className="text-muted-foreground">AI is rewriting...</span>)}
                {isProcessing && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
                {!result && !isProcessing && (
                  <span className="text-muted-foreground">Paraphrased text will appear here...</span>
                )}
              </div>
              {result && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {result.split(/\s+/).filter(Boolean).length} words
                </div>
              )}
            </Card>
          </div>

          {/* Mobile Swap */}
          <div className="lg:hidden flex justify-center my-4">
            <Button variant="outline" onClick={swapTexts} disabled={!result}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Use as Input
            </Button>
          </div>

          {/* SEO Content */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
