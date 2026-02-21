import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Key, 
  ImageIcon, 
  FileText, 
  Languages,
  Sparkles,
  Home,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const popularTools = [
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    titleHi: 'QR कोड जनरेटर',
    description: 'Create QR codes for URLs, text, contact - Download instantly',
    icon: QrCode,
    href: '/tools/qr-generator',
    category: 'Utility',
    isNew: false,
    isAI: false,
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    titleHi: 'पासवर्ड जनरेटर',
    description: 'Strong, secure passwords with one click',
    icon: Key,
    href: '/tools/password-generator',
    category: 'Utility',
    isNew: false,
    isAI: false,
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    titleHi: 'इमेज कन्वर्टर',
    description: 'Convert PNG, JPG, WebP - Compress images',
    icon: ImageIcon,
    href: '/tools/image-converter',
    category: 'Converter',
    isNew: false,
    isAI: false,
  },
  {
    id: 'ai-writer',
    title: 'AI Content Writer',
    titleHi: 'AI कंटेंट राइटर',
    description: 'Generate blog posts, articles, social media content',
    icon: FileText,
    href: '/tools/ai-content-writer',
    category: 'AI Writing',
    isNew: true,
    isAI: true,
  },
  {
    id: 'meta-generator',
    title: 'Meta Tag Generator',
    titleHi: 'मेटा टैग जनरेटर',
    description: 'SEO-optimized meta tags for your website',
    icon: CheckCircle,
    href: '/tools/meta-generator',
    category: 'SEO',
    isNew: false,
    isAI: false,
  },
  {
    id: 'house-planner',
    title: 'House Plan AI',
    titleHi: 'घर का नक्शा AI',
    description: 'Generate 2D floor plans with AI - Print ready',
    icon: Home,
    href: '/tools/house-planner',
    category: 'Design',
    isNew: true,
    isAI: true,
  },
];

export function PopularTools() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Popular Tools
            </h2>
            <p className="text-muted-foreground">
              Most used tools by our community
            </p>
          </div>
          <Link 
            to="/tools" 
            className="hidden md:flex items-center text-primary font-medium hover:underline"
          >
            View All Tools →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool, index) => (
            <Link
              key={tool.id}
              to={tool.href}
              className={cn(
                "tool-card group",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <tool.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    {tool.isNew && (
                      <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                        New
                      </Badge>
                    )}
                    {tool.isAI && (
                      <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {tool.titleHi}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {tool.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/tools" 
            className="text-primary font-medium hover:underline"
          >
            View All Tools →
          </Link>
        </div>
      </div>
    </section>
  );
}
