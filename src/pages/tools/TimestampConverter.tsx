import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToolContentSection } from '@/components/seo/ToolContentSection';

const seoData = {
  title: 'Unix Timestamp Converter Online Free',
  titleHi: 'Unix टाइमस्टैम्प कन्वर्टर',
  description: 'Free Unix timestamp converter. Convert timestamps to dates and dates to Unix timestamps instantly.',
  descriptionHi: 'फ्री Unix timestamp कन्वर्टर। Timestamps को dates में और dates को timestamps में बदलें।',
  keywords: ['unix timestamp', 'timestamp converter', 'epoch converter', 'unix time', 'timestamp to date'],
  canonicalUrl: '/tools/timestamp-converter',
  toolName: 'Timestamp Converter',
  category: 'Developer Tool',
  faqs: [
    { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC). It is widely used in programming.' },
    { question: 'Does it support millisecond timestamps?', answer: 'Yes, both second and millisecond timestamps are automatically detected and converted.' },
  ],
  howToSteps: ['Enter a Unix timestamp or select a date', 'See the conversion instantly', 'Copy the result'],
};

const contentData = {
  title: 'Free Unix Timestamp Converter',
  introContent: `<p>Convert <strong>Unix timestamps to dates</strong> and dates to Unix timestamps instantly. Essential for developers working with APIs, databases, and log files.</p>`,
  featuresTitle: 'Features',
  features: [
    { title: 'Bidirectional', description: 'Timestamp to date and date to timestamp.' },
    { title: 'Auto-detect', description: 'Detects seconds vs milliseconds automatically.' },
    { title: 'Current Time', description: 'Shows current Unix timestamp live.' },
    { title: 'Multiple Formats', description: 'ISO 8601, UTC, and local time.' },
  ],
};

export default function TimestampConverter() {
  const { toast } = useToast();
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState('');

  const ts = parseInt(timestamp);
  const isMs = timestamp.length > 10;
  const date = !isNaN(ts) ? new Date(isMs ? ts : ts * 1000) : null;
  const dateTs = dateInput ? Math.floor(new Date(dateInput).getTime() / 1000) : null;

  const copy = async (text: string) => { await navigator.clipboard.writeText(text); toast({ title: 'Copied! ✓' }); };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Timestamp Converter' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Clock className="h-4 w-4" /><span>Developer Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Unix Timestamp Converter</h1>
            <p className="text-muted-foreground text-lg">Timestamps और dates को convert करें</p>
          </header>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Timestamp → Date</h3>
              <Input value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="Enter Unix timestamp..." className="font-mono mb-4" />
              {date && date.getTime() > 0 && (
                <div className="space-y-2">
                  {[
                    { l: 'UTC', v: date.toUTCString() },
                    { l: 'ISO 8601', v: date.toISOString() },
                    { l: 'Local', v: date.toLocaleString() },
                  ].map(({ l, v }) => (
                    <button key={l} onClick={() => copy(v)} className="w-full bg-muted/50 rounded p-2 text-left hover:bg-muted transition-colors">
                      <p className="text-xs text-muted-foreground">{l}</p>
                      <p className="text-sm font-mono">{v}</p>
                    </button>
                  ))}
                </div>
              )}
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Date → Timestamp</h3>
              <Input type="datetime-local" value={dateInput} onChange={e => setDateInput(e.target.value)} className="mb-4" />
              {dateTs && !isNaN(dateTs) && (
                <div className="space-y-2">
                  <button onClick={() => copy(dateTs.toString())} className="w-full bg-muted/50 rounded p-2 text-left hover:bg-muted transition-colors">
                    <p className="text-xs text-muted-foreground">Seconds</p>
                    <p className="text-lg font-mono font-bold text-primary">{dateTs}</p>
                  </button>
                  <button onClick={() => copy((dateTs * 1000).toString())} className="w-full bg-muted/50 rounded p-2 text-left hover:bg-muted transition-colors">
                    <p className="text-xs text-muted-foreground">Milliseconds</p>
                    <p className="text-lg font-mono font-bold text-primary">{dateTs * 1000}</p>
                  </button>
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-1">Current Timestamp</p>
                <Button variant="outline" size="sm" onClick={() => { const now = Math.floor(Date.now() / 1000); setTimestamp(now.toString()); copy(now.toString()); }}><Clock className="h-3 w-3 mr-1" /> {Math.floor(Date.now() / 1000)}</Button>
              </div>
            </Card>
          </div>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
