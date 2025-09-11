import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Calendar, Heart, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { patientService, PatientRegistrationData } from '../services/indexedDBPatientService';

interface PatientRegistrationProps {
  onNavigateToSignIn: () => void;
  onBackToHome: () => void;
}

export default function PatientRegistration({ onNavigateToSignIn, onBackToHome }: PatientRegistrationProps) {
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    medicalRecordNumber?: string;
  }>({ type: null, message: '' });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    village: '',
    emergencyContact: '',
    emergencyPhone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setRegistrationStatus({ type: null, message: '' });

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setRegistrationStatus({
        type: 'error',
        message: t('passwordMismatch')
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'village', 'emergencyContact', 'emergencyPhone', 'password'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setRegistrationStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare registration data
      const registrationData: PatientRegistrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        address: formData.address,
        village: formData.village,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        password: formData.password,
        preferredLanguage: language as 'en' | 'hi' | 'pa'
      };

      // Register patient
      const result = await patientService.registerPatient(registrationData);

      if (result.success) {
        setRegistrationStatus({
          type: 'success',
          message: `Registration successful! Your Medical Record Number is: ${result.medicalRecordNumber}`,
          medicalRecordNumber: result.medicalRecordNumber
        });

        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          village: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                        name="dateOfBirth"
                        type="date"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('gender')}
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">{t('selectGender')}</option>
                      <option value="male">{t('male')}</option>
                      <option value="female">{t('female')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  {t('contactInformation')}
                </h3>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('emailAddress')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('enterEmail')}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phoneNumber')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('enterPhone')}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('village')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="village"
                        name="village"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('enterVillage')}
                        value={formData.village}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('address')}
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('enterAddress')}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  {t('emergencyContact')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('emergencyContactName')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="emergencyContact"
                        name="emergencyContact"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('enterEmergencyContact')}
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('emergencyPhone')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        type="tel"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('enterEmergencyPhone')}
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  {t('accountSecurity')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('password')}
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="block w-full px-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('confirmPassword')}
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className="block w-full px-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('confirmPassword')}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  {t('agreeToTerms')} <a href="#" className="text-blue-600 hover:text-blue-500">{t('termsAndConditions')}</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Registering...
                    </>
                  ) : (
                    t('createAccount')
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('alreadyHaveAccount')}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onNavigateToSignIn}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {t('signIn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}