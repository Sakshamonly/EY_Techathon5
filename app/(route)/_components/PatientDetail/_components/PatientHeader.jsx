import React from 'react';
import { ArrowLeft, Bell, Edit, Printer } from 'lucide-react';

const PatientHeader = ({
  name,
  patientId,
  dateOfBirth,
  age,
  hasAllergies,
  hasCriticalCondition,
  photoUrl,
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to List
          </button>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Printer className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center">
          <div className="relative">
            <img
              src={photoUrl}
              alt={name}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
            />
            {(hasAllergies || hasCriticalCondition) && (
              <div className="absolute -top-2 -right-2">
                <Bell className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>
          
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <div className="mt-2 flex items-center space-x-6 text-gray-600">
              <div>
                <span className="text-sm">Patient ID:</span>
                <span className="ml-2 font-medium">{patientId}</span>
              </div>
              <div>
                <span className="text-sm">DOB:</span>
                <span className="ml-2 font-medium">{dateOfBirth}</span>
              </div>
              <div>
                <span className="text-sm">Age:</span>
                <span className="ml-2 font-medium">{age} years</span>
              </div>
            </div>
            {(hasAllergies || hasCriticalCondition) && (
              <div className="mt-2 flex items-center space-x-4">
                {hasAllergies && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Allergies
                  </span>
                )}
                {hasCriticalCondition && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Critical Condition
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
