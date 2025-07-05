// Elite Performance Optimizer for Circles Platform
// Provides advanced optimizations without compromising visual quality

import { useCallback, useMemo, useRef, useEffect } from 'react';

// 1. Advanced Memoization Utilities
export const createMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps) as T;
};

export const createMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(factory, deps);
};

// 2. Intersection Observer for Lazy Loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return observerRef.current;
};

// 3. Debounced Event Handler
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

// 4. Throttled Event Handler
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

// 5. Virtual Scrolling Helper
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      itemCount
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, itemCount]);

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleRange,
    totalHeight,
    offsetY,
    setScrollTop
  };
};

// 6. Image Preloading Utility
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        })
    )
  );
};

// 7. Component Performance Wrapper
export const withPerformanceOptimization = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    memo?: boolean;
    customPropsAreEqual?: (prevProps: P, nextProps: P) => boolean;
  } = {}
) => {
  const { memo = true, customPropsAreEqual } = options;

  if (memo) {
    return React.memo(Component, customPropsAreEqual);
  }

  return Component;
};

// 8. Bundle Size Optimizer
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback ? <fallback /> : <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// 9. Memory Management Utility
export const useMemoryOptimization = () => {
  const cleanupRef = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupRef.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, []);

  return { addCleanup };
};

// 10. Performance Monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current++;
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTimeRef.current;
    lastRenderTimeRef.current = now;

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCountRef.current} times in ${timeSinceLastRender.toFixed(2)}ms`);
    }
  });

  return {
    renderCount: renderCountRef.current,
    getRenderStats: () => ({
      renderCount: renderCountRef.current,
      timeSinceLastRender: performance.now() - lastRenderTimeRef.current
    })
  };
};

// 11. CSS-in-JS Optimization
export const createOptimizedStyles = (styles: Record<string, any>) => {
  return useMemo(() => styles, []);
};

// 12. Event Pooling for High-Frequency Events
export const useEventPool = <T extends Event>(
  handler: (event: T) => void,
  poolSize: number = 10
) => {
  const poolRef = useRef<T[]>([]);
  const poolIndexRef = useRef(0);

  return useCallback((event: T) => {
    // Reuse event objects from pool
    if (poolRef.current.length < poolSize) {
      poolRef.current.push(event);
    } else {
      poolRef.current[poolIndexRef.current] = event;
      poolIndexRef.current = (poolIndexRef.current + 1) % poolSize;
    }
    
    handler(event);
  }, [handler, poolSize]);
};

// 13. Advanced Caching Utility
export const createCache = <K, V>(maxSize: number = 100) => {
  const cache = new Map<K, V>();
  const accessOrder: K[] = [];

  const get = (key: K): V | undefined => {
    if (cache.has(key)) {
      // Move to end (most recently used)
      const index = accessOrder.indexOf(key);
      if (index > -1) {
        accessOrder.splice(index, 1);
      }
      accessOrder.push(key);
      return cache.get(key);
    }
    return undefined;
  };

  const set = (key: K, value: V): void => {
    if (cache.has(key)) {
      // Update existing
      cache.set(key, value);
      const index = accessOrder.indexOf(key);
      if (index > -1) {
        accessOrder.splice(index, 1);
      }
      accessOrder.push(key);
    } else {
      // Add new
      if (cache.size >= maxSize) {
        // Remove least recently used
        const lruKey = accessOrder.shift();
        if (lruKey) {
          cache.delete(lruKey);
        }
      }
      cache.set(key, value);
      accessOrder.push(key);
    }
  };

  const clear = (): void => {
    cache.clear();
    accessOrder.length = 0;
  };

  return { get, set, clear, size: () => cache.size };
};

// 14. Elite Performance HOC
export const withElitePerformance = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    memo?: boolean;
    lazy?: boolean;
    intersectionObserver?: boolean;
    performanceMonitor?: boolean;
  } = {}
) => {
  const {
    memo = true,
    lazy = false,
    intersectionObserver = false,
    performanceMonitor = false
  } = options;

  let OptimizedComponent = Component;

  // Apply memoization
  if (memo) {
    OptimizedComponent = React.memo(OptimizedComponent);
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

  // Apply intersection observer
  if (intersectionObserver) {
    const IntersectionComponent = (props: P) => {
      const [isVisible, setIsVisible] = useState(false);
      const elementRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => setIsVisible(entry.isIntersecting),
          { threshold: 0.1 }
        );

        if (elementRef.current) {
          observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
      }, []);

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

  // Apply performance monitoring
  if (performanceMonitor) {
    const MonitoredComponent = (props: P) => {
      usePerformanceMonitor(Component.displayName || Component.name);
      return <OptimizedComponent {...props} />;
    };
    OptimizedComponent = MonitoredComponent;
  }

  return OptimizedComponent;
};

// Export all utilities
export default {
  createMemoizedCallback,
  createMemoizedValue,
  useIntersectionObserver,
  useDebouncedCallback,
  useThrottledCallback,
  useVirtualScrolling,
  preloadImages,
  withPerformanceOptimization,
  createLazyComponent,
  useMemoryOptimization,
  usePerformanceMonitor,
  createOptimizedStyles,
  useEventPool,
  createCache,
  withElitePerformance
}; 