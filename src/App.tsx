import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './component/Header';
import Hero from './component/Hero';
import ProblemStatement from './component/ProblemStatement';
import Solution from './component/Solution';
import ServiceAreaMap from './component/ServiceAreaMap';
import Footer from './component/Footer';
import SignIn from './component/SignIn';
import PatientRegistration from './component/PatientRegistration_backup';
import PatientDashboard from './component/PatientDashboard';
import DatabaseAdmin from './component/DatabaseAdmin';
import PatientLanding from './component/PatientLanding';
import DoctorLanding from './component/DoctorLanding';
import HealthworkerLanding from './component/HealthworkerLanding';

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

// ✅ Separate wrapper so we can use useNavigate with Header
function HomeLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onSignInClick={() => navigate("/signin")} // ✅ go to SignIn page
      />
      <Hero />
      <ProblemStatement />
      <Solution />
      <ServiceAreaMap />
      <ImpactSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<PatientRegistration />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/admin" element={<DatabaseAdmin />} />

            {/* New landing pages */}
            <Route path="/patient-landing" element={<PatientLanding />} />
            <Route path="/doctor-landing" element={<DoctorLanding />} />
            <Route path="/healthworker-landing" element={<HealthworkerLanding />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
