import { ToastProvider } from "./components/ui/Toast";
import MeetingDetail from "./components/meeting/MeetingDetail";

const App = () => (
  <ToastProvider>
    <MeetingDetail />
  </ToastProvider>
);

export default App;
