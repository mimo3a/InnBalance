import * as backend from '@/src/api/statisticsApi';
import * as local from '@/src/services/localStatisticsService';

const USE_BACKEND = true; // ← один флаг

export async function getSessions() {
  // Попробуем получить данные с сервера, если не получится, вернем локальные данные.
  if (!USE_BACKEND) {
    return local.getSessions();
  }

  // Если сервер недоступен или вернул пустые данные, вернем локальные данные.
  try {
    const data = await backend.getSessions();
    if (!data || data.length === 0) {
      return local.getSessions();
    }
    return data;
  } catch {
    return local.getSessions();
  }
}

export async function saveSession(session) {
  // Попробуем сохранить данные на сервере, если не получится, сохраним локально.
  if (!USE_BACKEND) {
    return local.saveSession(session);
  }

  // Если сервер недоступен, сохраним данные локально.
  try {
    return await backend.saveSession(session);
  } catch {
    return local.saveSession(session);
  }
}

export async function getSummary() {
  if (!USE_BACKEND) {
    return null; // если сервер недоступен, вернем null
  }

  try {
    return await backend.getSummary();
  } catch {
    return null;
  }
}
