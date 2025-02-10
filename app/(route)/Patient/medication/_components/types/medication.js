// Medication object structure
const Medication = {
  id: '', // string
  name: '', // string
  dosage: '', // string
  frequency: '', // string
  timeOfDay: ['morning', 'afternoon', 'evening'], // array of strings
  asNeeded: false, // boolean
  instructions: '', // string
  prescriptionUrl: undefined, // string (optional)
  supply: 0, // number
  nextRefillDate: '', // string
  pharmacy: '', // string
};

// DoseLog object structure
const DoseLog = {
  id: '', // string
  medicationId: '', // string
  status: 'taken', // 'taken' | 'skipped' | 'delayed'
  timestamp: '', // string
  notes: undefined, // string (optional)
};

// RefillRequest object structure
const RefillRequest = {
  id: '', // string
  medicationId: '', // string
  status: 'pending', // 'pending' | 'approved' | 'in-progress' | 'delivered'
  requestDate: '', // string
  estimatedDelivery: undefined, // string (optional)
  pharmacy: '', // string
};
