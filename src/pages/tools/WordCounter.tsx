import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Type } from 'lucide-react';

const seoData = {
  title: 'Word Counter Online Free - Count Words Characters Sentences',
  titleHi: 'वर्ड काउंटर ऑनलाइन फ्री',
  description: 'Free Word Counter - Count words, characters, sentences and paragraphs in your text. Real-time counting with reading time estimate.',
  descriptionHi: 'फ्री वर्ड काउंटर - Words, characters, sentences और paragraphs count करें।',
  keywords: ['word counter', 'character counter', 'word count online', 'count words free', 'character count tool'],
  canonicalUrl: '/tools/word-counter',
  toolName: 'Word Counter',
  category: 'Text Tool',
  faqs: [
    { question: 'Word Counter कैसे काम करता है?', answer: 'यह tool real-time में आपके text के words, characters, sentences और paragraphs count करता है।' },
    { question: 'Reading time कैसे calculate होता है?', answer: 'Average reading speed 200 words per minute मानकर reading time calculate किया जाता है।' },
    { question: 'क्या Hindi text support है?', answer: 'हाँ, Hindi, English और सभी languages support हैं।' },
  ],
  howToSteps: ['Text box में text paste या type करें', 'Real-time में word count देखें', 'Character, sentence और paragraph count भी देखें'],
};

const contentData = {
  whatIs: { title: 'Word Counter क्या है?', content: 'Word Counter एक free online tool है जो real-time में आपके text में words, characters (with/without spaces), sentences और paragraphs count करता है। यह tool bloggers, students, content writers और SEO professionals के लिए बहुत useful है। इसमें reading time estimate भी दिया जाता है जो content planning में मदद करता है। यह tool पूरी तरह browser-based है और आपका data कहीं store नहीं होता।' },
  whyUse: { title: 'Word Counter क्यों use करें?', points: ['Real-time word और character counting', 'Reading time estimate', 'Sentence और paragraph count', 'SEO content length optimization', 'Blog post word limit check'] },
  howToUse: { title: 'कैसे use करें', steps: ['Text area में text paste या type करें', 'Stats automatically update होंगे', 'Reading time देखें', 'Clear button से text clear करें'] },
  useCases: { title: 'Use Cases', cases: ['Blog post word count check', 'Essay word limit verify', 'Social media character limit', 'SEO content optimization', 'Academic assignment word count'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Case Converter', href: '/tools/case-converter' },
    { title: 'Grammar Checker', href: '/tools/grammar-checker' },
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
  ],
};

export default function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
  const readingTime = Math.ceil(words / 200);

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Word Counter' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Type className="h-4 w-4" /><span>Text Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Word Counter Online Free</h1>
            <p className="text-muted-foreground text-lg">Words, Characters, Sentences और Paragraphs count करें</p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {[
              { label: 'Words', value: words },
              { label: 'Characters', value: characters },
              { label: 'No Spaces', value: charactersNoSpaces },
              { label: 'Sentences', value: sentences },
              { label: 'Paragraphs', value: paragraphs },
              { label: 'Read Time', value: `${readingTime} min` },
            ].map(stat => (
              <Card key={stat.label} className="p-3 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 mb-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] text-base"
            />
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
