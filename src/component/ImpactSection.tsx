/*ImpactSection.tsx*/

import  { useEffect, useState } from 'react';
import { TrendingUp, Users, Clock, Heart} from 'lucide-react';

export default function ImpactSection() {
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
      title: "Patients Served",
      value: counters.patients,
      suffix: "+",
      description: "Rural patients connected to healthcare",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Satisfaction Rate",
      value: counters.satisfaction,
      suffix: "%",
      description: "Patient satisfaction with telemedicine",
      color: "green"
    },
    {
      icon: Clock,
      title: "Time Reduction",
      value: counters.timeReduction,
      suffix: "%",
      description: "Average reduction in healthcare access time",
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: "Cost Savings",
      value: counters.costSavings,
      suffix: "%",
      description: "Average healthcare cost reduction",
      color: "yellow"
    }
  ];

  

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Expected Impact
            </span>
            {' '}& Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Measuring our success through improved healthcare outcomes, patient satisfaction, 
            and positive community impact across rural Punjab.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift text-center group transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
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

       
        {/* Future Goals */}
        <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 text-white transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: '700ms' }}>
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Vision for 2025
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Expanding our impact to serve 500+ villages across Punjab and neighboring states, 
              making quality healthcare accessible to every rural community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Villages Connected</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">Patients Served</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">80%</div>
                <div className="text-blue-100">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}