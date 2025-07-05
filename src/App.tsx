import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthWatcher from "./components/Auth/AuthWatcher";
import WebSocketConnector from "./components/Auth/WebSocketConnector";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthWatcher />
          <AppRoutes />
          {token && <WebSocketConnector />}
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
