/*PatientRegistration.tsx*/ 

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { patientService } from '../services/indexedDBPatientService';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Heart, 
  Eye, 
  EyeOff, 
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface PatientRegistrationProps {
  onNavigateToSignIn: () => void;
  onBackToHome: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  village: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationStatus {
  type: 'success' | 'error' | null;
  message: string;
  medicalRecordNumber?: string;
}

export const PatientRegistration: React.FC<PatientRegistrationProps> = ({ 
  onNavigateToSignIn, 
  onBackToHome 
}) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>({
    type: null,
    message: ''
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    village: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setRegistrationStatus({
        type: 'error',
        message: t('passwordsDoNotMatch')
      });
      return;
    }

    if (formData.password.length < 6) {
      setRegistrationStatus({
        type: 'error',
        message: t('passwordTooShort')
      });
      return;
    }

    setIsLoading(true);
    setRegistrationStatus({ type: null, message: '' });

    try {
      const result = await patientService.registerPatient({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        email: formData.email,
        phone: formData.phone,
        village: formData.village,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        password: formData.password
      });

      if (result.success) {
        setRegistrationStatus({
          type: 'success',
          message: `${t('registrationSuccessful')} ${t('redirectingToSignIn')}`,
          medicalRecordNumber: result.medicalRecordNumber
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          email: '',
          phone: '',
          village: '',
          address: '',
          emergencyContact: '',
          emergencyPhone: '',
          password: '',
          confirmPassword: ''
        });

        // Auto redirect to sign in after 3 seconds
        setTimeout(() => {
          onNavigateToSignIn();
        }, 3000);

      } else {
        setRegistrationStatus({
          type: 'error',
          message: result.error || 'Registration failed. Please try again.'
        });
      }

    } catch (error) {
      setRegistrationStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 px-8 py-6 text-white text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">
                  {t('patientRegistration')}
                </h2>
              </div>
              <p className="text-blue-100 text-lg">
                {t('registrationDescription')}
              </p>
              <div className="mt-4 text-sm text-blue-100">
                <p>📝 {t('simpleFormInstruction')}</p>
              </div>
            </div>

            <div className="p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Status Message */}
                {registrationStatus.type && (
                  <div className={`p-6 rounded-xl flex items-start space-x-4 text-lg ${
                    registrationStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border-2 border-green-200' 
                      : 'bg-red-50 text-red-800 border-2 border-red-200'
                  }`}>
                    {registrationStatus.type === 'success' ? (
                      <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-semibold">{registrationStatus.message}</p>
                      {registrationStatus.medicalRecordNumber && (
                        <p className="text-base mt-2 font-medium bg-white px-3 py-2 rounded border">
                          📋 {t('yourMedicalRecordNumber')}: <span className="text-blue-600">{registrationStatus.medicalRecordNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1: Basic Information */}
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                    <User className="h-6 w-6 mr-3" />
                    1️⃣ {t('basicInformation')}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-lg font-semibold text-gray-800 mb-3">
                          👤 {t('firstName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                          placeholder={t('enterFirstName')}
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <p className="text-sm text-gray-600 mt-2">💡 {t('firstNameHelp')}</p>
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-lg font-semibold text-gray-800 mb-3">
                          👨‍👩‍👧‍👦 {t('lastName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                          placeholder={t('enterLastName')}
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        <p className="text-sm text-gray-600 mt-2">💡 {t('lastNameHelp')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-lg font-semibold text-gray-800 mb-3">
                          🎂 {t('dateOfBirth')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                          <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            required
                            className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">💡 {t('dateOfBirthHelp')}</p>
                      </div>

                      <div>
                        <label htmlFor="gender" className="block text-lg font-semibold text-gray-800 mb-3">
                          ⚥ {t('gender')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          required
                          className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all bg-white"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">{t('selectGender')}</option>
                          <option value="male">👨 {t('male')}</option>
                          <option value="female">👩 {t('female')}</option>
                          <option value="other">⚥ {t('other')}</option>
                        </select>
                        <p className="text-sm text-gray-600 mt-2">💡 {t('genderHelp')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Contact Information */}
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
                    <Phone className="h-6 w-6 mr-3" />
                    2️⃣ {t('contactInformation')}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="phone" className="block text-lg font-semibold text-gray-800 mb-3">
                        📱 {t('phoneNumber')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                          placeholder={t('enterPhone')}
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">💡 {t('phoneHelp')}</p>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3">
                        📧 {t('emailAddress')} <span className="text-gray-500">({t('optional')})</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                          placeholder={t('enterEmail')}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">💡 {t('emailHelp')}</p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Address Information */}
                <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-3" />
                    3️⃣ {t('addressInformation')}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="village" className="block text-lg font-semibold text-gray-800 mb-3">
                        🏘️ {t('village')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                        <input
                          id="village"
                          name="village"
                          type="text"
                          required
                          className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                          placeholder={t('enterVillage')}
                          value={formData.village}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">💡 {t('villageHelp')}</p>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-lg font-semibold text-gray-800 mb-3">
                        🏠 {t('fullAddress')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                        placeholder={t('enterAddress')}
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-gray-600 mt-2">💡 {t('addressHelp')}</p>
                    </div>
                  </div>
                </div>

                {/* Step 4: Emergency Contact */}
                <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-900 mb-6 flex items-center">
                    <Phone className="h-6 w-6 mr-3" />
                    4️⃣ {t('emergencyContact')}
                  </h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="emergencyContact" className="block text-lg font-semibold text-gray-800 mb-3">
                          👨‍⚕️ {t('emergencyContactName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="emergencyContact"
                          name="emergencyContact"
                          type="text"
                          required
                          className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                          placeholder={t('enterEmergencyContact')}
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                        />
                        <p className="text-sm text-gray-600 mt-2">💡 {t('emergencyContactHelp')}</p>
                      </div>

                      <div>
                        <label htmlFor="emergencyPhone" className="block text-lg font-semibold text-gray-800 mb-3">
                          📞 {t('emergencyPhone')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                          <input
                            id="emergencyPhone"
                            name="emergencyPhone"
                            type="tel"
                            required
                            className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                            placeholder={t('enterEmergencyPhone')}
                            value={formData.emergencyPhone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">💡 {t('emergencyPhoneHelp')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Security */}
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center">
                    <User className="h-6 w-6 mr-3" />
                    5️⃣ {t('securityInformation')}
                  </h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-3">
                          🔐 {t('password')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all pr-12"
                            placeholder={t('enterPassword')}
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">💡 {t('passwordHelp')}</p>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-800 mb-3">
                          🔒 {t('confirmPassword')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            className="block w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all pr-12"
                            placeholder={t('confirmYourPassword')}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">💡 {t('confirmPasswordHelp')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center items-center gap-3 py-4 px-8 text-xl font-bold rounded-xl text-white bg-white bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all transform hover:scale-105 disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-6 w-6 animate-spin" />
                        {t('registering')}...
                      </>
                    ) : (
                      <>
                        <Heart className="h-6 w-6" />
                        {t('registerPatient')}
                      </>
                    )}
                  </button>
                  <p className="text-white text-sm mt-4 opacity-90">
                    🌟 {t('registrationFinalNote')}
                  </p>
                </div>
              </form>

              {/* Help Section */}
              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                <h4 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                  ❓ {t('needHelp')}
                </h4>
                <div className="text-yellow-700 space-y-2">
                  <p>📞 {t('callForHelp')}: <span className="font-semibold">1800-XXX-XXXX</span></p>
                  <p>💬 {t('askVillageHelper')}</p>
                  <p>👥 {t('bringFamilyMember')}</p>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-lg text-gray-600 mb-4">
                  {t('alreadyHaveAccount')}
                </p>
                <button
                  type="button"
                  onClick={onNavigateToSignIn}
                  className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  <User className="h-5 w-5" />
                  {t('signInHere')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};