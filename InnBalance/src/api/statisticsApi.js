import { api } from './apiClient';

export function getSessions() {
  return api.get('/statistics/sessions');
}

export function saveSession(session) {
  return api.post('/statistics/sessions', {
    exerciseType: session.state,
    duration: session.duration,
  });
}

export function getSummary() {
  return api.get('/statistics/summary');
}
