import React from 'react';
import { Calendar, FileText, ClipboardList, AlertCircle } from 'lucide-react';

export const ActionButtons = ({ setActiveModal }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
    <button 
      onClick={() => setActiveModal('schedule')}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
    >
      <Calendar size={18} />
      <span>Schedule</span>
    </button>
    <button 
      onClick={() => setActiveModal('prescribe')}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
    >
      <FileText size={18} />
      <span>Prescribe</span>
    </button>
    <button 
      onClick={() => setActiveModal('notes')}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
    >
      <ClipboardList size={18} />
      <span>Notes</span>
    </button>
    <button 
      onClick={() => setActiveModal('urgent')}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
    >
      <AlertCircle size={18} />
      <span>Urgent</span>
    </button>
  </div>
);