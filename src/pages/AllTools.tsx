import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Search, QrCode, Key, ImageIcon, FileText, Home, CheckCircle, Languages, Sparkles, Calculator, Code, Hash, Link2, Type, Wand2, FileSearch, Gauge, Globe, MessageSquare, Youtube, Percent, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const allTools = [
  // Image Tools
  { id: 'image-compressor', title: 'Image Compressor', titleHi: 'इमेज कंप्रेसर', icon: ImageIcon, category: 'Image', href: '/tools/image-compressor', isAI: false, description: 'Compress PNG, JPG, WebP images without losing quality.' },
  { id: 'image-resizer', title: 'Image Resizer', titleHi: 'इमेज रिसाइज़र', icon: ImageIcon, category: 'Image', href: '/tools/image-resizer', isAI: false, description: 'Resize images to exact dimensions in pixels.' },
  { id: 'image-converter', title: 'Image Converter', titleHi: 'इमेज कन्वर्टर', icon: ImageIcon, category: 'Image', href: '/tools/image-converter', isAI: false, description: 'Convert images between PNG, JPG, WebP formats.' },
  { id: 'jpg-to-png', title: 'JPG to PNG', titleHi: 'JPG से PNG', icon: ImageIcon, category: 'Image', href: '/tools/jpg-to-png', isAI: false, description: 'Convert JPEG images to PNG format with transparency.' },
  { id: 'png-to-jpg', title: 'PNG to JPG', titleHi: 'PNG से JPG', icon: ImageIcon, category: 'Image', href: '/tools/png-to-jpg', isAI: false, description: 'Convert PNG images to JPG to reduce file size.' },

  // Calculator Tools
  { id: 'age-calculator', title: 'Age Calculator', titleHi: 'उम्र कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/age-calculator', isAI: false, description: 'Calculate exact age in years, months and days.' },
  { id: 'emi-calculator', title: 'EMI Calculator', titleHi: 'EMI कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/emi-calculator', isAI: false, description: 'Calculate monthly EMI for home, car, personal loans.' },
  { id: 'percentage-calculator', title: 'Percentage Calculator', titleHi: 'प्रतिशत कैलकुलेटर', icon: Percent, category: 'Calculator', href: '/tools/percentage-calculator', isAI: false, description: 'Calculate percentage, increase and decrease.' },
  { id: 'gst-calculator', title: 'GST Calculator', titleHi: 'GST कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/gst-calculator', isAI: false, description: 'Calculate GST, CGST, SGST, IGST amounts.' },
  { id: 'bmi-calculator', title: 'BMI Calculator', titleHi: 'BMI कैलकुलेटर', icon: Heart, category: 'Calculator', href: '/tools/bmi-calculator', isAI: false, description: 'Calculate Body Mass Index for health assessment.' },

  // Text Tools
  { id: 'word-counter', title: 'Word Counter', titleHi: 'वर्ड काउंटर', icon: Type, category: 'Text', href: '/tools/word-counter', isAI: false, description: 'Count words, characters, sentences and paragraphs.' },
  { id: 'case-converter', title: 'Case Converter', titleHi: 'केस कन्वर्टर', icon: Type, category: 'Text', href: '/tools/case-converter', isAI: false, description: 'Convert text to UPPERCASE, lowercase, Title Case.' },

  // SEO Tools
  { id: 'meta-generator', title: 'Meta Tag Generator', titleHi: 'मेटा टैग जनरेटर', icon: CheckCircle, category: 'SEO', href: '/tools/meta-generator', isAI: false, description: 'Generate SEO-optimized meta tags for your website.' },
  { id: 'keyword-density', title: 'Keyword Density Checker', titleHi: 'कीवर्ड डेंसिटी चेकर', icon: Search, category: 'SEO', href: '/tools/keyword-density', isAI: false, description: 'Analyze keyword frequency and density in content.' },
  { id: 'robots-generator', title: 'Robots.txt Generator', titleHi: 'Robots.txt जनरेटर', icon: FileText, category: 'SEO', href: '/tools/robots-generator', isAI: false, description: 'Create robots.txt file for your website.' },
  { id: 'sitemap-generator', title: 'Sitemap Generator', titleHi: 'साइटमैप जनरेटर', icon: Globe, category: 'SEO', href: '/tools/sitemap-generator', isAI: false, description: 'Create XML sitemap for search engine indexing.' },
  { id: 'keyword-research', title: 'Keyword Research', titleHi: 'कीवर्ड रिसर्च', icon: Search, category: 'SEO', href: '/tools/keyword-research', isAI: true, description: 'AI-powered keyword research for SEO.' },
  { id: 'page-speed', title: 'Page Speed Analyzer', titleHi: 'पेज स्पीड', icon: Gauge, category: 'SEO', href: '/tools/page-speed', isAI: true, description: 'Analyze website speed and get recommendations.' },
  { id: 'backlink-checker', title: 'Backlink Checker', titleHi: 'बैकलिंक चेकर', icon: Globe, category: 'SEO', href: '/tools/backlink-checker', isAI: true, description: 'Check backlinks and SEO strategy with AI.' },

  // Utility Tools
  { id: 'qr-generator', title: 'QR Code Generator', titleHi: 'QR कोड जनरेटर', icon: QrCode, category: 'Utility', href: '/tools/qr-generator', isAI: false, description: 'Create QR codes for URLs, text and more.' },
  { id: 'password-generator', title: 'Password Generator', titleHi: 'पासवर्ड जनरेटर', icon: Key, category: 'Utility', href: '/tools/password-generator', isAI: false, description: 'Generate strong, secure passwords.' },
  { id: 'json-formatter', title: 'JSON Formatter', titleHi: 'JSON फॉर्मेटर', icon: Code, category: 'Utility', href: '/tools/json-formatter', isAI: false, description: 'Format and validate JSON data online.' },
  { id: 'unit-converter', title: 'Unit Converter', titleHi: 'यूनिट कन्वर्टर', icon: Calculator, category: 'Utility', href: '/tools/unit-converter', isAI: false, description: 'Convert between units of length, weight, temperature.' },
  { id: 'hash-generator', title: 'Hash Generator', titleHi: 'हैश जनरेटर', icon: Hash, category: 'Utility', href: '/tools/hash-generator', isAI: false, description: 'Generate SHA-256, SHA-512 hash values.' },
  { id: 'url-encoder', title: 'URL Encoder/Decoder', titleHi: 'URL एनकोडर', icon: Link2, category: 'Utility', href: '/tools/url-encoder', isAI: false, description: 'Encode and decode URLs for web development.' },
  { id: 'youtube-thumbnail', title: 'YouTube Thumbnail Downloader', titleHi: 'YouTube थंबनेल डाउनलोडर', icon: Youtube, category: 'Utility', href: '/tools/youtube-thumbnail', isAI: false, description: 'Download YouTube video thumbnails in HD.' },

  // AI Writing Tools
  { id: 'ai-writer', title: 'AI Content Writer', titleHi: 'AI कंटेंट राइटर', icon: FileText, category: 'AI Writing', href: '/tools/ai-content-writer', isAI: true, description: 'Generate blog posts, articles and content with AI.' },
  { id: 'paraphraser', title: 'Paraphrasing Tool', titleHi: 'पैराफ्रेज़िंग टूल', icon: Type, category: 'AI Writing', href: '/tools/ai-paraphraser', isAI: true, description: 'Rewrite and paraphrase text with AI.' },
  { id: 'grammar-checker', title: 'Grammar Checker', titleHi: 'ग्रामर चेकर', icon: CheckCircle, category: 'AI Writing', href: '/tools/grammar-checker', isAI: true, description: 'Check grammar and spelling errors with AI.' },
  { id: 'translator', title: 'AI Translator', titleHi: 'AI ट्रांसलेटर', icon: Languages, category: 'AI Writing', href: '/tools/ai-translator', isAI: true, description: 'Translate text between 100+ languages.' },
  { id: 'summarizer', title: 'Text Summarizer', titleHi: 'टेक्स्ट समराइज़र', icon: FileSearch, category: 'AI Writing', href: '/tools/ai-summarizer', isAI: true, description: 'Summarize long text and articles with AI.' },
  { id: 'ai-chatbot', title: 'AI Chatbot', titleHi: 'AI चैटबॉट', icon: MessageSquare, category: 'AI Writing', href: '/tools/ai-chatbot', isAI: true, description: 'Chat with AI assistant for any task.' },
  { id: 'plagiarism-checker', title: 'Plagiarism Checker', titleHi: 'प्लेजरिज़्म चेकर', icon: FileSearch, category: 'AI Writing', href: '/tools/plagiarism-checker', isAI: true, description: 'Check content originality with AI analysis.' },

  // Design Tools
  { id: 'house-planner', title: 'House Plan AI', titleHi: 'घर का नक्शा AI', icon: Home, category: 'Design', href: '/tools/house-planner', isAI: true, description: 'AI house plan generator with Vastu compliance.' },
];

const categories = ['All', 'Image', 'Calculator', 'Text', 'SEO', 'Utility', 'AI Writing', 'Design'];

export default function AllTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || tool.titleHi.includes(searchQuery) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const collectionsSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'All Free Online Tools - SmartToolsHub',
    description: '30+ free online tools including calculators, image tools, SEO tools, and AI writing tools.',
    url: 'https://smarttoolshub.com/tools',
    mainEntity: { '@type': 'ItemList', numberOfItems: allTools.length, itemListElement: allTools.map((tool, i) => ({ '@type': 'ListItem', position: i + 1, name: tool.title, description: tool.description, url: `https://smarttoolshub.com${tool.href}` })) },
  };

  return (
    <Layout>
      <Helmet>
        <title>All Free Online Tools - Image, Calculator, SEO, AI | SmartToolsHub</title>
        <meta name="description" content="30+ Free Online Tools - Image Compressor, Age Calculator, EMI Calculator, QR Generator, SEO Tools, AI Writer। 100% Free!" />
        <link rel="canonical" href="https://smarttoolshub.com/tools" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(collectionsSchema)}</script>
      </Helmet>

      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">All Free Online <span className="gradient-text">Tools</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">30+ Free Tools - Image, Calculator, SEO, AI Writing और बहुत कुछ। सब 100% Working!</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search tools... (जैसे: Image Compressor, EMI Calculator)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 text-base" aria-label="Search tools" />
          </div>
          <nav aria-label="Tool categories" className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")} aria-pressed={selectedCategory === category}>{category}</button>
            ))}
          </nav>
        </div>

        <section aria-label="Tools list">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <Link key={tool.id} to={tool.href} className="tool-card group" title={`${tool.title} - ${tool.description}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{tool.title}</h2>
                      {tool.isAI && <Sparkles className="h-3 w-3 text-secondary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{tool.titleHi}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {filteredTools.length === 0 && (
          <div className="text-center py-12"><p className="text-muted-foreground">No tools found. Try a different search.</p></div>
        )}
      </div>
    </Layout>
  );
}
