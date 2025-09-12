import { useEffect, useState } from 'react';
import { Video, MapPin, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    villages: 0,
    availability: 0,
    reduction: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counters
    const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    };

    const timeout = setTimeout(() => {
      animateCounter(173, 'villages');
      animateCounter(24, 'availability');
      animateCounter(50, 'reduction');
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="flex items-center space-x-2 mb-4 animate-slideInUp">
              <MapPin className="h-5 w-5 text-blue-600 animate-bounce" />
              <span className="text-blue-600 font-medium">{t('nabhaLocation')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="inline-block animate-fadeInUp">{t('heroTitle')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block animate-fadeInUp animation-delay-400">
                {t('heroSubtitle')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fadeInUp animation-delay-600">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                {t('learnMore')}
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {t('contactUs')}
              </button>
            </div>
          </div>
          
          <div className={`lg:pl-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg mb-3 inline-block group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {counters.villages}
                  </h3>
                  <p className="text-gray-600 font-medium">{t('villagesServed')}</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg mb-3 inline-block group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {counters.availability}/7
                  </h3>
                  <p className="text-gray-600 font-medium">{t('teleconsultation')}</p>
                </div>
                <div className="text-center col-span-2 group">
                  <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 rounded-lg mb-3 inline-block group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                    {counters.reduction}%
                  </h3>
                  <p className="text-gray-600 font-medium">{t('reductionTravelTime')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}