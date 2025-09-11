import React from 'react';
import { Heart, Menu, X, PlayCircle } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthBridge</h1>
              <p className="text-xs text-gray-600">Rural Care</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#problem" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Problem</a>
              <a href="#solution" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Solution</a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Impact</a>
            </nav>
            <a 
              href="http://127.0.0.1:5000/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <PlayCircle className="h-4 w-4" />
              <span>Try Demo</span>
            </a>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Home</a>
              <a href="#problem" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Problem</a>
              <a href="#solution" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Solution</a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Impact</a>
              <div className="border-t border-gray-200 mt-2 pt-4">
                <a 
                  href="http://127.0.0.1:5000/"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-full">
                  <PlayCircle className="h-4 w-4" />
                  <span>Try Demo</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}