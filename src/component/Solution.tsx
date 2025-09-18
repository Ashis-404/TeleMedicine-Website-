/*Solution.tsx*/

import { useEffect, useState, useCallback } from "react";
import {
  Video,
  Smartphone,
  Pill,
  Brain,
  Wifi,
  Globe,
  CheckCircle,
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
