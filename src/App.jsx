import { ToastProvider } from "./components/ui/Toast";
import MeetingDetail from "./components/meeting/MeetingDetail";

export default function App() {
  return (
    <ToastProvider>
      <MeetingDetail />
    </ToastProvider>
  );
}
