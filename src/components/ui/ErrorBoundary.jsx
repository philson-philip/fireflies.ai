import { Component } from "react";
import Button from "./Button";
import Card from "./Card";
import Typography from "./Typography";

/**
 * Top-level error boundary that keeps a runtime exception from white-screening
 * the entire demo. Renders a branded, recoverable fallback with a reload action.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-surface-subtle p-6">
          <Card className="max-w-md space-y-4 p-6 text-center shadow-lifted">
            <Typography variant="h3" as="h1">
              Something went wrong
            </Typography>
            <Typography variant="body" className="text-ink-secondary">
              We ran into an unexpected issue loading this meeting. Try reloading
              the page.
            </Typography>
            {import.meta.env.DEV && this.state.error && (
              <Typography
                variant="caption"
                as="pre"
                className="max-h-40 overflow-auto rounded bg-surface-muted p-3 text-left text-ink-muted"
              >
                {this.state.error.stack || this.state.error.message}
              </Typography>
            )}
            <Button onClick={this.handleReload}>Reload page</Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
