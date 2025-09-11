import { useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface PatientDashboardProps {
  onBackToHome: () => void;
}

export default function PatientDashboard({ onBackToHome }: PatientDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    // Get patient session data
    const sessionData = localStorage.getItem('patientSession');
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        setPatientData(parsed.patient);
      } catch (err) {
        console.error('Error parsing patient session:', err);
      }
    }

    // Check if Flask server is running
    const checkFlaskServer = async () => {
      try {
        const response = await fetch('/health');
        if (response.ok) {
          setIsLoading(false);
          // Redirect to the Flask demo
          window.location.href = '/demo';
        } else {
          throw new Error('Flask server not responding');
        }
      } catch (err) {
        setError('Clinical Decision Support System is not available. Please start the Flask server.');
        setIsLoading(false);
      }
    };

    // Wait a bit then check Flask server
    const timer = setTimeout(checkFlaskServer, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartFlask = () => {
    window.open('http://localhost:5000', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connecting to Patient Dashboard
            </h2>
            <p className="text-gray-600">
              {patientData ? `Welcome, ${patientData.firstName}!` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Dashboard Unavailable
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleStartFlask}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Flask Server
              </button>
              <button
                onClick={onBackToHome}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Dashboard Ready
          </h2>
          <p className="text-gray-600 mb-6">
            Redirecting to Clinical Decision Support System...
          </p>
          
          <button
            onClick={onBackToHome}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}