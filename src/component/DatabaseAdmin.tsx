import { useState, useEffect } from 'react';
import { Database, Download, Trash2, Users, BarChart3, MapPin, Languages } from 'lucide-react';
import { patientService } from '../services/indexedDBPatientService';

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

interface DatabaseAdminProps {
  onBackToHome: () => void;
  onLogout: () => void;
  adminUser: {
    username: string;
    role: string;
  };
}

export default function DatabaseAdmin({ onBackToHome, onLogout, adminUser }: DatabaseAdminProps) {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'patients' | 'stats'>('patients');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load patients
      const patientsResult = await patientService.getAllPatients();
      if (patientsResult.success && patientsResult.patients) {
        setPatients(patientsResult.patients);
      }

      // Load statistics
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
        await loadData(); // Reload data
        alert('All data cleared successfully');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Database Admin</h1>
                <p className="text-sm text-gray-600">
                  HealthBridge Patient Database • Logged in as: <strong>{adminUser.username}</strong> ({adminUser.role})
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
                disabled={adminUser.role !== 'super_admin'}
                title={adminUser.role !== 'super_admin' ? 'Only super admins can clear all data' : 'Clear all data'}
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={onBackToHome}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('patients')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'patients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline h-4 w-4 mr-1" />
                Patients ({patients.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="inline h-4 w-4 mr-1" />
                Statistics
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'patients' && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Registered Patients</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Village
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {patient.village}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 text-gray-400 mr-1" />
                          {patient.preferredLanguage.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {patients.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No patients registered yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Patients */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                </div>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution</h3>
              <div className="space-y-3">
                {Object.entries(stats.genderDistribution).map(([gender, count]) => (
                  <div key={gender} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 capitalize">{gender}</span>
                    <span className="text-sm font-bold text-gray-900">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Village Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Village Distribution</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(stats.villageDistribution)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([village, count]) => (
                    <div key={village} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{village}</span>
                      <span className="text-sm font-bold text-gray-900">{count as number}</span>
                    </div>
                  ))}
              </div>
              {Object.keys(stats.villageDistribution).length === 0 && (
                <p className="text-gray-500 text-sm">No village data available</p>
              )}
            </div>

            {/* Language Preferences */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Language Preferences</h3>
              <div className="space-y-3">
                {Object.entries(stats.languagePreferences).map(([lang, count]) => (
                  <div key={lang} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Punjabi'}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}