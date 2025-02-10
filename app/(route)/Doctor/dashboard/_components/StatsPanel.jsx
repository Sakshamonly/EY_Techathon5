import React from 'react';
import { Users, Calendar, FileText, AlertCircle } from 'lucide-react';
import PatientTrendChart from './PatientTrendChart';
import AppointmentDistributionChart from './AppointmentDistributionChart';

const stats = [
  {
    title: 'Active Patients',
    value: '1,284',
    change: '+12.5%',
    icon: Users,
    color: 'blue',
  },
  {
    title: "Today's Appointments",
    value: '32',
    subtitle: '8 remaining',
    icon: Calendar,
    color: 'green',
  },
  {
    title: 'Pending Reports',
    value: '15',
    subtitle: '3 urgent',
    icon: FileText,
    color: 'yellow',
  },
  {
    title: 'Critical Cases',
    value: '4',
    subtitle: 'Immediate attention',
    icon: AlertCircle,
    color: 'red',
  },
];

export default function StatsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className="mt-1 text-sm font-medium text-green-600">{stat.change}</p>
                )}
                {stat.subtitle && (
                  <p className="mt-1 text-sm text-gray-500">{stat.subtitle}</p>
                )}
              </div>
              <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Patient Trends</h3>
          <PatientTrendChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Appointment Distribution</h3>
          <AppointmentDistributionChart />
        </div>
      </div>
    </div>
  );
}