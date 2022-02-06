import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { Picker } from '@react-native-picker/picker';

import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

import Items from '../../Constants/sectors';
import ServiceCommerce from '../../Constants/Services';
import { ILocation } from '../../Types/types';

import {
  Button,
  CompanyIcon,
  ConsumerIcon,
  Container,
  Content,
  Input,
  InputBlock,
  InputBlockText,
  Row,
  TypeBlock,
  TypeText,
  ButtonText,
  Form,
  LinkText,
  Link,
  InputL,
  PhoneIcon,
  AccountIcon,
  CepIcon,
  LockIcon,
  LockOpenIcon,
  AdressIcon,
  AccountPlusIcon,
  MinInput,
  styles,
  StoreIcon,
  RoadIcon,
  CityIcon,
  Btn,
} from './styles';
import { Alert, TextInput } from 'react-native';
import api from '../../services/api';
import { getUser } from '../../utils/getUser';
import { getToken } from '../../utils/getToken';

interface IUser {
  id?: string;
  coords?: number[];
  token: string;
  company_id: string;
}

const codes = [
  'O número de telefone informado já está cadastrado, utilize outro',
  'Ocorreu um problema no servidor',
];

const Register: React.FC = () => {
  const type1 = 'company';
  const type2 = 'consumer';

  const [type, setType] = useState(type2);
  const [zipCode, setZipCode] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [segment, setSegment] = useState(Items[0].value);
  const [lock, setLock] = useState(true);

  const navigation = useNavigation();

  const nameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const neighborhoodRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);

  const getAdress = async (zipcode: string) => {
    try {
      if (zipcode.length !== 8) {
        return;
      }
      const { data }: ILocation = await axios.get(
        `https://buscacepinter.correios.com.br/app/endereco/carrega-cep-endereco.php?endereco=${zipcode}&tipoCEP=ALL`,
      );

      setStreet(data.dados[0].logradouroDNEC);
      setNeighborhood(data.dados[0].bairro);
      setCity(data.dados[0].localidade);
      setState(data.dados[0].uf);
    } catch (err) {
      return;
    }
  };

  const handleRegister = async () => {
    if (!name) {
      return nameRef.current?.focus();
    }
    if (!phone || phone.length < 11) {
      return phoneRef.current?.focus();
    }
    if (!password) {
      return passRef.current?.focus();
    }
    if (type === 'company') {
      if (!zipCode) {
        return zipCodeRef.current?.focus();
      }
      if (!street) {
        return streetRef.current?.focus();
      }
      if (!number) {
        return numberRef.current?.focus();
      }
      if (!neighborhood) {
        return neighborhoodRef.current?.focus();
      }
      if (!city) {
        return cityRef.current?.focus();
      }
      if (!state) {
        return stateRef.current?.focus();
      }
    }

    return await RegisterFC();
  };

  const RegisterFC = async () => {
    try {
      const firebase_token = await getToken();
      const data = {
        type,
        firebase_token,
        name,
        phone,
        password,
        segment,
        zip_code: zipCode,
        state,
        street,
        number,
        city,
        neighborhood,
      };
      const response = await api.post<IUser>('/register', data);

      if (response.data.id) {
        if (segment === 'commerce') {
          ServiceCommerce.map(async item => {
            await api.post('/service', item, {
              headers: {
                companyId: response.data.company_id,
                userId: response.data.id,
                Authorization: 'Bearer ' + response.data.token,
              },
            });
          });
          return navigation.navigate('Logon', { phone });
        } else {
          return navigation.navigate('Logon', { phone });
        }
      }
    } catch (err) {
      let pc = String(err).length - 3;
      let code = String(err).substr(pc, 3);
      if (code === '406') {
        return Alert.alert('Erro: 406', codes[0]);
      }
      if (code === '500') {
        return Alert.alert('Erro: 500', codes[1]);
      }
      return Alert.alert('Erro', 'Verifique as credenciais e tente novamente');
    }
  };

  useEffect(() => {
    getUser(navigation);
  }, [navigation]);

  return (
    <Container>
      <Header title="Cadastro" rl={false} />
      <Form>
        <Content>
          <InputBlock>
            <InputBlockText>Tipo de conta</InputBlockText>
            <Row>
              <TypeBlock
                onPress={() => setType(type1)}
                selected={type === type1}
                enabled={true}
              >
                <CompanyIcon />
                <TypeText>Empresa</TypeText>
              </TypeBlock>
              <TypeBlock
                name={type2}
                onPress={() => setType(type2)}
                selected={type === type2}
                enabled={true}
              >
                <ConsumerIcon />
                <TypeText>Consumidor</TypeText>
              </TypeBlock>
            </Row>
          </InputBlock>
          <InputBlock>
            <InputBlockText>
              {type === 'company' ? 'Nome da empresa' : 'Nome'}
            </InputBlockText>
            <InputL>
              {type === 'company' && <StoreIcon />}
              {type === 'consumer' && <AccountIcon />}
              <Input
                ref={nameRef}
                placeholder={
                  type === 'company'
                    ? 'Digite o nome da empresa'
                    : 'Digite o seu nome'
                }
                onChangeText={setName}
                value={name}
                maxLength={100}
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
            </InputL>
          </InputBlock>
          <InputBlock>
            <InputBlockText>Celular</InputBlockText>
            <InputL>
              <PhoneIcon />
              <Input
                ref={phoneRef}
                placeholder="9699999999999"
                keyboardType="numeric"
                maxLength={11}
                textContentType="telephoneNumber"
                onChangeText={setPhone}
                onSubmitEditing={() =>
                  type === 'company'
                    ? zipCodeRef.current?.focus()
                    : passRef.current?.focus()
                }
                value={phone}
              />
            </InputL>
          </InputBlock>
          {type === type1 && (
            <>
              <InputBlock>
                <InputBlockText>Atividade Econômica</InputBlockText>
                <Picker
                  focusable={true}
                  style={styles.picker}
                  mode="dialog"
                  numberOfLines={2}
                  onValueChange={setSegment}
                  selectedValue={segment}
                >
                  {Items.map(item => (
                    <Picker.Item
                      color="#7159c1"
                      style={styles.picker}
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Picker>
              </InputBlock>
              <InputBlock>
                <InputBlockText>CEP</InputBlockText>
                <InputL>
                  <CepIcon />
                  <Input
                    ref={zipCodeRef}
                    placeholder="00000000"
                    textContentType="postalCode"
                    keyboardType="numeric"
                    maxLength={8}
                    onSubmitEditing={() => streetRef.current?.focus()}
                    onBlur={() => getAdress(zipCode)}
                    onChangeText={text => {
                      setZipCode(text);
                      if (text.length === 8) {
                        getAdress(text);
                      }
                    }}
                    value={zipCode}
                  />
                </InputL>
              </InputBlock>
              <InputBlock>
                <InputBlockText>Endereço</InputBlockText>
                <InputL>
                  <RoadIcon />
                  <Input
                    placeholder="Rua"
                    value={street}
                    onChangeText={setStreet}
                    autoCapitalize="words"
                    ref={streetRef}
                    onSubmitEditing={() => numberRef.current?.focus()}
                    textContentType="streetAddressLine1"
                  />
                  <MinInput
                    ref={numberRef}
                    placeholder="Nº"
                    value={number}
                    onChangeText={setNumber}
                    onSubmitEditing={() => neighborhoodRef.current?.focus()}
                    keyboardType="numeric"
                  />
                </InputL>
                <InputL>
                  <AdressIcon />
                  <Input
                    ref={neighborhoodRef}
                    placeholder="Bairro"
                    autoCapitalize="words"
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                    onSubmitEditing={() => cityRef.current?.focus()}
                  />
                </InputL>
                <InputL>
                  <CityIcon />
                  <Input
                    ref={cityRef}
                    placeholder="Cidade"
                    value={city}
                    onChangeText={setCity}
                    onSubmitEditing={() => stateRef.current?.focus()}
                  />
                  <MinInput
                    ref={stateRef}
                    placeholder="UF"
                    value={state}
                    autoCapitalize="characters"
                    onChangeText={setState}
                    onSubmitEditing={() => passRef.current?.focus()}
                    textContentType="addressState"
                  />
                </InputL>
              </InputBlock>
            </>
          )}
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
                onChangeText={setPassword}
              />
            </InputL>
          </InputBlock>
          <Button onPress={handleRegister}>
            <ButtonText>Cadastrar</ButtonText>
            <AccountPlusIcon />
          </Button>
          <Link onPress={() => navigation.navigate('Logon')}>
            <LinkText>Já possui uma conta? Acesse aqui</LinkText>
          </Link>
        </Content>
      </Form>
    </Container>
  );
};

export default Register;
