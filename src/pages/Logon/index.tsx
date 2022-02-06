import React, { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import api from '../../services/api';
import { IData } from '../../Types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Button,
  Container,
  Input,
  InputL,
  PhoneIcon,
  LockIcon,
  InputBlock,
  InputBlockText,
  ButtonText,
  Form,
  Link,
  LinkText,
  LockOpenIcon,
  Btn,
} from '../Register/styles';

import { LogIcon, Scroll } from './styles';
import { Alert, TextInput } from 'react-native';
import { RouteProps } from '../../routes';

interface IResponse {
  account: IData;
  token: string;
}

const Logon: React.FC = () => {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [lock, setLock] = useState(true);
  const navigation = useNavigation();
  const { params } = useRoute<RouteProps<'Logon'>>();

  const phoneRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);

  const handleLogon = async () => {
    try {
      if (!phone) {
        return phoneRef.current?.focus();
      }
      if (!password) {
        return passRef.current?.focus();
      }

      const response = await api.post<IResponse>('/session', {
        phone,
        password,
      });

      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      const date = new Date().setDate(new Date().getDate() + 7);
      await AsyncStorage.setItem('date', JSON.stringify(date));
      if (response.data.account.type === 'consumer') {
        return navigation.navigate('Home', { user: response.data });
      }

      return navigation.navigate('Company', { user: response.data });
    } catch (err) {
      return Alert.alert(
        'Erro de acesso',
        'Verifique as credenciais e tente novamente',
      );
    }
  };

  useEffect(() => {
    if (params && params.phone) {
      setPhone(params.phone);
      passRef.current?.focus();
    }
  }, [params]);

  return (
    <Container>
      <Header title="Acesso" rl={false} />
      <Form>
        <Scroll>
          <InputBlock>
            <InputBlockText>Celular</InputBlockText>
            <InputL>
              <PhoneIcon />
              <Input
                ref={phoneRef}
                maxLength={11}
                placeholder="9699999999999"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                onChangeText={setPhone}
                value={phone}
                onSubmitEditing={() => passRef.current?.focus()}
              />
            </InputL>
          </InputBlock>
          <InputBlock>
            <InputBlockText>Senha</InputBlockText>
            <InputL>
              <Btn onPress={() => setLock(!lock)}>
                {lock === true && <LockIcon />}
                {lock === false && <LockOpenIcon />}
              </Btn>
              <Input
                ref={passRef}
                placeholder="*********"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={lock}
                value={password}
                maxLength={25}
                onChangeText={setPassword}
              />
            </InputL>
          </InputBlock>
          <Button onPress={handleLogon}>
            <ButtonText>Acessar</ButtonText>
            <LogIcon />
          </Button>
          <Link onPress={() => navigation.navigate('Register')}>
            <LinkText>Ainda não é cadastrado?</LinkText>
          </Link>
        </Scroll>
      </Form>
    </Container>
  );
};

export default Logon;
