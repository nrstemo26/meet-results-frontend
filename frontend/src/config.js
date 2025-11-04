// Read environment variables from Vite
export const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://192.168.86.27:5000/api'; // Default fallback if env var not set

// Site URL for SEO (canonical tags, schema.org URLs, Open Graph)
export const siteUrl = import.meta.env.VITE_SITE_URL || 'https://liftoracle.com';

// reCAPTCHA config
export const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LfjywErAAAAAOg6EHwyf2Xee21kgwdRgOK7hrvj'; // Site key for localhost

// Secure configuration - no longer exposing API keys directly
// These values will be fetched from the backend proxy endpoints
export const coffeeLink = import.meta.env.VITE_COFFEE_LINK_FALLBACK || 'https://buy.stripe.com/test_9AQaEQ8XLdfk6UocMO';
export const proLink = import.meta.env.VITE_PRO_LINK_FALLBACK || 'https://buy.stripe.com/test_eVabIUde12AG0w06op';
export const buttonId = import.meta.env.VITE_STRIPE_BUTTON_ID_FALLBACK || 'buy_btn_0NTsunUiMszhBUnlaOwffE0u';

// Removed direct API keys and replaced with proxy endpoints
export const stripeProxyUrl = `${baseUrl}/v1/proxy/stripe`;
export const mapsProxyUrl = `${baseUrl}/v1/proxy/maps`;

// Cache for stripe config
let stripeConfigCache = null;
let stripeCacheExpiration = 0;
const STRIPE_CACHE_TTL = 3600000; // 1 hour in milliseconds

// Function to fetch Stripe configuration securely with caching
export const fetchStripeConfig = async () => {
  const now = Date.now();
  
  // Return cached config if it's still valid
  if (stripeConfigCache && now < stripeCacheExpiration) {
    return stripeConfigCache;
  }
  
  // Try to get from localStorage first
  try {
    const cachedData = localStorage.getItem('stripeConfig');
    if (cachedData) {
      const { config, expiration } = JSON.parse(cachedData);
      if (now < expiration) {
        stripeConfigCache = config;
        stripeCacheExpiration = expiration;
        return config;
      }
    }
  } catch (e) {
    console.warn('Error reading cached stripe config from localStorage', e);
  }
  
  // Fetch from API if cache is invalid or expired
  try {
    const response = await fetch(`${stripeProxyUrl}/config`);
    if (!response.ok) {
      throw new Error('Failed to fetch Stripe configuration');
    }
    
    const config = await response.json();
    
    // Update memory cache
    stripeConfigCache = config;
    stripeCacheExpiration = now + STRIPE_CACHE_TTL;
    
    // Update localStorage cache
    try {
      localStorage.setItem('stripeConfig', JSON.stringify({
        config,
        expiration: stripeCacheExpiration
      }));
    } catch (e) {
      console.warn('Error saving stripe config to localStorage', e);
    }
    
    return config;
  } catch (error) {
    console.error('Error fetching Stripe config:', error);
    // Fall back to default values if fetch fails
    return {
      buttonId,
      proLink,
      coffeeLink
    };
  }
};

// To use different environments:
// Local development: .env file will be automatically loaded by Vite
// Production: .env.production will be used during build
// Docker: environment variables can be passed via docker-compose