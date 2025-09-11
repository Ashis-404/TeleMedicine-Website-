import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Heart, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { patientService, LoginCredentials, AdminCredentials } from '../services/indexedDBPatientService';

interface SignInProps {
  onNavigateToRegister: () => void;
  onBackToHome: () => void;
  onAdminLoginSuccess: (admin: any) => void;
}

export default function SignIn({ onNavigateToRegister, onBackToHome, onAdminLoginSuccess }: SignInProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setLoginStatus({ type: null, message: '' });

    // Validate fields
    if (!formData.email || !formData.password) {
      setLoginStatus({
        type: 'error',
        message: 'Please enter both email/username and password'
      });
      return;
    }

    setIsLoading(true);

    try {
      // First try admin login if the input looks like a username (no @ symbol)
      if (!formData.email.includes('@')) {
        const adminCredentials: AdminCredentials = {
          username: formData.email,
          password: formData.password
        };

        const adminResult = await patientService.loginAdmin(adminCredentials);

        if (adminResult.success && adminResult.admin) {
          setLoginStatus({
            type: 'success',
            message: `Welcome, Admin ${adminResult.admin.username}!`
          });

          // Clear form
          setFormData({ email: '', password: '' });

          // Navigate to admin dashboard
          setTimeout(() => {
            onAdminLoginSuccess(adminResult.admin);
          }, 1500);
          
          setIsLoading(false);
          return;
        }
      }

      // If not admin or admin login failed, try patient login
      const patientCredentials: LoginCredentials = {
        email: formData.email,
        password: formData.password
      };

      const patientResult = await patientService.loginPatient(patientCredentials);

      if (patientResult.success && patientResult.patient) {
        setLoginStatus({
          type: 'success',
          message: `Welcome back, ${patientResult.patient.firstName}! Loading patient portal...`
        });

        // Clear form
        setFormData({ email: '', password: '' });

        // Store patient data for the demo session
        localStorage.setItem('patientSession', JSON.stringify({
          patient: patientResult.patient,
          loginTime: new Date().toISOString()
        }));

        // Redirect to the integrated demo via Vite static file
        setTimeout(() => {
          window.location.href = '/demo.html';
        }, 500);

      } else {
        setLoginStatus({
          type: 'error',
          message: 'Invalid email/username or password'
        });
      }

    } catch (error) {
      setLoginStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthBridge</h1>
                <p className="text-xs text-gray-600">Rural Care</p>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('home')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Access your patient account or admin dashboard
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email or username"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('enterPassword')}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t('rememberMe')}
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    {t('forgotPassword')}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    t('signIn')
                  )}
                </button>
              </div>

              {/* Status Message */}
              {loginStatus.message && (
                <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  loginStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {loginStatus.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {loginStatus.message}
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('newPatient')}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onNavigateToRegister}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {t('createAccount')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}