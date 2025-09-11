import { Video, MapPin, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-medium">{t('nabhaLocation')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('heroTitle')}
              <span className="text-blue-600 block">{t('heroSubtitle')}</span>

            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('heroDescription')}
              <br />

            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t('learnMore')}
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                {t('contactUs')}
              </button>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-3 inline-block">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">173</h3>
                  <p className="text-gray-600">{t('villagesServed')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg mb-3 inline-block">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                  <p className="text-gray-600">{t('teleconsultation')}</p>
                </div>
                <div className="text-center col-span-2">
                  <div className="bg-amber-100 p-4 rounded-lg mb-3 inline-block">
                    <MapPin className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">50%</h3>
                  <p className="text-gray-600">{t('reductionTravelTime')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}