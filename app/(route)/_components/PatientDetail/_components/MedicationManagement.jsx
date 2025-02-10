import React from 'react';
import { Clock, AlertTriangle, RefreshCw } from 'lucide-react';

const MedicationManagement = ({ medications }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medication Management</h2>
      <div className="grid grid-cols-1 gap-4">
        {medications.map((medication) => (
          <div key={medication.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{medication.name}</span>
              <div className="flex space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                {medication.interactions.length > 0 && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Dosage: {medication.dosage}</span>
              <span className="ml-4 text-sm text-gray-600">Frequency: {medication.frequency}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Start Date: {medication.startDate}</span>
              <span className="ml-4 text-sm text-gray-600">End Date: {medication.endDate}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Refills Remaining: {medication.refillsRemaining}</span>
            </div>
            {medication.interactions.length > 0 && (
              <div className="mt-2 text-sm text-red-600">
                Interactions: {medication.interactions.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationManagement;