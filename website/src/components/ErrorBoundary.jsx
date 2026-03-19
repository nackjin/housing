import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                    <h1 style={{ color: '#e11d48' }}>Something went wrong.</h1>
                    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ marginTop: 0 }}>Error:</h3>
                        <pre style={{ color: '#ef4444', whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h3>Component Stack:</h3>
                        <pre style={{ fontSize: '0.85em', overflowX: 'auto' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
