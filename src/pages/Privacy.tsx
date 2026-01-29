import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="font-display">Privacy Policy</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Information We Collect</h2>
          <p>
            AI Tools Hub values your privacy. We collect minimal information to provide our services:
          </p>
          <ul>
            <li><strong>Usage Data:</strong> Anonymous analytics to improve our tools</li>
            <li><strong>Contact Information:</strong> Only when you contact us</li>
            <li><strong>Tool Data:</strong> Files you upload are processed locally and NOT stored on our servers</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and maintain our tools</li>
            <li>Improve user experience</li>
            <li>Respond to your inquiries</li>
            <li>Display relevant advertisements (Google AdSense)</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            Most of our tools process data locally in your browser. We do not store your uploaded 
            files, generated content, or personal data on our servers unless explicitly stated.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
          </ul>

          <h2>5. Cookies</h2>
          <p>
            We use cookies for:
          </p>
          <ul>
            <li>Essential website functionality</li>
            <li>Analytics and performance tracking</li>
            <li>Advertising preferences</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of analytics tracking</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@aitoolshub.com">support@aitoolshub.com</a>
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page.
          </p>
        </div>
      </div>
    </Layout>
  );
}
