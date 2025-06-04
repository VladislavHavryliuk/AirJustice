import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Clock, CheckCircle, XCircle, Bell } from 'lucide-react';

interface Complaint {
  id: string;
  flightNumber: string;
  airline: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  submittedAt: string;
}

const mockComplaints: Complaint[] = [
  {
    id: 'C001',
    flightNumber: 'BA123',
    airline: 'British Airways',
    status: 'in_review',
    submittedAt: '2024-03-15',
  },
  {
    id: 'C002',
    flightNumber: 'LH456',
    airline: 'Lufthansa',
    status: 'approved',
    submittedAt: '2024-03-10',
  },
  {
    id: 'C003',
    flightNumber: 'AF789',
    airline: 'Air France',
    status: 'pending',
    submittedAt: '2024-03-18',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: Clock,
  in_review: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

function Dashboard() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleNotificationChange = (type: 'email' | 'sms') => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleFileUpload = (complaintId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        // Handle file upload logic here
        console.log(`Uploading files for complaint ${complaintId}`, files);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="mt-2 text-gray-600">Track and manage your compensation claims</p>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Email Notifications</span>
              <div 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                onClick={() => handleNotificationChange('email')}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">SMS Notifications</span>
              <div 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                onClick={() => handleNotificationChange('sms')}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.sms ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Complaints List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockComplaints.map((complaint) => {
            const StatusIcon = statusIcons[complaint.status];
            return (
              <div key={complaint.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {complaint.airline} - {complaint.flightNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted on {new Date(complaint.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusColors[complaint.status]}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {complaint.status.replace('_', ' ').charAt(0).toUpperCase() + complaint.status.slice(1).replace('_', ' ')}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleFileUpload(complaint.id)}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <FileUp className="w-4 h-4 mr-1" />
                      Upload Documents
                    </button>
                    <Link
                      to={`/complaints/${complaint.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;