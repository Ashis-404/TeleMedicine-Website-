/*DatabaseAdmin.tsx*/

import { useState, useEffect } from 'react';
import { Database, Download, Trash2 } from 'lucide-react';
import { patientService } from '../services/indexedDBPatientService';
import { useNavigate } from 'react-router-dom';

interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  village: string;
  gender: 'male' | 'female' | 'other';
  preferredLanguage: 'en' | 'hi' | 'pa';
  createdAt: Date;
}

export default function DatabaseAdmin() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'patients' | 'stats'>('patients');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const patientsResult = await patientService.getAllPatients();
      if (patientsResult.success && patientsResult.patients) {
        setPatients(patientsResult.patients);
      }
      const statsResult = await patientService.getRegistrationStats();
      setStats(statsResult);
    } catch (error) {
      console.error('Error loading database data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      await patientService.exportToFile();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to clear ALL patient data? This action cannot be undone.')) {
      try {
        await patientService.clearAllData();
        await loadData();
        alert('All data cleared successfully');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Database className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Database Admin</h1>
                <p className="text-sm text-gray-600">
                  HealthBridge Patient Database • Logged in as: <strong>Admin</strong> (super_admin)
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExportData}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
              <button
                onClick={handleClearData}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs + Content */}
      {/* unchanged, only props removed */}
      {/* ... keep rest of your table & stats UI exactly the same */}
    </div>
  );
}
