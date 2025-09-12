import  { useState, useEffect, useMemo } from 'react';
import { Phone, Video, Building2,  Search, ChevronDown, Clock, MapPin, AlertCircle, Pill, HeartPulse } from 'lucide-react';

// --- Type Definitions ---
type Severity = 'Mild' | 'Risky' | 'Severe';

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
    records: {
        date: string;
        diagnosis: string;
        doctor: string;
    }[];
}


// --- Mock Data (Replace with API/DB calls) ---
const mockAlerts: Alert[] = [
  { id: 'ALERT001', patientName: 'Geeta Kaur', patientId: 'PAT67890', village: 'Ramgarh', symptoms: ['High Fever', 'Headache', 'Cough'], aiMedication: ['Immediate hospital visit advised.'], severity: 'Severe', timestamp: '2 mins ago' },
  { id: 'ALERT002', patientName: 'Ramesh Chand', patientId: 'PAT67891', village: 'Alipur', symptoms: ['Sore Throat', 'Fatigue'], aiMedication: ['Paracetamol 500mg for fever', 'Saline gargles'], severity: 'Mild', timestamp: '15 mins ago' },
  { id: 'ALERT003', patientName: 'Sita Devi', patientId: 'PAT67892', village: 'Ramgarh', symptoms: ['Shortness of Breath', 'Chest Pain'], aiMedication: ['Seek emergency medical services immediately.'], severity: 'Risky', timestamp: '35 mins ago' },
  { id: 'ALERT004', patientName: 'Amit Kumar', patientId: 'PAT67893', village: 'Kotla', symptoms: ['Runny Nose', 'Sneezing'], aiMedication: ['Antihistamine (e.g., Cetirizine)', 'Steam inhalation'], severity: 'Mild', timestamp: '1 hour ago' },
];

const mockPatientDatabase: PatientHistory[] = [
    { id: 'PAT12345', name: 'Balwinder Singh', age: 45, gender: 'Male', phone: '+91 98765 43210', village: 'Ramgarh', records: [ {date: '2024-08-15', diagnosis: 'Viral Fever', doctor: 'Dr. Sharma'}]},
    { id: 'PAT67890', name: 'Geeta Kaur', age: 34, gender: 'Female', phone: '+91 98765 11111', village: 'Ramgarh', records: [{date: '2024-07-20', diagnosis: 'Anemia Checkup', doctor: 'Dr. Gupta'}]},
    { id: 'PAT67891', name: 'Ramesh Chand', age: 52, gender: 'Male', phone: '+91 98765 22222', village: 'Alipur', records: [{date: '2024-05-10', diagnosis: 'Blood Pressure Monitoring', doctor: 'Dr. Verma'}]},
];

// --- Helper Functions & Components ---

const severityConfig = {
    Mild: {
        color: 'green',
        ring: 'ring-green-500',
        bg: 'bg-green-50',
        text: 'text-green-800',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
    },
    Risky: {
        color: 'yellow',
        ring: 'ring-yellow-500',
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        iconBg: 'bg-yellow-100',
        iconText: 'text-yellow-600',
    },
    Severe: {
        color: 'red',
        ring: 'ring-red-500',
        bg: 'bg-red-50',
        text: 'text-red-800',
        iconBg: 'bg-red-100',
        iconText: 'text-red-600',
    }
};

const AlertCard = ({ alert }: { alert: Alert }) => {
    const config = severityConfig[alert.severity];

    const renderActions = () => {
        switch (alert.severity) {
            case 'Mild':
                return <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"><Phone className="w-4 h-4" /> Contact Patient</button>;
            case 'Risky':
            case 'Severe':
                return (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"><Video className="w-4 h-4" /> Video Consult</button>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"><Building2 className="w-4 h-4" /> Contact Hospital</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`bg-white p-4 rounded-xl shadow-md border-l-4 border-${config.color}-500 transition-all hover:shadow-lg hover:scale-[1.02]`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800">{alert.patientName}</p>
                    <p className="text-sm text-gray-500">{alert.patientId} • <span className="font-medium">{alert.village}</span></p>
                </div>
                <div className={`px-3 py-1 text-xs font-bold rounded-full ${config.bg} ${config.text}`}>
                    {alert.severity.toUpperCase()}
                </div>
            </div>
            <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700">Symptoms:</p>
                <p className="text-sm text-gray-600 leading-tight">{alert.symptoms.join(', ')}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
                 <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-blue-500"/>
                    AI Medication Suggestion:
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside pl-1 mt-1">
                    {alert.aiMedication.map((med, index) => <li key={index}>{med}</li>)}
                </ul>
            </div>
             <div className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>{alert.timestamp}</span>
            </div>
            {renderActions()}
        </div>
    );
};

const PatientRecordCard = ({ patient }: { patient: PatientHistory }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200">
           <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 text-left">
                <div>
                    <p className="font-bold text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.id} • {patient.age}yo, {patient.gender}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
           </button>
            {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-4 space-y-2 text-sm">
                        <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" /> {patient.phone}</p>
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {patient.village}</p>
                    </div>
                    <h4 className="mt-4 mb-2 font-semibold text-gray-700">Medical History:</h4>
                    <ul className="space-y-2">
                        {patient.records.map((record, idx) => (
                             <li key={idx} className="bg-gray-50 p-2 rounded-md text-sm">
                                <p className="font-semibold">{record.diagnosis}</p>
                                <p className="text-xs text-gray-500">{record.date} - {record.doctor}</p>
                             </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// --- Main Health Worker Dashboard Component ---
export default function HealthWorkerDashboard() {
    const [alerts] = useState<Alert[]>(mockAlerts);
    const [searchQuery, setSearchQuery] = useState('');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000 * 60); // Update time every minute
        return () => clearInterval(timer);
    }, []);

    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        return mockPatientDatabase.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.phone.includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <HeartPulse className="w-12 h-12" />
                        <div>
                            <h1 className="text-3xl font-bold">Health Worker Dashboard</h1>
                            <p className="text-indigo-200">Nabha Region Command Center</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-lg">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-sm text-indigo-300">{time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Alert Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                            <AlertCircle className="w-7 h-7 text-red-500"/>
                            <h2>New Case Alerts</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)}
                        </div>
                    </div>

                    {/* Patient Search */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Find Patient Records</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {searchQuery && searchResults.length === 0 && (
                                <p className="text-center text-gray-500 pt-4">No patients found.</p>
                            )}
                            {searchResults.map(patient => (
                                <PatientRecordCard key={patient.id} patient={patient} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

