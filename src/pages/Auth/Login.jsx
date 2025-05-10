import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiPhone, FiLogIn } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login, error: authError } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your email/phone/roll no and password");
      return;
    }

    setLoading(true);

    try {
      const result = await login({ identifier, password });

      if (!result.success) {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const loginOptions = [
    { label: "Student", value: "student@example.com", password: "password123" },
    { label: "Teacher", value: "teacher@example.com", password: "password123" },
    { label: "Admin", value: "admin@example.com", password: "password123" },
  ];

  const handleQuickLogin = (option) => {
    setIdentifier(option.value);
    setPassword(option.password);
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
        Log in to your account
      </h2>

      {(error || authError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-lg bg-error-100 p-3 text-error-800 dark:bg-error-900/30 dark:text-error-300"
        >
          {error || authError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email / Phone / Roll No
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input pl-10"
              placeholder="Enter your email, phone, or roll no"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-2 px-5 py-2.5 text-sm text-white rounded-lg me-2 mb-2 
             backdrop-blur-md bg-blue-600/60 border border-white/30 
             hover:backdrop-blur-xl transition-all duration-300 ease-in-out hover:bg-blue-800/60 shadow-white/10 hover:shadow-lg 
             focus:ring-2 focus:ring-white/30 focus:outline-none 
             disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <FiLogIn className="mr-2" />
              Log In
            </span>
          )}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-5 py-2.5 text-sm text-white rounded-lg me-2 mb-2 
             backdrop-blur-md bg-white/10 border border-white/30 
             hover:backdrop-blur-xl transition-all duration-300 ease-in-out hover:bg-custom-first shadow-white/10 hover:shadow-lg 
             focus:ring-2 focus:ring-white/30 focus:outline-none 
             disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Logging in...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 text-[16px]">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
              Sign in with Google
            </span>
          )}
        </button>
      </form>

      <div className="mt-6">
        <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Register here
          </Link>
        </p>

        <div className="mt-4">
          <p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Quick login for demo (click to autofill):
          </p>
          <div className="flex justify-center gap-2">
            {loginOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleQuickLogin(option)}
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
