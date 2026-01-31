import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, Code, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Meta Tag Generator Online Free - SEO Tool',
  titleHi: 'मेटा टैग जनरेटर ऑनलाइन फ्री',
  description: 'Free Meta Tag Generator - Create SEO-optimized meta tags for your website. Generate title, description, Open Graph, Twitter cards. Copy & paste ready.',
  descriptionHi: 'मुफ्त मेटा टैग जनरेटर - SEO-optimized meta tags बनाएं। Title, Description, OG Tags, Twitter Cards generate करें। Copy & paste ready।',
  keywords: [
    'meta tag generator',
    'meta tag generator online free',
    'SEO meta tags',
    'Open Graph generator',
    'Twitter card generator',
    'मेटा टैग जनरेटर',
    'website meta tags',
    'HTML meta tags',
    'meta description generator',
    'title tag generator',
    'OG tags generator',
    'SEO tool free',
    'social media meta tags',
  ],
  canonicalUrl: '/tools/meta-generator',
  toolName: 'Meta Tag Generator',
  category: 'SEO Tool',
  faqs: [
    {
      question: 'Meta Tags क्या होते हैं?',
      answer: 'Meta tags HTML code होते हैं जो search engines और social media को आपकी webpage के बारे में information देते हैं। Title tag, description, Open Graph tags, और Twitter cards सबसे important meta tags हैं।',
    },
    {
      question: 'Meta tags SEO के लिए क्यों important हैं?',
      answer: 'Meta tags directly Google rankings affect करते हैं। Title tag और meta description search results में दिखते हैं, जो click-through rate (CTR) determine करते हैं। Better CTR = Better Rankings।',
    },
    {
      question: 'Title tag कितना लंबा होना चाहिए?',
      answer: 'Optimal title length 50-60 characters है। Google 60 characters के बाद cut कर देता है। Important keywords शुरुआत में रखें।',
    },
    {
      question: 'Meta description की ideal length क्या है?',
      answer: 'Meta description 150-160 characters में रखें। Google 160 characters के बाद truncate करता है। Primary keyword include करें और compelling call-to-action लिखें।',
    },
    {
      question: 'Open Graph tags क्या हैं?',
      answer: 'Open Graph (OG) tags Facebook द्वारा बनाए गए थे। ये tags control करते हैं कि आपका page Facebook, LinkedIn, WhatsApp पर share होने पर कैसा दिखे - title, description, image सब।',
    },
    {
      question: 'क्या हर page के लिए unique meta tags होने चाहिए?',
      answer: 'हाँ, absolutely! हर page के लिए unique title और description होनी चाहिए। Duplicate meta tags से SEO problems होती हैं और Google confuse हो सकता है।',
    },
  ],
  howToSteps: [
    'Page Title enter करें (50-60 characters recommended)',
    'Meta Description लिखें (150-160 characters)',
    'Keywords add करें (comma-separated)',
    'Author और Site Name भरें',
    'Social media के लिए URL और Image URL add करें',
    'Generated meta tags copy करें',
    'अपने HTML <head> section में paste करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'Meta Tag Generator क्या है?',
    content: `Meta Tag Generator एक free SEO tool है जो automatically आपकी website के लिए optimized meta tags create करता है। Simply अपनी page information enter करें और ready-to-use HTML code copy करें।

    Meta tags आपकी website की "identity card" हैं। Search engines (Google, Bing) और social media platforms (Facebook, Twitter, LinkedIn) इन tags से समझते हैं कि आपका page किस बारे में है। Proper meta tags होने से आपकी website search results में better दिखती है और social shares पर attractive previews generate होते हैं।

    हमारा tool Title tags, Meta description, Open Graph tags, और Twitter Cards - सब कुछ एक जगह generate करता है। Real-time Google search preview देखें और perfect meta tags बनाएं।`,
  },
  whyUse: {
    title: 'हमारा Meta Tag Generator क्यों use करें?',
    points: [
      'Complete Meta Tags - Title, Description, OG, Twitter सब एक tool में',
      'Character Counter - Optimal length के लिए real-time character count',
      'Google Preview - Search results में कैसा दिखेगा, live देखें',
      'Copy Ready - One-click copy, directly paste करें',
      'SEO Tips - Best practices guidance built-in',
      'No Registration - Instantly use करें, free forever',
      'Mobile Friendly - Phone पर भी perfectly काम करता है',
      'Clean Code - Valid HTML5 meta tags output',
    ],
  },
  howToUse: {
    title: 'Perfect Meta Tags कैसे बनाएं',
    steps: [
      'Page Title enter करें: अपना primary keyword शुरुआत में रखें, 50-60 characters में complete title लिखें। Tool character count दिखाएगा।',
      'Meta Description लिखें: 150-160 characters में page का summary लिखें। Call-to-action include करें जैसे "Learn how to..." या "Discover..."',
      'Keywords add करें: 5-8 relevant keywords comma से separate करके लिखें। Primary keyword पहले रखें।',
      'Author information भरें: आपका name या company name जो credibility add करे',
      'Site Name add करें: आपकी website का brand name जो OG tags में show होगा',
      'Page URL paste करें: Complete URL जो canonical tag के लिए use होगा',
      'OG Image URL add करें: 1200x630 pixels recommended size का image URL। Social shares पर यही image दिखेगी।',
      'Twitter handle add करें (optional): @username format में, Twitter cards के लिए',
      'Google Preview देखें: Right side में live preview check करें कि search में कैसा दिखेगा',
      'Copy button से meta tags copy करें और अपने website के HTML <head> section में paste करें',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'Blog Posts - हर article के लिए unique meta tags generate करें better ranking के लिए',
      'E-commerce Products - Product pages के लिए compelling descriptions बनाएं',
      'Landing Pages - Marketing campaigns के लिए optimized meta tags',
      'Portfolio Websites - Professional presence के लिए proper SEO setup',
      'Local Business - Local SEO के लिए location-specific meta tags',
      'News Websites - Time-sensitive content के लिए fresh meta tags',
      'Educational Content - Courses और tutorials के लिए descriptive meta',
      'Service Pages - Services को effectively describe करने वाले tags',
      'Company About Page - Brand credibility build करने वाले meta tags',
      'Contact Pages - Local SEO signals के साथ meta tags',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Image Converter', href: '/tools/image-converter' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
  ],
};

export default function MetaGenerator() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    image: '',
    siteName: '',
    twitterHandle: '',
  });
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags: string[] = [];

    // Basic Meta Tags
    if (formData.title) {
      tags.push(`<title>${formData.title}</title>`);
      tags.push(`<meta name="title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="description" content="${formData.description}">`);
    }
    
    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}">`);
    }
    
    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}">`);
    }

    // Viewport (always include)
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    tags.push(`<meta charset="UTF-8">`);

    // Open Graph Tags
    if (formData.title) {
      tags.push(`\n<!-- Open Graph / Facebook -->`);
      tags.push(`<meta property="og:type" content="website">`);
      tags.push(`<meta property="og:title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta property="og:description" content="${formData.description}">`);
    }
    
    if (formData.url) {
      tags.push(`<meta property="og:url" content="${formData.url}">`);
    }
    
    if (formData.image) {
      tags.push(`<meta property="og:image" content="${formData.image}">`);
    }
    
    if (formData.siteName) {
      tags.push(`<meta property="og:site_name" content="${formData.siteName}">`);
    }

    // Twitter Card Tags
    if (formData.title) {
      tags.push(`\n<!-- Twitter -->`);
      tags.push(`<meta name="twitter:card" content="summary_large_image">`);
      tags.push(`<meta name="twitter:title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="twitter:description" content="${formData.description}">`);
    }
    
    if (formData.image) {
      tags.push(`<meta name="twitter:image" content="${formData.image}">`);
    }
    
    if (formData.twitterHandle) {
      tags.push(`<meta name="twitter:site" content="@${formData.twitterHandle.replace('@', '')}">`);
    }

    return tags.join('\n');
  };

  const metaTags = generateMetaTags();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(metaTags);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "Meta tags copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      keywords: '',
      author: '',
      url: '',
      image: '',
      siteName: '',
      twitterHandle: '',
    });
  };

  const titleLength = formData.title.length;
  const descLength = formData.description.length;

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Meta Tag Generator' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seo/10 text-seo text-sm mb-4">
              <Code className="h-4 w-4" />
              <span>SEO Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Meta Tag Generator Online Free
            </h1>
            <p className="text-muted-foreground text-lg">
              SEO-optimized meta tags generate करें - Copy & Paste ready
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Page Information</h3>
                  <Button size="sm" variant="ghost" onClick={clearForm}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="title">Page Title *</Label>
                      <span className={`text-xs ${titleLength > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {titleLength}/60
                      </span>
                    </div>
                    <Input
                      id="title"
                      placeholder="Your Page Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {titleLength > 60 && (
                      <p className="text-xs text-destructive mt-1">
                        Title should be under 60 characters for best SEO
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="description">Meta Description *</Label>
                      <span className={`text-xs ${descLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {descLength}/160
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your page (150-160 characters recommended)"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Comma-separated keywords
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Author Name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        placeholder="Your Site Name"
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Social Media (Optional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="url">Page URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://yoursite.com/page"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">OG Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://yoursite.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 1200x630 pixels
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter Handle</Label>
                    <Input
                      id="twitter"
                      placeholder="@yourusername"
                      value={formData.twitterHandle}
                      onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Meta Tags</h3>
                  <Button size="sm" onClick={copyToClipboard} disabled={!formData.title}>
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                    {metaTags || '<!-- Add page information to generate meta tags -->'}
                  </pre>
                </div>
              </Card>

              {/* Preview */}
              {formData.title && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Google Search Preview</h3>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                      {formData.title || 'Page Title'}
                    </p>
                    <p className="text-green-700 text-sm truncate">
                      {formData.url || 'https://yoursite.com/page'}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formData.description || 'Your page description will appear here...'}
                    </p>
                  </div>
                </Card>
              )}

              {/* Tips */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-semibold mb-3">💡 SEO Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Title 50-60 characters में रखें</li>
                  <li>• Description 150-160 characters ideal है</li>
                  <li>• Primary keyword title की शुरुआत में रखें</li>
                  <li>• हर page के लिए unique meta tags use करें</li>
                  <li>• OG Image से social sharing improve होती है</li>
                </ul>
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
