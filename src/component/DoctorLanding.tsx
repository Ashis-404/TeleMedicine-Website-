import React, { useState, useEffect } from "react";
import { Video, FilePlus, User, Clock, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const mockActivePatients = [
  { id: "PAT67890", name: "Asha Rani", age: 34, village: "Bhawanigarh", symptoms: "High fever", priority: "High", waitTime: "5 mins" },
  { id: "PAT11223", name: "Jaspreet Kaur", age: 28, village: "Dakala", symptoms: "Stomach pain", priority: "Medium", waitTime: "12 mins" },
];

const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: React.ElementType; color: string }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

const PrescriptionModal = ({ patient, onClose }: { patient: any; onClose: () => void }) => {
  const [prescription, setPrescription] = useState({ diagnosis: "", medication: "", notes: "" });

  const handleSave = () => {
    alert(`Prescription saved for ${patient.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Prescription for {patient.name}
        </h2>
        <textarea
          placeholder="Diagnosis"
          value={prescription.diagnosis}
          onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
        />
        <textarea
          placeholder="Medications"
          value={prescription.medication}
          onChange={(e) => setPrescription({ ...prescription, medication: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
        />
        <textarea
          placeholder="Additional Notes"
          value={prescription.notes}
          onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DoctorDashboard() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        window.location.href = "/signin";
        return;
      }
      try {
        const res = await fetch("http://localhost:4000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setProfile(data.profile);
        else window.location.href = "/signin";
      } catch {
        window.location.href = "/signin";
      }
    }
    fetchProfile();
  }, [token]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Doctor's Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome, Dr. {profile.name} (Employee ID: {profile.employee_id})
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Today's Appointments" value="8" icon={Clock} color="bg-blue-500" />
          <StatCard title="Completed Cases" value="12" icon={CheckCircle} color="bg-green-500" />
          <StatCard title="Pending Follow-ups" value="4" icon={FilePlus} color="bg-yellow-500" />
        </div>

        {/* Active Patients Queue */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Active Patients Queue</h2>
          <div className="space-y-4">
            {mockActivePatients.map((patient) => (
              <div
                key={patient.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-bold text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-500">
                    {patient.age} years • {patient.village}
                  </p>
                  <p className="text-sm text-gray-500">
                    Symptoms: {patient.symptoms} • Wait: {patient.waitTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center gap-1"
                  >
                    <FilePlus className="w-4 h-4" /> Prescribe
                  </button>
                  <button className="px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 flex items-center gap-1">
                    <Video className="w-4 h-4" /> Call
                  </button>
                  <button className="px-3 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedPatient && (
        <PrescriptionModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
