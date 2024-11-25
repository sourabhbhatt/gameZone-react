import React from "react";
import { NotificationContext } from "../../src/contexts/NotificationContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Trigger notification via context if available
    if (this.context && this.context.showNotification) {
      this.context.showNotification("error", "An unexpected error occurred!");
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Attach the NotificationContext to the ErrorBoundary
ErrorBoundary.contextType = NotificationContext;

export default ErrorBoundary;
