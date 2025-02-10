import { useState, useEffect } from 'react';

export function useMedications(medications) {
  const [needsRefill, setNeedsRefill] = useState([]);
  const [dueSoon, setDueSoon] = useState([]);

  useEffect(() => {
    const refillThreshold = 5; // days
    const dueThreshold = 30; // minutes

    const needsRefillMeds = medications.filter(
      med => med.remainingDoses <= refillThreshold
    );

    const dueSoonMeds = medications.filter(med => {
      const doseTime = new Date(`${new Date().toDateString()} ${med.nextDose}`);
      const timeDiff = (doseTime.getTime() - new Date().getTime()) / (1000 * 60);
      return timeDiff <= dueThreshold && timeDiff > 0;
    });

    setNeedsRefill(needsRefillMeds);
    setDueSoon(dueSoonMeds);
  }, [medications]);

  return {
    needsRefill,
    dueSoon,
  };
}
