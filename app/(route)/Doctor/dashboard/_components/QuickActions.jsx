import React from 'react';
import { 
  UserPlus, 
  Calendar, 
  FileText, 
  Folder, 
  Ambulance 
} from 'lucide-react';

const actions = [
  {
    icon: UserPlus,
    label: 'New Consultation',
    color: 'blue',
  },
  {
    icon: Calendar,
    label: 'Schedule Appointment',
    color: 'green',
  },
  {
    icon: FileText,
    label: 'Generate Report',
    color: 'purple',
  },
  {
    icon: Folder,
    label: 'Patient Records',
    color: 'yellow',
  },
  {
    icon: Ambulance,
    label: 'Emergency Admission',
    color: 'red',
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`flex items-center p-4 rounded-lg border border-${action.color}-100 hover:bg-${action.color}-50 transition-colors`}
          >
            <action.icon className={`w-5 h-5 text-${action.color}-500 mr-3`} />
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}