/**
 * Utility functions for handling profile images
 */

/**
 * Generate a unique identifier for cache busting
 */
export const generateCacheBuster = (): string => {
  return Date.now().toString();
};

/**
 * Add unique identifier to base64 image string for cache busting purposes
 * This doesn't modify the actual image data, just returns the original base64
 */
export const addUniqueIdToImage = (base64Image: string, userId: string): string => {
  // Just return the original image data, don't modify it
  // We'll handle cache busting at render time
  return base64Image;
};

/**
 * Extract base64 data from image string
 */
export const extractBase64Data = (imageString: string): string => {
  return imageString;
};

/**
 * Get unique identifier from image string
 */
export const getUniqueId = (imageString: string): string | null => {
  return null;
};

/**
 * Generate cache-busting URL for profile images
 * This creates a unique URL that browsers won't cache by appending a timestamp
 * Only applies cache busting to HTTP URLs, not base64 data URIs
 */
export const generateImageURL = (profileImage: string, userId: string): string => {
  if (!profileImage) return '';
  
  // If it's a base64 data URI, return as is - no cache busting needed
  if (profileImage.startsWith('data:image')) {
    return profileImage;
  }
  
  // If it's an HTTP URL, apply cache busting
  if (profileImage.startsWith('http')) {
    const cacheBuster = generateCacheBuster();
    return `${profileImage}?t=${cacheBuster}`;
  }
  
  // For any other image paths, apply cache busting
  const cacheBuster = generateCacheBuster();
  return `${profileImage}?t=${cacheBuster}`;
};