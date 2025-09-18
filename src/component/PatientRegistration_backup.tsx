/*PatientRegistration_backup.tsx*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRegistration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      age,
      gender,
      phone,
      address,
      
      password,
    });
    alert("Patient Registered Successfully!");
    navigate("/signin"); // redirect after registration
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Patient Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
