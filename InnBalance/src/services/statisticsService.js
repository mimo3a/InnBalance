import * as backend from '@/src/api/statisticsApi';
import * as local from '@/src/services/localStatisticsService';

const USE_BACKEND = true; // ← один флаг

export function getSessions() {
  return USE_BACKEND ? backend.getSessions() : local.getSessions();
}

export function saveSession(session) {
  return USE_BACKEND
    ? backend.saveSession(session)
    : local.saveSession(session);
}

export function getSummary() {
  return USE_BACKEND
    ? backend.getSummary()
    : null; // или local.getSummary()
}
