import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    // Optionally log error to an external service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 p-8">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-2">An unexpected error occurred. Please try refreshing the page.</p>
          {this.state.error && <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto max-w-xl">{this.state.error.toString()}</pre>}
          {this.state.errorInfo && <details className="mt-2 text-xs whitespace-pre-wrap max-w-xl">{this.state.errorInfo.componentStack}</details>}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 