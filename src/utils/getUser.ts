import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { IData } from '../Types/types';

interface IUser {
  token: string;
  account: IData;
}

export async function getUser(navigation: NavigationProp<ParamListBase>) {
  const saved = await AsyncStorage.getItem('user');
  if (saved) {
    const savedDate = await AsyncStorage.getItem('date');
    const date = new Date(JSON.parse(savedDate!));
    const user: IUser = JSON.parse(saved);
    if (date < new Date()) {
      return navigation.navigate('Logon', { phone: user.account.phone });
    }
    return navigation.navigate(
      user.account.type === 'company' ? 'Company' : 'Home',
      {
        user,
      },
    );
  }
}
