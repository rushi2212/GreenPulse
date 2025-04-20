// Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const API_URL = "/api/users/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.name) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email) {
      setError("Please enter your email");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password) {
      setError("Please enter a password");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setError("");
      setStep(2);
    }
  };

  const prevStep = () => {
    setError("");
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-green-600 py-3 sm:py-4">
          <div className="text-center px-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Create an Account
            </h2>
            <p className="text-green-100 text-xs sm:text-sm">
              Join us to track your environmental impact
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          <div className="mb-4 sm:mb-5">
            <div className="flex items-center">
              <div
                className={`flex-1 border-t-2 ${
                  step >= 1 ? "border-green-500" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  step >= 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`flex-1 border-t-2 ${
                  step >= 2 ? "border-green-500" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  step >= 2
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Your Info</span>
              <span>Security</span>
            </div>
          </div>

          <form onSubmit={step === 1 ? nextStep : handleSubmit}>
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-11 pr-3 w-full py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-11 pr-3 w-full py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-11 pr-3 w-full py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-11 pr-3 w-full py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 text-sm sm:text-base"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center py-2 sm:py-3 px-3 sm:px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 text-sm sm:text-base"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
