import { Helmet } from 'react-helmet';
import { siteUrl } from '../config';

/**
 * Enhanced SEO utility for Lift Oracle
 * Supports: Meta tags, Open Graph, Twitter Cards, JSON-LD schema, canonical tags
 * All schema uses only standard Schema.org properties
 */

// SEO constants
const SITE_URL = siteUrl;
const SITE_NAME = 'Lift Oracle';
const DEFAULT_IMAGE = `${SITE_URL}/oracle_sleeveless_white_bg.png`;

/**
 * Basic meta tags update (backward compatible with existing code)
 * Enhanced to support canonical tags, Open Graph, Twitter Cards, and JSON-LD schema
 */
export const updateMetaTags = (title, description, options = {}) => {
  const {
    canonical = null,
    ogImage = DEFAULT_IMAGE,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    jsonLd = null,
  } = options;

  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} key="description"/>

      {/* Canonical Tag */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} key="og:title"/>
      <meta property="og:description" content={description} key="og:description"/>
      <meta property="og:url" content={currentUrl} key="og:url"/>
      <meta property="og:type" content={ogType} key="og:type"/>
      <meta property="og:image" content={ogImage} key="og:image"/>
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name"/>

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} key="twitter:card"/>
      <meta name="twitter:title" content={title} key="twitter:title"/>
      <meta name="twitter:description" content={description} key="twitter:description"/>
      <meta name="twitter:image" content={ogImage} key="twitter:image"/>

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Generate JSON-LD schema for Athlete/Person pages
 * Uses only standard Schema.org Person and Athlete properties
 * @param {Object} athleteData - { name: string }
 * @returns {Object|null} Schema.org compliant JSON-LD
 */
export const generateAthleteSchema = (athleteData) => {
  if (!athleteData || !athleteData.name) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Person", "Athlete"],
    "name": athleteData.name,
    "sport": "Olympic Weightlifting",
    "url": `${SITE_URL}/athlete/${encodeURIComponent(athleteData.name)}`,
    "nationality": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return schema;
};

/**
 * Generate JSON-LD schema for Competition/Meet pages
 * Uses only standard Schema.org SportsEvent properties
 * @param {Object} meetData - { name: string, year: string|number }
 * @returns {Object|null} Schema.org compliant JSON-LD
 */
export const generateMeetSchema = (meetData) => {
  if (!meetData || !meetData.name) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": meetData.name,
    "sport": "Olympic Weightlifting",
    "url": `${SITE_URL}/meet/${encodeURIComponent(`${meetData.name} (${meetData.year})`)}`,
    "eventStatus": "https://schema.org/EventScheduled"
  };

  // Add startDate with year (at minimum)
  if (meetData.year) {
    schema.startDate = meetData.year.toString();
  }

  return schema;
};

/**
 * Generate JSON-LD schema for Gym/LocalBusiness pages
 * Uses only standard Schema.org LocalBusiness, SportsActivityLocation properties
 * @param {Object} gymData - Gym object with name, address, lat, lng, etc.
 * @returns {Object|null} Schema.org compliant JSON-LD
 */
export const generateGymSchema = (gymData) => {
  if (!gymData || !gymData.name) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "name": gymData.name,
    "sport": "Olympic Weightlifting"
  };

  // Add address (required for LocalBusiness)
  if (gymData.address) {
    schema.address = {
      "@type": "PostalAddress",
      "streetAddress": gymData.address,
      "addressCountry": "US"
    };

    // Try to parse city/state from address if provided separately
    if (gymData.city) {
      schema.address.addressLocality = gymData.city;
    }
    if (gymData.state) {
      schema.address.addressRegion = gymData.state;
    }
    if (gymData.zipCode) {
      schema.address.postalCode = gymData.zipCode;
    }
  }

  // Add geo coordinates if available
  if (gymData.lat && gymData.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": gymData.lat.toString(),
      "longitude": gymData.lng.toString()
    };
  }

  // Add URL if available
  if (gymData.website && gymData.website !== '#') {
    schema.url = gymData.website;
  }

  // Add telephone if available
  if (gymData.phone) {
    schema.telephone = gymData.phone;
  }

  // Add email if available
  if (gymData.email) {
    schema.email = gymData.email;
  }

  // Add price range if available
  if (gymData.dropInFee || gymData.monthlyRate) {
    if (gymData.monthlyRate) {
      schema.priceRange = `$$`;
    }
  }

  return schema;
};

/**
 * Generate Breadcrumb List schema
 * @param {Array} breadcrumbs - [{ name: string, path: string }, ...]
 * @returns {Object|null} Schema.org compliant BreadcrumbList
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${SITE_URL}${crumb.path}`
    }))
  };
};

/**
 * Generate Organization schema (for homepage/about)
 * @returns {Object} Schema.org compliant Organization
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/oracle_favicon_180.png`,
    "description": "Olympic weightlifting competition statistics and analytics platform. Track athletes, analyze meets, and find gyms."
  };
};
