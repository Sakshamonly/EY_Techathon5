import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const MedicalTimeline = ({ events }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Medical Timeline</h2>
        <div className="flex space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <Calendar className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{event.date}</span>
              <span className="text-sm text-gray-600">{event.type}</span>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-600">Provider: {event.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalTimeline;