import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const allTools = [
  // Utility Tools
  { id: 'qr-generator', title: 'QR Code Generator', titleHi: 'QR कोड जनरेटर', icon: QrCode, category: 'Utility', href: '/tools/qr-generator', isAI: false },
  { id: 'password-generator', title: 'Password Generator', titleHi: 'पासवर्ड जनरेटर', icon: Key, category: 'Utility', href: '/tools/password-generator', isAI: false },
  { id: 'unit-converter', title: 'Unit Converter', titleHi: 'यूनिट कन्वर्टर', icon: Calculator, category: 'Utility', href: '/tools/unit-converter', isAI: false },
  { id: 'json-formatter', title: 'JSON Formatter', titleHi: 'JSON फॉर्मेटर', icon: Code, category: 'Utility', href: '/tools/json-formatter', isAI: false },
  { id: 'hash-generator', title: 'Hash Generator', titleHi: 'हैश जनरेटर', icon: Hash, category: 'Utility', href: '/tools/hash-generator', isAI: false },
  { id: 'url-encoder', title: 'URL Encoder/Decoder', titleHi: 'URL एनकोडर', icon: Link2, category: 'Utility', href: '/tools/url-encoder', isAI: false },
  
  // Converter Tools
  { id: 'image-converter', title: 'Image Converter', titleHi: 'इमेज कन्वर्टर', icon: ImageIcon, category: 'Converter', href: '/tools/image-converter', isAI: false },
  { id: 'image-compressor', title: 'Image Compressor', titleHi: 'इमेज कंप्रेसर', icon: ImageIcon, category: 'Converter', href: '/tools/image-compressor', isAI: false },
  
  // SEO Tools
  { id: 'meta-generator', title: 'Meta Tag Generator', titleHi: 'मेटा टैग जनरेटर', icon: CheckCircle, category: 'SEO', href: '/tools/meta-generator', isAI: false },
  { id: 'keyword-research', title: 'Keyword Research', titleHi: 'कीवर्ड रिसर्च', icon: Search, category: 'SEO', href: '/tools/keyword-research', isAI: true },
  { id: 'page-speed', title: 'Page Speed Analyzer', titleHi: 'पेज स्पीड', icon: Gauge, category: 'SEO', href: '/tools/page-speed', isAI: false },
  { id: 'backlink-checker', title: 'Backlink Checker', titleHi: 'बैकलिंक चेकर', icon: Globe, category: 'SEO', href: '/tools/backlink-checker', isAI: false },
  
  // AI Writing Tools
  { id: 'ai-writer', title: 'AI Content Writer', titleHi: 'AI कंटेंट राइटर', icon: FileText, category: 'AI Writing', href: '/tools/ai-content-writer', isAI: true },
  { id: 'paraphraser', title: 'Paraphrasing Tool', titleHi: 'पैराफ्रेज़िंग टूल', icon: Type, category: 'AI Writing', href: '/tools/ai-paraphraser', isAI: true },
  { id: 'grammar-checker', title: 'Grammar Checker', titleHi: 'ग्रामर चेकर', icon: CheckCircle, category: 'AI Writing', href: '/tools/grammar-checker', isAI: true },
  { id: 'translator', title: 'AI Translator', titleHi: 'AI ट्रांसलेटर', icon: Languages, category: 'AI Writing', href: '/tools/ai-translator', isAI: true },
  { id: 'summarizer', title: 'Text Summarizer', titleHi: 'टेक्स्ट समराइज़र', icon: FileSearch, category: 'AI Writing', href: '/tools/ai-summarizer', isAI: true },
  
  // Design Tools
  { id: 'house-planner', title: 'House Plan AI', titleHi: 'घर का नक्शा AI', icon: Home, category: 'Design', href: '/tools/house-planner', isAI: true },
];

const categories = ['All', 'Utility', 'Converter', 'SEO', 'AI Writing', 'Design'];

export default function AllTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.titleHi.includes(searchQuery);
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            All <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            50+ Free Tools - सब 100% Working और Ready to Use
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools... (जैसे: QR Code, Image Converter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
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
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.href}
              className="tool-card group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                      {tool.title}
                    </h3>
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

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found. Try a different search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
