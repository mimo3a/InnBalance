import { api } from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email, password) {
  const body = { email, password };
  await AsyncStorage.clear();

  console.log("LOGIN BODY:", body);   // ← ВОТ СЮДА

  const res = await api.post('/auth/login', body);

  await AsyncStorage.setItem('token', res.token);
  await AsyncStorage.setItem('username', res.username);

  return res;
}

export async function signup(username, email, password) {
  const res = await api.post('/auth/signup', {
    username,
    email,
    password,
  });

  await AsyncStorage.setItem('token', res.token);
  await AsyncStorage.setItem('username', res.username);

  return res;
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('username');
}
