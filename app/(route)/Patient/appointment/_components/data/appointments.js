// Sample appointment data
export const appointments = {
  upcoming: [
    {
      date: '2024-03-20',
      time: '10:00 AM',
      doctor: 'Sarah Johnson',
      location: 'Main Clinic - Room 204',
      type: 'General Checkup',
      status: 'upcoming',
    },
    {
      date: '2024-03-25',
      time: '2:30 PM',
      doctor: 'Michael Chen',
      location: 'Specialist Center - Room 105',
      type: 'Cardiology Consultation',
      status: 'upcoming',
    },
  ],
  past: [
    {
      date: '2024-02-15',
      time: '11:00 AM',
      doctor: 'Emily Wilson',
      location: 'Main Clinic - Room 101',
      type: 'Follow-up',
      status: 'completed',
      notes: 'Blood pressure normal. Follow-up in 3 months.',
    },
    {
      date: '2024-01-30',
      time: '3:00 PM',
      doctor: 'Robert Brown',
      location: 'Specialist Center - Room 303',
      type: 'Specialist Consultation',
      status: 'completed',
      notes: 'Prescribed new medication. Monitor symptoms.',
    },
  ],
};
