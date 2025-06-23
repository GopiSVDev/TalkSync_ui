import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, guest } from "@/api/authApi";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setErrorMsg(null);
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formValues.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const { token, user } = await login({
        username: formValues.username,
        password: formValues.password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);

      toast.success("Login Successful");

      setFormValues({
        username: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof Error)
        toast.error("Username or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async () => {
    setGuestLoading(true);

    try {
      const { token, user } = await guest();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success("Guest Login Successful");

      navigate("/");
    } catch (error) {
      if (error instanceof Error) toast.error("Guest Login Failed");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <Card className="bg-[#212121]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login into your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="username"
              className="uppercase text-xs font-bold text-white"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Enter Your Username"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-700 text-white ${
                errors.username ? "border border-red-500" : ""
              }`}
              value={formValues.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="uppercase text-xs font-bold text-white"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0  bg-gray-700 text-white ${
                errors.password ? "border border-red-500" : ""
              }`}
              value={formValues.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button
            onClick={guestLogin}
            type="button"
            className="w-full cursor-pointer text-white bg-purple-600 hover:bg-purple-700"
            disabled={guestLoading}
          >
            {guestLoading ? "Creating Guest Account...." : "Guest Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
