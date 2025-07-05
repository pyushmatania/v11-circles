// Elite Performance Optimizer for Circles Platform
// Applies advanced optimizations without compromising visual quality

import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

// 1. Advanced Component Memoization
export const createEliteComponent = <P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return React.memo(Component, propsAreEqual);
};

// 2. Optimized Event Handlers
export const createOptimizedHandlers = () => {
  const handlersRef = useRef<Map<string, Function>>(new Map());

  const getHandler = useCallback((key: string, handler: Function) => {
    if (!handlersRef.current.has(key)) {
      handlersRef.current.set(key, handler);
    }
    return handlersRef.current.get(key)!;
  }, []);

  return { getHandler };
};

// 3. Advanced Lazy Loading
export const createLazyLoader = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    fallback?: React.ComponentType;
    preload?: boolean;
  } = {}
) => {
  const { fallback, preload = false } = options;
  
  const LazyComponent = React.lazy(importFunc);
  
  if (preload) {
    // Preload the component
    importFunc();
  }

  return (props: React.ComponentProps<T>) => (
    <React.Suspense 
      fallback={
        fallback ? (
          <fallback />
        ) : (
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )
      }
    >
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// 4. Intersection Observer for Performance
export const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return elementRef;
};

// 5. Debounced and Throttled Utilities
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};

export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = useRef(0);
  const lastCallTimerRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        callback(...args);
        lastCallRef.current = now;
      } else {
        if (lastCallTimerRef.current) {
          clearTimeout(lastCallTimerRef.current);
        }
        lastCallTimerRef.current = setTimeout(() => {
          callback(...args);
          lastCallRef.current = Date.now();
        }, delay - (now - lastCallRef.current));
      }
    }) as T,
    [callback, delay]
  );
};

// 6. Virtual Scrolling for Large Lists
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      itemCount,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleRange,
    totalHeight,
    offsetY,
    setScrollTop,
    visibleItems: Array.from(
      { length: visibleRange.endIndex - visibleRange.startIndex },
      (_, i) => visibleRange.startIndex + i
    )
  };
};

// 7. Image Optimization
export const useImageOptimization = (src: string, options: {
  lazy?: boolean;
  preload?: boolean;
  fallback?: string;
} = {}) => {
  const { lazy = true, preload = false, fallback } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (preload) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
      img.src = src;
    }
  }, [src, preload]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  return {
    isLoaded,
    hasError,
    imgRef,
    handleLoad,
    handleError,
    src: hasError && fallback ? fallback : src,
    loading: lazy ? 'lazy' : 'eager'
  };
};

// 8. Memory Management
export const useMemoryOptimization = () => {
  const cleanupRef = useRef<(() => void)[]>([]);
  const weakMapRef = useRef<WeakMap<object, any>>(new WeakMap());

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupRef.current.push(cleanup);
  }, []);

  const cacheValue = useCallback((key: object, value: any) => {
    weakMapRef.current.set(key, value);
  }, []);

  const getCachedValue = useCallback((key: object) => {
    return weakMapRef.current.get(key);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, []);

  return { addCleanup, cacheValue, getCachedValue };
};

// 9. Performance Monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());
  const mountTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current++;
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTimeRef.current;
    lastRenderTimeRef.current = now;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🎯 ${componentName}: Render #${renderCountRef.current} in ${timeSinceLastRender.toFixed(2)}ms`
      );
    }
  });

  const getStats = useCallback(() => ({
    renderCount: renderCountRef.current,
    timeSinceLastRender: performance.now() - lastRenderTimeRef.current,
    totalTime: performance.now() - mountTimeRef.current
  }), []);

  return { getStats };
};

// 10. Advanced Caching
export const createAdvancedCache = <K, V>(options: {
  maxSize?: number;
  ttl?: number;
  strategy?: 'lru' | 'fifo';
} = {}) => {
  const { maxSize = 100, ttl, strategy = 'lru' } = options;
  const cache = new Map<K, { value: V; timestamp: number; accessCount: number }>();
  const accessOrder: K[] = [];

  const get = (key: K): V | undefined => {
    const item = cache.get(key);
    if (!item) return undefined;

    // Check TTL
    if (ttl && Date.now() - item.timestamp > ttl) {
      cache.delete(key);
      const index = accessOrder.indexOf(key);
      if (index > -1) accessOrder.splice(index, 1);
      return undefined;
    }

    // Update access count and order
    item.accessCount++;
    if (strategy === 'lru') {
      const index = accessOrder.indexOf(key);
      if (index > -1) accessOrder.splice(index, 1);
      accessOrder.push(key);
    }

    return item.value;
  };

  const set = (key: K, value: V): void => {
    const existing = cache.get(key);
    if (existing) {
      existing.value = value;
      existing.timestamp = Date.now();
      if (strategy === 'lru') {
        const index = accessOrder.indexOf(key);
        if (index > -1) accessOrder.splice(index, 1);
        accessOrder.push(key);
      }
    } else {
      if (cache.size >= maxSize) {
        let keyToRemove: K;
        if (strategy === 'lru') {
          keyToRemove = accessOrder.shift()!;
        } else {
          // FIFO - remove oldest
          keyToRemove = accessOrder[0];
          accessOrder.splice(0, 1);
        }
        cache.delete(keyToRemove);
      }
      cache.set(key, { value, timestamp: Date.now(), accessCount: 1 });
      accessOrder.push(key);
    }
  };

  const clear = (): void => {
    cache.clear();
    accessOrder.length = 0;
  };

  const getStats = () => ({
    size: cache.size,
    maxSize,
    hitRate: 0, // Would need to track hits/misses
    oldestItem: accessOrder[0],
    newestItem: accessOrder[accessOrder.length - 1]
  });

  return { get, set, clear, getStats };
};

// 11. Elite Performance HOC
export const withElitePerformance = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    memo?: boolean;
    lazy?: boolean;
    intersectionObserver?: boolean;
    performanceMonitor?: boolean;
    customPropsAreEqual?: (prevProps: P, nextProps: P) => boolean;
  } = {}
) => {
  const {
    memo = true,
    lazy = false,
    intersectionObserver = false,
    performanceMonitor = false,
    customPropsAreEqual
  } = options;

  let OptimizedComponent = Component;

  // Apply memoization
  if (memo) {
    OptimizedComponent = React.memo(OptimizedComponent, customPropsAreEqual);
  }

  // Apply performance monitoring
  if (performanceMonitor) {
    const MonitoredComponent = (props: P) => {
      usePerformanceMonitor(Component.displayName || Component.name);
      return <OptimizedComponent {...props} />;
    };
    OptimizedComponent = MonitoredComponent;
  }

  // Apply intersection observer
  if (intersectionObserver) {
    const IntersectionComponent = (props: P) => {
      const [isVisible, setIsVisible] = useState(false);
      const elementRef = useIntersectionObserver(setIsVisible);

      if (!isVisible) {
        return <div ref={elementRef} style={{ height: '200px' }} />;
      }

      return (
        <div ref={elementRef}>
          <OptimizedComponent {...props} />
        </div>
      );
    };
    OptimizedComponent = IntersectionComponent;
  }

  // Apply lazy loading
  if (lazy) {
    const LazyComponent = React.lazy(() => Promise.resolve({ default: OptimizedComponent }));
    OptimizedComponent = (props: P) => (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    ) as React.ComponentType<P>;
  }

  return OptimizedComponent;
};

// 12. Bundle Optimization Utilities
export const createCodeSplitting = () => {
  const chunks = new Map<string, Promise<any>>();

  const loadChunk = <T>(chunkName: string, importFunc: () => Promise<T>): Promise<T> => {
    if (!chunks.has(chunkName)) {
      chunks.set(chunkName, importFunc());
    }
    return chunks.get(chunkName)!;
  };

  const preloadChunk = <T>(chunkName: string, importFunc: () => Promise<T>) => {
    if (!chunks.has(chunkName)) {
      chunks.set(chunkName, importFunc());
    }
  };

  return { loadChunk, preloadChunk };
};

// Export all utilities
export default {
  createEliteComponent,
  createOptimizedHandlers,
  createLazyLoader,
  useIntersectionObserver,
  useDebouncedCallback,
  useThrottledCallback,
  useVirtualScrolling,
  useImageOptimization,
  useMemoryOptimization,
  usePerformanceMonitor,
  createAdvancedCache,
  withElitePerformance,
  createCodeSplitting
}; 