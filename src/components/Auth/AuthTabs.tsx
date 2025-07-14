import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useEffect } from "react";
import { motion } from "motion/react";

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
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
        >
          <LoginForm />
        </motion.div>
      </TabsContent>

      <TabsContent value="register">
        <motion.div
          key="register"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <RegisterForm />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}

export default AuthTabs;
