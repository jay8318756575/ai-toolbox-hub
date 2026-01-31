import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, Code, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'JSON Formatter Online Free - Beautify & Minify',
  titleHi: 'JSON फॉर्मेटर ऑनलाइन फ्री',
  description: 'Free JSON Formatter - Beautify, minify, and validate JSON online. Instant formatting with syntax validation. Copy-paste ready. Developer tool.',
  descriptionHi: 'मुफ्त JSON फॉर्मेटर - JSON को beautify, minify, और validate करें। Instant formatting और syntax validation। Developer tool।',
  keywords: [
    'JSON formatter',
    'JSON beautifier',
    'JSON minifier',
    'JSON validator',
    'JSON formatter online free',
    'format JSON',
    'JSON फॉर्मेटर',
    'pretty print JSON',
    'JSON to string',
    'validate JSON online',
    'JSON parser',
    'JSON editor online',
    'developer tools',
  ],
  canonicalUrl: '/tools/json-formatter',
  toolName: 'JSON Formatter',
  category: 'Developer Tool',
  faqs: [
    {
      question: 'JSON क्या होता है?',
      answer: 'JSON (JavaScript Object Notation) एक lightweight data format है जो humans और machines दोनों के लिए easy to read और write है। APIs, configuration files, और data storage में widely use होता है।',
    },
    {
      question: 'JSON Beautify और Minify में क्या difference है?',
      answer: 'Beautify JSON को readable format में convert करता है proper indentation के साथ - debugging के लिए useful। Minify सभी whitespace remove करके smallest possible size बनाता है - production use के लिए।',
    },
    {
      question: 'Invalid JSON का क्या मतलब है?',
      answer: 'Invalid JSON में syntax errors होते हैं जैसे: missing quotes, trailing commas, single quotes instead of double, undefined instead of null। हमारा tool exactly बताता है कि error कहाँ है।',
    },
    {
      question: 'क्या यह tool large JSON files handle कर सकता है?',
      answer: 'हाँ, browser में process होता है इसलिए reasonable size (कुछ MB) तक JSON easily handle हो जाता है। बहुत large files के लिए desktop tools better हैं।',
    },
    {
      question: 'JSON में comments allow हैं?',
      answer: 'Standard JSON में comments allow नहीं हैं। अगर आपको comments चाहिए, तो JSON5 या JSONC formats use करें। Regular JSON parsers comments पर error देंगे।',
    },
    {
      question: 'Trailing comma क्या है?',
      answer: 'Trailing comma array या object के last element के बाद comma है जैसे [1, 2, 3,]। JSON में यह invalid है, हालांकि कुछ programming languages allow करती हैं।',
    },
  ],
  howToSteps: [
    'Input area में JSON paste करें',
    'Indent size select करें (2 या 4 spaces)',
    'Format button click करें beautify के लिए',
    'Minify button click करें compression के लिए',
    'Error messages पर syntax issues check करें',
    'Copy button से output copy करें',
  ],
};

const contentData = {
  whatIs: {
    title: 'JSON Formatter क्या है?',
    content: `JSON Formatter एक free online developer tool है जो JSON data को readable format में convert करता है। Unformatted JSON को properly indented, beautiful JSON में बदलें या production के लिए minify करें।

    Developers के लिए JSON पढ़ना और debug करना challenging हो सकता है जब वह एक line में compressed हो। यह tool instantly JSON को human-readable format में convert करता है। साथ ही syntax validation भी करता है - अगर JSON invalid है तो exact error location बताता है।

    API responses debug करने, configuration files edit करने, या data structures understand करने के लिए perfect tool। कोई installation नहीं, कोई registration नहीं - बस paste करें और format करें।`,
  },
  whyUse: {
    title: 'हमारा JSON Formatter क्यों use करें?',
    points: [
      'Instant Formatting - Real-time beautify और minify',
      'Syntax Validation - Invalid JSON तुरंत detect करता है',
      'Error Location - Exact line और position बताता है error की',
      'Custom Indentation - 2 या 4 spaces choose करें',
      'One-Click Copy - Formatted output instantly copy करें',
      'No Upload - Data browser में locally process होता है',
      'Sample JSON - Quick testing के लिए sample load करें',
      'Mobile Friendly - Phone पर भी use कर सकते हैं',
    ],
  },
  howToUse: {
    title: 'JSON Format कैसे करें - Complete Guide',
    steps: [
      'Left side के input area में अपना JSON paste करें। API response, config file, या कोई भी JSON data हो सकता है।',
      'Indent dropdown से indentation choose करें: 2 spaces (compact), 4 spaces (spacious), या 1 tab',
      'Format button (Maximize icon) click करें - JSON properly indented होकर right side में appear होगा',
      'अगर JSON में error है, तो red error message दिखेगा जो बताएगा कि exactly कहाँ problem है',
      'Error fix करें और फिर से format करें। Common errors: missing quotes, extra commas, single quotes',
      'Minify button click करें अगर आपको compressed JSON चाहिए (production use के लिए)',
      '"Load Sample" button से test JSON load कर सकते हैं practice के लिए',
      'Copy button से formatted JSON copy करें और जहाँ चाहें paste करें',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'API Debugging - API responses को readable format में देखें और analyze करें',
      'Config Files - Package.json, tsconfig.json जैसी files को format करें',
      'Data Analysis - Large JSON datasets को understand करने के लिए beautify करें',
      'Code Review - JSON structures को team members को explain करने के लिए format करें',
      'Production Optimization - JSON को minify करके file size reduce करें',
      'Database Export - Database से export किया data format करें',
      'Log Analysis - JSON formatted logs को parse और analyze करें',
      'Mock Data - Testing के लिए mock JSON data create और format करें',
      'Documentation - API documentation में readable JSON examples add करें',
      'Learning - JSON structure समझने के लिए different examples format करें',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'Unit Converter', href: '/tools/unit-converter' },
    { title: 'Image Converter', href: '/tools/image-converter' },
  ],
};

export default function JSONFormatter() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState('2');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indentSize));
      setOutput(formatted);
      setError('');
      toast({
        title: "Formatted! ✓",
        description: "JSON formatted successfully",
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      setOutput('');
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      toast({
        title: "Minified! ✓",
        description: "JSON minified successfully",
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      setOutput('');
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "JSON copied to clipboard",
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

  const loadSample = () => {
    const sample = {
      name: "AI Tools Hub",
      type: "website",
      features: ["SEO Tools", "Converters", "AI Writing"],
      meta: {
        version: "1.0",
        author: "Dev Team",
        isActive: true
      },
      tools: [
        { id: 1, name: "QR Generator" },
        { id: 2, name: "Password Generator" }
      ]
    };
    setInput(JSON.stringify(sample));
    setOutput('');
    setError('');
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'JSON Formatter' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-utility/10 text-utility text-sm mb-4">
              <Code className="h-4 w-4" />
              <span>Developer Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              JSON Formatter Online Free
            </h1>
            <p className="text-muted-foreground text-lg">
              JSON को beautify या minify करें - Instant validation
            </p>
          </header>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Indent:</span>
              <Select value={indentSize} onValueChange={setIndentSize}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="1">1 tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={formatJSON} className="btn-gradient">
              <Maximize2 className="h-4 w-4 mr-2" />
              Format
            </Button>
            
            <Button onClick={minifyJSON} variant="outline">
              <Minimize2 className="h-4 w-4 mr-2" />
              Minify
            </Button>
            
            <Button onClick={loadSample} variant="ghost">
              Load Sample
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Input JSON</h3>
                <span className="text-xs text-muted-foreground">
                  {input.length} characters
                </span>
              </div>
              <Textarea
                placeholder='Paste your JSON here...\n\n{"example": "data"}'
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                className="font-mono text-sm min-h-[400px] resize-none"
              />
            </Card>

            {/* Output */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Output</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={copyOutput}
                  disabled={!output}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="font-mono text-sm min-h-[400px] resize-none bg-muted/30"
              />
            </Card>
          </div>

          {/* Tips */}
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">💡 JSON Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1 grid md:grid-cols-2 gap-2">
                <li>• Keys must be in double quotes</li>
                <li>• No trailing commas allowed</li>
                <li>• Use null instead of undefined</li>
                <li>• Arrays use square brackets []</li>
                <li>• Objects use curly braces {'{}'}</li>
                <li>• Strings must use double quotes</li>
              </ul>
            </Card>
          </div>

          {/* SEO Content Sections */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
