"use client"

import React, { useState } from 'react';
import { Calendar, History } from 'lucide-react';
import { Header } from './_components/layout/Header';
import { AppointmentFilters } from './_components/appointments/AppointmentFilters';
import { DetailedAppointment } from './_components/appointments/DetailedAppointment';
import { AppointmentRequest } from './_components/appointments/AppointmentRequest';
import { useAppointments } from './_components/hooks/useAppointments';

export default function App() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    mode: ''
  });

  const { appointments } = useAppointments();

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filters.status || appointment.status === filters.status;
    const matchesMode = !filters.mode || appointment.mode === filters.mode;
    
    const isUpcoming = ['confirmed', 'pending', 'rescheduled'].includes(appointment.status);
    const matchesTab = activeTab === 'upcoming' ? isUpcoming : !isUpcoming;

    return matchesSearch && matchesStatus && matchesMode && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <button 
            onClick={() => setShowAppointmentForm(true)}
            className="bg-[#4FA3D9] text-white hover:bg-[#7CBAE6] transition-colors duration-200 shadow-sm px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            New Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-#4FA3D9 text-#4FA3D9'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeTab === 'past'
                      ? 'border-b-2 border-#4FA3D9 text-#4FA3D9'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <History className="w-4 h-4 mr-2" />
                  Past
                </button>
              </div>

              <AppointmentFilters
                onSearch={setSearchQuery}
                onFilterChange={setFilters}
              />

              <div className="p-4 space-y-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <DetailedAppointment
                      key={appointment.id}
                      appointment={appointment}
                      onCheckIn={() => console.log('Checking in:', appointment.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No appointments found
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            {showAppointmentForm && <AppointmentRequest onClose={() => setShowAppointmentForm(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}