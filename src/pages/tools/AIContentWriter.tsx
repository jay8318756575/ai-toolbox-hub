import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContentWriter } from '@/hooks/useAITools';

const seoData = {
  title: 'AI Content Writer Free - Article & Blog Generator',
  titleHi: 'AI कंटेंट राइटर फ्री',
  description: 'Free AI Content Writer - Generate SEO-optimized articles, blog posts, and marketing content instantly. Hindi & English support. No signup required.',
  descriptionHi: 'फ्री AI कंटेंट राइटर - SEO-optimized आर्टिकल्स, ब्लॉग पोस्ट्स और मार्केटिंग कंटेंट instantly generate करें।',
  keywords: [
    'AI content writer',
    'AI content writer free',
    'blog post generator',
    'article writer AI',
    'SEO content generator',
    'AI लेखक',
    'content writing tool',
    'AI blog writer',
    'free article generator',
    'Hindi content writer AI',
  ],
  canonicalUrl: '/tools/ai-content-writer',
  toolName: 'AI Content Writer',
  category: 'AI Writing Tool',
  faqs: [
    {
      question: 'AI Content Writer कैसे काम करता है?',
      answer: 'आप बस अपना topic या keyword enter करें, tone और language select करें। AI automatically SEO-optimized, engaging content generate कर देगा जिसे आप copy या download कर सकते हैं।',
    },
    {
      question: 'क्या यह content unique होता है?',
      answer: 'हाँ, हर बार AI नया और unique content generate करता है। यह plagiarism-free होता है और आप directly publish कर सकते हैं।',
    },
    {
      question: 'Hindi में content लिख सकते हैं?',
      answer: 'बिल्कुल! Language dropdown से Hindi या Hinglish select करें। AI natural Hindi में content लिखेगा।',
    },
    {
      question: 'कितना लंबा content generate होता है?',
      answer: 'Default में 500-800 words का content generate होता है। अगर आपको longer content चाहिए तो prompt में specify करें।',
    },
  ],
  howToSteps: [
    'Topic या keyword enter करें',
    'Content tone select करें (Professional, Casual, etc.)',
    'Language choose करें (English, Hindi, Hinglish)',
    'Generate button click करें',
    'AI generated content review करें',
    'Copy या Download करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'AI Content Writer क्या है?',
    content: `AI Content Writer एक advanced AI-powered tool है जो automatically high-quality, SEO-optimized content generate करता है। चाहे blog post हो, article हो, या marketing copy - यह tool seconds में professional content create कर देता है।

    Traditional content writing में घंटों लगते हैं, लेकिन AI की मदद से अब यह काम minutes में हो जाता है। हमारा tool Google Gemini AI का use करता है जो natural, engaging, और error-free content produce करता है।`,
  },
  whyUse: {
    title: 'AI Content Writer क्यों use करें?',
    points: [
      'Instant Content - Seconds में ready content',
      'SEO Optimized - Search engine friendly writing',
      'Multiple Languages - Hindi, English, Hinglish support',
      'Multiple Tones - Professional to casual styles',
      'Plagiarism Free - 100% unique content every time',
      'No Signup - Instantly start writing',
      'Free to Use - No hidden charges',
      'Copy & Download - Easy export options',
    ],
  },
  howToUse: {
    title: 'AI Content Writer कैसे use करें',
    steps: [
      'Topic field में अपना subject या keyword enter करें। जितना specific होगा, उतना better content मिलेगा।',
      'Tone dropdown से अपनी writing style choose करें - Professional, Casual, Friendly, या Formal।',
      'Language select करें - English, Hindi, या mixed Hinglish।',
      'Generate button पर click करें और AI को काम करने दें।',
      'Generated content को review करें। Real-time में content appear होगा।',
      'Copy button से clipboard में copy करें या अपने editor में paste करें।',
    ],
  },
  useCases: {
    title: 'Use Cases',
    cases: [
      'Blog Posts - Regular blogging के लिए fresh content',
      'Product Descriptions - E-commerce listings के लिए',
      'Social Media - Engaging posts और captions',
      'Email Marketing - Newsletter और promotional emails',
      'Website Content - About pages, services, etc.',
      'Academic Writing - Essays और reports',
      'News Articles - Current affairs और updates',
      'SEO Articles - Keyword-focused content',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'AI Paraphraser', href: '/tools/ai-paraphraser' },
    { title: 'Grammar Checker', href: '/tools/grammar-checker' },
    { title: 'AI Summarizer', href: '/tools/ai-summarizer' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
  ],
};

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'creative', label: 'Creative' },
  { value: 'persuasive', label: 'Persuasive' },
];

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'हिंदी (Hindi)' },
  { value: 'Hinglish', label: 'Hinglish (Mixed)' },
];

export default function AIContentWriter() {
  const { toast } = useToast();
  const { content, isGenerating, error, generate, clear } = useContentWriter();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [language, setLanguage] = useState('English');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a topic or keyword',
        variant: 'destructive',
      });
      return;
    }

    const prompt = `Write a comprehensive, SEO-optimized article about: "${topic}". 
Include:
- An engaging headline
- Introduction paragraph
- Multiple sections with subheadings
- Practical tips or insights
- Conclusion with call to action
Make it around 600-800 words.`;

    await generate(prompt, { tone, language });
  };

  const copyContent = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({ title: 'Copied! ✓', description: 'Content copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Error', description: 'Failed to copy', variant: 'destructive' });
    }
  };

  const handleClear = () => {
    setTopic('');
    clear();
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />

      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'AI Content Writer' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              AI Content Writer Free
            </h1>
            <p className="text-muted-foreground text-lg">
              SEO-optimized articles और blog posts instantly generate करें
            </p>
          </header>

          {/* Input Section */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic / Keyword</label>
                <Textarea
                  placeholder="Enter your topic, e.g., 'Benefits of meditation for students' या 'Digital marketing tips for beginners'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((l) => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="btn-gradient flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {/* Output Section */}
          {(content || isGenerating) && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Generated Content</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyContent}
                  disabled={!content}
                >
                  {copied ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Copied</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg min-h-[200px]">
                  {content || (isGenerating && <span className="text-muted-foreground">AI is writing...</span>)}
                  {isGenerating && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />}
                </div>
              </div>
              {content && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Word count: {content.split(/\s+/).filter(Boolean).length}
                </div>
              )}
            </Card>
          )}

          {/* SEO Content */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
