import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './component/Header';
import Hero from './component/Hero';
import ProblemStatement from './component/ProblemStatement';
import Solution from './component/Solution';
import Footer from './component/Footer';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Hero />
        <ProblemStatement />
        <Solution />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;