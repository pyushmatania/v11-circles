import React, { useRef, useEffect } from 'react';

/**
 * Elite Performance Monitor for Circles
 * Tracks component performance, bundle sizes, and user interactions
 */

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
  props: Record<string, any>;
}

interface BundleMetrics {
  name: string;
  size: number;
  loadTime: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private bundleMetrics: BundleMetrics[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = import.meta.env.DEV || localStorage.getItem('circles-performance-monitor') === 'true';
  }

  /**
   * Track component render performance
   */
  trackComponentRender(componentName: string, renderTime: number, props?: Record<string, any>) {
    if (!this.isEnabled) return;

    this.metrics.push({
      componentName,
      renderTime,
      timestamp: performance.now(),
      props: props || {}
    });

    // Log slow renders in development
    if (import.meta.env.DEV && renderTime > 16) {
      console.warn(`🐌 Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  }

  /**
   * Track bundle loading performance
   */
  trackBundleLoad(name: string, size: number, loadTime: number) {
    if (!this.isEnabled) return;

    this.bundleMetrics.push({
      name,
      size,
      loadTime
    });
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    if (this.metrics.length === 0) return null;

    const avgRenderTime = this.metrics.reduce((sum, m) => sum + m.renderTime, 0) / this.metrics.length;
    const slowRenders = this.metrics.filter(m => m.renderTime > 16).length;
    const totalRenders = this.metrics.length;

    return {
      totalRenders,
      avgRenderTime: avgRenderTime.toFixed(2),
      slowRenders,
      slowRenderPercentage: ((slowRenders / totalRenders) * 100).toFixed(1),
      bundleMetrics: this.bundleMetrics
    };
  }

  /**
   * Get slowest components
   */
  getSlowestComponents(limit: number = 5) {
    return this.metrics
      .sort((a, b) => b.renderTime - a.renderTime)
      .slice(0, limit)
      .map(m => ({
        name: m.componentName,
        renderTime: m.renderTime.toFixed(2),
        timestamp: new Date().toISOString()
      }));
  }

  /**
   * Clear metrics
   */
  clear() {
    this.metrics = [];
    this.bundleMetrics = [];
  }

  /**
   * Export metrics for analysis
   */
  exportMetrics() {
    return {
      metrics: this.metrics,
      bundleMetrics: this.bundleMetrics,
      summary: this.getPerformanceSummary()
    };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Higher-order component for performance tracking
 */
export function withPerformanceTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const PerformanceTrackedComponent = React.memo<P>((props) => {
    const startTime = performance.now();
    
    const result = React.createElement(WrappedComponent, props);
    
    const renderTime = performance.now() - startTime;
    performanceMonitor.trackComponentRender(displayName, renderTime, props);
    
    return result;
  });

  PerformanceTrackedComponent.displayName = `withPerformanceTracking(${displayName})`;
  
  return PerformanceTrackedComponent;
}

/**
 * Hook for tracking custom performance metrics
 */
export function usePerformanceTracking(componentName: string) {
  const startTime = useRef(performance.now());
  
  useEffect(() => {
    const renderTime = performance.now() - startTime.current;
    performanceMonitor.trackComponentRender(componentName, renderTime);
    startTime.current = performance.now();
  });
}

/**
 * Track user interactions for performance analysis
 */
export function trackUserInteraction(action: string, data?: Record<string, any>) {
  if (!performanceMonitor['isEnabled']) return;

  const interaction = {
    action,
    timestamp: performance.now(),
    data: data || {}
  };

  // Store in localStorage for analysis
  const interactions = JSON.parse(localStorage.getItem('circles-user-interactions') || '[]');
  interactions.push(interaction);
  
  // Keep only last 100 interactions
  if (interactions.length > 100) {
    interactions.splice(0, interactions.length - 100);
  }
  
  localStorage.setItem('circles-user-interactions', JSON.stringify(interactions));
}

/**
 * Get bundle size information
 */
export function getBundleInfo() {
  const bundles = performance.getEntriesByType('resource');
  const jsBundles = bundles.filter(bundle => 
    bundle.name.includes('.js') && bundle.name.includes('assets')
  );

  return jsBundles.map(bundle => ({
    name: bundle.name.split('/').pop() || 'unknown',
    size: (bundle as any).transferSize || 0,
    loadTime: bundle.duration || 0
  }));
}

// Auto-track bundle loading
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const bundleInfo = getBundleInfo();
    bundleInfo.forEach(bundle => {
      performanceMonitor.trackBundleLoad(bundle.name, bundle.size, bundle.loadTime);
    });
  });
}

export default performanceMonitor; 