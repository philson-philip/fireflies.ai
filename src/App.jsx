import { ToastProvider } from "@components/ui/Toast";
import ErrorBoundary from "@components/ui/ErrorBoundary";
import MeetingDetail from "@components/meeting/MeetingDetail";

const App = () => (
  <ErrorBoundary>
    <ToastProvider>
      <MeetingDetail />
    </ToastProvider>
  </ErrorBoundary>
);

export default App;
