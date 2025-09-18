import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { API_ENDPOINTS, getAuthHeaders } from "../config/api";

export default function Registration() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [role, setRole] = useState<"patient" | "doctor" | "healthworker">("patient");
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate form before submission
    if (role !== "patient" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let endpoint = "";
      let payload = {};

      switch (role) {
        case "patient":
          endpoint = API_ENDPOINTS.auth.registerPatient;
          payload = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            village: formData.village,
            phone: formData.phone,
          };
          break;
        case "doctor":
          endpoint = API_ENDPOINTS.auth.registerDoctor;
          payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            employeeId: formData.employeeId,
          };
          break;
        case "healthworker":
          endpoint = API_ENDPOINTS.auth.registerHealthworker;
          payload = {
            name: formData.name,
            village: formData.village,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            employeeId: formData.employeeId,
          };
          break;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // Show success message first
      setSuccess(`Registration successful! Welcome ${data.user.role === 'patient' ? data.user.name : formData.name}!`);

      // Save token & user to AuthContext (direct login after registration)
      setToken(data.token);
      setUser({ 
        id: data.user.id, 
        role: data.user.role, 
        phone: data.user.phone, 
        email: data.user.email 
      });

      // Redirect immediately after success
      switch (data.user.role) {
        case "patient":
          window.location.href = "/patient-landing";
          break;
        case "doctor":
          window.location.href = "/doctor-landing";
          break;
        case "healthworker":
          window.location.href = "/healthworker-landing";
          break;
        default:
          window.location.href = "/";
      }
      
    } catch (err: any) {
      setError(err.message || "Error during registration");
    } finally {
      setLoading(false);
    }
  }

  const renderPatientForm = () => (
    <>
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <select
        name="gender"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        title="Select Gender"
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <select
        name="village"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        title="Select Village"
        required
      >
        <option value="">Select Village</option>
        <option value="Nabha">Nabha (Main City)</option>
        <option value="Amloh">Amloh</option>
        <option value="Bhadson">Bhadson</option>
        <option value="Buchhoki">Buchhoki</option>
        <option value="Dalel Singh Wala">Dalel Singh Wala</option>
        <option value="Dhanola">Dhanola</option>
        <option value="Ghanaur">Ghanaur</option>
        <option value="Jandali">Jandali</option>
        <option value="Khanpur">Khanpur</option>
        <option value="Kukranwala">Kukranwala</option>
        <option value="Lehragaga">Lehragaga</option>
        <option value="Madhopur">Madhopur</option>
        <option value="Mandvi">Mandvi</option>
        <option value="Mehal Kalan">Mehal Kalan</option>
        <option value="Milkpur">Milkpur</option>
        <option value="Nabha Rural">Nabha Rural</option>
        <option value="Phirni">Phirni</option>
        <option value="Raikot">Raikot</option>
        <option value="Sahnewal">Sahnewal</option>
        <option value="Samaspur">Samaspur</option>
        <option value="Sangatpur">Sangatpur</option>
        <option value="Sheron">Sheron</option>
        <option value="Sirhind">Sirhind</option>
        <option value="Tapa Mandi">Tapa Mandi</option>
        <option value="Uchana">Uchana</option>
      </select>
    </>
  );

  const renderDoctorForm = () => (
    <>
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
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
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
    </>
  );

  const renderHealthworkerForm = () => (
    <>
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <select
        name="village"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        title="Select Assigned Village"
        required
      >
        <option value="">Select Assigned Village</option>
        <option value="Nabha">Nabha (Main City)</option>
        <option value="Amloh">Amloh</option>
        <option value="Bhadson">Bhadson</option>
        <option value="Buchhoki">Buchhoki</option>
        <option value="Dalel Singh Wala">Dalel Singh Wala</option>
        <option value="Dhanola">Dhanola</option>
        <option value="Ghanaur">Ghanaur</option>
        <option value="Jandali">Jandali</option>
        <option value="Khanpur">Khanpur</option>
        <option value="Kukranwala">Kukranwala</option>
        <option value="Lehragaga">Lehragaga</option>
        <option value="Madhopur">Madhopur</option>
        <option value="Mandvi">Mandvi</option>
        <option value="Mehal Kalan">Mehal Kalan</option>
        <option value="Milkpur">Milkpur</option>
        <option value="Nabha Rural">Nabha Rural</option>
        <option value="Phirni">Phirni</option>
        <option value="Raikot">Raikot</option>
        <option value="Sahnewal">Sahnewal</option>
        <option value="Samaspur">Samaspur</option>
        <option value="Sangatpur">Sangatpur</option>
        <option value="Sheron">Sheron</option>
        <option value="Sirhind">Sirhind</option>
        <option value="Tapa Mandi">Tapa Mandi</option>
        <option value="Uchana">Uchana</option>
      </select>
      <input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create New Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
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
                Select Registration Type
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
                    }}
                    className={`py-3 px-2 border rounded-lg text-center font-medium text-sm ${
                      role === r
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {r === "patient" && "Patient"}
                    {r === "doctor" && "Doctor"}
                    {r === "healthworker" && "Health Worker"}
                  </button>
                ))}
              </div>
            </div>

            {/* Role-specific forms */}
            <div className="space-y-4">
              {role === "patient" && renderPatientForm()}
              {role === "doctor" && renderDoctorForm()}
              {role === "healthworker" && renderHealthworkerForm()}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : success ? (
                "Redirecting to Dashboard..."
              ) : (
                "Register & Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}