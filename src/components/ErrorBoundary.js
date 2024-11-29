import React from "react";
import { motion } from "framer-motion";
import { NotificationContext } from "../../src/contexts/NotificationContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Trigger notification via context if available
    if (this.context?.showNotification) {
      this.context.showNotification("error", "An unexpected error occurred!");
    }

    // Store error info for displaying in development mode
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { env } = this.props; // Get environment from props

    if (hasError) {
      const isDevelopment = env === "development";

      return (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isDevelopment
              ? "Development Error Encountered"
              : "Oops! Something went wrong."}
          </motion.h1>

          {isDevelopment && (
            <motion.div
              className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl overflow-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-lg font-semibold mb-2">Error:</h2>
              <pre className="text-red-400 whitespace-pre-wrap">
                {error?.toString()}
              </pre>
              <h2 className="text-lg font-semibold mt-4 mb-2">Error Info:</h2>
              <pre className="text-red-400 whitespace-pre-wrap">
                {errorInfo?.componentStack}
              </pre>
            </motion.div>
          )}

          <motion.p
            className="mt-4 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isDevelopment
              ? "Check the details above to debug the issue."
              : "We are working to resolve the issue. Please try again later."}
          </motion.p>

          <motion.button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-500 transition"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Reload Page
          </motion.button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Attach the NotificationContext to the ErrorBoundary
ErrorBoundary.contextType = NotificationContext;

export default ErrorBoundary;
