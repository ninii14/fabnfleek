import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let isFirestorePermissionError = false;

      try {
        if (this.state.error?.message) {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error && parsedError.error.includes("Missing or insufficient permissions")) {
            isFirestorePermissionError = true;
          }
        }
      } catch (e) {
        // Not a JSON error
      }

      if (isFirestorePermissionError) {
        return (
          <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
            <div className="bg-brand-card p-8 rounded-2xl border border-brand-border max-w-lg w-full text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-serif font-bold text-white mb-4">Database Permission Denied</h1>
              <p className="text-gray-300 mb-6">
                Your application cannot access the Firestore database because the security rules are blocking the request.
              </p>
              <div className="text-left bg-black/30 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-400 mb-2">To fix this, go to your Firebase Console and update your Firestore Security Rules to allow access. For a public website, you typically want:</p>
                <pre className="text-xs text-brand-pink overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
                </pre>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-brand-pink text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-pink/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
          <div className="bg-brand-card p-8 rounded-2xl border border-brand-border max-w-md w-full text-center">
            <h1 className="text-2xl font-serif font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-pink text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-pink/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
