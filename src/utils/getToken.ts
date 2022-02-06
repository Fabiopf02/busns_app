import messaging from '@react-native-firebase/messaging';
import api from '../services/api';
import { getSavedUser } from './storage';

export async function getToken() {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token;
  } catch (err) {
    return console.log(err);
  }
}

export function onRefresh() {
  try {
    return messaging().onTokenRefresh(async firebase_token => {
      const user = await getSavedUser();
      await api.put(
        '/account',
        { firebase_token },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
            userId: user.account.id,
          },
        },
      );
    });
  } catch (err) {
    return console.log(err);
  }
}
