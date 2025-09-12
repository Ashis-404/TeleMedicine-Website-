/*Footer.tsx*/

import { Heart, Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-white opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  HealthBridge
                </h1>
                <p className="text-sm text-gray-300">{t('nabhaRuralCare')}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('footerDescription')}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Globe, color: 'blue' },
                { icon: Mail, color: 'green' },
                { icon: Phone, color: 'yellow' },
                { icon: Facebook, color: 'blue' },
                { icon: Twitter, color: 'sky' },
                { icon: Linkedin, color: 'indigo' },
                { icon: Instagram, color: 'pink' }
              ].map((social, index) => (
                <div 
                  key={index}
                  className={`bg-gray-800 hover:bg-${social.color}-600 p-3 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer group`}
                >
                  <social.icon className={`h-5 w-5 text-${social.color}-400 group-hover:text-white transition-colors duration-300`} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full mr-3"></div>
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { name: t('home'), href: '#home' },
                { name: t('theProblem'), href: '#problem' },
                { name: t('ourSolution'), href: '#solution' },
                { name: t('serviceArea'), href: '#map' },
                { name: t('expectedImpact'), href: '#impact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 hover:translate-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
              {t('contactInfo')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-gray-400 group-hover:text-white flex-shrink-0" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {t('nabhaAddress')}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-gray-400 group-hover:text-white flex-shrink-0" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  +91-XXXX-XXXXXX
                </span>
              </div>
              
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-purple-600 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-white flex-shrink-0" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  info@healthbridge.in
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {t('footerCopyright')}
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                {t('madeWithLove')} <Heart className="h-4 w-4 text-red-500 inline animate-pulse" />
              </p>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <div>
                <span>Privacy Policy • Terms of Service • Cookie Policy</span>
              </div>
              <div className="mt-2 md:mt-0">
                <span>Powered by cutting-edge telemedicine technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}