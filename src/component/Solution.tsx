/*Solution.tsx

import { useEffect, useState } from 'react';
import { Video, Smartphone, Pill, Brain, Wifi, Globe, CheckCircle, PlayCircle } from 'lucide-react';

export default function Solution() {
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

    const element = document.getElementById('solution');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Video,
      title: "Multilingual Telemedicine",
      description: "Video consultations with doctors in Punjabi, Hindi, and English",
      benefits: ["24/7 availability", "Specialist access", "No travel required"],
      color: "blue",
      delay: 0
    },
    {
      icon: Smartphone,
      title: "Offline Digital Records",
      description: "Digital health records accessible even in low-connectivity areas",
      benefits: ["Medical history tracking", "Prescription management", "Offline sync"],
      color: "green",
      delay: 100
    },
    {
      icon: Pill,
      title: "Medicine Availability Tracker",
      description: "Real-time updates on medicine stock at local pharmacies",
      benefits: ["Live inventory", "Price comparison", "Reservation system"],
      color: "purple",
      delay: 200
    },
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Intelligent preliminary diagnosis optimized for low-bandwidth",
      benefits: ["Quick assessment", "Treatment guidance", "Emergency alerts"],
      color: "indigo",
      delay: 300
    },
    {
      icon: Wifi,
      title: "Low-Bandwidth Optimization",
      description: "Designed to work efficiently with limited internet connectivity",
      benefits: ["Offline functionality", "Data compression", "SMS integration"],
      color: "teal",
      delay: 400
    },
    {
      icon: Globe,
      title: "Scalable Platform",
      description: "Built to expand across rural regions throughout India",
      benefits: ["Multi-state support", "Local adaptation", "Cloud infrastructure"],
      color: "orange",
      delay: 500
    }
  ];

  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Comprehensive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Healthcare Solution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A technology platform designed specifically for rural healthcare challenges, 
            providing accessible, affordable, and quality medical care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift group border border-gray-100 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } delay-[${feature.delay}ms]`}
            >
              <div className={`bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 p-4 rounded-xl mb-6 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-3 group/item">
                    <CheckCircle className={`h-4 w-4 text-${feature.color}-500 group-hover/item:scale-110 transition-transform duration-200`} />
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* Hover overlay 
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-600 to-${feature.color}-700 opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* Call to Action 
        <div className={`relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 text-white text-center animate-gradient transform transition-all duration-1000 delay-[600ms] ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          
          {/* Background pattern 
          <div className="absolute inset-0 bg-white opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 animate-fadeInUp">
              Ready to Transform Rural Healthcare?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed animate-fadeInUp animation-delay-200">
              Join us in revolutionizing healthcare access for rural communities. 
              Together, we can bridge the gap between villages and quality medical care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Get Started Today</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
          
          {/* Floating elements 
          <div className="absolute top-4 right-4 w-20 h-20 bg-white opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white opacity-10 rounded-full animate-float delay-1000"></div>
        </div>
      </div>
    </section>
  );
}
*/

/*Solution.tsx*/

// UPDATED: Added useCallback and carousel imports
/* Solution.tsx */

import { useEffect, useState, useCallback } from "react";
import {
  Video,
  Smartphone,
  Pill,
  Brain,
  Wifi,
  Globe,
  CheckCircle,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Solution() {
  const [isVisible, setIsVisible] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById("solution");
    if (element) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Video,
      title: "Multilingual Telemedicine",
      description:
        "Video consultations with doctors in Punjabi, Hindi, and English.",
      benefits: ["24/7 availability", "Specialist access", "No travel required"],
      color: "blue",
    },
    {
      icon: Smartphone,
      title: "Offline Digital Records",
      description:
        "Digital health records accessible even in low-connectivity areas.",
      benefits: [
        "Medical history tracking",
        "Prescription management",
        "Offline sync",
      ],
      color: "green",
    },
    {
      icon: Pill,
      title: "Medicine Availability Tracker",
      description: "Real-time updates on medicine stock at local pharmacies.",
      benefits: ["Live inventory", "Price comparison", "Reservation system"],
      color: "purple",
    },
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description:
        "Intelligent preliminary diagnosis optimized for low-bandwidth.",
      benefits: [
        "Quick assessment",
        "Treatment guidance",
        "Emergency alerts",
      ],
      color: "indigo",
    },
    {
      icon: Wifi,
      title: "Low-Bandwidth Optimization",
      description:
        "Designed to work efficiently with limited internet connectivity.",
      benefits: ["Offline functionality", "Data compression", "SMS integration"],
      color: "teal",
    },
    {
      icon: Globe,
      title: "Scalable Platform",
      description: "Built to expand across rural regions throughout India.",
      benefits: [
        "Multi-state support",
        "Local adaptation",
        "Cloud infrastructure",
      ],
      color: "orange",
    },
  ];

  return (
    <section
      id="solution"
      className="py-16 bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Our Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Healthcare Solution
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A technology platform designed for rural healthcare challenges,
            providing accessible and quality care.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {features.map((feature, index) => (
                <div
                  className="embla__slide flex-shrink-0 flex justify-center px-4"
                  key={index}
                >
                  <div
                    className={`relative w-full max-w-md min-h-[400px] bg-gradient-to-br from-${feature.color}-50 to-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 transform transition-all duration-500 hover:scale-[1.02]`}
                  >
                    {/* Background Icon */}
                    <div className="absolute -right-8 -top-8 opacity-10">
                      <feature.icon
                        className={`h-40 w-40 text-${feature.color}-200`}
                        strokeWidth={0.5}
                      />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10">
                      <div
                        className={`bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 p-3 rounded-lg mb-3 inline-block`}
                      >
                        <feature.icon
                          className={`h-6 w-6 text-${feature.color}-600`}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2.5 text-sm"
                          >
                            <CheckCircle
                              className={`h-4 w-4 text-${feature.color}-500 flex-shrink-0`}
                            />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            className="embla__button embla__button--prev"
            onClick={scrollPrev}
          >
            <ArrowLeft size={22} />
          </button>
          <button
            className="embla__button embla__button--next"
            onClick={scrollNext}
          >
            <ArrowRight size={22} />
          </button>

          {/* Dots */}
          <div className="embla__dots mt-6 flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`embla__dot w-2.5 h-2.5 rounded-full transition ${
                  index === selectedIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        
       
      </div>
    </section>
  );
}
