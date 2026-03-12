import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms & Conditions - SmartToolsHub | Free Online Tools</title>
        <meta name="description" content="SmartToolsHub Terms & Conditions - Read our terms of service for using 30+ free online tools including Image tools, Calculators, SEO tools, and AI tools." />
        <link rel="canonical" href="https://smarttoolshub.com/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="font-display">Terms & Conditions – SmartToolsHub</h1>
          <p className="lead">Last updated: March 12, 2026</p>

          <p>
            SmartToolsHub ("हम," "हमारा") पर आपका स्वागत है। smarttoolshub.com website ("Site") 
            का use करके, आप इन Terms & Conditions से सहमत होते हैं। कृपया इन्हें ध्यान से पढ़ें।
          </p>

          <h2>1. Acceptance of Terms (शर्तों की स्वीकृति)</h2>
          <p>
            SmartToolsHub website और इसके 30+ free online tools को access और use करके, 
            आप इन Terms and Conditions को accept करते हैं। यदि आप सहमत नहीं हैं, 
            तो कृपया हमारी services का use न करें।
          </p>

          <h2>2. Use of Services (सेवाओं का उपयोग)</h2>
          <p>हमारे tools personal और commercial दोनों use के लिए free हैं। आप सहमत हैं कि:</p>
          <ul>
            <li>Tools को केवल lawful purposes के लिए use करेंगे</li>
            <li>हमारी services को reverse engineer या hack करने का प्रयास नहीं करेंगे</li>
            <li>Automated systems से excessive access नहीं करेंगे</li>
            <li>Malicious files या harmful content upload नहीं करेंगे</li>
            <li>दूसरे users की privacy का respect करेंगे</li>
            <li>Tools का misuse करके spam या fraudulent content create नहीं करेंगे</li>
          </ul>

          <h2>3. Tool Categories & Usage Guidelines</h2>
          <p>SmartToolsHub पर विभिन्न categories के tools उपलब्ध हैं:</p>
          <ul>
            <li><strong>Image Tools</strong> (Compressor, Resizer, Converter, JPG to PNG, PNG to JPG): Browser-based processing, कोई file upload limit नहीं, output quality input पर depend करती है।</li>
            <li><strong>Calculator Tools</strong> (Age, EMI, GST, BMI, Percentage): Informational calculations, professional advice का substitute नहीं।</li>
            <li><strong>SEO Tools</strong> (Meta Tag Generator, Keyword Density, Robots.txt Generator, Sitemap Generator): General SEO best practices पर based, specific results guarantee नहीं।</li>
            <li><strong>AI Tools</strong> (Content Writer, Paraphraser, Summarizer, Translator, Grammar Checker, Chatbot): AI-generated outputs reference purposes के लिए, verification user की responsibility।</li>
            <li><strong>Utility Tools</strong> (QR Generator, Password Generator, JSON Formatter, Hash Generator, URL Encoder): Developer और general-purpose utilities।</li>
          </ul>

          <h2>4. AI-Generated Content Disclaimer (AI सामग्री अस्वीकरण)</h2>
          <p>
            <strong>Important:</strong> AI-generated content (articles, house plans, translations, और अन्य outputs) 
            केवल reference purposes के लिए है। Users सभी AI-generated content की verification और validation 
            के लिए स्वयं responsible हैं।
          </p>
          <ul>
            <li>House plans को construction से पहले licensed architect या engineer से review कराएं</li>
            <li>AI-written content publish करने से पहले fact-check करें</li>
            <li>Medical (BMI) calculations पर decisions लेने से पहले healthcare professional से consult करें</li>
            <li>Financial (EMI, GST) calculations verify करने के लिए certified financial advisor से संपर्क करें</li>
          </ul>

          <h2>5. Intellectual Property (बौद्धिक संपदा)</h2>
          <p>
            हमारे tools से generate किया गया content आपका है। हालांकि, tools themselves, 
            उनका design, code, और functionality SmartToolsHub की property है। 
            SmartToolsHub brand, logo, और website design copyright protected हैं।
          </p>

          <h2>6. Limitation of Liability (दायित्व की सीमा)</h2>
          <p>SmartToolsHub "as is" basis पर provide किया जाता है। हम liable नहीं हैं:</p>
          <ul>
            <li>AI-generated content की accuracy के लिए</li>
            <li>Data loss या corruption के लिए</li>
            <li>Indirect या consequential damages के लिए</li>
            <li>Service interruptions के लिए</li>
            <li>Third-party services (Google AdSense, Analytics) की issues के लिए</li>
          </ul>

          <h2>7. User Responsibilities (उपयोगकर्ता की जिम्मेदारियां)</h2>
          <p>आप responsible हैं:</p>
          <ul>
            <li>अपने generated content को verify करने के लिए</li>
            <li>Copyright laws का पालन करने के लिए</li>
            <li>Tools से generate किए गए output के appropriate use के लिए</li>
            <li>अपने account credentials (यदि applicable) safe रखने के लिए</li>
          </ul>

          <h2>8. Modifications (संशोधन)</h2>
          <p>
            हम किसी भी tool या service को बिना पूर्व सूचना के modify, update, या discontinue 
            करने का अधिकार रखते हैं। Terms में changes इस page पर publish किए जाएंगे।
          </p>

          <h2>9. Third-Party Links (तृतीय-पक्ष लिंक)</h2>
          <p>
            हमारी website में third-party websites के links हो सकते हैं। हम इन sites की 
            content या practices के लिए responsible नहीं हैं।
          </p>

          <h2>10. Governing Law (लागू कानून)</h2>
          <p>
            ये Terms भारत के कानूनों द्वारा governed हैं। कोई भी dispute भारत की courts में resolve किया जाएगा।
          </p>

          <h2>11. Contact (संपर्क)</h2>
          <p>
            इन Terms से related कोई सवाल हो तो contact करें:{' '}
            <a href="mailto:support@smarttoolshub.com">support@smarttoolshub.com</a>
          </p>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Related Pages:</strong>{' '}
              <Link to="/privacy">Privacy Policy</Link> | {' '}
              <Link to="/disclaimer">Disclaimer</Link> | {' '}
              <Link to="/about">About Us</Link> | {' '}
              <Link to="/contact">Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
