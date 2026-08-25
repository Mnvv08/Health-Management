import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import DoctorsPage from './pages/DoctorsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/hospitals/:id" element={<HospitalDetailPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
