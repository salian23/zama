// Returns a lighting/greeting palette based on the visitor's local hour, so
// the hero subtly matches their time of day — cool and bright in the morning,
// warm and candlelit at night.
export function getTimeOfDay(date = new Date()) {
  const h = date.getHours()

  if (h >= 5 && h < 11) {
    return {
      phase: 'morning',
      greeting: 'A quiet morning',
      ambient: { color: '#a9c39a', intensity: 0.55 },
      key: { color: '#f6eccf', intensity: 1.7 },
      rim: { color: '#6d9a5a', intensity: 1.2 },
      warm: { color: '#f0d49a', intensity: 0.55 },
      fog: 0.06,
    }
  }
  if (h >= 11 && h < 16) {
    return {
      phase: 'day',
      greeting: 'A golden afternoon',
      ambient: { color: '#9fb98c', intensity: 0.5 },
      key: { color: '#f4d9a0', intensity: 1.9 },
      rim: { color: '#5c7d43', intensity: 1.3 },
      warm: { color: '#e3ba69', intensity: 0.7 },
      fog: 0.066,
    }
  }
  if (h >= 16 && h < 20) {
    return {
      phase: 'evening',
      greeting: 'A slow evening',
      ambient: { color: '#8a9575', intensity: 0.42 },
      key: { color: '#eab878', intensity: 1.7 },
      rim: { color: '#4c6636', intensity: 1.2 },
      warm: { color: '#e0a860', intensity: 0.85 },
      fog: 0.072,
    }
  }
  return {
    phase: 'night',
    greeting: 'A still night',
    ambient: { color: '#6f7d63', intensity: 0.3 },
    key: { color: '#e2a862', intensity: 1.35 },
    rim: { color: '#3c5230', intensity: 1.0 },
    warm: { color: '#d99a4e', intensity: 0.95 },
    fog: 0.082,
  }
}
