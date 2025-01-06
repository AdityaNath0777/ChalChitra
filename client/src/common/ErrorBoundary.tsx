import React, { Component } from "react";
import FallbackPage from "./FallbackPage";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryStates = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryStates {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error Bounday caught an error: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackPage />;
    }
    return this.props.children;
  }
}
