import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import axios from 'axios';

import { Center, Title } from '../../pages/Company/styles';
import {
  CepIcon,
  Input,
  InputBlock,
  InputBlockText,
  MinInput,
  RoadIcon,
  AdressIcon,
  CityIcon,
  ButtonText,
} from '../../pages/Register/styles';

import {
  Btn,
  Container,
  Form,
  Line,
  ModalView,
  Link,
  LinkText,
} from './styles';

import { IAddress, ILocation } from '../../Types/types';
import api from '../../services/api';
import { formatAddress } from '../../utils/formatAddres';
import { getSavedUser, saveUser } from '../../utils/storage';

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  user: {
    token: string;
    userId: string;
  };
}

const AddressModal: React.FC<IProps> = ({
  visible = false,
  user,
  setAddress,
  setVisible,
}) => {
  const [postalCode, setPostalCode] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const streetRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const neighborhoodRef = useRef<TextInput>(null);

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

  const handleAddress = async () => {
    try {
      if (!postalCode) {
        return codeRef.current?.focus();
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

      const data: IAddress = {
        account_id: user.userId,
        city,
        neighborhood,
        number: Number(number),
        state,
        street,
        zip_code: postalCode,
        coords: [0, 0],
      };

      await api.post('address', data, {
        headers: {
          userId: user.userId,
          Authorization: 'Bearer ' + user.token,
        },
      });

      setAddress(formatAddress(data));
      return setVisible(false);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    const getSavedAddress = async () => {
      try {
        const response = await api.get<IAddress[]>(`/address/${user.userId}`, {
          headers: {
            userId: user.userId,
            Authorization: 'Bearer ' + user.token,
          },
        });

        if (response.data.length > 0) {
          const result = await getSavedUser();
          result.account.address = response.data[0];
          await saveUser(result);
          setAddress(formatAddress(response.data[0]));
          setVisible(false);
        }
        return;
      } catch (err) {
        return console.log(err);
      }
    };
    getSavedAddress();
  }, [setAddress, setVisible, user.token, user.userId]);

  return (
    <ModalView visible={visible}>
      <Container>
        <Form>
          <Center>
            <Title>Adicionar endereço</Title>
          </Center>

          <InputBlock>
            <InputBlockText>CEP</InputBlockText>
            <Line>
              <CepIcon />
              <Input
                ref={codeRef}
                onSubmitEditing={() => numberRef.current?.focus()}
                placeholder="00000000"
                keyboardType="numeric"
                textContentType="postalCode"
                maxLength={8}
                value={postalCode}
                onBlur={() => getAdress(postalCode)}
                onChangeText={text => {
                  setPostalCode(text);
                  if (text.length === 8) {
                    getAdress(text);
                  }
                }}
              />
              <MinInput
                ref={numberRef}
                onSubmitEditing={() => streetRef.current?.focus()}
                placeholder="Nº"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
              />
            </Line>
          </InputBlock>
          <InputBlock>
            <InputBlockText>Endereço</InputBlockText>
            <Line>
              <RoadIcon />
              <Input
                placeholder="Rua"
                value={street}
                onChangeText={setStreet}
                autoCapitalize="words"
                ref={streetRef}
                onSubmitEditing={() => neighborhoodRef.current?.focus()}
                textContentType="streetAddressLine1"
              />
            </Line>
            <Line>
              <AdressIcon />
              <Input
                ref={neighborhoodRef}
                placeholder="Bairro"
                autoCapitalize="words"
                value={neighborhood}
                onChangeText={setNeighborhood}
                onSubmitEditing={() => cityRef.current?.focus()}
              />
            </Line>
            <Line>
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
                textContentType="addressState"
              />
            </Line>
          </InputBlock>
          <Btn onPress={handleAddress} activeOpacity={0.6}>
            <ButtonText>Adicionar</ButtonText>
          </Btn>
          <Link onPress={() => setVisible(false)}>
            <LinkText>Cancelar</LinkText>
          </Link>
        </Form>
      </Container>
    </ModalView>
  );
};

export default AddressModal;
