import React, { useContext, useEffect, useState } from "react";
import { ContextShop } from "../Context/ContextShop";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [authMode, setAuthMode] = useState("SignIn");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, setToken, backendUrl } = useContext(ContextShop);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isLogin = authMode === "SignIn";
    const url = `${backendUrl}/api/users/${isLogin ? "login" : "register"}`;
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await axios.post(url, payload);

      if (res.data.success) {
        if (isLogin) {
          // For login, set token and redirect
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          toast.success("Login Successful!");
        } else {
          // For registration, redirect to verification page
          toast.success("Registration Successful! Please verify your email.");
          navigate("/verify", { state: { email: form.email } });
        }
      } else {
        toast.error(res.data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const switchAuthMode = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
    setAuthMode((prev) => (prev === "SignIn" ? "Register" : "SignIn"));
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: authMode === "SignIn" ? -300 : 300,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {authMode === "SignIn" ? (
              <motion.form
                key="signin-form"
                onSubmit={handleSubmit}
                className="px-8 pt-10 pb-8"
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Sign in to your account to continue
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      onClick={() => navigate("/forgot-password")}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  disabled={loading}
                  type="submit"
                  className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <LogIn className="mr-2" size={18} />
                  )}
                  {loading ? "Signing in..." : "Sign In"}
                </motion.button>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={switchAuthMode}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Create account
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </p>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="register-form"
                onSubmit={handleSubmit}
                className="px-8 pt-10 pb-8"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Create Account
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Join us to start shopping sustainably
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters with 1 special
                    character and 1 number
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I agree to the{" "}
                      <a className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  disabled={loading}
                  type="submit"
                  className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <UserPlus className="mr-2" size={18} />
                  )}
                  {loading ? "Creating account..." : "Create Account"}
                </motion.button>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchAuthMode}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Sign in
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="flex justify-center items-center space-x-6 mt-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs text-gray-500">Secure Login</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs text-gray-500">Privacy Protected</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs text-gray-500">Secure Payments</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;