import { Link } from 'react-router-dom';
import { Wrench, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  tools: [
    { href: '/tools/image-compressor', label: 'Image Compressor' },
    { href: '/tools/age-calculator', label: 'Age Calculator' },
    { href: '/tools/emi-calculator', label: 'EMI Calculator' },
    { href: '/tools/qr-generator', label: 'QR Generator' },
    { href: '/tools/meta-generator', label: 'Meta Tag Generator' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold gradient-text">SmartToolsHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              आपका All-in-One Free Online Tools Platform। Image, Calculator, SEO और Writing tools - सब एक ही जगह।
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>support@smarttoolshub.com</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>India</span></div>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SmartToolsHub. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
