import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const seoData = {
  title: 'YouTube Thumbnail Downloader Online Free - Download HD Thumbnails',
  titleHi: 'YouTube थंबनेल डाउनलोडर ऑनलाइन फ्री',
  description: 'Free YouTube Thumbnail Downloader - Download YouTube video thumbnails in HD, SD quality. Just paste the video URL and download instantly.',
  descriptionHi: 'फ्री YouTube थंबनेल डाउनलोडर - YouTube video thumbnails HD में download करें।',
  keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'youtube thumbnail HD', 'video thumbnail download'],
  canonicalUrl: '/tools/youtube-thumbnail',
  toolName: 'YouTube Thumbnail Downloader',
  category: 'Utility Tool',
  faqs: [
    { question: 'YouTube thumbnail कैसे download करें?', answer: 'YouTube video का URL paste करें और Download button click करें। HD, SD और default quality में thumbnails available हैं।' },
    { question: 'क्या सभी videos की thumbnail download हो सकती है?', answer: 'हाँ, सभी public YouTube videos की thumbnails download की जा सकती हैं।' },
    { question: 'Thumbnail quality कितनी होगी?', answer: 'Maximum quality 1280x720 (HD) होती है। कुछ videos में maxresdefault available होता है जो 1920x1080 तक होता है।' },
  ],
  howToSteps: ['YouTube video URL paste करें', 'Get Thumbnails button click करें', 'Desired quality select करें', 'Download button click करें'],
};

const contentData = {
  whatIs: { title: 'YouTube Thumbnail Downloader क्या है?', content: 'YouTube Thumbnail Downloader एक free online tool है जो किसी भी YouTube video की thumbnail image download करने देता है। YouTubers, designers और content creators के लिए यह tool बहुत useful है। आप HD (1280x720), SD (640x480) और default quality में thumbnails download कर सकते हैं। बस video URL paste करें और instant download करें।' },
  whyUse: { title: 'क्यों use करें?', points: ['HD quality thumbnails', 'Multiple quality options', 'Instant download', 'No signup required', 'Design inspiration के लिए'] },
  howToUse: { title: 'कैसे use करें', steps: ['YouTube video का URL copy करें', 'Input box में URL paste करें', 'Get Thumbnails button click करें', 'Desired quality की thumbnail download करें'] },
  useCases: { title: 'Use Cases', cases: ['Blog posts में YouTube thumbnails use', 'Thumbnail design inspiration', 'Presentation materials', 'Social media posts', 'Research purposes'] },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'Image Compressor', href: '/tools/image-compressor' },
    { title: 'Image Resizer', href: '/tools/image-resizer' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
  ],
};

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function YouTubeThumbnail() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const getThumbnails = () => {
    const id = extractVideoId(url.trim());
    if (!id) { toast({ title: 'Invalid URL', description: 'Please enter a valid YouTube URL', variant: 'destructive' }); return; }
    setVideoId(id);
  };

  const qualities = [
    { label: 'Max Resolution (1920x1080)', key: 'maxresdefault' },
    { label: 'HD (1280x720)', key: 'hqdefault' },
    { label: 'SD (640x480)', key: 'sddefault' },
    { label: 'Default (480x360)', key: 'mqdefault' },
  ];

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'YouTube Thumbnail' }]} />
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4"><Youtube className="h-4 w-4" /><span>Utility Tool</span></div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">YouTube Thumbnail Downloader</h1>
            <p className="text-muted-foreground text-lg">YouTube video thumbnails HD में download करें</p>
          </header>

          <Card className="p-6 mb-6 space-y-4">
            <div className="flex gap-2">
              <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste YouTube video URL here..." className="flex-1" />
              <Button onClick={getThumbnails}>Get Thumbnails</Button>
            </div>
            {videoId && (
              <div className="grid sm:grid-cols-2 gap-4">
                {qualities.map(q => (
                  <div key={q.key} className="space-y-2">
                    <img src={`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`} alt={q.label} className="rounded-lg w-full bg-muted/30" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">{q.label}</p>
                      <a href={`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`} target="_blank" rel="noopener noreferrer" download>
                        <Button size="sm" variant="outline"><Download className="h-3 w-3 mr-1" />Download</Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
