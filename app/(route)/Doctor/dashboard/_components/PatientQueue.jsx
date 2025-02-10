import React from 'react';
import { Search, PlusCircle } from 'lucide-react';

const patients = [
  {
    name: 'Sarah Johnson',
    time: '09:30 AM',
    status: 'In-Consultation',
    type: 'Follow-up',
  },
  {
    name: 'Michael Chen',
    time: '10:00 AM',
    status: 'Waiting',
    type: 'New Patient',
  },
  {
    name: 'Emma Davis',
    time: '10:30 AM',
    status: 'Scheduled',
    type: 'Regular Checkup',
  },
  {
    name: 'James Wilson',
    time: '11:00 AM',
    status: 'Scheduled',
    type: 'Lab Results',
  },
  {
    name: 'Lisa Anderson',
    time: '11:30 AM',
    status: 'Scheduled',
    type: 'Follow-up',
  },
];

const statusColors = {
  'Waiting': 'yellow',
  'In-Consultation': 'blue',
  'Completed': 'green',
  'Scheduled': 'gray',
};

export default function PatientQueue() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Patient Queue</h2>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Patient
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {patients.map((patient) => (
                <tr key={patient.name} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="py-4 text-gray-500">{patient.time}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColors[patient.status]}-100 text-${statusColors[patient.status]}-800`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{patient.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}