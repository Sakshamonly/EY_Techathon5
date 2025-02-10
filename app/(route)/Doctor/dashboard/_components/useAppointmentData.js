import { useState, useEffect } from 'react';

interface AppointmentData {
  name: string;
  value: number;
}

export function useAppointmentData() {
  const [data, setData] = useState<AppointmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockData: AppointmentData[] = [
      { name: 'Regular Checkup', value: 45 },
      { name: 'Follow-up', value: 30 },
      { name: 'Emergency', value: 15 },
      { name: 'Consultation', value: 10 },
    ];

    setData(mockData);
    setIsLoading(false);
  }, []);

  return { data, isLoading };
}