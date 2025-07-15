import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Plane, FileCheck, BanknoteIcon, ScrollText, ShieldCheck, Bell } from 'lucide-react';
import ComplaintForm from './components/ComplaintForm';
import Dashboard from './components/Dashboard';
import KnowledgeBase from './components/KnowledgeBase';
import Navigation from './components/Navigation';

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <h1 className="text-5xl font-bold mb-6">Your Rights, Our Mission</h1>
          <p className="text-xl mb-8 max-w-2xl">
            We help airline passengers claim compensation for flight disruptions, delays, and lost baggage. 
            Get the justice you deserve with our expert support.
          </p>
          <Link to="/submit-complaint" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Submit a Complaint
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Plane className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Flight Details</h3>
            <p className="text-gray-600">Provide your flight information and describe the issue you encountered</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FileCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Legal Eligibility Check</h3>
            <p className="text-gray-600">Our system verifies your eligibility for compensation under air travel regulations</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <BanknoteIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Receive Compensation</h3>
            <p className="text-gray-600">Get the compensation you deserve directly to your preferred payment method</p>
          </div>
        </div>
      </div>

      {/* Why AirJustice Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why AirJustice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mb-4">
                <ScrollText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Legal Support</h3>
              <p className="text-gray-600">Expert guidance through the entire claims process with professional legal backing</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple Process</h3>
              <p className="text-gray-600">Easy-to-use platform with step-by-step guidance and minimal paperwork</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Status</h3>
              <p className="text-gray-600">Track your claim progress with instant updates and transparent communication</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Жалоба успешно отправлена!</h2>
      <p className="text-gray-600 mb-8">Наша команда свяжется с вами в ближайшее время.</p>
      <Link to="/" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
        Вернуться на главную
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-complaint" element={<ComplaintForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;