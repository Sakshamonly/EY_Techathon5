/**
 * @typedef {Object} Symptom
 * @property {string} id
 * @property {string} name
 * @property {number} severity
 * @property {Date} timestamp
 * @property {string} notes
 * @property {'pain' | 'mood' | 'physical' | 'other'} category
 */

/**
 * @typedef {Object} DailyLog
 * @property {Date} date
 * @property {Symptom[]} symptoms
 * @property {number} overallMood
 * @property {number} painLevel
 * @property {string} notes
 */

/**
 * @typedef {Object} SymptomAnalysis
 * @property {Array<{category: string, trend: 'increasing' | 'decreasing' | 'stable', significance: number}>} trends
 * @property {string[]} triggers
 * @property {string[]} recommendations
 */
