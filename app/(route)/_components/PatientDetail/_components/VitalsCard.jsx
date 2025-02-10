import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function VitalsCard({ timestamp, vitals }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Vital Statistics</h2>
        <span className="text-sm text-gray-500">Last updated: {timestamp}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {vitals.map((vital) => (
          <div key={vital.name} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{vital.name}</span>
              {vital.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {vital.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold ${getStatusColor(vital.status)}`}>
                {vital.value}
              </span>
              <span className="ml-1 text-sm text-gray-500">{vital.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VitalsCard;