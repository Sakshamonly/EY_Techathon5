import React from 'react';
import { Users } from 'lucide-react';

export default function RecentPatients() {
  

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Name</th>
              <th className="pb-3">ID</th>
              <th className="pb-3">Last Visit</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-3 font-medium text-gray-800">{patient.name}</td>
                <td className="py-3 text-gray-600">{patient.id}</td>
                <td className="py-3 text-gray-600">{patient.lastVisit}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      patient.status === 'Stable' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}