import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './component/Header';
import Hero from './component/Hero';
import ProblemStatement from './component/ProblemStatement';
import Solution from './component/Solution';
import Footer from './component/Footer';
import SignIn from './component/SignIn';
import PatientRegistration from './component/PatientRegistration';
import DatabaseAdmin from './component/DatabaseAdmin';

type PageType = 'home' | 'signin' | 'register' | 'admin';

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
      {currentPage === 'home' && (
        <div className="min-h-screen">
          <Header 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen}
            onSignInClick={navigateToSignIn}
          />
          <Hero />
          <ProblemStatement />
          <Solution />
          
          <Footer />
        </div>
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

      {currentPage === 'admin' && adminUser && (
        <DatabaseAdmin 
          onBackToHome={navigateToHome}
          onLogout={handleAdminLogout}
          adminUser={adminUser}
        />
      )}
    </LanguageProvider>
  );
}

export default App;