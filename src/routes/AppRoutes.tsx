import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AuthPage from "@/pages/AuthPage";
import { useAuthStore } from "@/store/useAuthStore";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <AuthPage />} />
    </Routes>
  );
};

export default AppRoutes;
