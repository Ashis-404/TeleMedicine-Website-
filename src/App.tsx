import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './component/Header';
import Hero from './component/Hero';
import ProblemStatement from './component/ProblemStatement';
import Solution from './component/Solution';
import ServiceAreaMap from './component/ServiceAreaMap';
import Footer from './component/Footer';
import SignIn from './component/SignIn';
import { PatientRegistration } from './component/PatientRegistration';
import PatientDashboard from './component/PatientDashboard';
import DatabaseAdmin from './component/DatabaseAdmin';

// Simple components for missing pieces
const ImpactSection = () => (
  <div className="py-16 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">1000+</div>
          <div className="text-gray-600">Patients Served</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600">50+</div>
          <div className="text-gray-600">Villages Covered</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600">95%</div>
          <div className="text-gray-600">Patient Satisfaction</div>
        </div>
      </div>
    </div>
  </div>
);

type PageType = 'home' | 'signin' | 'register' | 'patient-dashboard' | 'admin';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [adminUser, setAdminUser] = useState<any>(null);

  const navigateToSignIn = () => setCurrentPage('signin');
  const navigateToRegister = () => setCurrentPage('register');
  const navigateToHome = () => setCurrentPage('home');
  const handleAdminLoginSuccess = (admin: any) => {
    setAdminUser(admin);
    setCurrentPage('admin');
  };
  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {currentPage === 'home' && (
          <>
            <Header 
              mobileMenuOpen={mobileMenuOpen} 
              setMobileMenuOpen={setMobileMenuOpen}
              onSignInClick={navigateToSignIn}
            />
            <Hero />
            <ProblemStatement />
            <Solution />
            <ServiceAreaMap />
            <ImpactSection />
            <Footer />
          </>
        )}
        
        {currentPage === 'signin' && (
          <SignIn 
            onNavigateToRegister={navigateToRegister}
            onBackToHome={navigateToHome}
            onAdminLoginSuccess={handleAdminLoginSuccess}
          />
        )}
        
        {currentPage === 'register' && (
          <PatientRegistration 
            onNavigateToSignIn={navigateToSignIn}
            onBackToHome={navigateToHome}
          />
        )}

        {currentPage === 'patient-dashboard' && (
          <PatientDashboard 
            onBackToHome={navigateToHome}
          />
        )}

        {currentPage === 'admin' && adminUser && (
          <DatabaseAdmin 
            onBackToHome={navigateToHome}
            onLogout={handleAdminLogout}
            adminUser={adminUser}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;