import { Video, Smartphone, Pill, Brain, Wifi, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Solution() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Video,
      title: t('multilingualTelemedicine'),
      description: t('telemedicineDescription'),
      benefits: [t('availability247'), t('specialistAccess'), t('noTravelRequired')]
    },
    {
      icon: Smartphone,
      title: t('offlineDigitalRecords'),
      description: t('digitalRecordsDescription'),
      benefits: [t('medicalHistoryTracking'), t('prescriptionManagement'), t('offlineSync')]
    },
    {
      icon: Pill,
      title: t('medicineAvailabilityTracker'),
      description: t('medicineTrackerDescription'),
      benefits: [t('liveInventory'), t('priceComparison'), t('reservationSystem')]
    },
    {
      icon: Brain,
      title: t('aiSymptomChecker'),
      description: t('aiDescription'),
      benefits: [t('quickAssessment'), t('treatmentGuidance'), t('emergencyAlerts')]
    },
    {
      icon: Wifi,
      title: t('lowBandwidthOptimization'),
      description: t('bandwidthDescription'),
      benefits: [t('offlineFunctionality'), t('dataCompression'), t('smsIntegration')]
    },
    {
      icon: Globe,
      title: t('scalablePlatform'),
      description: t('scalableDescription'),
      benefits: [t('multiStateSupport'), t('localAdaptation'), t('cloudInfrastructure')]
    }
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('comprehensiveSolutionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('comprehensiveSolutionDescription')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="bg-blue-600 p-3 rounded-lg mb-4 inline-block">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{t('transformHealthcareTitle')}</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('transformHealthcareDescription')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            {t('getStartedToday')}
          </button>
        </div>
      </div>
    </section>
  );
}