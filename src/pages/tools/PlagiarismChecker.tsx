import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileSearch, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const seoData = {
  title: 'Plagiarism Checker Online Free - Check Content Originality',
  titleHi: 'प्लेजरिज़्म चेकर ऑनलाइन फ्री',
  description: 'Free Plagiarism Checker - Check your content for plagiarism and originality. AI-powered analysis for unique content verification.',
  descriptionHi: 'फ्री प्लेजरिज़्म चेकर - Content की originality check करें।',
  keywords: ['plagiarism checker', 'plagiarism checker free', 'check plagiarism online', 'content originality checker', 'duplicate content checker'],
  canonicalUrl: '/tools/plagiarism-checker',
  toolName: 'Plagiarism Checker',
  category: 'Writing Tool',
  faqs: [
    { question: 'Plagiarism Checker कैसे काम करता है?', answer: 'AI technology use करके content की originality analyze की जाती है। Sentence structure, word patterns और content similarity check होती है।' },
    { question: 'क्या यह 100% accurate है?', answer: 'AI-based analysis approximate results देता है। Critical work के लिए professional tools भी use करें।' },
  ],
  howToSteps: ['Content paste करें', 'Check Plagiarism button click करें', 'Originality report देखें'],
};

const contentData = {
  whatIs: { title: 'Plagiarism Checker क्या है?', content: 'Plagiarism Checker एक AI-powered tool है जो आपके content की originality check करता है। यह tool students, bloggers, content writers और researchers के लिए बहुत useful है। यह content analysis करता है और बताता है कि content कितना unique है। AI technology advanced patterns detect करती है जो content similarity indicate करते हैं।' },
  whyUse: { title: 'क्यों use करें?', points: ['Content originality verify करें', 'Academic integrity maintain', 'SEO duplicate content avoid', 'AI-powered analysis', 'Free और instant results'] },
  howToUse: { title: 'कैसे use करें', steps: ['Text area में content paste करें', 'Check Plagiarism button click करें', 'AI analysis wait करें', 'Originality score और report देखें'] },
  useCases: { title: 'Use Cases', cases: ['Academic assignments', 'Blog content verification', 'SEO content check', 'Research papers', 'Content submission'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Grammar Checker', href: '/tools/grammar-checker' },
    { title: 'AI Content Writer', href: '/tools/ai-content-writer' },
    { title: 'Word Counter', href: '/tools/word-counter' },
  ],
};

export default function PlagiarismChecker() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const checkPlagiarism = async () => {
    if (!text.trim() || text.trim().split(/\s+/).length < 20) {
      toast({ title: 'More text needed', description: 'Please enter at least 20 words', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: 'You are a plagiarism analysis tool. Analyze the given text and provide: 1) An estimated originality score (percentage), 2) Analysis of writing style consistency, 3) Potential concerns if any, 4) Overall assessment. Format your response clearly with sections.' },
            { role: 'user', content: `Analyze this text for originality and plagiarism indicators:\n\n${text}` },
          ],
        },
      });
      if (error) throw error;
      setResult(data?.generatedText || data?.message || 'Analysis complete');
    } catch (err) {
      toast({ title: 'Error', description: 'Could not analyze text', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Plagiarism Checker' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><FileSearch className="h-4 w-4" /><span>Writing Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Plagiarism Checker Online Free</h1>
            <p className="text-muted-foreground text-lg">Content की originality AI से check करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your content here (minimum 20 words)..." className="min-h-[200px]" />
            <Button onClick={checkPlagiarism} className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analyzing...</> : 'Check Plagiarism'}
            </Button>
            {result && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Analysis Report:</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">{result}</div>
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
