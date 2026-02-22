import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  QrCode, 
  Key, 
  ImageIcon, 
  FileText, 
  Home,
  CheckCircle,
  Languages,
  Sparkles,
  Calculator,
  Code,
  Hash,
  Link2,
  Type,
  Wand2,
  FileSearch,
  Gauge,
  Globe,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const allTools = [
  // Utility Tools
  { id: 'qr-generator', title: 'QR Code Generator', titleHi: 'QR कोड जनरेटर', icon: QrCode, category: 'Utility', href: '/tools/qr-generator', isAI: false, description: 'Free QR Code Generator - Create QR codes for URLs, text, WiFi, and more instantly.' },
  { id: 'password-generator', title: 'Password Generator', titleHi: 'पासवर्ड जनरेटर', icon: Key, category: 'Utility', href: '/tools/password-generator', isAI: false, description: 'Generate strong, secure passwords with custom length and character options.' },
  { id: 'unit-converter', title: 'Unit Converter', titleHi: 'यूनिट कन्वर्टर', icon: Calculator, category: 'Utility', href: '/tools/unit-converter', isAI: false, description: 'Convert between units of length, weight, temperature, and more.' },
  { id: 'json-formatter', title: 'JSON Formatter', titleHi: 'JSON फॉर्मेटर', icon: Code, category: 'Utility', href: '/tools/json-formatter', isAI: false, description: 'Format, validate and beautify JSON data online for free.' },
  { id: 'hash-generator', title: 'Hash Generator', titleHi: 'हैश जनरेटर', icon: Hash, category: 'Utility', href: '/tools/hash-generator', isAI: false, description: 'Generate SHA-256, SHA-512, and other hash values from text instantly.' },
  { id: 'url-encoder', title: 'URL Encoder/Decoder', titleHi: 'URL एनकोडर', icon: Link2, category: 'Utility', href: '/tools/url-encoder', isAI: false, description: 'Encode and decode URLs with percent-encoding for web development.' },
  
  // Converter Tools
  { id: 'image-converter', title: 'Image Converter', titleHi: 'इमेज कन्वर्टर', icon: ImageIcon, category: 'Converter', href: '/tools/image-converter', isAI: false, description: 'Convert images between PNG, JPG, WebP and other formats for free.' },
  { id: 'image-compressor', title: 'Image Compressor', titleHi: 'इमेज कंप्रेसर', icon: ImageIcon, category: 'Converter', href: '/tools/image-compressor', isAI: false, description: 'Compress images online to reduce file size without losing quality.' },
  
  // SEO Tools
  { id: 'meta-generator', title: 'Meta Tag Generator', titleHi: 'मेटा टैग जनरेटर', icon: CheckCircle, category: 'SEO', href: '/tools/meta-generator', isAI: false, description: 'Generate SEO-optimized meta tags for your website pages.' },
  { id: 'keyword-research', title: 'Keyword Research', titleHi: 'कीवर्ड रिसर्च', icon: Search, category: 'SEO', href: '/tools/keyword-research', isAI: true, description: 'AI-powered keyword research tool for SEO optimization.' },
  { id: 'page-speed', title: 'Page Speed Analyzer', titleHi: 'पेज स्पीड', icon: Gauge, category: 'SEO', href: '/tools/page-speed', isAI: true, description: 'Analyze website speed and get optimization recommendations.' },
  { id: 'backlink-checker', title: 'Backlink Checker', titleHi: 'बैकलिंक चेकर', icon: Globe, category: 'SEO', href: '/tools/backlink-checker', isAI: true, description: 'Check backlinks and get SEO strategy suggestions with AI.' },
  
  // AI Writing Tools
  { id: 'ai-writer', title: 'AI Content Writer', titleHi: 'AI कंटेंट राइटर', icon: FileText, category: 'AI Writing', href: '/tools/ai-content-writer', isAI: true, description: 'AI-powered content writer - Generate blog posts, articles, and more.' },
  { id: 'paraphraser', title: 'Paraphrasing Tool', titleHi: 'पैराफ्रेज़िंग टूल', icon: Type, category: 'AI Writing', href: '/tools/ai-paraphraser', isAI: true, description: 'Rewrite and paraphrase text with AI while keeping the meaning.' },
  { id: 'grammar-checker', title: 'Grammar Checker', titleHi: 'ग्रामर चेकर', icon: CheckCircle, category: 'AI Writing', href: '/tools/grammar-checker', isAI: true, description: 'Check grammar, spelling and punctuation errors with AI.' },
  { id: 'translator', title: 'AI Translator', titleHi: 'AI ट्रांसलेटर', icon: Languages, category: 'AI Writing', href: '/tools/ai-translator', isAI: true, description: 'Translate text between 100+ languages using AI.' },
  { id: 'summarizer', title: 'Text Summarizer', titleHi: 'टेक्स्ट समराइज़र', icon: FileSearch, category: 'AI Writing', href: '/tools/ai-summarizer', isAI: true, description: 'Summarize long text, articles and documents with AI.' },
  { id: 'ai-chatbot', title: 'AI Chatbot', titleHi: 'AI चैटबॉट', icon: MessageSquare, category: 'AI Writing', href: '/tools/ai-chatbot', isAI: true, description: 'Chat with AI assistant for any question or task.' },
  
  // Design Tools
  { id: 'house-planner', title: 'House Plan AI', titleHi: 'घर का नक्शा AI', icon: Home, category: 'Design', href: '/tools/house-planner', isAI: true, description: 'AI Ghar Ka Naksha - Generate Vastu-compliant house plans with dimensions.' },
];

const categories = ['All', 'Utility', 'Converter', 'SEO', 'AI Writing', 'Design'];

export default function AllTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.titleHi.includes(searchQuery) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const collectionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Free Online Tools - AI Tools Hub',
    description: '19+ free online tools including AI content writer, QR code generator, image converter, SEO tools, and more. 100% free, no registration.',
    url: 'https://aitoolshub.com/tools',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allTools.length,
      itemListElement: allTools.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.title,
        description: tool.description,
        url: `https://aitoolshub.com${tool.href}`,
      })),
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>All Free Online Tools - AI Writer, QR Generator, SEO Tools | AI Tools Hub</title>
        <meta name="description" content="19+ Free Online Tools - AI Content Writer, QR Code Generator, Image Converter, Password Generator, SEO Tools और बहुत कुछ। सब 100% Free और Working!" />
        <meta name="keywords" content="free online tools, AI tools, QR code generator, password generator, image converter, meta tag generator, JSON formatter, hash generator, URL encoder, AI content writer, AI paraphraser, keyword research, page speed analyzer, backlink checker, house plan AI, ghar ka naksha" />
        <link rel="canonical" href="https://aitoolshub.com/tools" />
        <meta property="og:title" content="All Free Online Tools - AI Tools Hub" />
        <meta property="og:description" content="19+ Free Online Tools - AI Writer, QR Generator, Image Converter, SEO Tools। 100% Free!" />
        <meta property="og:url" content="https://aitoolshub.com/tools" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(collectionsSchema)}</script>
      </Helmet>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            All Free Online <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            19+ Free Tools - AI Writer, QR Generator, Image Converter, SEO Tools और बहुत कुछ। सब 100% Working!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools... (जैसे: QR Code, Image Converter, AI Writer)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
              aria-label="Search tools"
            />
          </div>
          
          <nav aria-label="Tool categories" className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Tools Grid */}
        <section aria-label="Tools list">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.href}
                className="tool-card group"
                title={`${tool.title} - ${tool.description}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {tool.title}
                      </h2>
                      {tool.isAI && (
                        <Sparkles className="h-3 w-3 text-secondary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {tool.titleHi}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found. Try a different search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
