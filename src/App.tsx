import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthWatcher from "./components/Auth/AuthWatcher";
import WebSocketConnector from "./components/Auth/WebSocketConnector";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH(); // Initial run
    window.addEventListener("resize", setVH); // Update on resize
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthWatcher />
          <AppRoutes />
          <WebSocketConnector />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
