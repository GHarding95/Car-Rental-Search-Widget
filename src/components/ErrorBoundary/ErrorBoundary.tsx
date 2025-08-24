import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorType?: 'component' | 'network' | 'async' | 'global'
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidMount() {
    // Set up global error handlers
    this.setupGlobalErrorHandlers()
  }

  componentWillUnmount() {
    // Clean up global error handlers
    this.cleanupGlobalErrorHandlers()
  }

  setupGlobalErrorHandlers = () => {
    // Handle global JavaScript errors
    window.addEventListener('error', this.handleGlobalError)
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection)
    
    // Handle fetch/network errors
    this.interceptFetchErrors()
  }

  cleanupGlobalErrorHandlers = () => {
    window.removeEventListener('error', this.handleGlobalError)
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection)
  }

  handleGlobalError = (event: ErrorEvent) => {
    console.error('Global error caught:', event.error)
    this.setState({
      hasError: true,
      error: event.error || new Error(event.message),
      errorType: 'global'
    })
  }

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.error('Unhandled promise rejection:', event.reason)
    this.setState({
      hasError: true,
      error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      errorType: 'async'
    })
  }

  interceptFetchErrors = () => {
    // Intercept fetch calls to catch network errors
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return response
      } catch (error) {
        console.error('Fetch error caught:', error)
        this.setState({
          hasError: true,
          error: error instanceof Error ? error : new Error(String(error)),
          errorType: 'network'
        })
        throw error // Re-throw to maintain original behavior
      }
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
      hasError: true, 
      error,
      errorType: 'component'
    }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // Log errors for debugging
    console.error('ErrorBoundary caught a component error:', error, errorInfo)
  }

  getErrorMessage = () => {
    const { errorType } = this.state
    
    switch (errorType) {
      case 'network':
        return 'We encountered a network error. Please check your connection and try again.'
      case 'async':
        return 'An operation failed to complete. Please try again.'
      case 'global':
        return 'Something unexpected happened. Please refresh the page.'
      case 'component':
      default:
        return 'We\'ve encountered an unexpected error.'
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary" role="alert" aria-live="polite">
          <h2>🚨 Something went wrong</h2>
          <p>{this.getErrorMessage()}</p>
          
          {this.state.errorType && (
            <p className="error-type">
              <strong>Error Type:</strong> {this.state.errorType.charAt(0).toUpperCase() + this.state.errorType.slice(1)}
            </p>
          )}
          
          <details>
            <summary>Error Details (for developers)</summary>
            <p><strong>Error:</strong> {this.state.error?.message || 'Unknown error occurred'}</p>
            <p><strong>Stack:</strong> {this.state.error?.stack}</p>
          </details>
          
          <div className="error-actions">
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
              aria-label="Reload the page"
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
