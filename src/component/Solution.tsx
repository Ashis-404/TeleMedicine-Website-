import React from 'react';
import { Video, Smartphone, Pill, Brain, Wifi, Globe } from 'lucide-react';

export default function Solution() {
  const features = [
    {
      icon: Video,
      title: "Multilingual Telemedicine",
      description: "Video consultations with doctors in Punjabi, Hindi, and English",
            benefits: ["24/7 availability", "Specialist access", "No travel required"]
    },
    {
      icon: Smartphone,
      title: "Offline Digital Records",
      description: "Digital health records accessible even in low-connectivity areas",
      benefits: ["Medical history tracking", "Prescription management", "Offline sync"]
    },
    {
      icon: Pill,
      title: "Medicine Availability Tracker",
      description: "Real-time updates on medicine stock at local pharmacies",
      benefits: ["Live inventory", "Price comparison", "Reservation system"]
    },
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Intelligent preliminary diagnosis optimized for low-bandwidth",
      benefits: ["Quick assessment", "Treatment guidance", "Emergency alerts"]
    },
    {
      icon: Wifi,
      title: "Low-Bandwidth Optimization",
      description: "Designed to work efficiently with limited internet connectivity",
      benefits: ["Offline functionality", "Data compression", "SMS integration"]
    },
    {
      icon: Globe,
      title: "Scalable Platform",
      description: "Built to expand across rural regions throughout India",
      benefits: ["Multi-state support", "Local adaptation", "Cloud infrastructure"]
    }
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Comprehensive Healthcare Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A technology platform designed specifically for rural healthcare challenges, 
            providing accessible, affordable, and quality medical care.
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
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Rural Healthcare?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join us in revolutionizing healthcare access for rural communities. 
            Together, we can bridge the gap between villages and quality medical care.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}