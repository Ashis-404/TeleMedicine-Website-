import { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProblemStatement() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('problem');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);
  
  const problems = [
    {
      icon: TrendingDown,
      title: t('criticalStaffShortage') || "Critical Staff Shortage",
      description: t('staffShortageDescription') || "Only 11 doctors for 23 sanctioned posts at Nabha Civil Hospital",
      stat: t('staffingPercent') || "48% Staffing",
      color: "red",
      delay: 0
    },
    {
      icon: Clock,
      title: t('longTravelTimes') || "Long Travel Times",
      description: t('travelTimesDescription') || "Patients from 173 villages travel long distances, often missing work",
      stat: t('travelTimeHours') || "2-4 Hours",
      color: "orange",
      delay: 100
    },
    {
      icon: AlertTriangle,
      title: t('medicineShortages') || "Medicine Shortages",
      description: t('medicineShortagesDescription') || "Frequent stockouts lead to wasted trips and delayed treatment",
      stat: t('medicineUnavailable') || "30% Unavailable",
      color: "yellow",
      delay: 200
    },
    {
      icon: DollarSign,
      title: t('financialBurden') || "Financial Burden",
      description: t('financialBurdenDescription') || "Daily-wage earners lose income due to healthcare-related travel",
      stat: t('moneyLostPerVisit') || "₹500-1000 Lost/Visit",
      color: "pink",
      delay: 300
    }
  ];

  return (
    <section id="problem" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              {t('healthcareCrisisTitle') || "The Healthcare Crisis"}
            </span>
            {' '}{t('inRuralPunjab') || "in Rural Punjab"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('healthcareCrisisDescription') || "Thousands of rural residents face significant barriers to accessing quality healthcare, leading to preventable complications and financial hardship."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${index === 0 ? 'delay-0' : index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : 'delay-300'}`}
            >
              <div className={`bg-${problem.color}-100 p-4 rounded-xl mb-4 inline-block group-hover:scale-110 transition-all duration-300`}>
                <problem.icon className={`h-7 w-7 text-${problem.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {problem.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{problem.description}</p>
              <div className={`text-2xl font-bold text-${problem.color}-600 bg-${problem.color}-50 px-3 py-1 rounded-lg inline-block`}>
                {problem.stat}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform delay-[400ms] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full mr-4"></div>
                {t('impactOnRuralCommunities') || "Impact on Rural Communities"}
              </h3>
              <ul className="space-y-4">
                {[
                  t('impactPoint1') || "Daily-wage workers and farmers lose income due to healthcare travel",
                  t('impactPoint2') || "Preventable complications worsen due to delayed medical attention",
                  t('impactPoint3') || "Poor road conditions and sanitation further hinder healthcare access",
                  t('impactPoint4') || "Community well-being declines due to inadequate medical care"
                ].map((item, index) => (
                  <li key={index} className={`flex items-start space-x-4 transform transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  } ${index === 0 ? 'delay-[600ms]' : index === 1 ? 'delay-[700ms]' : index === 2 ? 'delay-[800ms]' : 'delay-[900ms]'}`}>
                    <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={`bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-8 rounded-2xl border border-red-100 transform transition-all duration-500 hover:scale-105 delay-[800ms] ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2 animate-bounce" />
                {t('keyStatistics') || "Critical Statistics"}
              </h4>
              <div className="space-y-4">
                {[
                  { label: t('internetAccessRural') || "Internet Access (Rural Punjab)", value: "31%", color: "orange" },
                  { label: t('villagesServedByPlatform') || "Villages Served by Platform", value: "173", color: "blue" },
                  { label: t('doctorShortageCrisis') || "Doctor Shortage Crisis", value: "52%", color: "red" },
                  { label: t('averageTravelTime') || "Average Travel Time", value: "3hrs", color: "yellow" }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-gray-700 font-medium">{stat.label}</span>
                    <span className={`font-bold text-${stat.color}-600 text-lg`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}