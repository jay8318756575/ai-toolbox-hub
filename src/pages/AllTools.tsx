import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Search, QrCode, Key, ImageIcon, FileText, Home, CheckCircle, Languages, Sparkles, Calculator, Code, Hash, Link2, Type, Wand2, FileSearch, Gauge, Globe, MessageSquare, Youtube, Percent, Heart, RotateCcw, Replace, Radio, Lock, Dice5, ArrowUpDown, Table, Palette, FileCode, GitCompare, Repeat, Minimize2, Clock, BarChart3, Crop } from 'lucide-react';
import { cn } from '@/lib/utils';

const allTools = [
  // Image Tools
  { id: 'image-compressor', title: 'Image Compressor', titleHi: 'इमेज कंप्रेसर', icon: ImageIcon, category: 'Image', href: '/tools/image-compressor', isAI: false, description: 'Compress PNG, JPG, WebP images without losing quality.' },
  { id: 'image-resizer', title: 'Image Resizer', titleHi: 'इमेज रिसाइज़र', icon: ImageIcon, category: 'Image', href: '/tools/image-resizer', isAI: false, description: 'Resize images to exact dimensions in pixels.' },
  { id: 'image-converter', title: 'Image Converter', titleHi: 'इमेज कन्वर्टर', icon: ImageIcon, category: 'Image', href: '/tools/image-converter', isAI: false, description: 'Convert images between PNG, JPG, WebP formats.' },
  { id: 'jpg-to-png', title: 'JPG to PNG', titleHi: 'JPG से PNG', icon: ImageIcon, category: 'Image', href: '/tools/jpg-to-png', isAI: false, description: 'Convert JPEG images to PNG format.' },
  { id: 'png-to-jpg', title: 'PNG to JPG', titleHi: 'PNG से JPG', icon: ImageIcon, category: 'Image', href: '/tools/png-to-jpg', isAI: false, description: 'Convert PNG images to JPG format.' },
  { id: 'image-cropper', title: 'Image Cropper', titleHi: 'इमेज क्रॉपर', icon: Crop, category: 'Image', href: '/tools/image-cropper', isAI: false, description: 'Crop images to exact dimensions.' },
  { id: 'image-to-base64', title: 'Image to Base64', titleHi: 'इमेज टू Base64', icon: ImageIcon, category: 'Image', href: '/tools/image-to-base64', isAI: false, description: 'Convert images to Base64 encoded strings.' },
  { id: 'text-to-image', title: 'Text to Image', titleHi: 'टेक्स्ट टू इमेज', icon: Type, category: 'Image', href: '/tools/text-to-image', isAI: false, description: 'Convert text to downloadable PNG images.' },

  // Calculator Tools
  { id: 'age-calculator', title: 'Age Calculator', titleHi: 'उम्र कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/age-calculator', isAI: false, description: 'Calculate exact age in years, months and days.' },
  { id: 'emi-calculator', title: 'EMI Calculator', titleHi: 'EMI कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/emi-calculator', isAI: false, description: 'Calculate monthly EMI for loans.' },
  { id: 'percentage-calculator', title: 'Percentage Calculator', titleHi: 'प्रतिशत कैलकुलेटर', icon: Percent, category: 'Calculator', href: '/tools/percentage-calculator', isAI: false, description: 'Calculate percentage, increase and decrease.' },
  { id: 'gst-calculator', title: 'GST Calculator', titleHi: 'GST कैलकुलेटर', icon: Calculator, category: 'Calculator', href: '/tools/gst-calculator', isAI: false, description: 'Calculate GST, CGST, SGST amounts.' },
  { id: 'bmi-calculator', title: 'BMI Calculator', titleHi: 'BMI कैलकुलेटर', icon: Heart, category: 'Calculator', href: '/tools/bmi-calculator', isAI: false, description: 'Calculate Body Mass Index.' },

  // Text Tools
  { id: 'word-counter', title: 'Word Counter', titleHi: 'वर्ड काउंटर', icon: Type, category: 'Text', href: '/tools/word-counter', isAI: false, description: 'Count words, characters, sentences.' },
  { id: 'case-converter', title: 'Case Converter', titleHi: 'केस कन्वर्टर', icon: Type, category: 'Text', href: '/tools/case-converter', isAI: false, description: 'Convert text to UPPERCASE, lowercase, Title Case.' },
  { id: 'text-reverser', title: 'Text Reverser', titleHi: 'टेक्स्ट रिवर्सर', icon: RotateCcw, category: 'Text', href: '/tools/text-reverser', isAI: false, description: 'Reverse text by characters, words, or lines.' },
  { id: 'find-replace', title: 'Find and Replace', titleHi: 'फाइंड एंड रिप्लेस', icon: Replace, category: 'Text', href: '/tools/find-replace', isAI: false, description: 'Find and replace text patterns.' },
  { id: 'text-to-morse', title: 'Text to Morse Code', titleHi: 'मोर्स कोड कन्वर्टर', icon: Radio, category: 'Text', href: '/tools/text-to-morse', isAI: false, description: 'Convert text to Morse code and back.' },
  { id: 'text-repeater', title: 'Text Repeater', titleHi: 'टेक्स्ट रिपीटर', icon: Repeat, category: 'Text', href: '/tools/text-repeater', isAI: false, description: 'Repeat text multiple times.' },
  { id: 'lorem-ipsum', title: 'Lorem Ipsum Generator', titleHi: 'लोरेम इप्सम', icon: FileText, category: 'Text', href: '/tools/lorem-ipsum-generator', isAI: false, description: 'Generate placeholder text for designs.' },
  { id: 'word-frequency', title: 'Word Frequency Counter', titleHi: 'वर्ड फ्रीक्वेंसी', icon: BarChart3, category: 'Text', href: '/tools/word-frequency', isAI: false, description: 'Analyze word frequency in text.' },

  // SEO Tools
  { id: 'meta-generator', title: 'Meta Tag Generator', titleHi: 'मेटा टैग जनरेटर', icon: CheckCircle, category: 'SEO', href: '/tools/meta-generator', isAI: false, description: 'Generate SEO meta tags.' },
  { id: 'keyword-density', title: 'Keyword Density Checker', titleHi: 'कीवर्ड डेंसिटी', icon: Search, category: 'SEO', href: '/tools/keyword-density', isAI: false, description: 'Analyze keyword density in content.' },
  { id: 'robots-generator', title: 'Robots.txt Generator', titleHi: 'Robots.txt जनरेटर', icon: FileText, category: 'SEO', href: '/tools/robots-generator', isAI: false, description: 'Create robots.txt for your website.' },
  { id: 'sitemap-generator', title: 'Sitemap Generator', titleHi: 'साइटमैप जनरेटर', icon: Globe, category: 'SEO', href: '/tools/sitemap-generator', isAI: false, description: 'Create XML sitemap.' },
  { id: 'keyword-research', title: 'Keyword Research', titleHi: 'कीवर्ड रिसर्च', icon: Search, category: 'SEO', href: '/tools/keyword-research', isAI: true, description: 'AI keyword research for SEO.' },
  { id: 'page-speed', title: 'Page Speed Analyzer', titleHi: 'पेज स्पीड', icon: Gauge, category: 'SEO', href: '/tools/page-speed', isAI: true, description: 'Analyze website speed.' },
  { id: 'backlink-checker', title: 'Backlink Checker', titleHi: 'बैकलिंक चेकर', icon: Globe, category: 'SEO', href: '/tools/backlink-checker', isAI: true, description: 'Check backlinks with AI.' },
  { id: 'text-to-slug', title: 'URL Slug Generator', titleHi: 'URL स्लग जनरेटर', icon: Link2, category: 'SEO', href: '/tools/text-to-slug', isAI: false, description: 'Generate SEO-friendly URL slugs.' },

  // Developer Tools
  { id: 'json-formatter', title: 'JSON Formatter', titleHi: 'JSON फॉर्मेटर', icon: Code, category: 'Developer', href: '/tools/json-formatter', isAI: false, description: 'Format and validate JSON data.' },
  { id: 'json-minifier', title: 'JSON Minifier', titleHi: 'JSON मिनीफायर', icon: Minimize2, category: 'Developer', href: '/tools/json-minifier', isAI: false, description: 'Compress and minify JSON data.' },
  { id: 'base64-encode-decode', title: 'Base64 Encode/Decode', titleHi: 'Base64 एनकोड/डिकोड', icon: Lock, category: 'Developer', href: '/tools/base64-encode-decode', isAI: false, description: 'Encode and decode Base64 strings.' },
  { id: 'csv-to-json', title: 'CSV to JSON', titleHi: 'CSV टू JSON', icon: Table, category: 'Developer', href: '/tools/csv-to-json', isAI: false, description: 'Convert CSV data to JSON format.' },
  { id: 'hex-to-rgb', title: 'Hex to RGB Converter', titleHi: 'Hex टू RGB', icon: Palette, category: 'Developer', href: '/tools/hex-to-rgb', isAI: false, description: 'Convert hex colors to RGB values.' },
  { id: 'html-encoder', title: 'HTML Encoder/Decoder', titleHi: 'HTML एनकोडर', icon: Code, category: 'Developer', href: '/tools/html-encoder', isAI: false, description: 'Encode/decode HTML entities.' },
  { id: 'markdown-preview', title: 'Markdown Preview', titleHi: 'मार्कडाउन प्रीव्यू', icon: FileCode, category: 'Developer', href: '/tools/markdown-preview', isAI: false, description: 'Write Markdown with live preview.' },
  { id: 'diff-checker', title: 'Diff Checker', titleHi: 'डिफ चेकर', icon: GitCompare, category: 'Developer', href: '/tools/diff-checker', isAI: false, description: 'Compare two texts and find differences.' },
  { id: 'timestamp-converter', title: 'Timestamp Converter', titleHi: 'टाइमस्टैम्प कन्वर्टर', icon: Clock, category: 'Developer', href: '/tools/timestamp-converter', isAI: false, description: 'Convert Unix timestamps to dates.' },
  { id: 'hash-generator', title: 'Hash Generator', titleHi: 'हैश जनरेटर', icon: Hash, category: 'Developer', href: '/tools/hash-generator', isAI: false, description: 'Generate SHA-256, SHA-512 hashes.' },
  { id: 'url-encoder', title: 'URL Encoder/Decoder', titleHi: 'URL एनकोडर', icon: Link2, category: 'Developer', href: '/tools/url-encoder', isAI: false, description: 'Encode and decode URLs.' },

  // Utility Tools
  { id: 'qr-generator', title: 'QR Code Generator', titleHi: 'QR कोड जनरेटर', icon: QrCode, category: 'Utility', href: '/tools/qr-generator', isAI: false, description: 'Create QR codes for URLs and text.' },
  { id: 'password-generator', title: 'Password Generator', titleHi: 'पासवर्ड जनरेटर', icon: Key, category: 'Utility', href: '/tools/password-generator', isAI: false, description: 'Generate strong secure passwords.' },
  { id: 'unit-converter', title: 'Unit Converter', titleHi: 'यूनिट कन्वर्टर', icon: Calculator, category: 'Utility', href: '/tools/unit-converter', isAI: false, description: 'Convert between units.' },
  { id: 'youtube-thumbnail', title: 'YouTube Thumbnail', titleHi: 'YouTube थंबनेल', icon: Youtube, category: 'Utility', href: '/tools/youtube-thumbnail', isAI: false, description: 'Download YouTube thumbnails in HD.' },
  { id: 'color-picker', title: 'Color Picker', titleHi: 'कलर पिकर', icon: Palette, category: 'Utility', href: '/tools/color-picker', isAI: false, description: 'Pick colors and get HEX, RGB, HSL.' },
  { id: 'random-number', title: 'Random Number Generator', titleHi: 'रैंडम नंबर', icon: Dice5, category: 'Utility', href: '/tools/random-number-generator', isAI: false, description: 'Generate random numbers in range.' },
  { id: 'number-to-words', title: 'Number to Words', titleHi: 'नंबर टू वर्ड्स', icon: Hash, category: 'Utility', href: '/tools/number-to-words', isAI: false, description: 'Convert numbers to English words.' },
  { id: 'number-sorter', title: 'Number Sorter', titleHi: 'नंबर सॉर्टर', icon: ArrowUpDown, category: 'Utility', href: '/tools/number-sorter', isAI: false, description: 'Sort numbers ascending/descending.' },
  { id: 'list-sorter', title: 'List Sorter', titleHi: 'लिस्ट सॉर्टर', icon: ArrowUpDown, category: 'Utility', href: '/tools/list-sorter', isAI: false, description: 'Sort list items alphabetically.' },

  // AI Writing Tools
  { id: 'ai-writer', title: 'AI Content Writer', titleHi: 'AI कंटेंट राइटर', icon: FileText, category: 'AI Writing', href: '/tools/ai-content-writer', isAI: true, description: 'Generate articles with AI.' },
  { id: 'paraphraser', title: 'Paraphrasing Tool', titleHi: 'पैराफ्रेज़िंग टूल', icon: Type, category: 'AI Writing', href: '/tools/ai-paraphraser', isAI: true, description: 'Rewrite text with AI.' },
  { id: 'grammar-checker', title: 'Grammar Checker', titleHi: 'ग्रामर चेकर', icon: CheckCircle, category: 'AI Writing', href: '/tools/grammar-checker', isAI: true, description: 'Fix grammar errors with AI.' },
  { id: 'translator', title: 'AI Translator', titleHi: 'AI ट्रांसलेटर', icon: Languages, category: 'AI Writing', href: '/tools/ai-translator', isAI: true, description: 'Translate 100+ languages.' },
  { id: 'summarizer', title: 'Text Summarizer', titleHi: 'समराइज़र', icon: FileSearch, category: 'AI Writing', href: '/tools/ai-summarizer', isAI: true, description: 'Summarize text with AI.' },
  { id: 'ai-chatbot', title: 'AI Chatbot', titleHi: 'AI चैटबॉट', icon: MessageSquare, category: 'AI Writing', href: '/tools/ai-chatbot', isAI: true, description: 'Chat with AI assistant.' },
  { id: 'plagiarism-checker', title: 'Plagiarism Checker', titleHi: 'प्लेजरिज़्म चेकर', icon: FileSearch, category: 'AI Writing', href: '/tools/plagiarism-checker', isAI: true, description: 'Check content originality.' },

  // Design Tools
  { id: 'house-planner', title: 'House Plan AI', titleHi: 'घर का नक्शा AI', icon: Home, category: 'Design', href: '/tools/house-planner', isAI: true, description: 'AI house plan generator.' },
];

const categories = ['All', 'Image', 'Text', 'Calculator', 'SEO', 'Developer', 'Utility', 'AI Writing', 'Design'];

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
    description: '50+ free online tools including calculators, image tools, SEO tools, developer tools, and AI writing tools.',
    url: 'https://smarttoolshub.com/tools',
    mainEntity: { '@type': 'ItemList', numberOfItems: allTools.length, itemListElement: allTools.map((tool, i) => ({ '@type': 'ListItem', position: i + 1, name: tool.title, description: tool.description, url: `https://smarttoolshub.com${tool.href}` })) },
  };

  return (
    <Layout>
      <Helmet>
        <title>All Free Online Tools - Image, Text, SEO, Developer, AI | SmartToolsHub</title>
        <meta name="description" content="50+ Free Online Tools - Image Compressor, Text Reverser, JSON Formatter, Color Picker, AI Writer, CSV to JSON and more। 100% Free!" />
        <link rel="canonical" href="https://smarttoolshub.com/tools" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(collectionsSchema)}</script>
      </Helmet>

      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">All Free Online <span className="gradient-text">Tools</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{allTools.length}+ Free Tools - Image, Text, SEO, Developer, AI Writing और बहुत कुछ। सब 100% Working!</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search tools... (जैसे: Image Compressor, JSON Formatter)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 text-base" aria-label="Search tools" />
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
