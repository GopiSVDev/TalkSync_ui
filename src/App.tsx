import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthWatcher from "./components/Auth/AuthWatcher";
import WebSocketConnector from "./components/Auth/WebSocketConnector";
import { motion } from "motion/react";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full"
    >
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthWatcher />
          <AppRoutes />
          <WebSocketConnector />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </motion.div>
  );
}
