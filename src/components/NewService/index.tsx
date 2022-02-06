import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { ButtonText } from '../../pages/Register/styles';
import Header from '../Header';
import SwitchSelector from 'react-native-switch-selector';

import {
  Block,
  BlockText,
  Btn,
  Container,
  Form,
  Input,
  MInput,
  styles,
} from './styles';
import { useRoute, useNavigation } from '@react-navigation/core';
import { RouteProps } from '../../routes';
import api from '../../services/api';

import LottieView from 'lottie-react-native';

const NewService: React.FC = () => {
  const { companyId, userId, token, segment, service } = useRoute<
    RouteProps<'NewService'>
  >().params;
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [schedulable, setSchedulable] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [associated, setAssociated] = useState(false);
  const [initial, setInitial] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const nameRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const options = [
    { label: 'Não', value: '0', activeColor: '#ff5555' },
    { label: 'Sim', value: '1' },
  ];

  const types = [
    { label: 'Atendimento na empresa', value: false },
    { label: 'Atendimento em domicílio', value: true },
  ];

  const createService = async () => {
    try {
      if (loading) {
        return;
      }
      if (!name) {
        return nameRef.current?.focus();
      }
      setLoading(true);
      const data = {
        name,
        price,
        schedulable,
        delivery,
        associated_product: associated,
      };

      await api.post('/service', data, {
        headers: {
          userId,
          companyId,
          Authorization: 'Bearer ' + token,
        },
      });

      setName('');
      setPrice('');
      setSchedulable(false);
      setDelivery(false);
      setAssociated(false);

      setStatus('success');
      return setLoading(false);
    } catch (err) {
      setStatus('error');
      setLoading(false);
      return Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar o serviço, tente novamente',
      );
    }
  };

  const updateService = async () => {
    try {
      if (loading === true) {
        return;
      }
      setLoading(true);
      const values = {
        name,
        price,
        schedulable,
        associated_product: service?.associated_product,
        delivery,
      };
      const response = await api.put('/service', values, {
        headers: {
          Authorization: 'Bearer ' + token,
          userId,
          companyId,
          serviceId: service?.id,
        },
      });

      if (response.data) {
        setStatus('success');
        return setLoading(false);
      }
    } catch (err) {
      setStatus('error');
      setLoading(false);
      return console.log(err);
    }
  };

  useEffect(() => {
    function update() {
      if (service) {
        setName(service.name);
        setPrice(String(service.price));
        setSchedulable(service.schedulable);
        setDelivery(service.delivery);
        setInitial(service.schedulable === true ? 1 : 0);
      }
    }
    return update();
  }, [service]);

  return (
    <Container>
      <Header title="Novo serviço" rl={false} rr={false} />
      <Form>
        <Block>
          <BlockText>Nome do serviço</BlockText>
          <Input
            ref={nameRef}
            placeholder="Nome do serviço..."
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => priceRef.current?.focus()}
          />
        </Block>
        <Block>
          <BlockText>Preço do serviço</BlockText>
          <MInput
            ref={priceRef}
            maxLength={6}
            keyboardType="numeric"
            placeholder="10,00"
            value={price}
            onChangeText={setPrice}
          />
        </Block>
        <Block>
          <BlockText>Tipo</BlockText>
          <Picker
            style={styles.picker}
            selectedValue={delivery}
            onValueChange={setDelivery}
          >
            {types.map(t => (
              <Picker.Item
                key={String(t.value)}
                style={styles.picker}
                value={t.value}
                label={t.label}
              />
            ))}
          </Picker>
        </Block>
        <Block>
          <BlockText>Agendável?</BlockText>
          <SwitchSelector
            buttonColor="#7159c1"
            selectedTextStyle={styles.selected}
            options={options}
            bold={true}
            value={initial}
            onPress={value => setSchedulable(value === '1' ? true : false)}
          />
        </Block>
        {segment === 'commerce' && service === undefined && (
          <Block>
            <BlockText>Associar aos produtos?</BlockText>
            <SwitchSelector
              buttonColor="#7159c1"
              selectedTextStyle={styles.selected}
              options={options}
              initial={0}
              bold={true}
              onPress={value => setAssociated(value === '1' ? true : false)}
            />
          </Block>
        )}
        <Btn
          onPress={() => {
            if (service) {
              return updateService();
            }
            createService();
          }}
        >
          <ButtonText>Salvar</ButtonText>
        </Btn>
        {loading === true && (
          <LottieView source={require('../../assets/loading.json')} autoPlay />
        )}
        {loading === false && status === 'success' && (
          <LottieView
            source={require('../../assets/success.json')}
            autoPlay
            autoSize
            loop={false}
            onAnimationFinish={() => navigation.goBack()}
          />
        )}
        {loading === false && status === 'error' && (
          <LottieView
            source={require('../../assets/error.json')}
            autoPlay
            loop={false}
          />
        )}
      </Form>
    </Container>
  );
};

export default NewService;
