

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor" | "healthworker" | "">(
    ""
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
    employeeId: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "patient") {
      if (formData.name && formData.phone && formData.password) {
        navigate("/patient-landing"); // redirect to patient landing
      } else {
        setError("Please fill all fields for Patient login.");
      }
    } else if (role === "doctor") {
      // static credentials for now
      if (
        formData.email === "doctor@nabha.com" &&
        formData.password === "doctor@123" &&
        formData.employeeId === "DOC001"
      ) {
        navigate("/doctor-landing"); // redirect to doctor landing
      } else {
        setError("Invalid credentials for " + role);
      }
    } 
     else if ( role === "healthworker") {
      // static credentials for now
      if (
        formData.email === "healthworker@nabha.com" &&
        formData.password === "healthworker@123" &&
        formData.employeeId === "HW001"
      ) {
       navigate("/healthworker-landing"); // redirect to healthworker landing
      } else {
        setError("Invalid credentials for " + role);
      }
    } 
    else {
      setError("Please select a role first.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign In
        </h2>

        {/* Role Selector */}
        <div className="flex justify-between mb-6">
          {["patient", "doctor", "healthworker"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as any)}
              className={`px-4 py-2 rounded-lg border ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "patient" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </>
          )}

          {(role === "doctor" || role === "healthworker") && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
