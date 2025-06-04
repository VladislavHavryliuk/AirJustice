import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface FormData {
  flightNumber: string;
  airline: string;
  date: string;
  description: string;
  files: FileList | null;
}

function ComplaintForm() {
  const [formData, setFormData] = useState<FormData>({
    flightNumber: '',
    airline: '',
    date: '',
    description: '',
    files: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsChecking(true);
    
    // Simulate eligibility check
    setTimeout(() => {
      setIsChecking(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: e.target.files
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit Your Complaint</h1>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="airline" className="block text-sm font-medium text-gray-700 mb-1">
                  Airline
                </label>
                <input
                  type="text"
                  id="airline"
                  name="airline"
                  required
                  value={formData.airline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., British Airways"
                />
              </div>

              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Number
                </label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  required
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., BA123"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe Your Issue
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please describe the issues you encountered..."
                />
              </div>

              <div>
                <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Supporting Documents
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Upload tickets, receipts, or photos (PDF, JPG, PNG)
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Complaint
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              {isChecking ? (
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-lg text-gray-700">
                    Checking eligibility under EU Regulation 261...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-green-600 text-xl font-semibold">
                    Your complaint has been submitted successfully!
                  </div>
                  <p className="text-gray-600">
                    Based on our initial assessment, your flight may be eligible for compensation.
                    Our legal team will review your case and contact you within 24 hours.
                  </p>
                  <Link
                    to="/"
                    className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Return to Home
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;