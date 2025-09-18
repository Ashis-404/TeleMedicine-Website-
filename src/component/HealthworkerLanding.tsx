import { useState, useEffect, useMemo } from "react";
import { Phone, Video, Building2, Search, ChevronDown, Clock, MapPin, AlertCircle, Pill, HeartPulse } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

type Severity = "Mild" | "Risky" | "Severe";

interface Alert {
  id: string;
  patientName: string;
  patientId: string;
  village: string;
  symptoms: string[];
  aiMedication: string[];
  severity: Severity;
  timestamp: string;
}

interface PatientHistory {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  village: string;
  records: { date: string; diagnosis: string; doctor: string }[];
}

const mockAlerts: Alert[] = [
  { id: "ALERT001", patientName: "Geeta Kaur", patientId: "PAT67890", village: "Ramgarh", symptoms: ["High Fever", "Headache"], aiMedication: ["Immediate hospital visit advised."], severity: "Severe", timestamp: "2 mins ago" },
];

const mockPatientDatabase: PatientHistory[] = [
  { id: "PAT12345", name: "Balwinder Singh", age: 45, gender: "Male", phone: "+91 98765 43210", village: "Ramgarh", records: [{ date: "2024-08-15", diagnosis: "Viral Fever", doctor: "Dr. Sharma" }] },
];

export default function HealthWorkerDashboard() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [alerts] = useState(mockAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function fetchProfile() {
      if (!token) { window.location.href = "/signin"; return; }
      try {
        const res = await fetch("http://localhost:4000/api/me", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok) setProfile(data.profile);
        else window.location.href = "/signin";
      } catch { window.location.href = "/signin"; }
    }
    fetchProfile();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return mockPatientDatabase.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.phone.includes(searchQuery));
  }, [searchQuery]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HeartPulse className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">{profile.name}'s Dashboard</h1>
              <p className="text-indigo-200">{profile.village}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <p className="text-sm text-indigo-300">{time.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </header>

        {/* Alerts and Search UI unchanged */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <AlertCircle className="w-7 h-7 text-red-500" />
              <h2>New Case Alerts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
                  <p className="font-bold text-lg text-gray-800">{alert.patientName}</p>
                  <p className="text-sm text-gray-500">{alert.patientId} • {alert.village}</p>
                  <p className="text-sm text-gray-600 mt-2">{alert.symptoms.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Find Patient Records</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by name, ID, or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {searchQuery && searchResults.length === 0 && <p className="text-center text-gray-500 pt-4">No patients found.</p>}
              {searchResults.map((patient) => (
                <div key={patient.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-bold text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.id} • {patient.age}yo, {patient.gender}</p>
                  <p className="text-sm text-gray-500">{patient.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
