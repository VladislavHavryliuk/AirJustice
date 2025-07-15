import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, Minus, CheckCircle } from 'lucide-react';
import CanvasDraw from 'react-canvas-draw';
import { jsPDF } from 'jspdf';

interface FlightData {
  departure: string;
  destination: string;
  layovers: string[];
}

interface FormData {
  flight: FlightData;
  issue: string;
  subIssue: string;
  signature: string | null;
}

const issueOptions = [
  { id: 'delay', label: 'Flight Delay' },
  { id: 'cancellation', label: 'Flight Cancellation' },
  { id: 'baggage', label: 'Baggage Issues' },
  { id: 'other', label: 'Other' },
];

const subIssueOptions = {
  delay: [
    { id: 'less_3h', label: 'Less than 3 hours' },
    { id: '3_4h', label: '3-4 hours' },
    { id: 'more_4h', label: 'More than 4 hours' },
    { id: 'more_day', label: 'More than a day' },
  ],
  cancellation: [
    { id: 'less_7d', label: 'Less than 7 days' },
    { id: '7_14d', label: '7-14 days' },
    { id: 'more_14d', label: 'More than 14 days' },
  ],
  baggage: [
    { id: 'lost', label: 'Lost baggage' },
    { id: 'damaged', label: 'Damaged baggage' },
    { id: 'delayed', label: 'Delayed baggage' },
  ],
  other: [],
};

const steps = [
  { id: 1, title: 'Flight Information' },
  { id: 2, title: 'Issue Type' },
  { id: 3, title: 'Signature' },
  { id: 4, title: 'Preview and Confirmation' },
];

function ComplaintForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    flight: { departure: '', destination: '', layovers: [] },
    issue: '',
    subIssue: '',
    signature: null,
  });
  const [layoverCount, setLayoverCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const canvasRef = useRef<CanvasDraw>(null);
  const navigate = useNavigate();

  const handleFlightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      flight: { ...prev.flight, [name]: value },
    }));
  };

  const handleLayoverChange = (index: number, value: string) => {
    const newLayovers = [...formData.flight.layovers];
    newLayovers[index] = value;
    setFormData(prev => ({
      ...prev,
      flight: { ...prev.flight, layovers: newLayovers },
    }));
  };

  const addLayover = () => {
    setLayoverCount(prev => prev + 1);
    setFormData(prev => ({
      ...prev,
      flight: { ...prev.flight, layovers: [...prev.flight.layovers, ''] },
    }));
  };

  const removeLayover = (index: number) => {
    const newLayovers = formData.flight.layovers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      flight: { ...prev.flight, layovers: newLayovers },
    }));
    setLayoverCount(prev => prev - 1);
  };

  const handleIssueSelect = (issueId: string) => {
    setFormData(prev => ({ ...prev, issue: issueId, subIssue: '' }));
  };

  const handleSubIssueSelect = (subIssueId: string) => {
    setFormData(prev => ({ ...prev, subIssue: subIssueId }));
  };

  const exportSignature = () => {
    if (canvasRef.current) {
      return canvasRef.current.canvas.drawing.toDataURL('image/png');
    }
    return null;
  };

  const handleSignatureConfirm = () => {
    const signatureDataURL = exportSignature();
    if (signatureDataURL) {
      setFormData(prev => ({ ...prev, signature: signatureDataURL }));
      setCurrentStep(4);
    } else {
      alert('Please draw your signature.');
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    doc.setFontSize(12);
    doc.text(`Flight Complaint`, 10, 10);
    doc.text(`From: ${formData.flight.departure}`, 10, 20);
    doc.text(`To: ${formData.flight.destination}`, 10, 30);
    if (formData.flight.layovers.length > 0) {
      doc.text(`Layovers: ${formData.flight.layovers.join(', ')}`, 10, 40);
    }
    doc.text(`Issue Type: ${issueOptions.find(i => i.id === formData.issue)?.label || 'Other'}`, 10, 50);
    if (formData.subIssue) {
      const subIssueLabel = subIssueOptions[formData.issue as keyof typeof subIssueOptions]?.find(s => s.id === formData.subIssue)?.label || '';
      doc.text(`Details: ${subIssueLabel}`, 10, 60);
    }

    if (formData.signature) {
      doc.addImage(formData.signature, 'PNG', 50, 100, 100, 50);
    }

    return doc;
  };

  const handleFinalConfirm = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      navigate('/success');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Flight Information</h2>
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="text"
                id="departure"
                name="departure"
                value={formData.flight.departure}
                onChange={handleFlightInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Departure city"
                required
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.flight.destination}
                onChange={handleFlightInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Destination city"
                required
              />
            </div>
            {formData.flight.layovers.map((layover, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={layover}
                  onChange={(e) => handleLayoverChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder={`Layover ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeLayover(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLayover}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add layover
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
              disabled={!formData.flight.departure || !formData.flight.destination}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Issue Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {issueOptions.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => handleIssueSelect(issue.id)}
                  className={`p-4 rounded-lg border ${
                    formData.issue === issue.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  } hover:border-blue-600 transition-colors`}
                >
                  {issue.label}
                </button>
              ))}
            </div>
            {formData.issue && subIssueOptions[formData.issue as keyof typeof subIssueOptions]?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {subIssueOptions[formData.issue as keyof typeof subIssueOptions].map((subIssue) => (
                    <button
                      key={subIssue.id}
                      onClick={() => handleSubIssueSelect(subIssue.id)}
                      className={`p-4 rounded-lg border ${
                        formData.subIssue === subIssue.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      } hover:border-blue-600 transition-colors`}
                    >
                      {subIssue.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {formData.issue === 'other' && (
              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe the issue
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Please describe the issue..."
                />
              </div>
            )}
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
                disabled={!formData.issue || (subIssueOptions[formData.issue as keyof typeof subIssueOptions]?.length > 0 && !formData.subIssue)}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Signature</h2>
            <CanvasDraw
              ref={canvasRef}
              canvasWidth={400}
              canvasHeight={200}
              brushColor="#000000"
              brushRadius={2}
              lazyRadius={0}
              style={{ border: '1px solid #000' }}
            />
            <div className="flex space-x-4">
              <button
                onClick={clearCanvas}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400"
              >
                Clear
              </button>
              <button
                onClick={handleSignatureConfirm}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        );
      case 4:
        const pdf = generatePDF();
        const pdfDataUrl = pdf.output('datauristring');
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Document Preview</h2>
            <iframe
              src={pdfDataUrl}
              width="100%"
              height="500px"
              title="Document Preview"
              className="border border-gray-300 rounded-lg"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700"
              >
                {isChecking ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm and Submit'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        <div className="flex">
          <div className="w-64 mr-8">
            <ul className="space-y-4">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    currentStep > step.id ? 'bg-green-500 text-white' : 
                    currentStep === step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </span>
                  <span>{step.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-sm p-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;