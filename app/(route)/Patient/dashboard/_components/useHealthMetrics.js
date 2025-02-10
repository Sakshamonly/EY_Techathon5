import { useState, useEffect } from 'react';

export function useHealthMetrics(metrics) {
  const [analysis, setAnalysis] = useState({
    current: 0,
    average: 0,
    trend: 'stable',
    percentageChange: 0,
  });

  useEffect(() => {
    if (metrics.length < 2) return;

    const values = metrics.map(m => m.value);
    const current = values[values.length - 1];
    const previous = values[values.length - 2];
    const average = values.reduce((a, b) => a + b, 0) / values.length;

    const percentageChange = ((current - previous) / previous) * 100;
    const trend = percentageChange > 1 ? 'up' : percentageChange < -1 ? 'down' : 'stable';

    setAnalysis({
      current,
      average,
      trend,
      percentageChange: Math.abs(percentageChange),
    });
  }, [metrics]);

  return analysis;
}
