// Database of symptom-specific triggers and recommendations
export const symptomData = {
  pain: {
    triggers: [
      'Poor posture',
      'Physical overexertion',
      'Lack of proper rest',
      'Dehydration',
      'Stress and tension'
    ],
    recommendations: [
      'Practice gentle stretching exercises',
      'Apply hot/cold therapy as needed',
      'Maintain proper posture',
      'Take regular breaks during activities',
      'Stay hydrated throughout the day'
    ]
  },
  mood: {
    triggers: [
      'Lack of sleep',
      'Poor nutrition',
      'High stress levels',
      'Social isolation',
      'Irregular routine'
    ],
    recommendations: [
      'Maintain a consistent sleep schedule',
      'Practice mindfulness or meditation',
      'Engage in regular physical activity',
      'Connect with friends or family',
      'Consider talking to a mental health professional'
    ]
  },
  physical: {
    triggers: [
      'Environmental allergens',
      'Weather changes',
      'Physical inactivity',
      'Poor sleep quality',
      'Dietary factors'
    ],
    recommendations: [
      'Track potential allergen exposure',
      'Maintain a balanced diet',
      'Get regular exercise',
      'Ensure adequate rest',
      'Monitor environmental factors'
    ]
  },
  other: {
    triggers: [
      'Environmental factors',
      'Lifestyle changes',
      'Daily stressors',
      'Medical conditions',
      'Medication side effects'
    ],
    recommendations: [
      'Keep a detailed symptom diary',
      'Monitor patterns and triggers',
      'Maintain regular health check-ups',
      'Follow prescribed treatment plans',
      'Communicate changes with healthcare provider'
    ]
  }
};
