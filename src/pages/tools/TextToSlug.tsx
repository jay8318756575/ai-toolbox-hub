import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Text to URL Slug Generator Online Free',
  titleHi: 'टेक्स्ट टू URL स्लग जनरेटर',
  description: 'Free URL slug generator. Convert any text to SEO-friendly URL slug. Remove special characters, spaces to hyphens.',
  descriptionHi: 'फ्री URL स्लग जनरेटर। किसी भी text को SEO-friendly URL slug में बदलें।',
  keywords: ['slug generator', 'url slug', 'text to slug', 'seo url generator', 'permalink generator'],
  canonicalUrl: '/tools/text-to-slug',
  toolName: 'URL Slug Generator',
  category: 'SEO Tool',
  faqs: [
    { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL after the domain that identifies a page in a readable format, like /my-blog-post.' },
    { question: 'Why are slugs important for SEO?', answer: 'Clean, keyword-rich slugs help search engines understand page content and improve click-through rates.' },
    { question: 'What characters are removed?', answer: 'Special characters, accents, and symbols are removed. Spaces become hyphens, and text is lowercased.' },
  ],
  howToSteps: ['Enter your text or page title', 'See the URL slug generated instantly', 'Copy the slug for your website'],
};

const contentData = {
  title: 'Free URL Slug Generator',
  introContent: `<p>Generate <strong>SEO-friendly URL slugs</strong> from any text instantly. Perfect for blog posts, product pages, and any web content that needs clean, readable URLs.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'SEO Optimized', description: 'Creates clean, keyword-friendly URLs.' },
    { title: 'Special Char Removal', description: 'Strips special characters and accents.' },
    { title: 'Instant', description: 'Slug generates as you type.' },
    { title: 'Lowercase', description: 'Automatically lowercases everything.' },
  ],
};

function textToSlug(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

export default function TextToSlug() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const slug = textToSlug(input);
  const copy = async () => { await navigator.clipboard.writeText(slug); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'URL Slug Generator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Link2 className="h-4 w-4" /><span>SEO Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">URL Slug Generator Online Free</h1>
            <p className="text-muted-foreground text-lg">Text को SEO-friendly URL slug में बदलें</p>
          </header>
          <Card className="p-6 mb-6 max-w-2xl mx-auto">
            <label className="text-sm font-medium mb-2 block">Enter Text or Title</label>
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="My Awesome Blog Post Title!" className="text-lg mb-4" />
            {slug && (
              <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
                <code className="text-primary font-mono">/{slug}</code>
                <Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
