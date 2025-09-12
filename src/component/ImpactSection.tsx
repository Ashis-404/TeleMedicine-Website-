import { useEffect, useState } from 'react';
import { TrendingUp, Users, Clock, Heart, Target, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ImpactSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    patients: 0,
    satisfaction: 0,
    timeReduction: 0,
    costSavings: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
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
        animateCounter(5000, 'patients');
        animateCounter(95, 'satisfaction');
        animateCounter(70, 'timeReduction');
        animateCounter(40, 'costSavings');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  const impacts = [
    {
      icon: Users,
      title: t('patientsServed') || "Patients Served",
      value: counters.patients,
      suffix: "+",
      description: t('ruralPatientsConnected') || "Rural patients connected to healthcare",
      color: "blue"
    },
    {
      icon: Heart,
      title: t('satisfactionRate') || "Satisfaction Rate",
      value: counters.satisfaction,
      suffix: "%",
      description: t('patientSatisfactionTelemedicine') || "Patient satisfaction with telemedicine",
      color: "green"
    },
    {
      icon: Clock,
      title: t('timeReduction') || "Time Reduction",
      value: counters.timeReduction,
      suffix: "%",
      description: t('avgReductionHealthcareTime') || "Average reduction in healthcare access time",
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: t('costSavings') || "Cost Savings",
      value: counters.costSavings,
      suffix: "%",
      description: t('avgHealthcareCostReduction') || "Average healthcare cost reduction",
      color: "orange"
    }
  ];

  const achievements = [
    {
      icon: Target,
      title: t('improvedAccess') || "Improved Access",
      description: t('24x7HealthcareAccess') || "24/7 healthcare access for remote villages",
      points: [
        t('roundClockMedicalConsultation') || "Round-the-clock medical consultation",
        t('specialistDoctorConnectivity') || "Specialist doctor connectivity",
        t('emergencyMedicalGuidance') || "Emergency medical guidance"
      ]
    },
    {
      icon: Award,
      title: t('qualityCare') || "Quality Care",
      description: t('enhancedHealthcareDelivery') || "Enhanced healthcare delivery standards",
      points: [
        t('standardizedTreatmentProtocols') || "Standardized treatment protocols",
        t('digitalHealthRecordManagement') || "Digital health record management",
        t('aiPoweredDiagnosticAssistance') || "AI-powered diagnostic assistance"
      ]
    },
    {
      icon: Heart,
      title: t('communityHealth') || "Community Health",
      description: t('strengthenedRuralHealth') || "Strengthened rural health ecosystem",
      points: [
        t('preventiveHealthcarePrograms') || "Preventive healthcare programs",
        t('healthAwarenessCampaigns') || "Health awareness campaigns",
        t('localHealthcareCapacityBuilding') || "Local healthcare capacity building"
      ]
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {t('expectedImpact') || "Expected Impact"}
            </span>
            {' '}& {t('achievements') || "Achievements"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('impactDescription') || "Measuring our success through improved healthcare outcomes, patient satisfaction, and positive community impact across rural Punjab."}
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${index === 0 ? 'delay-0' : index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : 'delay-300'}`}
            >
              <div className={`bg-gradient-to-br from-${impact.color}-100 to-${impact.color}-200 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <impact.icon className={`h-8 w-8 text-${impact.color}-600`} />
              </div>
              
              <h3 className={`text-4xl font-bold text-${impact.color}-600 mb-2 bg-gradient-to-r from-${impact.color}-500 to-${impact.color}-700 bg-clip-text text-transparent`}>
                {impact.value}{impact.suffix}
              </h3>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {impact.title}
              </h4>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        {/* Achievement Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${index === 0 ? 'delay-[400ms]' : index === 1 ? 'delay-[500ms]' : 'delay-[600ms]'}`}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-purple-200 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {achievement.points.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group/item">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Future Goals */}
        <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 text-white transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {t('visionFor2025') || "Vision for 2025"}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              {t('expandingImpactDescription') || "Expanding our impact to serve 500+ villages across Punjab and neighboring states, making quality healthcare accessible to every rural community."}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">{t('villagesConnected') || "Villages Connected"}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">{t('patientsServed') || "Patients Served"}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">80%</div>
                <div className="text-blue-100">{t('costReduction') || "Cost Reduction"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}