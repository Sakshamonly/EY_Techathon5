"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../@/components/ui/card';
import { Alert, AlertDescription } from '../../../../@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../@/components/ui/dialog";
import { Mic, Plus, Download, History, Search, X, Brain, Clock, ArrowRight } from 'lucide-react';

const AIPrescriptionGenerator = () => {
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [showMedicineSearch, setShowMedicineSearch] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated medicine database
  const medicineDatabase = [
    {
      id: 1,
      name: 'Lisinopril',
      category: 'ACE Inhibitor',
      commonDosages: ['5mg', '10mg', '20mg'],
      frequencies: ['Once daily', 'Twice daily'],
      interactions: ['ACE inhibitors', 'Potassium supplements'],
      aiConfidence: 0.92,
      aiReason: 'Commonly prescribed for hypertension with patient profile'
    },
    {
      id: 2,
      name: 'Metformin',
      category: 'Biguanide',
      commonDosages: ['500mg', '850mg', '1000mg'],
      frequencies: ['Once daily', 'Twice daily', 'Three times daily'],
      interactions: ['Alcohol', 'Iodinated contrast materials'],
      aiConfidence: 0.88,
      aiReason: 'Effective for type 2 diabetes management'
    }
  ];

  // Simulated past prescriptions
  const pastPrescriptions = [
    {
      id: 1,
      date: '2024-03-15',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
      ],
      diagnosis: 'Hypertension, Type 2 Diabetes',
      aiInsights: 'Patient showed positive response to medication combination'
    }
  ];

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulated voice recognition
    setTimeout(() => {
      setVoiceInput("Patient presents with elevated blood pressure...");
      setIsListening(false);
      // Simulate AI processing
      setAiSuggestions([
        {
          name: 'Lisinopril',
          confidence: 0.92,
          reason: 'Based on symptoms and patient history'
        }
      ]);
    }, 2000);
  };

  const generatePrescription = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">E-Prescription</h2>
        <p className="text-gray-600">Medicare Pro Clinic</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Patient: John Doe</p>
          <p className="text-gray-600">ID: P12345</p>
        </div>
        <div className="text-right">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Rx#: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Prescribed Medications:</h3>
        {selectedMedicines.map((med, idx) => (
          <div key={idx} className="pl-4 border-l-2 border-blue-500">
            <p className="font-medium">{med.name} {med.dosage}</p>
            <p className="text-gray-600">Frequency: {med.frequency}</p>
            <p className="text-gray-600">Duration: {med.duration}</p>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t mt-6">
        <p className="font-semibold">Dr. Sarah Johnson</p>
        <p className="text-gray-600">License #: MD12345</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New Prescription</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Create Prescription</span>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowPrescription(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate E-Prescription
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name: John Doe</p>
                      <p className="text-sm text-gray-600">Age: 45</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ID: P12345</p>
                      <p className="text-sm text-gray-600">Blood Type: O+</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    className="w-full p-4 border rounded-lg min-h-[100px] pr-12"
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    placeholder="Enter patient symptoms and notes..."
                  />
                  <button
                    onClick={handleVoiceInput}
                    className={`absolute right-2 top-2 p-2 rounded-full ${
                      isListening ? 'bg-red-500' : 'bg-blue-500'
                    } text-white`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                </div>

                {aiSuggestions.length > 0 && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-medium mb-4 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-blue-500" />
                      AI Recommendations
                    </h3>
                    <div className="space-y-4">
                      {aiSuggestions.map((drug, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-medium text-lg">{drug.name}</span>
                              <p className="text-sm text-gray-600">{drug.reason}</p>
                            </div>
                            <span className="text-sm bg-blue-100 px-2 py-1 rounded-full">
                              {Math.round(drug.confidence * 100)}% confidence
                            </span>
                          </div>
                          <button
                            onClick={() => setShowMedicineSearch(true)}
                            className="mt-2 text-blue-500 text-sm hover:underline"
                          >
                            View Details & Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Selected Medicines</h3>
                    <button
                      onClick={() => setShowMedicineSearch(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Medicine
                    </button>
                  </div>
                  
                  {selectedMedicines.map((medicine, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{medicine.name}</h4>
                          <p className="text-sm text-gray-600">{medicine.category}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedMedicines(selectedMedicines.filter((_, i) => i !== index));
                          }}
                          className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <select className="border rounded-lg p-2">
                          {medicine.commonDosages.map((dosage) => (
                            <option key={dosage} value={dosage}>{dosage}</option>
                          ))}
                        </select>
                        <select className="border rounded-lg p-2">
                          {medicine.frequencies.map((freq) => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Search past prescriptions..."
                />
              </div>
              <div className="space-y-4">
                {pastPrescriptions.map((prescription, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="font-medium">{prescription.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{prescription.diagnosis}</p>
                      </div>
                      <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {prescription.medications.map((med, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          • {med.name} {med.dosage} - {med.frequency}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-start">
                        <Brain className="h-4 w-4 mr-2 text-blue-500 mt-1" />
                        <p className="text-sm text-gray-600">{prescription.aiInsights}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showMedicineSearch} onOpenChange={setShowMedicineSearch}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Search Medicines</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or category..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {medicineDatabase.map((medicine) => (
                <div
                  key={medicine.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedMedicines([...selectedMedicines, medicine]);
                    setShowMedicineSearch(false);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{medicine.name}</h4>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                    </div>
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded-full">
                      {Math.round(medicine.aiConfidence * 100)}% match
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Common dosages: {medicine.commonDosages.join(', ')}</p>
                    <p>Interactions: {medicine.interactions.join(', ')}</p>
                    <p className="mt-2 text-sm text-blue-600">
                      <span className="font-medium">AI Insight:</span> {medicine.aiReason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrescription} onOpenChange={setShowPrescription}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>E-Prescription Preview</span>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
                onClick={() => {/* Download logic */}}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </DialogTitle>
          </DialogHeader>
          {generatePrescription()}
        </DialogContent>
      </Dialog>

      {selectedMedicines.length > 0 && (
        <Alert className="fixed bottom-4 right-4 w-auto bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            {selectedMedicines.length} medicine{selectedMedicines.length > 1 ? 's' : ''} selected
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AIPrescriptionGenerator;