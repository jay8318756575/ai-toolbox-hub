import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Copy, CheckCircle, Code, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MetaGenerator() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    image: '',
    siteName: '',
    twitterHandle: '',
  });
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags: string[] = [];

    // Basic Meta Tags
    if (formData.title) {
      tags.push(`<title>${formData.title}</title>`);
      tags.push(`<meta name="title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="description" content="${formData.description}">`);
    }
    
    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}">`);
    }
    
    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}">`);
    }

    // Viewport (always include)
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    tags.push(`<meta charset="UTF-8">`);

    // Open Graph Tags
    if (formData.title) {
      tags.push(`\n<!-- Open Graph / Facebook -->`);
      tags.push(`<meta property="og:type" content="website">`);
      tags.push(`<meta property="og:title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta property="og:description" content="${formData.description}">`);
    }
    
    if (formData.url) {
      tags.push(`<meta property="og:url" content="${formData.url}">`);
    }
    
    if (formData.image) {
      tags.push(`<meta property="og:image" content="${formData.image}">`);
    }
    
    if (formData.siteName) {
      tags.push(`<meta property="og:site_name" content="${formData.siteName}">`);
    }

    // Twitter Card Tags
    if (formData.title) {
      tags.push(`\n<!-- Twitter -->`);
      tags.push(`<meta name="twitter:card" content="summary_large_image">`);
      tags.push(`<meta name="twitter:title" content="${formData.title}">`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="twitter:description" content="${formData.description}">`);
    }
    
    if (formData.image) {
      tags.push(`<meta name="twitter:image" content="${formData.image}">`);
    }
    
    if (formData.twitterHandle) {
      tags.push(`<meta name="twitter:site" content="@${formData.twitterHandle.replace('@', '')}">`);
    }

    return tags.join('\n');
  };

  const metaTags = generateMetaTags();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(metaTags);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "Meta tags copied to clipboard",
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

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      keywords: '',
      author: '',
      url: '',
      image: '',
      siteName: '',
      twitterHandle: '',
    });
  };

  const titleLength = formData.title.length;
  const descLength = formData.description.length;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seo/10 text-seo text-sm mb-4">
              <Code className="h-4 w-4" />
              <span>SEO Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Meta Tag Generator
            </h1>
            <p className="text-muted-foreground">
              SEO-optimized meta tags generate करें - Copy & Paste ready
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Page Information</h3>
                  <Button size="sm" variant="ghost" onClick={clearForm}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="title">Page Title *</Label>
                      <span className={`text-xs ${titleLength > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {titleLength}/60
                      </span>
                    </div>
                    <Input
                      id="title"
                      placeholder="Your Page Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {titleLength > 60 && (
                      <p className="text-xs text-destructive mt-1">
                        Title should be under 60 characters for best SEO
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="description">Meta Description *</Label>
                      <span className={`text-xs ${descLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {descLength}/160
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your page (150-160 characters recommended)"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Comma-separated keywords
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Author Name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        placeholder="Your Site Name"
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Social Media (Optional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="url">Page URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://yoursite.com/page"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">OG Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://yoursite.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 1200x630 pixels
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter Handle</Label>
                    <Input
                      id="twitter"
                      placeholder="@yourusername"
                      value={formData.twitterHandle}
                      onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Meta Tags</h3>
                  <Button size="sm" onClick={copyToClipboard} disabled={!formData.title}>
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                    {metaTags || '<!-- Add page information to generate meta tags -->'}
                  </pre>
                </div>
              </Card>

              {/* Preview */}
              {formData.title && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Google Search Preview</h3>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                      {formData.title || 'Page Title'}
                    </p>
                    <p className="text-green-700 text-sm truncate">
                      {formData.url || 'https://yoursite.com/page'}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formData.description || 'Your page description will appear here...'}
                    </p>
                  </div>
                </Card>
              )}

              {/* Tips */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-semibold mb-3">💡 SEO Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Title 50-60 characters में रखें</li>
                  <li>• Description 150-160 characters ideal है</li>
                  <li>• Primary keyword title की शुरुआत में रखें</li>
                  <li>• हर page के लिए unique meta tags use करें</li>
                  <li>• OG Image से social sharing improve होती है</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
