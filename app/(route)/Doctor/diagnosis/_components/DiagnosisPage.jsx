import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { PatientDetails } from './PatientDetails';

function DiagnosisPage({ onSave }) {
  const [symptoms, setSymptoms] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const mockPatient = {
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    id: 'PT-2024-001',
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const aiInsights = symptoms.length > 0 && {
    potentialConditions: ['Seasonal Allergies', 'Upper Respiratory Infection'],
    recommendations: [
      'Consider allergy testing',
      'Monitor symptoms for 24-48 hours',
    ],
  };

  const handleSave = () => {
    onSave({
      symptoms,
      doctorNotes,
      files,
      aiInsights: aiInsights || undefined,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <PatientDetails
        patient={mockPatient}
        doctorNotes={doctorNotes}
        onNotesChange={setDoctorNotes}
      />
      
      <div className="space-y-6">
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors duration-200 p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Symptoms</h3>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-transparent transition-colors duration-200 mb-4"
            rows={6}
            placeholder="Enter patient symptoms..."
          />
          
          <button
            onClick={handleSave}
            disabled={!symptoms}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#4f46e5] text-white hover:bg-[#4f46e5]/90 focus:ring-[#4f46e5]/50 w-full"
          >
            Save Diagnosis
          </button>
        </div>

        {aiInsights ? (
          <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors duration-200 p-6 backdrop-blur-sm bg-white/80">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-[#4f46e5] mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">AI Insights</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Potential Conditions
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {aiInsights.potentialConditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Recommendations
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {aiInsights.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragging
                    ? 'border-[#4f46e5] bg-[#4f46e5]/5'
                    : 'border-gray-200 hover:border-[#4f46e5]'
                }`}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or{' '}
                  <button className="text-[#4f46e5] hover:text-[#4f46e5]/80">
                    browse
                  </button>
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors duration-200 p-6 backdrop-blur-sm bg-white/80">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragging
                    ? 'border-[#4f46e5] bg-[#4f46e5]/5'
                    : 'border-gray-200 hover:border-[#4f46e5]'
                }`}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or{' '}
                  <button className="text-[#4f46e5] hover:text-[#4f46e5]/80">
                    browse
                  </button>
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosisPage;