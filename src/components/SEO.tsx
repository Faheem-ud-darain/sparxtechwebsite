import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/data/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

const SEO = ({
  title = "SPARX Studioz & Technologies | Digital Crafting & Innovation",
  description = "A premium digital agency specializing in high-end web experiences, software solutions, and creative design.",
  keywords = "software development, 3d web development, digital marketing, meta ads, custom software, graphics design, video editing, SPARX",
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterHandle = "@sparxstudioz"
}: SEOProps) => {
  const location = useLocation();
  const siteName = "SPARX Studioz & Technologies";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Dynamically resolve the canonical URL if not explicitly provided
  const siteUrl = "https://sparxtechwebsite.vercel.app";
  const normalizedPath = location.pathname === '/' ? '' : location.pathname;
  const activeCanonical = canonical || `${siteUrl}${normalizedPath}`;
  const activeOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Generate JSON-LD Schema Markup based on the page type
  let schema: any = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteName,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.jpg`,
    "image": `${siteUrl}/logo.jpg`,
    "description": description,
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Shammal News Office, Plot 6-A, small industry state, Main Manshera Road, Mandian",
      "addressLocality": "Abbottabad",
      "addressRegion": "KPK",
      "postalCode": "22010",
      "addressCountry": "PK"
    },
    "sameAs": [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.linkedin
    ]
  };

  if (location.pathname.startsWith('/blog/') && ogType === 'article') {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "image": activeOgImage,
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.jpg`
        }
      },
      "author": {
        "@type": "Organization",
        "name": siteName
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": activeCanonical
      }
    };
  } else if (location.pathname.startsWith('/project/')) {
    schema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": title,
      "description": description,
      "image": activeOgImage,
      "provider": {
        "@type": "LocalBusiness",
        "name": siteName,
        "url": siteUrl
      }
    };
  }

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={activeCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={activeOgImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={activeOgImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#030303" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default SEO;
