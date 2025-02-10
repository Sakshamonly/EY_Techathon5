import React from 'react';
import { Activity, CheckCircle } from 'lucide-react';

const DiagnosisPanel = ({ diagnoses, treatments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Diagnosis & Treatment</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Current Diagnoses</h3>
        <div className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.icdCode} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{diagnosis.condition}</span>
                  <span className="ml-2 text-sm text-gray-500">({diagnosis.icdCode})</span>
                </div>
                <span className="text-sm text-gray-500">{diagnosis.date}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                diagnosis.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {diagnosis.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Treatment Plans</h3>
        <div className="space-y-6">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{treatment.name}</h4>
                  <span className="text-sm text-gray-500">
                    {treatment.startDate} - {treatment.endDate}
                  </span>
                </div>
                <span className="text-sm text-blue-600">Dr. {treatment.provider}</span>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {treatment.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${treatment.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPanel;