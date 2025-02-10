import React from 'react';
import { LineChart, Clock, AlertCircle } from 'lucide-react';

const LabResults = ({ labResults = [] }) => { // Default to empty array
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lab Results</h2>
      <div className="grid grid-cols-1 gap-4">
        {labResults.map((result) => (
          <div key={result.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{result.name}</span>
              <div className="flex space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                {result.value < result.normalRange.min || result.value > result.normalRange.max ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : null}
                <LineChart className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-800">{result.value}</span>
              <span className="ml-1 text-sm text-gray-500">{result.unit}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Normal Range: {result.normalRange.min} - {result.normalRange.max} {result.unit}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Date: {result.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;
