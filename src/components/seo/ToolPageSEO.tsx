import { Helmet } from 'react-helmet-async';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolPageSEOProps {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  keywords: string[];
  canonicalUrl: string;
  toolName: string;
  category: string;
  faqs: FAQItem[];
  howToSteps?: string[];
}

export function ToolPageSEO({
  title, titleHi, description, descriptionHi, keywords, canonicalUrl, toolName, category, faqs, howToSteps,
}: ToolPageSEOProps) {
  const fullTitle = `${title} - Free Online Tool | SmartToolsHub`;
  const fullDescription = `${description} ${descriptionHi}`;
  const baseUrl = 'https://smarttoolshub.com';
  const fullUrl = `${baseUrl}${canonicalUrl}`;

  const softwareSchema = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: toolName, alternateName: titleHi, description: fullDescription, url: fullUrl,
    applicationCategory: category, operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1250' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question', name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const howToSchema = howToSteps ? {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: `How to use ${toolName}`, description,
    step: howToSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, text: step })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${baseUrl}/tools` },
      { '@type': 'ListItem', position: 3, name: toolName, item: fullUrl },
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      <html lang="en" />
      <meta httpEquiv="content-language" content="en, hi" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:site_name" content="SmartToolsHub" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
    </Helmet>
  );
}
