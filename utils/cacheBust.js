/**
 * Utility to add cache busting parameters to external resources
 */

// Generate a cache busting timestamp that changes daily
const getCacheBustValue = () => {
  const date = new Date();
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
};

// Add cache busting parameter to URL
export const cacheBust = (url) => {
  if (!url) return url;
  
  // Don't add cache busting to data URLs
  if (url.startsWith('data:')) return url;
  
  // Add cache busting parameter
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${getCacheBustValue()}`;
};

// URLs that need cache busting
export const applyCacheBusting = (resources) => {
  const cacheBustValue = getCacheBustValue();
  
  // Apply to font URLs
  document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]').forEach(link => {
    const originalUrl = link.getAttribute('href');
    const separator = originalUrl.includes('?') ? '&' : '?';
    link.setAttribute('href', `${originalUrl}${separator}v=${cacheBustValue}`);
  });
  
  // Apply to icon font URLs
  document.querySelectorAll('link[rel="stylesheet"][href*="remixicon"]').forEach(link => {
    const originalUrl = link.getAttribute('href');
    const separator = originalUrl.includes('?') ? '&' : '?';
    link.setAttribute('href', `${originalUrl}${separator}v=${cacheBustValue}`);
  });
  
  // Apply to script URLs
  document.querySelectorAll('script[src*="cdn"]').forEach(script => {
    const originalUrl = script.getAttribute('src');
    const separator = originalUrl.includes('?') ? '&' : '?';
    script.setAttribute('src', `${originalUrl}${separator}v=${cacheBustValue}`);
  });
}; 