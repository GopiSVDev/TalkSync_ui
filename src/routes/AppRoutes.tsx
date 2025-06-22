import { useAuth } from "@/context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AuthPage from "@/pages/AuthPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <AuthPage />} />
    </Routes>
  );
};

export default AppRoutes;
