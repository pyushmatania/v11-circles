/**
 * Performance monitoring utilities for Circles app
 * Tracks key performance metrics and provides optimization insights
 */

export interface PerformanceMetrics {
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  timeToInteractive?: number;
}

export interface PerformanceObserver {
  onMetricUpdate?: (metrics: PerformanceMetrics) => void;
  onError?: (error: Error) => void;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];
  private isObserving = false;

  /**
   * Start monitoring performance metrics
   */
  startMonitoring(): void {
    if (this.isObserving || typeof window === 'undefined') return;

    this.isObserving = true;

    // Monitor First Contentful Paint
    this.observeFirstContentfulPaint();
    
    // Monitor Largest Contentful Paint
    this.observeLargestContentfulPaint();
    
    // Monitor First Input Delay
    this.observeFirstInputDelay();
    
    // Monitor Cumulative Layout Shift
    this.observeCumulativeLayoutShift();
  }

  /**
   * Stop monitoring performance metrics
   */
  stopMonitoring(): void {
    this.isObserving = false;
  }

  /**
   * Add performance observer
   */
  addObserver(observer: PerformanceObserver): void {
    this.observers.push(observer);
  }

  /**
   * Remove performance observer
   */
  removeObserver(observer: PerformanceObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Measure component render time
   */
  measureRenderTime(componentName: string, renderFn: () => void): number {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    const duration = end - start;
    
    console.log(`[Performance] ${componentName} render time: ${duration.toFixed(2)}ms`);
    return duration;
  }

  /**
   * Measure async operation time
   */
  async measureAsyncTime<T>(
    operationName: string,
    asyncFn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await asyncFn();
      const end = performance.now();
      const duration = end - start;
      
      console.log(`[Performance] ${operationName} completed in: ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      
      console.error(`[Performance] ${operationName} failed after: ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }

  private observeFirstContentfulPaint(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) {
            this.metrics.firstContentfulPaint = fcp.startTime;
            this.notifyObservers();
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('Failed to observe First Contentful Paint:', error);
      }
    }
  }

  private observeLargestContentfulPaint(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            this.metrics.largestContentfulPaint = lcp.startTime;
            this.notifyObservers();
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('Failed to observe Largest Contentful Paint:', error);
      }
    }
  }

  private observeFirstInputDelay(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries.find(entry => entry.entryType === 'first-input') as any;
          if (fid) {
            this.metrics.firstInputDelay = fid.processingStart - fid.startTime;
            this.notifyObservers();
          }
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('Failed to observe First Input Delay:', error);
      }
    }
  }

  private observeCumulativeLayoutShift(): void {
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cumulativeLayoutShift = clsValue;
          this.notifyObservers();
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Failed to observe Cumulative Layout Shift:', error);
      }
    }
  }

  private notifyObservers(): void {
    this.observers.forEach(observer => {
      try {
        observer.onMetricUpdate?.(this.getMetrics());
      } catch (error) {
        observer.onError?.(error as Error);
      }
    });
  }

  /**
   * Get performance score based on metrics
   */
  getPerformanceScore(): number {
    const { firstContentfulPaint, largestContentfulPaint, firstInputDelay, cumulativeLayoutShift } = this.metrics;
    
    let score = 100;
    
    // FCP scoring (0-100)
    if (firstContentfulPaint) {
      if (firstContentfulPaint > 2000) score -= 20;
      else if (firstContentfulPaint > 1500) score -= 10;
    }
    
    // LCP scoring (0-100)
    if (largestContentfulPaint) {
      if (largestContentfulPaint > 4000) score -= 25;
      else if (largestContentfulPaint > 2500) score -= 15;
    }
    
    // FID scoring (0-100)
    if (firstInputDelay) {
      if (firstInputDelay > 300) score -= 25;
      else if (firstInputDelay > 100) score -= 15;
    }
    
    // CLS scoring (0-100)
    if (cumulativeLayoutShift) {
      if (cumulativeLayoutShift > 0.25) score -= 30;
      else if (cumulativeLayoutShift > 0.1) score -= 20;
    }
    
    return Math.max(0, score);
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in development
if (import.meta.env.DEV) {
  performanceMonitor.startMonitoring();
} 