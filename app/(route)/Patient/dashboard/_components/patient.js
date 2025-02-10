// Import the LucideIcon component (assuming your environment supports ES Modules).
import { LucideIcon } from 'lucide-react';

// Vital structure
const Vital = {
  icon: LucideIcon, // Icon component
  title: '', // string
  value: '', // string
  trend: undefined, // 'up' | 'down' | 'stable' (optional)
  unit: undefined, // string (optional)
  range: undefined, // { min: number, max: number } (optional)
};

// HealthMetric structure
const HealthMetric = {
  date: '', // string
  value: 0, // number
  notes: undefined, // string (optional)
};

// Medication structure
const Medication = {
  id: '', // string
  name: '', // string
  nextDose: '', // string
  instructions: '', // string
  schedule: '', // string
  remainingDoses: 0, // number
  refillDate: undefined, // string (optional)
};

// Appointment structure
const Appointment = {
  id: '', // string
  date: '', // string
  time: '', // string
  doctor: '', // string
  type: '', // string
  location: undefined, // string (optional)
  notes: undefined, // string (optional)
  virtual: false, // boolean
};

// Alert structure
const Alert = {
  id: '', // string
  type: '', // 'medication' | 'appointment' | 'test' | 'general'
  severity: '', // 'low' | 'medium' | 'high'
  message: '', // string
  timestamp: '', // string
  action: undefined, // string (optional)
};

// Patient structure
const Patient = {
  id: '', // string
  name: '', // string
  nextAppointment: Appointment, // Appointment object
  vitals: {}, // Record<string, string>
  medications: [], // Array of Medication objects
  alerts: [], // Array of Alert objects
  healthMetrics: {
    bloodPressure: [], // Array of HealthMetric objects
    bloodSugar: [], // Array of HealthMetric objects
    weight: [], // Array of HealthMetric objects
    heartRate: [], // Array of HealthMetric objects
  },
};
