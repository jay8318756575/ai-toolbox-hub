import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <Layout>
      <Helmet>
        <title>Disclaimer - SmartToolsHub | Free Online Tools</title>
        <meta name="description" content="SmartToolsHub Disclaimer - Important information about the use of our 30+ free online tools including AI tools, calculators, image tools and SEO tools." />
        <link rel="canonical" href="https://smarttoolshub.com/disclaimer" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="font-display text-4xl font-bold mb-8">Disclaimer – SmartToolsHub</h1>
          <p className="text-muted-foreground">Last updated: March 12, 2026</p>

          <p>
            SmartToolsHub ("हम," "हमारा") द्वारा smarttoolshub.com ("Site") पर provide की गई 
            जानकारी और tools केवल general informational और educational purposes के लिए हैं। 
            हम accuracy के लिए प्रयास करते हैं, लेकिन किसी भी जानकारी की accuracy, adequacy, 
            validity, reliability, या completeness के बारे में कोई guarantee नहीं देते।
          </p>

          <h2>General Information (सामान्य जानकारी)</h2>
          <p>
            SmartToolsHub पर 30+ free online tools उपलब्ध हैं जो विभिन्न categories में आते हैं - 
            Image Tools, Calculator Tools, SEO Tools, AI Writing Tools, और Utility Tools। 
            इन सभी tools के results informational purposes के लिए हैं और professional advice 
            का substitute नहीं माने जाने चाहिए।
          </p>

          <h2>Tool Results Disclaimer (टूल परिणाम अस्वीकरण)</h2>
          <ul>
            <li><strong>Calculator Tools</strong> (EMI Calculator, GST Calculator, BMI Calculator, Age Calculator, Percentage Calculator): Results approximate calculations हैं। Financial decisions के लिए certified financial advisor और health-related decisions के लिए qualified healthcare professional से consult करें।</li>
            <li><strong>AI-Powered Tools</strong> (AI Content Writer, AI Paraphraser, Grammar Checker, Plagiarism Checker, AI Translator, AI Summarizer, AI Chatbot): AI-generated content review और verify करें। 100% accuracy guaranteed नहीं है। AI content को publish करने से पहले fact-check करें।</li>
            <li><strong>SEO Tools</strong> (Meta Tag Generator, Keyword Density Checker, Robots.txt Generator, Sitemap Generator, Keyword Research, Page Speed Analyzer, Backlink Checker): General SEO best practices पर based recommendations। Specific ranking results guarantee नहीं किए जाते।</li>
            <li><strong>Image Tools</strong> (Image Compressor, Image Resizer, Image Converter, JPG to PNG, PNG to JPG): Browser-based processing। Output quality input image quality पर depend करती है।</li>
            <li><strong>House Planner (Ghar Ka Naksha)</strong>: यह AI द्वारा बनाया गया conceptual house plan है। Final construction से पहले licensed architect या engineer से सलाह लें।</li>
          </ul>

          <h2>No Professional Advice (कोई व्यावसायिक सलाह नहीं)</h2>
          <p>
            SmartToolsHub professional advice provide नहीं करता। हमारे tools और उनके results 
            general informational purposes के लिए हैं। Medical, financial, legal, या architectural 
            decisions लेने से पहले appropriate licensed professional से consult करें।
          </p>

          <h2>Accuracy of Information (जानकारी की सटीकता)</h2>
          <p>
            हम अपने tools की accuracy maintain करने का best effort करते हैं, लेकिन errors हो सकती हैं। 
            AI-generated content में factual inaccuracies हो सकती हैं। Calculator tools में rounding 
            differences हो सकते हैं। Users को important decisions लेने से पहले results independently verify करने चाहिए।
          </p>

          <h2>External Links (बाहरी लिंक)</h2>
          <p>
            SmartToolsHub पर third-party websites के links हो सकते हैं। हम इन external sites की 
            content, accuracy, या practices के लिए responsible नहीं हैं। External links पर click 
            करना आपकी own responsibility है।
          </p>

          <h2>Fair Use (उचित उपयोग)</h2>
          <p>
            SmartToolsHub के सभी tools personal और commercial use दोनों के लिए free हैं। 
            हालांकि, tools के output के use से होने वाले किसी भी outcome के लिए हम liable नहीं हैं। 
            Users tools का responsible और ethical use करने के लिए responsible हैं।
          </p>

          <h2>Data Privacy (डेटा गोपनीयता)</h2>
          <p>
            अधिकांश tools data आपके browser में locally process करते हैं (Image tools, Calculators, 
            QR Generator, Password Generator, Hash Generator, JSON Formatter)। AI-powered tools 
            में data secure encrypted connections के through process होता है और permanently store 
            नहीं किया जाता। विस्तृत जानकारी के लिए हमारी <Link to="/privacy">Privacy Policy</Link> देखें।
          </p>

          <h2>Limitation of Liability (दायित्व की सीमा)</h2>
          <p>
            SmartToolsHub किसी भी direct, indirect, incidental, special, consequential, या punitive 
            damages के लिए liable नहीं होगा जो Site या इसके tools के use से arise होते हैं। 
            सभी tools "as is" basis पर provide किए जाते हैं बिना किसी warranty के।
          </p>

          <h2>Changes to This Disclaimer (अस्वीकरण में परिवर्तन)</h2>
          <p>
            हम इस Disclaimer को किसी भी समय update कर सकते हैं। Changes इस page पर publish 
            किए जाएंगे। Continued use of the Site constitutes acceptance of the updated Disclaimer.
          </p>

          <h2>Contact Us (संपर्क करें)</h2>
          <p>
            इस Disclaimer से related कोई सवाल हो तो:{' '}
            <a href="mailto:support@smarttoolshub.com">support@smarttoolshub.com</a>
          </p>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Related Pages:</strong>{' '}
              <Link to="/privacy">Privacy Policy</Link> | {' '}
              <Link to="/terms">Terms & Conditions</Link> | {' '}
              <Link to="/about">About Us</Link> | {' '}
              <Link to="/contact">Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
