"use client";

import React from 'react';
import PatientHeader from './_components/PatientHeader';
import VitalsCard from './_components/VitalsCard';
import  MedicalTimeline  from './_components/MedicalTimeline';
import  DiagnosisPanel  from './_components/DiagnosisPanel';
import  MedicationManagement  from './_components/MedicationManagement';
import  LabResults  from './_components/LabResults';
import  ClinicalNotes from './_components/ClinicalNotes';

// Mock data
const mockData = {
  patient: {
    name: 'Sarah Johnson',
    patientId: 'P-123456',
    dateOfBirth: '1985-06-15',
    age: 38,
    hasAllergies: true,
    hasCriticalCondition: false,
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
  },
  vitals: {
    timestamp: '2024-03-15 14:30',
    stats: [
      { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'stable', status: 'normal' },
      { name: 'Heart Rate', value: '72', unit: 'bpm', trend: 'down', status: 'normal' },
      { name: 'Temperature', value: '98.6', unit: '°F', trend: 'stable', status: 'normal' },
      { name: 'Oxygen Saturation', value: '98', unit: '%', trend: 'up', status: 'normal' },
    ],
  },
  timeline: [
    {
      id: '1',
      date: '2024-03-10',
      type: 'Consultation',
      title: 'Annual Check-up',
      description: 'Routine physical examination and health assessment.',
      provider: 'Robert Smith',
    },
  ],
  diagnoses: [
    {
      condition: 'Type 2 Diabetes',
      icdCode: 'E11.9',
      status: 'active',
      date: '2023-11-15',
    },
  ],
  treatments: [
    {
      id: '1',
      name: 'Diabetes Management Plan',
      progress: 75,
      startDate: '2023-11-15',
      endDate: '2024-11-15',
      provider: 'Robert Smith',
    },
  ],
  medications: [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-11-15',
      endDate: '2024-11-15',
      refillsRemaining: 2,
      interactions: ['Avoid alcohol', 'Take with food'],
    },
  ],
  labResults: {
    results: [
      {
        id: '1',
        name: 'HbA1c',
        value: 6.8,
        unit: '%',
        date: '2024-03-01',
        normalRange: { min: 4.0, max: 5.7 },
        trend: [5.9, 6.2, 6.8],
      },
    ],
    pendingTests: [
      {
        id: '1',
        name: 'Comprehensive Metabolic Panel',
        scheduledDate: '2024-03-20',
        orderingProvider: 'Robert Smith',
      },
    ],
  },
  clinicalNotes: [
    {
      id: '1',
      date: '2024-03-10',
      provider: 'Robert Smith',
      category: 'General',
      content: 'Patient reports improved glucose control. Maintaining dietary recommendations.',
    },
  ],
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <PatientHeader {...mockData.patient} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VitalsCard
            timestamp={mockData.vitals.timestamp}
            vitals={mockData.vitals.stats}
          />
          <DiagnosisPanel
            diagnoses={mockData.diagnoses}
            treatments={mockData.treatments}
          />
          <MedicationManagement
            medications={mockData.medications}
          />
          <LabResults
            results={mockData.labResults.results}
            pendingTests={mockData.labResults.pendingTests}
          />
          <div className="lg:col-span-2">
            <MedicalTimeline events={mockData.timeline} />
          </div>
          <div className="lg:col-span-2">
            <ClinicalNotes notes={mockData.clinicalNotes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
