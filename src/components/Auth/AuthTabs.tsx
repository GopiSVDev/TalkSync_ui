import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useEffect } from "react";

function AuthTabs() {
  useEffect(() => {
    localStorage.setItem("vite-ui-theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Tabs defaultValue="login" className="w-full max-w-[400px] mb-5">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className="cursor-pointer" value="login">
          Login
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="register">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}

export default AuthTabs;
