import { symptomData } from './symptomDatabase';

/**
 * Analyzes symptoms to generate trends, triggers, and recommendations.
 * @param {Symptom[]} symptoms - The list of symptoms.
 * @returns {Object|null} - An analysis object or null if no symptoms provided.
 */
export function analyzeSymptoms(symptoms) {
  if (symptoms.length === 0) {
    return null;
  }

  // Get the most recent symptom
  const latestSymptom = symptoms[0];
  const category = latestSymptom.category;

  // Get category-specific data
  const { triggers, recommendations } = symptomData[category];

  // Calculate trends based on symptoms history
  const trends = calculateTrends(symptoms);

  return {
    trends,
    triggers,
    recommendations
  };
}

/**
 * Calculates trends based on the symptoms.
 * @param {Symptom[]} symptoms - The list of symptoms.
 * @returns {Object[]} - A list of trends by category.
 */
function calculateTrends(symptoms) {
  // Group symptoms by category
  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {});

  // Calculate trends for each category
  return Object.entries(groupedSymptoms).map(([category, symptomList]) => {
    const recentSeverities = symptomList
      .slice(0, Math.min(3, symptomList.length))
      .map(s => s.severity);
    
    const trend = calculateTrend(recentSeverities);
    const significance = calculateSignificance(recentSeverities);

    // Map category to a more readable format
    const categoryDisplay = {
      pain: 'Pain Symptoms',
      mood: 'Mood Changes',
      physical: 'Physical Symptoms',
      other: 'Other Symptoms'
    }[category];

    return {
      category: categoryDisplay,
      trend,
      significance
    };
  });
}

/**
 * Calculates the trend of severities.
 * @param {number[]} severities - A list of severity values.
 * @returns {'increasing' | 'decreasing' | 'stable'} - The calculated trend.
 */
function calculateTrend(severities) {
  if (severities.length < 2) return 'stable';
  
  const diff = severities[0] - severities[severities.length - 1];
  if (diff > 1) return 'increasing';
  if (diff < -1) return 'decreasing';
  return 'stable';
}

/**
 * Calculates the significance of severity trends.
 * @param {number[]} severities - A list of severity values.
 * @returns {number} - The calculated significance (between 0 and 1).
 */
function calculateSignificance(severities) {
  const avg = severities.reduce((sum, severity) => sum + severity, 0) / severities.length;
  return Math.min(Math.max(avg / 10, 0), 1);
}
