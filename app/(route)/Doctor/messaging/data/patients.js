export const patients = [
  { 
    id: 1, 
    name: 'John Smith', 
    lastMessage: 'The new medication is working well', 
    time: '10:30 AM', 
    unread: 2,
    age: 45,
    lastVisit: '2024-12-15',
    condition: 'Hypertension',
    nextAppointment: '2025-01-15',
    medicalHistory: 'Type 2 Diabetes, High Blood Pressure',
    status: 'critical',
    vitals: {
      bp: '140/90',
      heartRate: '78',
      temperature: '98.6°F',
      oxygenSaturation: '98%'
    },
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    starred: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    lastMessage: 'Thank you for the prescription',
    time: '09:45 AM',
    unread: 0,
    age: 32,
    lastVisit: '2024-12-10',
    condition: 'Asthma',
    nextAppointment: '2025-01-20',
    status: 'stable',
    vitals: {
      bp: '120/80',
      heartRate: '72',
      temperature: '98.4°F',
      oxygenSaturation: '97%'
    },
    medications: [
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' }
    ],
    starred: false
  },
  {
    id: 3,
    name: 'Michael Brown',
    lastMessage: 'When should I come for follow-up?',
    time: 'Yesterday',
    unread: 1,
    age: 58,
    lastVisit: '2024-12-05',
    condition: 'Arthritis',
    status: 'stable',
    vitals: {
      bp: '130/85',
      heartRate: '75',
      temperature: '98.7°F',
      oxygenSaturation: '99%'
    },
    starred: true
  },
  {
    id: 4,
    name: 'Emily Davis',
    lastMessage: 'Having severe chest pain',
    time: '08:15 AM',
    unread: 3,
    age: 50,
    lastVisit: '2024-12-01',
    condition: 'Angina',
    status: 'critical',
    vitals: {
      bp: '150/95',
      heartRate: '88',
      temperature: '99.1°F',
      oxygenSaturation: '95%'
    },
    starred: true
  },
  {
    id: 5,
    name: 'Robert Wilson',
    lastMessage: 'Blood sugar levels are normal now',
    time: 'Yesterday',
    unread: 0,
    age: 42,
    lastVisit: '2024-11-28',
    condition: 'Diabetes',
    status: 'stable',
    vitals: {
      bp: '125/82',
      heartRate: '70',
      temperature: '98.5°F',
      oxygenSaturation: '98%'
    },
    starred: false
  }
];