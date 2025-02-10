import { Patient, LocationData } from '../types';

export const patients = [
  {
    id: '1',
    name: 'John Doe',
    treatmentDate: '2024-03-10',
    location: 'New York City',
    disease: 'Influenza',
    remarks: 'Prescribed antiviral medication',
    age: 35,
    gender: 'male'
  },
  {
    id: '2',
    name: 'Jane Smith',
    treatmentDate: '2024-03-09',
    location: 'Boston',
    disease: 'Hypertension',
    remarks: 'Regular checkup, medication adjusted',
    age: 45,
    gender: 'female'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    treatmentDate: '2024-03-08',
    location: 'Chicago',
    disease: 'Diabetes',
    remarks: 'Insulin dosage adjusted, diet plan updated',
    age: 52,
    gender: 'male'
  },
  {
    id: '4',
    name: 'Emily Davis',
    treatmentDate: '2024-03-07',
    location: 'Los Angeles',
    disease: 'Asthma',
    remarks: 'New inhaler prescribed, follow-up in 2 weeks',
    age: 28,
    gender: 'female'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    treatmentDate: '2024-03-06',
    location: 'Houston',
    disease: 'Arthritis',
    remarks: 'Physical therapy recommended, pain management',
    age: 63,
    gender: 'male'
  },
  {
    id: '6',
    name: 'Sarah Brown',
    treatmentDate: '2024-03-05',
    location: 'Phoenix',
    disease: 'Migraine',
    remarks: 'New medication prescribed, lifestyle changes discussed',
    age: 39,
    gender: 'female'
  },
  {
    id: '7',
    name: 'David Miller',
    treatmentDate: '2024-03-04',
    location: 'Philadelphia',
    disease: 'Anxiety',
    remarks: 'Therapy sessions scheduled, medication review',
    age: 31,
    gender: 'male'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    treatmentDate: '2024-03-03',
    location: 'San Diego',
    disease: 'Depression',
    remarks: 'Treatment plan adjusted, follow-up in 1 week',
    age: 42,
    gender: 'female'
  }
];

export const locations = [
  {
    id: '1',
    name: 'New York City',
    coordinates: [40.7128, -74.0060],
    patientsCount: 150,
    topDisease: 'Influenza'
  },
  {
    id: '2',
    name: 'Boston',
    coordinates: [42.3601, -71.0589],
    patientsCount: 120,
    topDisease: 'Hypertension'
  },
  {
    id: '3',
    name: 'Chicago',
    coordinates: [41.8781, -87.6298],
    patientsCount: 135,
    topDisease: 'Diabetes'
  },
  {
    id: '4',
    name: 'Los Angeles',
    coordinates: [34.0522, -118.2437],
    patientsCount: 145,
    topDisease: 'Asthma'
  },
  {
    id: '5',
    name: 'Houston',
    coordinates: [29.7604, -95.3698],
    patientsCount: 110,
    topDisease: 'Arthritis'
  }
];

export const diseaseStats = [
  { name: 'Influenza', value: 35 },
  { name: 'Hypertension', value: 25 },
  { name: 'Diabetes', value: 20 },
  { name: 'Asthma', value: 15 },
  { name: 'Others', value: 5 }
];