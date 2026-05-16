import { Helmet } from 'react-helmet-async';

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
  canonical = "https://sparxtech.com",
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterHandle = "@sparxstudioz"
}: SEOProps) => {
  const siteName = "SPARX Studioz & Technologies";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#030303" />
    </Helmet>
  );
}

export default SEO;
