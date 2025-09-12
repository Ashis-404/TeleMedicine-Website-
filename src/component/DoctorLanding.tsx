/*

import React, { useState } from 'react';
import { Video, FilePlus, User, Clock, CheckCircle } from 'lucide-react';

const mockActivePatients = [
    { id: 'PAT67890', name: 'Asha Rani', age: 34, village: 'Bhawanigarh', symptoms: 'High fever, headache', priority: 'High' },
    { id: 'PAT11223', name: 'Jaspreet Kaur', age: 28, village: 'Dakala', symptoms: 'Stomach pain', priority: 'Medium' },
    { id: 'PAT44556', name: 'Gurmeet Singh', age: 52, village: 'Rohira', symptoms: 'Chest discomfort', priority: 'High' },
    { id: 'PAT77889', name: 'Sukhdev Chand', age: 61, village: 'Balbehra', symptoms: 'Follow-up consultation', priority: 'Low' },
];

const mockDoctor = {
    name: 'Dr. Mehra',
    id: 'DOC001',
    specialty: 'General Physician'
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ElementType, color: string }) => {
    const Icon = icon;
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
    };
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center">
            <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="font-bold text-gray-800 text-xl">{value}</p>
            </div>
        </div>
    );
};

const PrescriptionModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => {
    const [prescription, setPrescription] = useState({ diagnosis: '', medication: '', notes: '' });

    const handleSave = () => {
        alert(`Prescription saved for ${patient.name}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">New Prescription for {patient.name}</h2>
                <div className="space-y-4">
                    <textarea value={prescription.diagnosis} onChange={(e) => setPrescription({...prescription, diagnosis: e.target.value})} placeholder="Diagnosis..." className="w-full p-3 border rounded-lg" rows={2}></textarea>
                    <textarea value={prescription.medication} onChange={(e) => setPrescription({...prescription, medication: e.target.value})} placeholder="Medication, Dosage & Duration..." className="w-full p-3 border rounded-lg" rows={4}></textarea>
                    <textarea value={prescription.notes} onChange={(e) => setPrescription({...prescription, notes: e.target.value})} placeholder="Additional Notes..." className="w-full p-3 border rounded-lg" rows={2}></textarea>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
};

export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Doctor's Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome, {mockDoctor.name} ({mockDoctor.specialty})</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Active Patients" value={mockActivePatients.length.toString()} icon={User} color="blue" />
                    <StatCard title="Consultations Today" value="12" icon={CheckCircle} color="green" />
                    <StatCard title="Avg. Wait Time" value="15 mins" icon={Clock} color="purple" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Active Patients</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockActivePatients.map(patient => (
                            <div key={patient.id} className="p-4 rounded-xl border-l-4 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800">{patient.name}, {patient.age}</p>
                                        <p className="text-sm text-gray-500">{patient.village}</p>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-200 text-blue-800">
                                        {patient.priority}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 italic">"{patient.symptoms}"</p>
                                <div className="mt-4 flex space-x-2">
                                     <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center justify-center">
                                        <Video className="w-4 h-4" /><span>Video Call</span>
                                     </button>
                                     <button onClick={() => setSelectedPatient(patient)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center justify-center">
                                        <FilePlus className="w-4 h-4" /><span>Prescribe</span>
                                     </button>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {selectedPatient && <PrescriptionModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
        </div>
    );
}
*/import React, { useState } from 'react';
import { Video, FilePlus, User, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';

const mockActivePatients = [
    { id: 'PAT67890', name: 'Asha Rani', age: 34, village: 'Bhawanigarh', symptoms: 'High fever, headache', priority: 'High', waitTime: '5 mins' },
    { id: 'PAT11223', name: 'Jaspreet Kaur', age: 28, village: 'Dakala', symptoms: 'Stomach pain', priority: 'Medium', waitTime: '12 mins' },
    { id: 'PAT44556', name: 'Gurmeet Singh', age: 52, village: 'Rohira', symptoms: 'Chest discomfort', priority: 'High', waitTime: '8 mins' },
    { id: 'PAT77889', name: 'Sukhdev Chand', age: 61, village: 'Balbehra', symptoms: 'Follow-up consultation', priority: 'Low', waitTime: '20 mins' },
];

const mockDoctor = {
    name: 'Dr. Mehra',
    id: 'DOC001',
    specialty: 'General Physician'
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ElementType, color: string }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className={`flex items-center justify-between mb-4`}>
                <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{value}</p>
                    <p className="text-gray-500 text-sm">{title}</p>
                </div>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color.replace('bg-', 'bg-').replace('-500', '-600')} transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500`}></div>
            </div>
        </div>
    );
};

const PrescriptionModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => {
    const [prescription, setPrescription] = useState({ diagnosis: '', medication: '', notes: '' });

    const handleSave = () => {
        alert(`Prescription saved for ${patient.name}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-in fade-in-0 duration-300">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <FilePlus className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">New Prescription for {patient.name}</h2>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                        <textarea 
                            value={prescription.diagnosis} 
                            onChange={(e) => setPrescription({...prescription, diagnosis: e.target.value})} 
                            placeholder="Enter diagnosis..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
                            rows={2}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medication & Dosage</label>
                        <textarea 
                            value={prescription.medication} 
                            onChange={(e) => setPrescription({...prescription, medication: e.target.value})} 
                            placeholder="Medication, dosage, and duration..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
                            rows={4}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                        <textarea 
                            value={prescription.notes} 
                            onChange={(e) => setPrescription({...prescription, notes: e.target.value})} 
                            placeholder="Any additional instructions..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
                            rows={2}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                    >
                        Save Prescription
                    </button>
                </div>
            </div>
        </div>
    );
};

const PatientCard = ({ patient, onPrescribe }: { patient: any, onPrescribe: (patient: any) => void }) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'border-red-500 bg-red-50';
            case 'Medium': return 'border-yellow-500 bg-yellow-50';
            case 'Low': return 'border-green-500 bg-green-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`p-6 rounded-2xl border-l-4 ${getPriorityColor(patient.priority)} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {patient.name}, {patient.age}
                    </h3>
                    <p className="text-sm text-gray-500">{patient.village}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Waiting: {patient.waitTime}
                    </p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getPriorityBadge(patient.priority)}`}>
                    {patient.priority}
                </span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-600 italic bg-white p-3 rounded-lg">"{patient.symptoms}"</p>
            </div>
            <div className="flex space-x-2">
                <button className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-200 group">
                    <Video className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Video Call
                </button>
                <button className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200">
                    <Phone className="w-4 h-4" />
                </button>
                <button className="p-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-200">
                    <MessageCircle className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => onPrescribe(patient)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                >
                    <FilePlus className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                    Prescribe
                </button>
            </div>
        </div>
    );
};

export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Doctor's Dashboard
                            </h1>
                            <p className="text-gray-500 mt-2">Welcome, {mockDoctor.name} ({mockDoctor.specialty})</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-800">{new Date().toLocaleTimeString()}</p>
                                <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in slide-in-from-left-4 duration-700">
                    <StatCard title="Active Patients" value={mockActivePatients.length.toString()} icon={User} color="bg-blue-500" />
                    <StatCard title="Consultations Today" value="12" icon={CheckCircle} color="bg-green-500" />
                    <StatCard title="Avg. Wait Time" value="15 mins" icon={Clock} color="bg-purple-500" />
                </div>

                {/* Patient Queue */}
                <div className="bg-white p-8 rounded-2xl shadow-lg animate-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Patient Queue</h2>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600">Live Updates</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {mockActivePatients.map((patient, index) => (
                            <div key={patient.id} className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <PatientCard patient={patient} onPrescribe={setSelectedPatient} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedPatient && <PrescriptionModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
        </div>
    );
}