import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Copy, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'Sitemap Generator Online Free - Create XML Sitemap',
  titleHi: 'साइटमैप जनरेटर ऑनलाइन फ्री',
  description: 'Free Sitemap Generator - Create XML sitemap for your website. Help search engines discover and index all your pages efficiently.',
  descriptionHi: 'फ्री साइटमैप जनरेटर - अपनी website के लिए XML sitemap बनाएं।',
  keywords: ['sitemap generator', 'xml sitemap generator', 'create sitemap', 'sitemap maker', 'SEO sitemap'],
  canonicalUrl: '/tools/sitemap-generator',
  toolName: 'Sitemap Generator',
  category: 'SEO Tool',
  faqs: [
    { question: 'Sitemap क्या है?', answer: 'Sitemap एक XML file है जो search engines को website के सभी important pages की list provide करती है।' },
    { question: 'Sitemap SEO के लिए क्यों ज़रूरी है?', answer: 'Sitemap search engines को website crawl करने में help करता है, खासकर new pages को quickly index करने में।' },
  ],
  howToSteps: ['Website URL enter करें', 'Pages add करें', 'Generate Sitemap button click करें', 'XML file copy या download करें'],
};

const contentData = {
  whatIs: { title: 'Sitemap Generator क्या है?', content: 'Sitemap Generator एक free online tool है जो आपकी website के लिए XML sitemap file create करता है। XML Sitemap search engines (Google, Bing) को website के सभी important pages discover करने में help करता है। यह SEO ka fundamental part है जो faster indexing ensure करता है।' },
  whyUse: { title: 'क्यों use करें?', points: ['Faster Google indexing', 'All pages discovered', 'SEO optimization', 'Easy XML generation', 'Custom priority settings'] },
  howToUse: { title: 'कैसे use करें', steps: ['Base URL enter करें', 'Page paths add करें', 'Priority और frequency set करें', 'Generate button click करें'] },
  useCases: { title: 'Use Cases', cases: ['New website launch', 'SEO setup', 'Google Search Console submission', 'Website migration', 'Regular SEO maintenance'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Robots.txt Generator', href: '/tools/robots-generator' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
  ],
};

export default function SitemapGenerator() {
  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState('');
  const [pages, setPages] = useState([{ path: '/', priority: '1.0', freq: 'daily' }]);
  const [result, setResult] = useState('');

  const addPage = () => setPages([...pages, { path: '/', priority: '0.8', freq: 'weekly' }]);
  const removePage = (i: number) => setPages(pages.filter((_, idx) => idx !== i));
  const updatePage = (i: number, field: string, val: string) => {
    const updated = [...pages]; (updated[i] as any)[field] = val; setPages(updated);
  };

  const generate = () => {
    const domain = baseUrl.replace(/\/$/, '').replace(/^(?!https?:\/\/)/, 'https://');
    const today = new Date().toISOString().split('T')[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    pages.forEach(p => {
      xml += `  <url>\n    <loc>${domain}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });
    xml += '</urlset>';
    setResult(xml);
  };

  const copy = () => { navigator.clipboard.writeText(result); toast({ title: 'Copied!' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Sitemap Generator' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Globe className="h-4 w-4" /><span>SEO Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Sitemap Generator Online Free</h1>
            <p className="text-muted-foreground text-lg">अपनी website के लिए XML Sitemap बनाएं</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div><Label>Base URL</Label><Input value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://example.com" /></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><Label>Pages</Label><Button size="sm" variant="outline" onClick={addPage}><Plus className="h-3 w-3 mr-1" />Add Page</Button></div>
              {pages.map((page, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1"><Input value={page.path} onChange={e => updatePage(i, 'path', e.target.value)} placeholder="/page-path" /></div>
                  <select value={page.priority} onChange={e => updatePage(i, 'priority', e.target.value)} className="h-10 px-2 rounded-md border border-input bg-background text-sm">
                    <option value="1.0">1.0</option><option value="0.9">0.9</option><option value="0.8">0.8</option><option value="0.7">0.7</option><option value="0.5">0.5</option><option value="0.3">0.3</option>
                  </select>
                  <select value={page.freq} onChange={e => updatePage(i, 'freq', e.target.value)} className="h-10 px-2 rounded-md border border-input bg-background text-sm">
                    <option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option>
                  </select>
                  {pages.length > 1 && <Button size="icon" variant="ghost" onClick={() => removePage(i)}><X className="h-4 w-4" /></Button>}
                </div>
              ))}
            </div>
            <Button onClick={generate} className="w-full">Generate Sitemap</Button>
            {result && (
              <div className="space-y-2">
                <div className="flex justify-between items-center"><p className="text-sm font-medium">Generated sitemap.xml:</p><Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4 mr-1" />Copy</Button></div>
                <pre className="bg-muted/50 p-4 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto">{result}</pre>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
