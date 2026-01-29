import { Layout } from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="font-display">Terms & Conditions</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using AI Tools Hub, you accept and agree to be bound by these 
            Terms and Conditions. If you do not agree, please do not use our services.
          </p>

          <h2>2. Use of Services</h2>
          <p>Our tools are provided for personal and commercial use. You agree to:</p>
          <ul>
            <li>Use tools for lawful purposes only</li>
            <li>Not attempt to reverse engineer or hack our services</li>
            <li>Not use automated systems to access our services excessively</li>
            <li>Not upload malicious files or content</li>
          </ul>

          <h2>3. AI-Generated Content Disclaimer</h2>
          <p>
            <strong>Important:</strong> AI-generated content (including house plans, articles, and other outputs) 
            is for reference purposes only. Users are responsible for verifying and validating all AI-generated content.
          </p>
          <ul>
            <li>House plans should be reviewed by a licensed architect or engineer before construction</li>
            <li>AI-written content should be fact-checked before publishing</li>
            <li>We are not liable for any decisions made based on AI-generated outputs</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            Content generated using our tools belongs to you. However, the tools themselves, 
            their design, and functionality are owned by AI Tools Hub.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            AI Tools Hub is provided "as is" without warranties of any kind. We are not liable for:
          </p>
          <ul>
            <li>Accuracy of AI-generated content</li>
            <li>Data loss or corruption</li>
            <li>Indirect or consequential damages</li>
            <li>Service interruptions</li>
          </ul>

          <h2>6. Modifications</h2>
          <p>
            We reserve the right to modify or discontinue any tool or service at any time 
            without prior notice.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible 
            for the content or practices of these sites.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes will be resolved 
            in the courts of India.
          </p>

          <h2>9. Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@aitoolshub.com">support@aitoolshub.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
