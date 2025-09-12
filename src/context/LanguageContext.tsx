  

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'pa';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    pa: string;
  };
}

const translations: Translations = {
  // Navigation
  home: {
    en: 'Home',
    hi: 'होम',
    pa: 'ਘਰ'
  },
  problem: {
    en: 'Problem',
    hi: 'समस्या',
    pa: 'ਸਮੱਸਿਆ'
  },
  solution: {
    en: 'Solution',
    hi: 'समाधान',
    pa: 'ਹੱਲ'
  },
  impact: {
    en: 'Impact',
    hi: 'प्रभाव',
    pa: 'ਪ੍ਰਭਾਵ'
  },
  signIn: {
    en: 'Sign In',
    hi: 'साइन इन',
    pa: 'ਸਾਈਨ ਇਨ'
  },
  
  // Hero Section
  nabhaLocation: {
    en: 'Nabha, Punjab',
    hi: 'नाभा, पंजाब',
    pa: 'ਨਾਭਾ, ਪੰਜਾਬ'
  },
  heroTitle: {
    en: 'Bridging Healthcare',
    hi: 'स्वास्थ्य सेवा को जोड़ना',
    pa: 'ਸਿਹਤ ਸੇਵਾ ਨੂੰ ਜੋੜਨਾ'
  },
  heroSubtitle: {
    en: 'to Rural Punjab',
    hi: 'ग्रामीण पंजाब से',
    pa: 'ਪੇਂਡੂ ਪੰਜਾਬ ਨਾਲ'
  },
  heroDescription: {
    en: 'Connecting 173 villages to quality healthcare through telemedicine, digital health records, and AI-powered medical assistance designed for rural India.',
    hi: 'टेलीमेडिसिन, डिजिटल स्वास्थ्य रिकॉर्ड और ग्रामीण भारत के लिए डिज़ाइन की गई AI-संचालित चिकित्सा सहायता के माध्यम से 173 गांवों को गुणवत्तापूर्ण स्वास्थ्य सेवा से जोड़ना।',
    pa: 'ਟੈਲੀਮੈਡੀਸਿਨ, ਡਿਜੀਟਲ ਹੈਲਥ ਰਿਕਾਰਡ, ਅਤੇ ਪੇਂਡੂ ਭਾਰਤ ਲਈ ਤਿਆਰ ਕੀਤੀ ਗਈ AI-ਸੰਚਾਲਿਤ ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਰਾਹੀਂ 173 ਪਿੰਡਾਂ ਨੂੰ ਗੁਣਵੱਤਾ ਭਰਪੂਰ ਸਿਹਤ ਸੇਵਾ ਨਾਲ ਜੋੜਨਾ।'
  },
  learnMore: {
    en: 'Learn More',
    hi: 'और जानें',
    pa: 'ਹੋਰ ਜਾਣੋ'
  },
  contactUs: {
    en: 'Contact Us',
    hi: 'संपर्क करें',
    pa: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ'
  },
  villagesServed: {
    en: 'Villages Served',
    hi: 'गांवों की सेवा',
    pa: 'ਪਿੰਡਾਂ ਦੀ ਸੇਵਾ'
  },
  teleconsultation: {
    en: 'Teleconsultation',
    hi: 'टेली परामर्श',
    pa: 'ਟੈਲੀ ਸਲਾਹ'
  },
  reductionTravelTime: {
    en: 'Reduction in Travel Time',
    hi: 'यात्रा समय में कमी',
    pa: 'ਯਾਤਰਾ ਸਮੇਂ ਵਿੱਚ ਕਮੀ'
  },

  // Problem Statement Section
  healthcareCrisisTitle: {
    en: 'The Healthcare Crisis in Rural Punjab',
    hi: 'ग्रामीण पंजाब में स्वास्थ्य सेवा संकट',
    pa: 'ਪੇਂਡੂ ਪੰਜਾਬ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾ ਸੰਕਟ'
  },
  healthcareCrisisDescription: {
    en: 'Thousands of rural residents face significant barriers to accessing quality healthcare, leading to preventable complications and financial hardship.',
    hi: 'हजारों ग्रामीण निवासी गुणवत्तापूर्ण स्वास्थ्य सेवा तक पहुंचने में महत्वपूर्ण बाधाओं का सामना करते हैं, जिससे रोकी जा सकने वाली जटिलताएं और आर्थिक कठिनाई होती है।',
    pa: 'ਹਜ਼ਾਰਾਂ ਪੇਂਡੂ ਵਸਨੀਕ ਗੁਣਵੱਤਾ ਭਰਪੂਰ ਸਿਹਤ ਸੇਵਾ ਤੱਕ ਪਹੁੰਚਣ ਵਿੱਚ ਮਹੱਤਵਪੂਰਨ ਰੁਕਾਵਟਾਂ ਦਾ ਸਾਹਮਣਾ ਕਰਦੇ ਹਨ, ਜਿਸ ਕਾਰਨ ਰੋਕਿਆ ਜਾ ਸਕਣ ਵਾਲੀਆਂ ਪੇਚੀਦਗੀਆਂ ਅਤੇ ਆਰਥਿਕ ਮੁਸ਼ਕਿਲਾਂ ਹੁੰਦੀਆਂ ਹਨ।'
  },

  // Problem cards
  criticalStaffShortage: {
    en: 'Critical Staff Shortage',
    hi: 'महत्वपूर्ण स्टाफ कमी',
    pa: 'ਮਹੱਤਵਪੂਰਨ ਸਟਾਫ ਦੀ ਕਮੀ'
  },
  staffShortageDescription: {
    en: 'Only 11 doctors for 23 sanctioned posts at Nabha Civil Hospital',
    hi: 'नाभा सिविल अस्पताल में 23 स्वीकृत पदों के लिए केवल 11 डॉक्टर',
    pa: 'ਨਾਭਾ ਸਿਵਲ ਹਸਪਤਾਲ ਵਿੱਚ 23 ਮਨਜ਼ੂਰ ਪਦਾਂ ਲਈ ਸਿਰਫ 11 ਡਾਕਟਰ'
  },
  staffingPercent: {
    en: '48% Staffing',
    hi: '48% स्टाफिंग',
    pa: '48% ਸਟਾਫਿੰਗ'
  },

  longTravelTimes: {
    en: 'Long Travel Times',
    hi: 'लंबी यात्रा का समय',
    pa: 'ਲੰਬਾ ਯਾਤਰਾ ਸਮਾਂ'
  },
  travelTimesDescription: {
    en: 'Patients from 173 villages travel long distances, often missing work',
    hi: '173 गांवों के मरीज़ लंबी दूरी की यात्रा करते हैं, अक्सर काम छूटता है',
    pa: '173 ਪਿੰਡਾਂ ਦੇ ਮਰੀਜ਼ ਲੰਬੀ ਦੂਰੀ ਦੀ ਯਾਤਰਾ ਕਰਦੇ ਹਨ, ਅਕਸਰ ਕੰਮ ਛੁੱਟ ਜਾਂਦਾ ਹੈ'
  },
  travelTimeHours: {
    en: '2-4 Hours',
    hi: '2-4 घंटे',
    pa: '2-4 ਘੰਟੇ'
  },

  medicineShortages: {
    en: 'Medicine Shortages',
    hi: 'दवा की कमी',
    pa: 'ਦਵਾਈ ਦੀ ਕਮੀ'
  },
  medicineShortagesDescription: {
    en: 'Frequent stockouts lead to wasted trips and delayed treatment',
    hi: 'बार-बार स्टॉक खत्म होने से व्यर्थ यात्राएं और विलंबित इलाज होता है',
    pa: 'ਵਾਰ-ਵਾਰ ਸਟਾਕ ਖਤਮ ਹੋਣ ਨਾਲ ਬੇਕਾਰ ਯਾਤਰਾਵਾਂ ਅਤੇ ਦੇਰ ਨਾਲ ਇਲਾਜ ਹੁੰਦਾ ਹੈ'
  },
  medicineUnavailable: {
    en: '30% Unavailable',
    hi: '30% अनुपलब्ध',
    pa: '30% ਉਪਲਬਧ ਨਹੀਂ'
  },

  financialBurden: {
    en: 'Financial Burden',
    hi: 'वित्तीय बोझ',
    pa: 'ਵਿੱਤੀ ਬੋਝ'
  },
  financialBurdenDescription: {
    en: 'Daily-wage earners lose income due to healthcare-related travel',
    hi: 'दैनिक मजदूरी करने वाले स्वास्थ्य सेवा की यात्रा के कारण आय खो देते हैं',
    pa: 'ਰੋਜ਼ਾਨਾ ਮਜ਼ਦੂਰੀ ਕਰਨ ਵਾਲੇ ਸਿਹਤ ਸੇਵਾ ਦੀ ਯਾਤਰਾ ਕਾਰਨ ਆਮਦਨ ਗੁਆ ਦੇਂਦੇ ਹਨ'
  },
  moneyLostPerVisit: {
    en: '₹500-1000 Lost/Visit',
    hi: '₹500-1000 हानि/विज़िट',
    pa: '₹500-1000 ਨੁਕਸਾਨ/ਵਿਜ਼ਿਟ'
  },

  // Impact section
  impactOnRuralCommunities: {
    en: 'Impact on Rural Communities',
    hi: 'ग्रामीण समुदायों पर प्रभाव',
    pa: 'ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਉੱਤੇ ਪ੍ਰਭਾਵ'
  },
  impactPoint1: {
    en: 'Daily-wage workers and farmers lose income due to healthcare travel',
    hi: 'दैनिक मजदूर और किसान स्वास्थ्य सेवा की यात्रा के कारण आय खो देते हैं',
    pa: 'ਰੋਜ਼ਾਨਾ ਮਜ਼ਦੂਰ ਅਤੇ ਕਿਸਾਨ ਸਿਹਤ ਸੇਵਾ ਦੀ ਯਾਤਰਾ ਕਾਰਨ ਆਮਦਨ ਗੁਆ ਦੇਂਦੇ ਹਨ'
  },
  impactPoint2: {
    en: 'Preventable complications worsen due to delayed medical attention',
    hi: 'देरी से मिलने वाली चिकित्सा देखभाल के कारण रोकी जा सकने वाली जटिलताएं बढ़ जाती हैं',
    pa: 'ਦੇਰੀ ਨਾਲ ਮਿਲਣ ਵਾਲੀ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਕਾਰਨ ਰੋਕਿਆ ਜਾ ਸਕਣ ਵਾਲੀਆਂ ਪੇਚੀਦਗੀਆਂ ਵਧ ਜਾਂਦੀਆਂ ਹਨ'
  },
  impactPoint3: {
    en: 'Poor road conditions and sanitation further hinder healthcare access',
    hi: 'खराब सड़क की स्थिति और स्वच्छता स्वास्थ्य सेवा की पहुंच में और बाधा डालती है',
    pa: 'ਮਾੜੀਆਂ ਸੜਕਾਂ ਅਤੇ ਸਫਾਈ ਦੀ ਸਥਿਤੀ ਸਿਹਤ ਸੇਵਾ ਪਹੁੰਚ ਵਿੱਚ ਹੋਰ ਰੁਕਾਵਟ ਪਾਉਂਦੀ ਹੈ'
  },
  impactPoint4: {
    en: 'Community well-being declines due to inadequate medical care',
    hi: 'अपर्याप्त चिकित्सा देखभाल के कारण सामुदायिक कल्याण में गिरावट',
    pa: 'ਨਾਕਾਫੀ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਕਾਰਨ ਭਾਈਚਾਰਕ ਭਲਾਈ ਵਿੱਚ ਗਿਰਾਵਟ'
  },

  keyStatistics: {
    en: 'Key Statistics',
    hi: 'मुख्य आंकड़े',
    pa: 'ਮੁੱਖ ਅੰਕੜੇ'
  },
  internetAccessRural: {
    en: 'Internet Access (Rural Punjab)',
    hi: 'इंटरनेट पहुंच (ग्रामीण पंजाब)',
    pa: 'ਇੰਟਰਨੈੱਟ ਪਹੁੰਚ (ਪੇਂਡੂ ਪੰਜਾਬ)'
  },
  doctorShortage: {
    en: 'Doctor Shortage',
    hi: 'डॉक्टरों की कमी',
    pa: 'ਡਾਕਟਰਾਂ ਦੀ ਕਮੀ'
  },

  // Solution Section
  comprehensiveSolutionTitle: {
    en: 'Our Comprehensive Healthcare Solution',
    hi: 'हमारा व्यापक स्वास्थ्य सेवा समाधान',
    pa: 'ਸਾਡਾ ਵਿਆਪਕ ਸਿਹਤ ਸੇਵਾ ਹੱਲ'
  },
  comprehensiveSolutionDescription: {
    en: 'A technology platform designed specifically for rural healthcare challenges, providing accessible, affordable, and quality medical care.',
    hi: 'ग्रामीण स्वास्थ्य सेवा चुनौतियों के लिए विशेष रूप से डिज़ाइन किया गया एक प्रौद्योगिकी मंच, जो सुलभ, किफायती और गुणवत्तापूर्ण चिकित्सा देखभाल प्रदान करता है।',
    pa: 'ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਚੁਣੌਤੀਆਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ ਤੇ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਇੱਕ ਤਕਨੀਕੀ ਪਲੇਟਫਾਰਮ, ਜੋ ਪਹੁੰਚਯੋਗ, ਕਿਫਾਇਤੀ ਅਤੇ ਗੁਣਵੱਤਾ ਭਰਪੂਰ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।'
  },

  // Solution features
  multilingualTelemedicine: {
    en: 'Multilingual Telemedicine',
    hi: 'बहुभाषी टेलीमेडिसिन',
    pa: 'ਬਹੁ-ਭਾਸ਼ੀ ਟੈਲੀਮੈਡੀਸਿਨ'
  },
  telemedicineDescription: {
    en: 'Video consultations with doctors in Punjabi, Hindi, and English',
    hi: 'पंजाबी, हिंदी और अंग्रेजी में डॉक्टरों के साथ वीडियो परामर्श',
    pa: 'ਪੰਜਾਬੀ, ਹਿੰਦੀ ਅਤੇ ਅੰਗ੍ਰੇਜ਼ੀ ਵਿੱਚ ਡਾਕਟਰਾਂ ਨਾਲ ਵੀਡੀਓ ਸਲਾਹ'
  },
  availability247: {
    en: '24/7 availability',
    hi: '24/7 उपलब्धता',
    pa: '24/7 ਉਪਲਬਧਤਾ'
  },
  specialistAccess: {
    en: 'Specialist access',
    hi: 'विशेषज्ञ पहुंच',
    pa: 'ਮਾਹਰ ਪਹੁੰਚ'
  },
  noTravelRequired: {
    en: 'No travel required',
    hi: 'यात्रा की आवश्यकता नहीं',
    pa: 'ਯਾਤਰਾ ਦੀ ਲੋੜ ਨਹੀਂ'
  },

  offlineDigitalRecords: {
    en: 'Offline Digital Records',
    hi: 'ऑफलाइन डिजिटल रिकॉर्ड',
    pa: 'ਆਫਲਾਈਨ ਡਿਜੀਟਲ ਰਿਕਾਰਡ'
  },
  digitalRecordsDescription: {
    en: 'Digital health records accessible even in low-connectivity areas',
    hi: 'कम कनेक्टिविटी वाले क्षेत्रों में भी सुलभ डिजिटल स्वास्थ्य रिकॉर्ड',
    pa: 'ਘੱਟ ਕਨੈਕਟੀਵਿਟੀ ਵਾਲੇ ਖੇਤਰਾਂ ਵਿੱਚ ਵੀ ਪਹੁੰਚਯੋਗ ਡਿਜੀਟਲ ਸਿਹਤ ਰਿਕਾਰਡ'
  },
  medicalHistoryTracking: {
    en: 'Medical history tracking',
    hi: 'चिकित्सा इतिहास ट्रैकिंग',
    pa: 'ਮੈਡੀਕਲ ਇਤਿਹਾਸ ਟਰੈਕਿੰਗ'
  },
  prescriptionManagement: {
    en: 'Prescription management',
    hi: 'प्रिस्क्रिप्शन प्रबंधन',
    pa: 'ਨੁਸਖਾ ਪ੍ਰਬੰਧਨ'
  },
  offlineSync: {
    en: 'Offline sync',
    hi: 'ऑफलाइन सिंक',
    pa: 'ਆਫਲਾਈਨ ਸਿੰਕ'
  },

  medicineAvailabilityTracker: {
    en: 'Medicine Availability Tracker',
    hi: 'दवा उपलब्धता ट्रैकर',
    pa: 'ਦਵਾਈ ਉਪਲਬਧਤਾ ਟਰੈਕਰ'
  },
  medicineTrackerDescription: {
    en: 'Real-time updates on medicine stock at local pharmacies',
    hi: 'स्थानीय फार्मेसियों में दवा स्टॉक पर रीयल-टाइम अपडेट',
    pa: 'ਸਥਾਨਕ ਫਾਰਮੇਸੀਆਂ ਵਿੱਚ ਦਵਾਈ ਸਟਾਕ ਉੱਤੇ ਰੀਅਲ-ਟਾਈਮ ਅਪਡੇਟ'
  },
  liveInventory: {
    en: 'Live inventory',
    hi: 'लाइव इन्वेंटरी',
    pa: 'ਲਾਈਵ ਇਨਵੈਂਟਰੀ'
  },
  priceComparison: {
    en: 'Price comparison',
    hi: 'मूल्य तुलना',
    pa: 'ਕੀਮਤ ਤੁਲਨਾ'
  },
  reservationSystem: {
    en: 'Reservation system',
    hi: 'आरक्षण प्रणाली',
    pa: 'ਰਿਜ਼ਰਵੇਸ਼ਨ ਸਿਸਟਮ'
  },

  aiSymptomChecker: {
    en: 'AI Symptom Checker',
    hi: 'AI लक्षण चेकर',
    pa: 'AI ਲੱਛਣ ਚੈਕਰ'
  },
  aiDescription: {
    en: 'Intelligent preliminary diagnosis optimized for low-bandwidth',
    hi: 'कम बैंडविड्थ के लिए अनुकूलित बुद्धिमान प्रारंभिक निदान',
    pa: 'ਘੱਟ ਬੈਂਡਵਿਡਥ ਲਈ ਅਨੁਕੂਲਿਤ ਬੁੱਧੀਮਾਨ ਸ਼ੁਰੂਆਤੀ ਨਿਦਾਨ'
  },
  quickAssessment: {
    en: 'Quick assessment',
    hi: 'त्वरित मूल्यांकन',
    pa: 'ਤੁਰੰਤ ਮੁਲਾਂਕਣ'
  },
  treatmentGuidance: {
    en: 'Treatment guidance',
    hi: 'उपचार मार्गदर्शन',
    pa: 'ਇਲਾਜ ਮਾਰਗਦਰਸ਼ਨ'
  },
  emergencyAlerts: {
    en: 'Emergency alerts',
    hi: 'आपातकालीन अलर्ट',
    pa: 'ਐਮਰਜੈਂਸੀ ਅਲਰਟ'
  },

  lowBandwidthOptimization: {
    en: 'Low-Bandwidth Optimization',
    hi: 'कम-बैंडविड्थ अनुकूलन',
    pa: 'ਘੱਟ-ਬੈਂਡਵਿਡਥ ਅਨੁਕੂਲਨ'
  },
  bandwidthDescription: {
    en: 'Designed to work efficiently with limited internet connectivity',
    hi: 'सीमित इंटरनेट कनेक्टिविटी के साथ कुशलतापूर्वक काम करने के लिए डिज़ाइन किया गया',
    pa: 'ਸੀਮਤ ਇੰਟਰਨੈੱਟ ਕਨੈਕਟੀਵਿਟੀ ਨਾਲ ਕੁਸ਼ਲਤਾ ਨਾਲ ਕੰਮ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ'
  },
  offlineFunctionality: {
    en: 'Offline functionality',
    hi: 'ऑफलाइन कार्यक्षमता',
    pa: 'ਆਫਲਾਈਨ ਕਾਰਜਸ਼ੀਲਤਾ'
  },
  dataCompression: {
    en: 'Data compression',
    hi: 'डेटा संपीड़न',
    pa: 'ਡਾਟਾ ਕੰਪਰੈਸ਼ਨ'
  },
  smsIntegration: {
    en: 'SMS integration',
    hi: 'SMS एकीकरण',
    pa: 'SMS ਏਕੀਕਰਣ'
  },

  scalablePlatform: {
    en: 'Scalable Platform',
    hi: 'स्केलेबल प्लेटफॉर्म',
    pa: 'ਸਕੇਲੇਬਲ ਪਲੇਟਫਾਰਮ'
  },
  scalableDescription: {
    en: 'Built to expand across rural regions throughout India',
    hi: 'पूरे भारत के ग्रामीण क्षेत्रों में विस्तार के लिए बनाया गया',
    pa: 'ਪੂਰੇ ਭਾਰਤ ਦੇ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਵਿਸਤਾਰ ਲਈ ਬਣਾਇਆ ਗਿਆ'
  },
  multiStateSupport: {
    en: 'Multi-state support',
    hi: 'बहु-राज्य समर्थन',
    pa: 'ਬਹੁ-ਰਾਜ ਸਹਾਇਤਾ'
  },
  localAdaptation: {
    en: 'Local adaptation',
    hi: 'स्थानीय अनुकूलन',
    pa: 'ਸਥਾਨਕ ਅਨੁਕੂਲਨ'
  },
  cloudInfrastructure: {
    en: 'Cloud infrastructure',
    hi: 'क्लाउड अवसंरचना',
    pa: 'ਕਲਾਉਡ ਬੁਨਿਆਦੀ ਢਾਂਚਾ'
  },

  transformHealthcareTitle: {
    en: 'Ready to Transform Rural Healthcare?',
    hi: 'ग्रामीण स्वास्थ्य सेवा को बदलने के लिए तैयार हैं?',
    pa: 'ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?'
  },
  transformHealthcareDescription: {
    en: 'Join us in revolutionizing healthcare access for rural communities. Together, we can bridge the gap between villages and quality medical care.',
    hi: 'ग्रामीण समुदायों के लिए स्वास्थ्य सेवा पहुंच में क्रांति लाने में हमारे साथ शामिल हों। मिलकर, हम गांवों और गुणवत्तापूर्ण चिकित्सा देखभाल के बीच की खाई को पाट सकते हैं।',
    pa: 'ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਲਈ ਸਿਹਤ ਸੇਵਾ ਪਹੁੰਚ ਵਿੱਚ ਕ੍ਰਾਂਤੀ ਲਿਆਉਣ ਵਿੱਚ ਸਾਡੇ ਨਾਲ ਸ਼ਾਮਲ ਹੋਵੋ। ਮਿਲ ਕੇ, ਅਸੀਂ ਪਿੰਡਾਂ ਅਤੇ ਗੁਣਵੱਤਾ ਭਰਪੂਰ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਵਿਚਕਾਰ ਦੀ ਖਾਈ ਨੂੰ ਪਾਟ ਸਕਦੇ ਹਾਂ।'
  },
  getStartedToday: {
    en: 'Get Started Today',
    hi: 'आज ही शुरुआत करें',
    pa: 'ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰੋ'
  },

  // Footer Section
  nabhaRuralCare: {
    en: 'Nabha Rural Care',
    hi: 'नाभा ग्रामीण देखभाल',
    pa: 'ਨਾਭਾ ਪੇਂਡੂ ਦੇਖਭਾਲ'
  },
  footerDescription: {
    en: 'Transforming rural healthcare through technology, connecting 173 villages to quality medical care and improving lives across Punjab.',
    hi: 'प्रौद्योगिकी के माध्यम से ग्रामीण स्वास्थ्य सेवा को बदलना, 173 गांवों को गुणवत्तापूर्ण चिकित्सा देखभाल से जोड़ना और पंजाब भर में जीवन में सुधार लाना।',
    pa: 'ਤਕਨੀਕ ਰਾਹੀਂ ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਨੂੰ ਬਦਲਨਾ, 173 ਪਿੰਡਾਂ ਨੂੰ ਗੁਣਵੱਤਾ ਭਰਪੂਰ ਮੈਡੀਕਲ ਦੇਖਭਾਲ ਨਾਲ ਜੋੜਨਾ ਅਤੇ ਪੰਜਾਬ ਭਰ ਵਿੱਚ ਜੀਵਨ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣਾ।'
  },
  quickLinks: {
    en: 'Quick Links',
    hi: 'त्वरित लिंक',
    pa: 'ਤੇਜ਼ ਲਿੰਕ'
  },
  theProblem: {
    en: 'The Problem',
    hi: 'समस्या',
    pa: 'ਸਮੱਸਿਆ'
  },
  ourSolution: {
    en: 'Our Solution',
    hi: 'हमारा समाधान',
    pa: 'ਸਾਡਾ ਹੱਲ'
  },
  expectedImpact: {
    en: 'Expected Impact',
    hi: 'अपेक्षित प्रभाव',
    pa: 'ਉਮੀਦ ਕੀਤਾ ਪ੍ਰਭਾਵ'
  },
  stakeholders: {
    en: 'Stakeholders',
    hi: 'हितधारक',
    pa: 'ਹਿੱਸੇਦਾਰ'
  },
  contactInfo: {
    en: 'Contact Info',
    hi: 'संपर्क जानकारी',
    pa: 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ'
  },
  nabhaAddress: {
    en: 'Nabha, Patiala District, Punjab, India',
    hi: 'नाभा, पटियाला जिला, पंजाब, भारत',
    pa: 'ਨਾਭਾ, ਪਟਿਆਲਾ ਜ਼ਿਲ੍ਹਾ, ਪੰਜਾਬ, ਭਾਰਤ'
  },
  footerCopyright: {
    en: '© 2025 HealthBridge. All rights reserved. Serving rural Punjab with compassion and technology.',
    hi: '© 2025 HealthBridge। सभी अधिकार सुरक्षित। करुणा और प्रौद्योगिकी के साथ ग्रामीण पंजाब की सेवा।',
    pa: '© 2025 HealthBridge। ਸਾਰੇ ਹੱਕ ਸੁਰੱਖਿਅਤ ਹਨ। ਦਇਆ ਅਤੇ ਤਕਨੀਕ ਨਾਲ ਪੇਂਡੂ ਪੰਜਾਬ ਦੀ ਸੇਵਾ।'
  },
  madeWithLove: {
    en: 'Made with ❤️ for rural healthcare',
    hi: 'ग्रामीण स्वास्थ्य सेवा के लिए ❤️ से बनाया गया',
    pa: 'ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਲਈ ❤️ ਨਾਲ ਬਣਾਇਆ ਗਿਆ'
  },

  // Sign In & Registration
  signInDescription: {
    en: 'Access your healthcare account',
    hi: 'अपने स्वास्थ्य खाते तक पहुंचें',
    pa: 'ਆਪਣੇ ਸਿਹਤ ਖਾਤੇ ਤੱਕ ਪਹੁੰਚੋ'
  },
  emailAddress: {
    en: 'Email Address',
    hi: 'ईमेल पता',
    pa: 'ਈਮੇਲ ਪਤਾ'
  },
  enterEmail: {
    en: 'Enter your email',
    hi: 'अपना ईमेल दर्ज करें',
    pa: 'ਆਪਣੀ ਈਮੇਲ ਦਰਜ ਕਰੋ'
  },
  password: {
    en: 'Password',
    hi: 'पासवर्ड',
    pa: 'ਪਾਸਵਰਡ'
  },
  enterPassword: {
    en: 'Enter your password',
    hi: 'अपना पासवर्ड दर्ज करें',
    pa: 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ'
  },
  rememberMe: {
    en: 'Remember me',
    hi: 'मुझे याद रखें',
    pa: 'ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ'
  },
  forgotPassword: {
    en: 'Forgot password?',
    hi: 'पासवर्ड भूल गए?',
    pa: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?'
  },
  newPatient: {
    en: 'New patient?',
    hi: 'नया मरीज़?',
    pa: 'ਨਵਾਂ ਮਰੀਜ਼?'
  },
  createAccount: {
    en: 'Create Account',
    hi: 'खाता बनाएं',
    pa: 'ਖਾਤਾ ਬਣਾਓ'
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    hi: 'पहले से खाता है?',
    pa: 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?'
  },

  // Patient Registration
  patientRegistration: {
    en: 'Patient Registration',
    hi: 'रोगी पंजीकरण',
    pa: 'ਮਰੀਜ਼ ਰਜਿਸਟਰੇਸ਼ਨ'
  },
  registrationDescription: {
    en: 'Create your healthcare account to access telemedicine services',
    hi: 'टेलीमेडिसिन सेवाओं तक पहुंचने के लिए अपना स्वास्थ्य खाता बनाएं',
    pa: 'ਟੈਲੀਮੈਡੀਸਿਨ ਸੇਵਾਵਾਂ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਆਪਣਾ ਸਿਹਤ ਖਾਤਾ ਬਣਾਓ'
  },
  personalInformation: {
    en: 'Personal Information',
    hi: 'व्यक्तिगत जानकारी',
    pa: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ'
  },
  firstName: {
    en: 'First Name',
    hi: 'पहला नाम',
    pa: 'ਪਹਿਲਾ ਨਾਮ'
  },
  enterFirstName: {
    en: 'Enter first name',
    hi: 'पहला नाम दर्ज करें',
    pa: 'ਪਹਿਲਾ ਨਾਮ ਦਰਜ ਕਰੋ'
  },
  lastName: {
    en: 'Last Name',
    hi: 'अंतिम नाम',
    pa: 'ਅੰਤਿਮ ਨਾਮ'
  },
  enterLastName: {
    en: 'Enter last name',
    hi: 'अंतिम नाम दर्ज करें',
    pa: 'ਅੰਤਿਮ ਨਾਮ ਦਰਜ ਕਰੋ'
  },
  dateOfBirth: {
    en: 'Date of Birth',
    hi: 'जन्म तिथि',
    pa: 'ਜਨਮ ਮਿਤੀ'
  },
  gender: {
    en: 'Gender',
    hi: 'लिंग',
    pa: 'ਲਿੰਗ'
  },
  selectGender: {
    en: 'Select gender',
    hi: 'लिंग चुनें',
    pa: 'ਲਿੰਗ ਚੁਣੋ'
  },
  male: {
    en: 'Male',
    hi: 'पुरुष',
    pa: 'ਪੁਰਸ਼'
  },
  female: {
    en: 'Female',
    hi: 'महिला',
    pa: 'ਔਰਤ'
  },
  other: {
    en: 'Other',
    hi: 'अन्य',
    pa: 'ਹੋਰ'
  },
  contactInformation: {
    en: 'Contact Information',
    hi: 'संपर्क जानकारी',
    pa: 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ'
  },
  phoneNumber: {
    en: 'Phone Number',
    hi: 'फोन नंबर',
    pa: 'ਫੋਨ ਨੰਬਰ'
  },
  enterPhone: {
    en: 'Enter phone number',
    hi: 'फोन नंबर दर्ज करें',
    pa: 'ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ'
  },
  village: {
    en: 'Village',
    hi: 'गांव',
    pa: 'ਪਿੰਡ'
  },
  enterVillage: {
    en: 'Enter village name',
    hi: 'गांव का नाम दर्ज करें',
    pa: 'ਪਿੰਡ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ'
  },
  address: {
    en: 'Address',
    hi: 'पता',
    pa: 'ਪਤਾ'
  },
  enterAddress: {
    en: 'Enter address',
    hi: 'पता दर्ज करें',
    pa: 'ਪਤਾ ਦਰਜ ਕਰੋ'
  },
  emergencyContact: {
    en: 'Emergency Contact',
    hi: 'आपातकालीन संपर्क',
    pa: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ'
  },
  emergencyContactName: {
    en: 'Emergency Contact Name',
    hi: 'आपातकालीन संपर्क नाम',
    pa: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨਾਮ'
  },
  enterEmergencyContact: {
    en: 'Enter emergency contact name',
    hi: 'आपातकालीन संपर्क नाम दर्ज करें',
    pa: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨਾਮ ਦਰਜ ਕਰੋ'
  },
  emergencyPhone: {
    en: 'Emergency Phone',
    hi: 'आपातकालीन फोन',
    pa: 'ਐਮਰਜੈਂਸੀ ਫੋਨ'
  },
  enterEmergencyPhone: {
    en: 'Enter emergency phone',
    hi: 'आपातकालीन फोन दर्ज करें',
    pa: 'ਐਮਰਜੈਂਸੀ ਫੋਨ ਦਰਜ ਕਰੋ'
  },
  accountSecurity: {
    en: 'Account Security',
    hi: 'खाता सुरक्षा',
    pa: 'ਖਾਤਾ ਸੁਰੱਖਿਆ'
  },
  confirmPassword: {
    en: 'Confirm Password',
    hi: 'पासवर्ड की पुष्टि करें',
    pa: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ'
  },
  passwordMismatch: {
    en: 'Passwords do not match!',
    hi: 'पासवर्ड मेल नहीं खाते!',
    pa: 'ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ!'
  },
  agreeToTerms: {
    en: 'I agree to the',
    hi: 'मैं सहमत हूं',
    pa: 'ਮੈਂ ਸਹਿਮਤ ਹਾਂ'
  },
  termsAndConditions: {
    en: 'Terms and Conditions',
    hi: 'नियम और शर्तें',
    pa: 'ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ'
  },
  
  // Language names
  english: {
    en: 'English',
    hi: 'English',
    pa: 'English'
  },
  hindi: {
    en: 'हिन्दी',
    hi: 'हिन्दी',
    pa: 'ਹਿੰਦੀ'
  },
  punjabi: {
    en: 'ਪੰਜਾਬੀ',
    hi: 'पंजाबी',
    pa: 'ਪੰਜਾਬੀ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};