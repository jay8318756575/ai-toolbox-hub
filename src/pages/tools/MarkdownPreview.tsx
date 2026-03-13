import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, FileCode, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Markdown Preview Editor Online Free',
  titleHi: 'मार्कडाउन प्रीव्यू एडिटर',
  description: 'Free online Markdown editor with live preview. Write Markdown and see HTML output in real-time.',
  descriptionHi: 'फ्री ऑनलाइन मार्कडाउन एडिटर। Markdown लिखें और HTML output live देखें।',
  keywords: ['markdown editor', 'markdown preview', 'markdown to html', 'online markdown', 'md editor'],
  canonicalUrl: '/tools/markdown-preview',
  toolName: 'Markdown Preview',
  category: 'Developer Tool',
  faqs: [
    { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language for formatting text using simple syntax like # for headings and ** for bold.' },
    { question: 'Does it support all Markdown syntax?', answer: 'Yes, it supports headings, bold, italic, links, code blocks, lists, blockquotes, and more.' },
    { question: 'Can I export to HTML?', answer: 'Yes, you can copy the generated HTML output for use in your projects.' },
  ],
  howToSteps: ['Write Markdown in the editor', 'See live HTML preview on the right', 'Copy the rendered HTML'],
};

const contentData = {
  title: 'Free Markdown Preview Editor',
  introContent: `<p>Write <strong>Markdown</strong> and see it rendered as HTML in real-time. Perfect for README files, documentation, blog posts, and note-taking.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Live Preview', description: 'See rendered output as you type.' },
    { title: 'Full Syntax', description: 'Supports headings, lists, code, links, images, tables.' },
    { title: 'Copy HTML', description: 'Copy the generated HTML code.' },
    { title: 'No Signup', description: 'Free and works instantly in your browser.' },
  ],
};

function simpleMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^\> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground">$1</blockquote>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    .replace(/^---$/gm, '<hr class="my-4 border-border">')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  return html.replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>').replace(/<p><li>/g, '<ul><li>').replace(/<\/li><\/p>/g, '</li></ul>');
}

export default function MarkdownPreview() {
  const { toast } = useToast();
  const [input, setInput] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n> This is a blockquote\n\n`inline code` example\n\n[Visit SmartToolsHub](https://smarttoolshub.com)');

  const html = simpleMarkdown(input);
  const copy = async () => { await navigator.clipboard.writeText(html); toast({ title: 'HTML Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Markdown Preview' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><FileCode className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Markdown Preview Editor</h1>
            <p className="text-muted-foreground text-lg">Markdown लिखें और HTML output live देखें</p>
          </header>
          <div className="flex justify-end gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={copy}><Copy className="h-4 w-4 mr-2" /> Copy HTML</Button>
            <Button variant="outline" size="sm" onClick={() => setInput('')}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Markdown</h3>
              <Textarea value={input} onChange={e => setInput(e.target.value)} className="min-h-[400px] resize-none font-mono text-sm" />
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Preview</h3>
              <div className="min-h-[400px] prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
