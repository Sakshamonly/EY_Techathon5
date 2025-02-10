// Patient
const Patient = {
  id: '',
  name: '',
  treatmentDate: '',
  location: '',
  disease: '',
  remarks: '',
  age: 0,
  gender: 'male', // or 'female', 'other'
};

// LocationData
const LocationData = {
  id: '',
  name: '',
  coordinates: [0, 0], // [latitude, longitude]
  patientsCount: 0,
  topDisease: '',
};

// StatsData
const StatsData = {
  value: 0, // or a string
  change: 0,
  trend: 'up', // or 'down'
};

// DiseaseData
const DiseaseData = {
  name: '',
  value: 0,
};

// DemographicData
const DemographicData = {
  label: '',
  value: 0,
};
