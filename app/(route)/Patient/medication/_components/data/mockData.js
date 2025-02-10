import { Medication } from '../types/medication';

export const initialMedications = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'daily',
    timeOfDay: ['morning'],
    asNeeded: false,
    instructions: 'Take with food',
    supply: 15,
    nextRefillDate: '2024-03-30',
    pharmacy: 'CVS Pharmacy'
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'as needed',
    timeOfDay: ['morning', 'evening'],
    asNeeded: true,
    instructions: 'Take with food for pain',
    supply: 30,
    nextRefillDate: '2024-04-15',
    pharmacy: 'Walgreens'
  }
];