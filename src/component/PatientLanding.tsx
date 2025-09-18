import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";
import { safeApiCall, getAuthHeaders } from "../utils/api";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity,
  Stethoscope,
  X,
  Download,
  LogOut,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

// --- Type Definitions ---
type RecordType = "Consultation" | "Lab Report" | "Emergency" | "Vaccination";

interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  type: RecordType;
  link: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  village: string;
}

// --- Global Styles ---
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-shadow { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);} 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);} 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);} }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .animate-pulse-shadow { animation: pulse-shadow 2s infinite; }
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #93c5fd; border-radius: 10px; border: 2px solid #f8fafc; }
  `}</style>
);

// --- Mock Medical Records (leave static for now) ---
const mockMedicalRecords: MedicalRecord[] = [
  { id: "REC001", date: "2024-08-15", doctor: "Dr. Sharma", diagnosis: "Viral Fever", prescription: "Sample prescription", type: "Consultation", link: "#" },
  { id: "REC002", date: "2024-07-02", doctor: "Dr. Gupta", diagnosis: "Common Cold", prescription: "Sample prescription", type: "Consultation", link: "#" },
];

// --- Helper Functions ---
const getRecordIcon = (type: RecordType) => {
  switch (type) {
    case "Consultation": return <Stethoscope className="w-5 h-5 text-blue-500" />;
    case "Lab Report": return <Activity className="w-5 h-5 text-purple-500" />;
    case "Emergency": return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case "Vaccination": return <Shield className="w-5 h-5 text-green-500" />;
    default: return <FileText className="w-5 h-5 text-gray-500" />;
  }
};

const ProfileCard = ({ patient }: { patient: Patient }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg h-full animate-fade-in">
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <img
          src={`https://placehold.co/96x96/E0E7FF/4338CA?text=${patient.name.charAt(0)}`}
          alt="Patient Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
        <span className="absolute bottom-1 right-1 block h-6 w-6 rounded-full bg-green-500 border-2 border-white animate-pulse" title="Active Patient"></span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
      <p className="text-blue-600 font-mono text-sm font-semibold bg-blue-50 px-3 py-1 rounded-full">{patient.id}</p>
      <p className="text-gray-500 text-xs mt-1">Medical Record Number</p>
    </div>
    <div className="space-y-4 text-gray-700 mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-3 text-indigo-500" />
          <span className="font-medium">Age & Gender</span>
        </div>
        <span className="text-gray-800 font-semibold">{patient.age} years, {patient.gender}</span>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-3 text-green-500" />
          <span className="font-medium">Phone</span>
        </div>
        <span className="text-gray-800 font-semibold">{patient.phone}</span>
      </div>
      
      {patient.email && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-purple-500" />
            <span className="font-medium">Email</span>
          </div>
          <span className="text-gray-800 font-semibold">{patient.email}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-3 text-red-500" />
          <span className="font-medium">Location</span>
        </div>
        <span className="text-gray-800 font-semibold">{patient.village}</span>
      </div>
    </div>
    
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-center text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
        <span className="text-sm font-medium">Live Data Connected</span>
      </div>
    </div>
  </div>
);

const SystemInfoCard = ({ userDetails }: { userDetails: any }) => {
  if (!userDetails) return null;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 font-bold text-sm">#</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">System Information</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">User ID</span>
          <span className="font-mono text-sm font-bold text-blue-600">#{userDetails.user?.id}</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Profile ID</span>
          <span className="font-mono text-sm font-bold text-green-600">#{userDetails.profile?.id}</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Role</span>
          <span className="font-mono text-sm font-bold text-purple-600 capitalize">{userDetails.user?.role}</span>
        </div>
        
        {userDetails.profile?.registration_date && (
          <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Registered</span>
            <span className="text-sm font-bold text-orange-600">
              {new Date(userDetails.profile.registration_date).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Account Status</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-bold text-green-600">
              {userDetails.user?.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MedicalRecordCard = () => (
  <div className="bg-white p-6 rounded-2xl shadow-lg h-[450px] flex flex-col animate-fade-in">
    <div className="flex items-center mb-4">
      <FileText className="w-6 h-6 mr-3 text-indigo-500" />
      <h3 className="text-xl font-bold text-gray-800">Your Medical Records</h3>
    </div>
    <div className="space-y-3 overflow-y-auto pr-2 -mr-2 custom-scrollbar flex-grow">
      {mockMedicalRecords.map((record) => (
        <div key={record.id} className="bg-slate-50 p-4 rounded-xl hover:bg-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 bg-white p-2 rounded-full shadow-sm">{getRecordIcon(record.type)}</div>
              <div>
                <p className="font-semibold text-gray-800">{record.diagnosis}</p>
                <p className="text-sm text-gray-500">{record.doctor} • {record.date}</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-sm bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function PatientDashboard() {
  const { token, logout, user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null); // Store full API response
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        console.log("No token found, redirecting to signin");
        window.location.href = "/signin";
        return;
      }
      
      console.log("Fetching patient profile with token:", token);
      
      try {
        const res = await fetch(API_ENDPOINTS.profile.me, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        console.log("API response:", data);
        
        if (res.ok && data.profile) {
          // Store full API response
          setUserDetails(data);
          
          // Convert backend data to frontend Patient type
          const patientData: Patient = {
            id: data.profile.medical_record_number || `PAT${data.profile.user_id}`,
            name: data.profile.name,
            age: data.profile.age,
            gender: data.profile.gender,
            phone: data.user.phone,
            email: data.user.email || undefined,
            address: `${data.profile.village}, Punjab`,
            village: data.profile.village
          };
          console.log("Setting patient data:", patientData);
          setPatient(patientData);
        } else {
          console.error("Profile fetch failed:", data);
          console.log("Using fallback patient data from auth context");
          
          // Fallback: create basic patient data from auth context
          if (user && user.role === 'patient') {
            const fallbackPatient: Patient = {
              id: `PAT${user.id}`,
              name: "Patient", // Default name
              age: 25, // Default age
              gender: "other", // Default gender
              phone: user.phone || "N/A",
              email: user.email,
              address: "Punjab, India",
              village: "Nabha"
            };
            console.log("Setting fallback patient data:", fallbackPatient);
            setPatient(fallbackPatient);
          } else {
            console.log("Redirecting to signin due to API error");
            window.location.href = "/signin";
          }
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        console.log("Using fallback patient data from auth context");
        
        // Fallback: create basic patient data from auth context
        if (user && user.role === 'patient') {
          const fallbackPatient: Patient = {
            id: `PAT${user.id}`,
            name: "Patient", // Default name
            age: 25, // Default age
            gender: "other", // Default gender
            phone: user.phone || "N/A",
            email: user.email,
            address: "Punjab, India",
            village: "Nabha"
          };
          console.log("Setting fallback patient data:", fallbackPatient);
          setPatient(fallbackPatient);
        } else {
          console.log("Redirecting to signin due to fetch error");
          window.location.href = "/signin";
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
  
  if (!patient && !user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">No patient data available. Please sign in again.</p>
        <button 
          onClick={() => window.location.href = "/signin"}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {greeting}, {patient?.name?.split(" ")[0] || user?.phone || 'Patient'}!
                </h1>
                <p className="text-gray-500 mt-1 text-lg">
                  Here's your personal health dashboard.
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Feeling Unwell?</h2>
                  <p className="text-indigo-100 mb-6 max-w-md">
                    Our AI Symptom Checker can help you understand your symptoms
                    before you consult a doctor.
                  </p>
                  <a href="http://127.0.0.1:5000/" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl hover:bg-indigo-50">
                    Start Symptom Checker
                  </a>
                </div>
                <Shield className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-10" />
              </div>
              <MedicalRecordCard />
            </div>

            <div className="space-y-8">
              {patient && <ProfileCard patient={patient} />}
              {userDetails && <SystemInfoCard userDetails={userDetails} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
