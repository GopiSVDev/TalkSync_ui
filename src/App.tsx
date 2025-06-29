import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthWatcher from "./components/Auth/AuthWatcher";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthWatcher />
          <AppRoutes />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
