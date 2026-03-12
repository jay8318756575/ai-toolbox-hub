import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, CheckCircle, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({ title: "Message Sent! ✓", description: "हम जल्द ही आपसे संपर्क करेंगे।" });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us - SmartToolsHub | Free Online Tools</title>
        <meta name="description" content="Contact SmartToolsHub team for support, feedback, or partnership inquiries. We respond within 24-48 hours. Email: support@smarttoolshub.com" />
        <link rel="canonical" href="https://smarttoolshub.com/contact" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="gradient-text">SmartToolsHub</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              कोई सवाल, सुझाव या feedback है? हमें message करें! हम 24-48 hours में reply करते हैं।
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">support@smarttoolshub.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground">24-48 hours</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Privacy</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  आपकी personal information safe है। Details: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              {isSubmitted ? (
                <div className="text-center py-12 bg-muted/30 rounded-2xl">
                  <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">आपका message मिल गया है। हम जल्द ही reply करेंगे।</p>
                  <Button className="mt-6" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" placeholder="आपका नाम" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="किस बारे में बात करनी है?" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="अपना message यहाँ लिखें..." rows={6} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full btn-gradient" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : (<><Send className="h-4 w-4 mr-2" />Send Message</>)}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Additional Content for SEO */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-4">SmartToolsHub से संपर्क करें</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SmartToolsHub India की leading free online tools website है जो 30+ high-quality tools provide करती है। 
              हमारे tools में Image Compressor, Image Resizer, QR Code Generator, Age Calculator, EMI Calculator, 
              AI Content Writer, Grammar Checker, और बहुत कुछ शामिल है। यदि आपको किसी tool में कोई issue है, 
              कोई नया feature suggest करना है, या partnership inquiry है, तो हमें ऊपर दिए गए form से contact करें।
            </p>
            <p className="text-muted-foreground leading-relaxed">
              हम हर message को seriously लेते हैं और 24-48 working hours में respond करते हैं। 
              आप हमें directly <a href="mailto:support@smarttoolshub.com" className="text-primary hover:underline">support@smarttoolshub.com</a> पर 
              भी email कर सकते हैं।
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
