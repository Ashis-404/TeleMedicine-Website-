import  { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Heart, Shield, FileText, AlertTriangle, CheckCircle, Activity, Stethoscope, X, Download } from 'lucide-react';

// --- Type Definitions ---
type RecordType = 'Consultation' | 'Lab Report' | 'Emergency' | 'Vaccination';

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
    email: string;
    address: string;
    village: string;
}

// --- Helper Component for Global Styles ---
// We'll inject some global styles for custom scrollbars and animations.
const GlobalStyles = () => (
    <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-shadow {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-pulse-shadow {
            animation: pulse-shadow 2s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background-color: #f8fafc; /* slate-50 */
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #93c5fd; /* blue-300 */
            border-radius: 10px;
            border: 2px solid #f8fafc; /* slate-50 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #60a5fa; /* blue-400 */
        }
    `}</style>
);


// --- Mock Data (Replace with data from IndexedDB) ---
const mockPatient: Patient = {
    id: 'PAT12345',
    name: 'Balwinder Singh',
    age: 45,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'balwinder.singh@email.com',
    address: 'House No. 12, Near Gurudwara, Village Ramgarh',
    village: 'Ramgarh',
};

const mockMedicalRecords: MedicalRecord[] = [
    { id: 'REC001', date: '2024-08-15', doctor: 'Dr. Sharma', diagnosis: 'Viral Fever', prescription: 'Patient: Balwinder Singh (PAT12345)\nDate: 2024-08-15\nDoctor: Dr. Sharma\nDiagnosis: Viral Fever\n\nPrescription:\n- Paracetamol 500mg (1 tablet, 3 times a day after meals for 3 days)\n- Rest and drink plenty of fluids.', type: 'Consultation', link: '#' },
    { id: 'REC002', date: '2024-07-02', doctor: 'Dr. Gupta', diagnosis: 'Common Cold', prescription: 'Patient: Balwinder Singh (PAT12345)\nDate: 2024-07-02\nDoctor: Dr. Gupta\nDiagnosis: Common Cold\n\nPrescription:\n- Cetirizine 10mg (1 tablet at night for 5 days)\n- Saline nasal spray as needed.', type: 'Consultation', link: '#' },
    { id: 'REC003', date: '2024-06-10', doctor: 'Lab Corp', diagnosis: 'Annual Blood Test', prescription: 'Patient: Balwinder Singh (PAT12345)\nDate: 2024-06-10\nDoctor: Lab Corp\nDiagnosis: Annual Blood Test\n\nResult:\n- All values are within the normal range. No action required.', type: 'Lab Report', link: '#' },
    { id: 'REC004', date: '2024-05-20', doctor: 'Dr. Sharma', diagnosis: 'Minor Injury', prescription: 'Patient: Balwinder Singh (PAT12345)\nDate: 2024-05-20\nDoctor: Dr. Sharma\nDiagnosis: Minor Injury\n\nTreatment:\n- Cleaned the wound and applied antiseptic ointment.\n- Covered with a sterile bandage. Keep the area clean and dry.', type: 'Emergency', link: '#' },
    { id: 'REC005', date: '2024-03-12', doctor: 'Dr. Verma', diagnosis: 'Flu Shot', prescription: 'Patient: Balwinder Singh (PAT12345)\nDate: 2024-03-12\nDoctor: Dr. Verma\nDiagnosis: Flu Shot\n\nNote:\n- Annual influenza vaccination administered successfully.', type: 'Vaccination', link: '#' },
];

const getRecordIcon = (type: RecordType) => {
    switch (type) {
        case 'Consultation': return <Stethoscope className="w-5 h-5 text-blue-500" />;
        case 'Lab Report': return <Activity className="w-5 h-5 text-purple-500" />;
        case 'Emergency': return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case 'Vaccination': return <Shield className="w-5 h-5 text-green-500" />;
        default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
};

// --- Sub-Components ---
const ProfileCard = ({ patient }: { patient: Patient }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full transition-all duration-300 hover:shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
                <img src={`https://placehold.co/96x96/E0E7FF/4338CA?text=${patient.name.charAt(0)}`} alt="Patient Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                <span className="absolute bottom-1 right-1 block h-6 w-6 rounded-full bg-green-500 border-2 border-white animate-pulse"></span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
            <p className="text-gray-500 font-mono text-sm">{patient.id}</p>
        </div>
        <div className="space-y-4 text-gray-700 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start group"><User className="w-5 h-5 mr-4 text-indigo-500 flex-shrink-0 mt-1" /><span className="group-hover:text-indigo-600 transition-colors">{patient.age} years old, {patient.gender}</span></div>
            <div className="flex items-start group"><Phone className="w-5 h-5 mr-4 text-indigo-500 flex-shrink-0 mt-1" /><span className="group-hover:text-indigo-600 transition-colors">{patient.phone}</span></div>
            <div className="flex items-start group"><Mail className="w-5 h-5 mr-4 text-indigo-500 flex-shrink-0 mt-1" /><span className="group-hover:text-indigo-600 transition-colors">{patient.email}</span></div>
            <div className="flex items-start group"><MapPin className="w-5 h-5 mr-4 text-indigo-500 flex-shrink-0 mt-1" /><span className="group-hover:text-indigo-600 transition-colors">{patient.address}</span></div>
        </div>
    </div>
);

const MedicalRecordCard = () => {
    const handleDownload = (prescription: string, recordId: string) => {
        const blob = new Blob([prescription], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prescription-${recordId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
     <div className="bg-white p-6 rounded-2xl shadow-lg h-[450px] flex flex-col transition-all duration-300 hover:shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center mb-4 flex-shrink-0">
            <FileText className="w-6 h-6 mr-3 text-indigo-500" />
            <h3 className="text-xl font-bold text-gray-800">Your Medical Records</h3>
        </div>
        <div className="space-y-3 overflow-y-auto pr-2 -mr-2 custom-scrollbar flex-grow">
            {mockMedicalRecords.map((record, index) => (
                <div key={record.id} className="bg-slate-50 p-4 rounded-xl hover:bg-indigo-50 hover:scale-[1.02] transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 50 + 400}ms` }}>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center">
                            <div className="mr-3 bg-white p-2 rounded-full shadow-sm">{getRecordIcon(record.type)}</div>
                            <div>
                                <p className="font-semibold text-gray-800">{record.diagnosis}</p>
                                <p className="text-sm text-gray-500">{record.doctor} • {record.date}</p>
                            </div>
                         </div>
                        <button
                            onClick={() => handleDownload(record.prescription, record.id)}
                            className="flex items-center gap-1.5 text-sm bg-indigo-100 text-indigo-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-all"
                            aria-label={`Download prescription for ${record.diagnosis}`}
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

const EmergencySOSModal = ({ onClose }: { onClose: () => void }) => {
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);

    // Countdown effect
    useEffect(() => {
        if (countdown === null || countdown <= 0) return;

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);
    
    // Effect to trigger sending SOS after countdown
    useEffect(() => {
        if (countdown === 0) {
            setIsSending(true);
            // Simulate API call
            setTimeout(() => {
                setIsSending(false);
                setIsSent(true);
                // Close modal after showing success message
                setTimeout(() => {
                    onClose();
                }, 3000);
            }, 1000);
        }
    }, [countdown, onClose]);


    const handleInitiateSOS = () => {
        setCountdown(5); // Start 5-second countdown
    };

    const handleCancelSOS = () => {
        setCountdown(null); // Cancel countdown
    };
    
    const renderContent = () => {
        if (isSent) {
            return (
                <div className="animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Help is on the way!</h2>
                    <p className="text-gray-600 mt-2">
                        Your SOS has been sent successfully. The ambulance has been dispatched.
                    </p>
                </div>
            );
        }

        if (countdown !== null) {
            return (
                 <>
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                           <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                           <circle 
                                className="text-red-500"
                                strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 45}
                                strokeDashoffset={ (2 * Math.PI * 45) - ( (countdown / 5) * (2 * Math.PI * 45) ) }
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="45" cx="50" cy="50"
                                style={{transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear'}}
                            />
                        </svg>
                        <span className="text-red-600 text-4xl font-bold">{countdown}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Sending SOS...</h2>
                    <p className="text-gray-600 mt-2 mb-6">
                        You can cancel within the next few seconds.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={handleCancelSOS}
                            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition-all"
                        >
                            <X className="w-5 h-5" /> Cancel SOS
                        </button>
                    </div>
                </>
            )
        }

        return (
            <>
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Confirm Emergency</h2>
                <p className="text-gray-600 mt-2 mb-6">
                    This will dispatch an ambulance from Nabha Civil Hospital to your location immediately.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={handleInitiateSOS}
                        className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/50"
                    >
                        Yes, I Need Help!
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in" style={{ transform: 'scale(1)', opacity: 1 }}>
               {renderContent()}
            </div>
        </div>
    );
};


// --- Main Patient Dashboard Component ---
export default function PatientDashboard() {
    const [patient] = useState<Patient>(mockPatient);
    const [showSOSModal, setShowSOSModal] = useState(false);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    return (
        <>
            <GlobalStyles />
            <div className="min-h-screen bg-slate-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8 animate-fade-in">
                        <h1 className="text-4xl font-bold text-gray-900">{greeting}, {patient.name.split(' ')[0]}!</h1>
                        <p className="text-gray-500 mt-1 text-lg">Here's your personal health dashboard.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                 <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-2">Feeling Unwell?</h2>
                                    <p className="text-indigo-100 mb-6 max-w-md">Our AI Symptom Checker can help you understand your symptoms before you consult a doctor.</p>
                                    <a
                                        href="http://127.0.0.1:5000/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                                    >
                                        Start Symptom Checker
                                    </a>
                                 </div>
                                <Shield className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-10 transform rotate-12" />
                            </div>
                            <MedicalRecordCard />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <ProfileCard patient={patient} />
                        </div>
                    </div>
                </div>

                {/* Floating SOS Button */}
                <button
                    onClick={() => setShowSOSModal(true)}
                    className="fixed bottom-8 right-8 z-40 w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse-shadow group"
                    aria-label="Send SOS Alert"
                >
                    <Heart className="w-10 h-10 transition-transform group-hover:scale-110" />
                </button>
                
                {showSOSModal && <EmergencySOSModal onClose={() => setShowSOSModal(false)} />}
            </div>
        </>
    );
}

