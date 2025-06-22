import AuthTabs from "@/components/Auth/AuthTabs";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const AuthPage = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const { isLoading } = useAuth();

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-[#212121] gap-5">
      <div className="mt-3">
        <img src="/logo.svg" className="w-[100px] md:w-[120px]" />
      </div>
      <h1 className="text-white text-4xl font-bold">TalkSync</h1>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-300">
          Log in or register to continue
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          Or try a 24-hour guest account — no registration needed.
        </p>
      </div>

      {isLoading ? (
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
      ) : (
        <AuthTabs />
      )}
    </div>
  );
};

export default AuthPage;
