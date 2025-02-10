// Doctor interface
export const Doctor = {
  id: '',
  name: '',
  specialization: '',
  imageUrl: '',
};

// Appointment interface
export const Appointment = {
  id: '',
  date: '',
  time: '',
  doctor: { ...Doctor },
  location: '',
  type: '',
  mode: 'in-person', // or 'telehealth'
  status: 'confirmed', // or 'pending', 'rescheduled', 'completed'
  notes: '',
  prescription: '',
  followUpInstructions: '',
  rating: 0,
  feedback: '',
};
