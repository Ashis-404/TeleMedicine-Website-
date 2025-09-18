import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { API_ENDPOINTS } from "../config/api";
import { safeApiCall } from "../utils/api";

export default function SignIn() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [role, setRole] = useState<"patient" | "doctor" | "healthworker">("patient");
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (role === "patient") {
        // Direct patient login with phone number verification
        const result = await safeApiCall(API_ENDPOINTS.auth.loginPatient, {
          method: "POST",
          body: JSON.stringify({ phone: formData.phone }),
        });
        
        if (!result.success) {
          throw new Error(result.error || "Patient not found");
        }
        
        console.log("Patient login successful:", result.data);
        
        // Show success message
        setSuccess("Login successful! Redirecting to dashboard...");
        
        // Save token & user to AuthContext
        setToken(result.data.token);
        setUser({ id: result.data.user.id, role: result.data.user.role, phone: result.data.user.phone, email: result.data.user.email });
        
        console.log("Navigating to patient-landing...");
        
        // Immediate redirect
        window.location.href = "/patient-landing";
        
      } else {
        // Doctor/healthworker direct login with credentials
        const result = await safeApiCall(API_ENDPOINTS.auth.loginDoctor, {
          method: "POST",
          body: JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
            employeeId: formData.employeeId,
            role: role,
          }),
        });
        
        if (!result.success) {
          throw new Error(result.error || "Invalid credentials");
        }
        
        // Show success message
        setSuccess("Login successful! Redirecting to dashboard...");
        
        // Save token & user to AuthContext
        setToken(result.data.token);
        setUser({ id: result.data.user.id, role: result.data.user.role, phone: result.data.user.phone, email: result.data.user.email });
        
        // Redirect based on role after a brief delay
        setTimeout(() => {
          if (result.data.user.role === "doctor") {
            navigate("/doctor-landing");
          } else {
            navigate("/healthworker-landing");
          }
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In to Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register here
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Show error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Show success message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["patient", "doctor", "healthworker"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r as any);
                      setFormData({});
                      setError(null);
                      setSuccess(null);
                    }}
                    className={`py-3 px-2 border rounded-lg text-center font-medium text-sm ${
                      role === r
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Role-specific forms */}
            <div className="space-y-4">
              {role === "patient" && (
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              )}

              {role !== "patient" && (
                <>
                  <input
                    name="identifier"
                    placeholder="Email or Phone"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    name="employeeId"
                    placeholder="Employee ID"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : success ? (
                "Redirecting..."
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
