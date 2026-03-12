import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy - SmartToolsHub | Free Online Tools</title>
        <meta name="description" content="SmartToolsHub Privacy Policy - Learn how we protect your data and privacy. Our free online tools process data locally in your browser. No personal data stored." />
        <link rel="canonical" href="https://smarttoolshub.com/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="font-display">Privacy Policy – SmartToolsHub</h1>
          <p className="lead">Last updated: March 12, 2026</p>

          <p>
            SmartToolsHub ("हम," "हमारा," या "हमारी") आपकी privacy की पूरी तरह रक्षा करता है। 
            यह Privacy Policy बताती है कि हम कौन सी information collect करते हैं, कैसे use करते हैं, 
            और आपके rights क्या हैं। SmartToolsHub पर 30+ free online tools उपलब्ध हैं जो 
            Image Compression, Calculators, SEO Tools, AI Writing Tools और बहुत कुछ offer करते हैं।
          </p>

          <h2>1. Information We Collect (हम कौन सी जानकारी इकट्ठा करते हैं)</h2>
          <p>SmartToolsHub minimal information collect करता है:</p>
          <ul>
            <li><strong>Usage Data (उपयोग डेटा):</strong> Anonymous analytics जैसे page views, tool usage frequency, और browser type ताकि हम अपनी services improve कर सकें।</li>
            <li><strong>Contact Information (संपर्क जानकारी):</strong> सिर्फ तब जब आप हमें <Link to="/contact">Contact Us</Link> page से message करते हैं - जैसे आपका नाम और email।</li>
            <li><strong>Tool Data (टूल डेटा):</strong> आप जो files upload करते हैं (images, documents) वो आपके browser में locally process होती हैं और हमारे servers पर store नहीं होतीं।</li>
            <li><strong>Cookies:</strong> Essential website functionality, analytics, और advertising preferences के लिए cookies use होती हैं।</li>
          </ul>

          <h2>2. How We Use Your Information (हम आपकी जानकारी कैसे उपयोग करते हैं)</h2>
          <p>Collected information निम्नलिखित purposes के लिए use होती है:</p>
          <ul>
            <li>हमारे tools को provide और maintain करना (Image Compressor, QR Generator, Calculator tools आदि)</li>
            <li>User experience को improve करना और website performance optimize करना</li>
            <li>आपकी inquiries का respond करना</li>
            <li>Relevant advertisements display करना (Google AdSense के through)</li>
            <li>Website security और fraud prevention</li>
          </ul>

          <h2>3. Data Security (डेटा सुरक्षा)</h2>
          <p>
            हमारे अधिकांश tools आपके browser में locally data process करते हैं। Image Compressor, 
            Image Converter, QR Code Generator, Password Generator, Hash Generator, JSON Formatter, 
            और Calculator tools में आपका data कभी हमारे servers तक नहीं पहुँचता। AI-powered tools 
            (Content Writer, Paraphraser, Translator, Grammar Checker) में data secure encrypted 
            connections के through process होता है और किसी भी form में permanently store नहीं होता।
          </p>

          <h2>4. Third-Party Services (तृतीय-पक्ष सेवाएं)</h2>
          <p>हम निम्नलिखित third-party services use करते हैं:</p>
          <ul>
            <li><strong>Google AdSense:</strong> Advertisements display करने के लिए। Google की <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> यहाँ देखें।</li>
            <li><strong>Google Analytics:</strong> Anonymous usage statistics collect करने के लिए। आप Google Analytics opt-out browser add-on install करके इसे disable कर सकते हैं।</li>
          </ul>

          <h2>5. Cookies Policy (कुकीज़ नीति)</h2>
          <p>SmartToolsHub cookies use करता है:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Website की basic functionality के लिए (जैसे theme preference)</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics के through anonymous usage tracking</li>
            <li><strong>Advertising Cookies:</strong> Google AdSense relevant ads दिखाने के लिए</li>
          </ul>
          <p>आप अपने browser settings से cookies disable कर सकते हैं, हालांकि कुछ features ठीक से काम नहीं कर सकते।</p>

          <h2>6. Children's Privacy (बच्चों की गोपनीयता)</h2>
          <p>
            SmartToolsHub 13 वर्ष से कम उम्र के बच्चों से जानबूझकर personal information collect नहीं करता। 
            यदि आपको लगता है कि किसी बच्चे ने हमें personal data provide किया है, तो कृपया हमसे संपर्क करें।
          </p>

          <h2>7. Your Rights (आपके अधिकार)</h2>
          <p>आपके पास निम्नलिखित rights हैं:</p>
          <ul>
            <li>अपने personal data तक access का अधिकार</li>
            <li>अपने data को delete करवाने का अधिकार</li>
            <li>Analytics tracking से opt-out करने का अधिकार</li>
            <li>Data portability का अधिकार</li>
            <li>Processing पर restriction लगाने का अधिकार</li>
          </ul>

          <h2>8. Data Retention (डेटा प्रतिधारण)</h2>
          <p>
            Contact form data केवल आपकी inquiry resolve होने तक retain किया जाता है। 
            Analytics data anonymized form में 26 months तक stored रहता है। 
            Tool usage data real-time में process होता है और store नहीं किया जाता।
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            SmartToolsHub India से operate होता है। यदि आप India के बाहर से हमारी services access करते हैं, 
            तो आपका data Indian servers पर process हो सकता है।
          </p>

          <h2>10. Contact Us (संपर्क करें)</h2>
          <p>
            Privacy Policy से related कोई भी सवाल हो तो हमें contact करें:{' '}
            <a href="mailto:support@smarttoolshub.com">support@smarttoolshub.com</a>
          </p>
          <p>
            आप हमारे <Link to="/contact">Contact Us</Link> page से भी message भेज सकते हैं।
          </p>

          <h2>11. Changes to This Policy (नीति में बदलाव)</h2>
          <p>
            हम समय-समय पर इस Privacy Policy को update कर सकते हैं। कोई भी बदलाव इस page पर 
            publish किया जाएगा। महत्वपूर्ण बदलावों के लिए हम website पर notice देंगे।
          </p>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Related Pages:</strong>{' '}
              <Link to="/terms">Terms & Conditions</Link> | {' '}
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
