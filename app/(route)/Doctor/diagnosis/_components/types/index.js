// Define the Patient interface
const Patient = {
  name: '',
  age: 0,
  gender: '',
  id: ''
};

// Define the Diagnosis interface
const Diagnosis = {
  symptoms: '',
  doctorNotes: '',
  files: [],
  aiInsights: {
    potentialConditions: [],
    recommendations: []
  }
};

// Define the Medication interface
const Medication = {
  id: '',
  name: '',
  frequency: '',
  duration: '',
  confirmed: false
};