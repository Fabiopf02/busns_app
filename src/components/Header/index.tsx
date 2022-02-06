import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Back,
  CartButton,
  CartIcon,
  Container,
  Count,
  Front,
  LogoutButton,
  LogoutIcon,
  Title,
} from './styles';

interface IProps {
  title: string;
  rl?: boolean;
  rr?: boolean;
  logout?: boolean;
  pcs?: boolean;
  count?: number;
  pcsFC?: () => void;
}

const Header: React.FC<IProps> = ({
  title,
  rl = true,
  rr = true,
  logout = false,
  pcs = false,
  count = 0,
  pcsFC,
}) => {
  const navigation = useNavigation();
  const logoutFC = async () => {
    await AsyncStorage.clear();
    return navigation.navigate('Logon');
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'A conta atual será desconectada, deseja continuar?', [
      { text: 'Sim', onPress: () => logoutFC() },
      { text: 'Não', onPress: () => {} },
    ]);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#33aa88" barStyle="light-content" />
      <Back rl={rl} rr={rr} />
      <Front rr={rr} rl={rl}>
        <Title>{title}</Title>
        {logout === true && (
          <LogoutButton onPress={handleLogout}>
            <LogoutIcon />
          </LogoutButton>
        )}
        {pcs === true && (
          <CartButton onPress={pcsFC}>
            <Count>{count}</Count>
            <CartIcon />
          </CartButton>
        )}
      </Front>
    </Container>
  );
};

export default Header;
