/*Header.tsx*/

import { Heart, Menu, X, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onSignInClick: () => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, onSignInClick }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">NabhaCare</h1>
              <p className="text-xs text-gray-600">Rural Care</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {t('home')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#problem" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {t('problem')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#solution" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {t('solution')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#map" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {t('serviceArea')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group">
                {t('impact')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              <button 
                onClick={onSignInClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover:shadow-lg">
                <User className="h-4 w-4" />
                <span>{t('signIn')}</span>
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 animate-fadeIn">
            <nav className="flex flex-col space-y-2 pt-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-300 hover:pl-2">{t('home')}</a>
              <a href="#problem" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-300 hover:pl-2">{t('problem')}</a>
              <a href="#solution" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-300 hover:pl-2">{t('solution')}</a>
              <a href="#map" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-300 hover:pl-2">{t('serviceArea')}</a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-all duration-300 hover:pl-2">{t('impact')}</a>
              <div className="border-t border-gray-200 mt-2 pt-4 space-y-4">
                <div className="flex justify-center">
                  <LanguageSelector />
                </div>
      
                <button 
                  onClick={onSignInClick}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 w-full justify-center hover:scale-105">
                  <User className="h-4 w-4" />
                  <span>{t('signIn')}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}