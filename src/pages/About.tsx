import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Wrench, Users, Target, Heart, Shield, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us - SmartToolsHub | 30+ Free Online Tools</title>
        <meta name="description" content="SmartToolsHub के बारे में जानें - India की leading free online tools website। 30+ working tools including Image tools, Calculators, SEO tools, AI tools। 100% Free!" />
        <link rel="canonical" href="https://smarttoolshub.com/about" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About <span className="gradient-text">SmartToolsHub</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              SmartToolsHub India की leading free online tools website है जो students, professionals, 
              bloggers, developers और businesses को 30+ high-quality, 100% working tools provide करती है।
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Target className="h-5 w-5" /></div>
                <h2 className="font-display text-2xl font-bold">Our Mission (हमारा मिशन)</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                SmartToolsHub का मिशन है हर किसी को free, easy-to-use और 100% working online tools provide करना। 
                हम believe करते हैं कि technology सबके लिए accessible होनी चाहिए - चाहे आप student हों, 
                blogger हों, developer हों या business owner। हमारे सभी tools बिना registration और बिना 
                किसी hidden charges के available हैं।
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center"><Wrench className="h-5 w-5" /></div>
                <h2 className="font-display text-2xl font-bold">What We Offer (हम क्या देते हैं)</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                30+ free tools including Image Compressor, Image Resizer, QR Code Generator, Age Calculator, 
                EMI Calculator, GST Calculator, BMI Calculator, AI Content Writer, AI Paraphraser, 
                Grammar Checker, Meta Tag Generator, Keyword Density Checker, JSON Formatter, 
                Password Generator और बहुत कुछ। हर tool 100% functional है - no demos, no fakes, no "coming soon"।
              </p>
            </div>
          </div>

          {/* Tool Categories */}
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-8">हमारे Tool Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🖼️ Image Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/image-compressor" className="hover:text-primary">Image Compressor</Link>, {' '}
                  <Link to="/tools/image-resizer" className="hover:text-primary">Resizer</Link>, {' '}
                  <Link to="/tools/image-converter" className="hover:text-primary">Converter</Link>, {' '}
                  <Link to="/tools/jpg-to-png" className="hover:text-primary">JPG to PNG</Link>, {' '}
                  <Link to="/tools/png-to-jpg" className="hover:text-primary">PNG to JPG</Link>
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🧮 Calculator Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/age-calculator" className="hover:text-primary">Age Calculator</Link>, {' '}
                  <Link to="/tools/emi-calculator" className="hover:text-primary">EMI</Link>, {' '}
                  <Link to="/tools/gst-calculator" className="hover:text-primary">GST</Link>, {' '}
                  <Link to="/tools/bmi-calculator" className="hover:text-primary">BMI</Link>, {' '}
                  <Link to="/tools/percentage-calculator" className="hover:text-primary">Percentage</Link>
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🤖 AI Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/ai-content-writer" className="hover:text-primary">Content Writer</Link>, {' '}
                  <Link to="/tools/ai-paraphraser" className="hover:text-primary">Paraphraser</Link>, {' '}
                  <Link to="/tools/grammar-checker" className="hover:text-primary">Grammar Checker</Link>, {' '}
                  <Link to="/tools/ai-translator" className="hover:text-primary">Translator</Link>, {' '}
                  <Link to="/tools/ai-summarizer" className="hover:text-primary">Summarizer</Link>
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">📊 SEO Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/meta-generator" className="hover:text-primary">Meta Tag Generator</Link>, {' '}
                  <Link to="/tools/keyword-density" className="hover:text-primary">Keyword Density</Link>, {' '}
                  <Link to="/tools/robots-generator" className="hover:text-primary">Robots.txt</Link>, {' '}
                  <Link to="/tools/sitemap-generator" className="hover:text-primary">Sitemap</Link>
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🔧 Utility Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/qr-generator" className="hover:text-primary">QR Generator</Link>, {' '}
                  <Link to="/tools/password-generator" className="hover:text-primary">Password Generator</Link>, {' '}
                  <Link to="/tools/json-formatter" className="hover:text-primary">JSON Formatter</Link>, {' '}
                  <Link to="/tools/hash-generator" className="hover:text-primary">Hash Generator</Link>
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">✍️ Text Tools</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/tools/word-counter" className="hover:text-primary">Word Counter</Link>, {' '}
                  <Link to="/tools/case-converter" className="hover:text-primary">Case Converter</Link>, {' '}
                  <Link to="/tools/url-encoder" className="hover:text-primary">URL Encoder</Link>, {' '}
                  <Link to="/tools/unit-converter" className="hover:text-primary">Unit Converter</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-8">Our Core Values (हमारे मूल्य)</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><Users className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">User First</h3>
                <p className="text-sm text-muted-foreground">हर decision user experience को ध्यान में रखकर</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4"><Shield className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">Data locally process, कोई personal data store नहीं</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4"><Zap className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">Quality & Speed</h3>
                <p className="text-sm text-muted-foreground">हर tool tested, fast, और production-ready</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4"><Heart className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">Free Forever</h3>
                <p className="text-sm text-muted-foreground">Core tools हमेशा free, no hidden charges</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">SmartToolsHub क्यों चुनें?</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Internet पर बहुत सारी tools websites हैं, लेकिन SmartToolsHub कई कारणों से अलग है। 
                सबसे पहले, हमारे सभी 30+ tools 100% working और tested हैं - कोई demo, placeholder, 
                या "coming soon" tool नहीं है। हर tool real input लेता है, real processing करता है, 
                और real output देता है जिसे आप download, copy, या print कर सकते हैं।
              </p>
              <p className="text-muted-foreground leading-relaxed">
                दूसरा, हमारी website पूरी तरह free है - कोई registration required नहीं, कोई usage limit नहीं, 
                और कोई watermark नहीं। तीसरा, privacy हमारी top priority है - Image tools, Calculator tools, 
                और utility tools में आपका data आपके browser में locally process होता है और कहीं भी upload नहीं होता।
              </p>
              <p className="text-muted-foreground leading-relaxed">
                SmartToolsHub mobile-friendly है और किसी भी device (mobile, tablet, desktop) पर perfectly काम करता है। 
                हमारी website fast loading है और SEO-optimized है ताकि आप Google Search से easily अपने 
                favourite tools तक पहुँच सकें।
              </p>
            </div>
          </div>

          {/* Internal Links */}
          <div className="p-6 bg-muted/30 rounded-2xl">
            <h2 className="font-display text-xl font-bold mb-4">Quick Links</h2>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">→ All Tools</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">→ Contact Us</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">→ Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">→ Terms & Conditions</Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">→ Disclaimer</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">→ FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
