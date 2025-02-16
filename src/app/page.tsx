"use client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "./_context/AuthContext";
import { useRouter } from "next/navigation";
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [signInMethod, setSignInMethod] = useState("password");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const {
    googleSignIn,
    signInWithPassword,
    signupWithPassword,
    user,
    loading,
    error,
  } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOTP = (e: any) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleGoogleSignIn = (e: any) => {
    e.preventDefault();
    try {
      googleSignIn();
    } catch (error) {
      console.log("🚀 ~ handleGoogleSignIn ~ error:", error);
    } finally {
    }
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      signupWithPassword({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
    } catch (error) {
      console.log("🚀 ~ handleSignUp ~ error:", error);
    } finally {
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signInWithPassword({ email, password });
      console.log("🚀 ~ handleSignIn ~ result:", result);
      if (result.success) {
        router.push("/home");
      }
    } catch (error) {
      console.log("🚀 ~ handleSignIn ~ error:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (user.loggedIn) {
      router.push("/home");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        </div>
      )}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        {/* Bottom-right circle */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                 linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
               `,
            backgroundSize: "4rem 4rem",
          }}
        ></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-600 mt-2">
            Sign in to your account or create a new one
          </p>
        </div>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

        {/* Tabs */}
        <div className="mb-8 relative z-30 pointer-events-auto">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === "signin"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === "signup"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="relative z-30 pointer-events-auto">
          {/* Sign In Form */}
          {activeTab === "signin" && (
            <>
              {/* Sign In Methods Toggle */}
              <div className="mb-6">
                <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                  <button
                    onClick={() => setSignInMethod("password")}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                      signInMethod === "password"
                        ? "bg-white shadow-sm text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Lock className="w-4 h-4 inline-block mr-2" />
                    Password
                  </button>
                  <button
                    onClick={() => setSignInMethod("otp")}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                      signInMethod === "otp"
                        ? "bg-white shadow-sm text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Mail className="w-4 h-4 inline-block mr-2" />
                    Email OTP
                  </button>
                </div>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="signin-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {signInMethod === "password" ? (
                  <div className="space-y-2">
                    <label
                      htmlFor="signin-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {!otpSent ? (
                      <button
                        onClick={handleSendOTP}
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        Send OTP
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <label
                          htmlFor="otp"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enter OTP
                        </label>
                        <input
                          id="otp"
                          type="text"
                          maxLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter 6-digit OTP"
                        />
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Sign Up Form remains the same */}
          {activeTab === "signup" && (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstname"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSignUp}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
