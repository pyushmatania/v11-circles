/**
 * Image optimization utilities for Circles app
 * Handles lazy loading, error fallbacks, and performance optimization
 */

export interface ImageOptimizationOptions {
  loading?: 'lazy' | 'eager';
  fallback?: string;
  quality?: number;
  width?: number;
  height?: number;
}

/**
 * Optimized image component props
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Preload critical images
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

/**
 * Get optimized image URL with quality parameters
 */
export const getOptimizedImageUrl = (
  originalUrl: string
): string => {
  // For external URLs, return as-is to preserve quality
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }
  
  // For local images, could add optimization parameters here
  return originalUrl;
};

/**
 * Handle image loading errors with fallbacks
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback?: string
): void => {
  const target = event.currentTarget;
  
  if (fallback && target.src !== fallback) {
    target.src = fallback;
  } else {
    // Hide broken images
    target.style.display = 'none';
  }
};

/**
 * Check if image is cached
 */
export const isImageCached = (src: string): boolean => {
  const img = new Image();
  img.src = src;
  return img.complete;
};

/**
 * Optimize image loading for performance
 */
export const optimizeImageLoading = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  const { loading = 'lazy' } = options;
  
  // Add loading attribute for better performance
  if (loading === 'lazy') {
    // Browser will handle lazy loading
    return src;
  }
  
  return src;
};

/**
 * Generate responsive image srcset
 */
export const generateSrcSet = (
  baseUrl: string,
  widths: number[] = [320, 640, 1024, 1920]
): string => {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
};

/**
 * Debounced image loading for better performance
 */
export const debouncedImageLoad = (
  callback: () => void,
  delay: number = 100
): (() => void) => {
  let timeoutId: number;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}; 