import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../Types/types';

export async function getSavedUser() {
  const savedData = await AsyncStorage.getItem('user');
  const storage: IUser = JSON.parse(savedData!);
  return storage;
}

export async function saveUser(data: IUser) {
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return;
}
