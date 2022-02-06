import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import AddressModal from '../../components/AddressModal';
import Header from '../../components/Header';
import Service from '../../components/Service';
import { useQuery } from '../../hooks/useFetch';
import { RouteProps } from '../../routes';
import { IService, IUser } from '../../Types/types';
import { Button, ButtonText } from '../Detail/styles';
import { Container } from '../Home/styles';
import { Content, BigText, Section, MediumText } from './styles';
import { formatAddress } from '../../utils/formatAddres';
import { getSavedUser } from '../../utils/storage';
import ScheduleModal from '../../components/ScheduleModal';
import { Alert } from 'react-native';
import api from '../../services/api';

import LottieView from 'lottie-react-native';
import { Center } from '../Company/styles';

interface IScheduleResponse {
  id: string;
}

const Checkout: React.FC = () => {
  const { companyId, userId, token, purchase, companyData } = useRoute<
    RouteProps<'Checkout'>
  >().params;

  const navigation = useNavigation();

  const [services, setServices] = useState<IService[]>([]);
  const [service, setService] = useState<IService>();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [address, setAddress] = useState('');
  const [schedule, setSchedule] = useState(true);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const { data } = useQuery<IService[]>('/services', {
    userId,
    companyId,
    Authorization: 'Bearer ' + token,
  });

  const total = purchase.reduce((t, item) => {
    return t + Number(item.price) * item.the_amount;
  }, 0);

  useEffect(() => {
    const change = () => {
      if (!data) {
        return;
      }
      const newServices = data.filter(
        servc => servc.associated_product === true && servc.activated === true,
      );

      setServices(newServices);
    };
    return change();
  }, [data]);

  useEffect(() => {
    const addService = () => {
      if (!service) {
        return;
      }
      setServices(prev => prev.filter(servc => servc.id === service?.id));
    };
    return addService();
  }, [service]);

  useEffect(() => {
    async function init() {
      const saved = await getSavedUser();
      setUser(saved);
      if (
        service === undefined ||
        (service !== undefined && service.delivery === false)
      ) {
        return;
      } else {
        if (!saved.account.address) {
          return setVisible(true);
        }
        return setAddress(formatAddress(saved.account.address!));
      }
    }
    init();
  }, [service]);

  const handleCheckout = async () => {
    try {
      if (loading === true) {
        return;
      }
      if (!service) {
        return Alert.alert(
          'Serviço não escolhido',
          'É necessário escolher um serviço para continuar',
        );
      }
      setLoading(true);

      const response = await api.post<IScheduleResponse>(
        '/agenda',
        { date, time },
        {
          headers: {
            userId,
            Authorization: 'Bearer ' + token,
            serviceId: service.id,
            companyId,
          },
        },
      );

      if (response.data.id) {
        purchase.forEach((_, index) => {
          purchase[index].schedule_id = response.data.id || '';
        });

        await api.post('/purchase', purchase, {
          headers: {
            userId,
            Authorization: 'Bearer ' + token,
          },
        });

        Alert.alert(
          'Sucesso',
          'A solicitação foi enviada para a empresa, aguarde a resposta da mesma',
        );
        setLoading(false);

        return navigation.navigate('Agenda', { user, companyId: '', token });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      return Alert.alert(
        'Oops!',
        'Ocorreu um erro na validação, tente novamente mais tarde',
      );
    }
  };

  return (
    <Container>
      {service !== undefined && service.delivery === true && (
        <AddressModal
          {...{ visible, setVisible, setAddress }}
          user={{ userId, token }}
        />
      )}
      <ScheduleModal
        {...{ schedule, setSchedule, date, setDate, time, setTime }}
      />
      {loading === true && (
        <Center>
          <LottieView
            source={require('../../assets/loading.json')}
            autoPlay
            autoSize
          />
        </Center>
      )}
      <Header title="Finalizar pedido 🎉" rl={false} rr={false} />
      <Content>
        <Section>
          <BigText>
            {purchase.reduce((t, item) => t + Number(item.the_amount), 0)}
          </BigText>
          <BigText>Produto(s)</BigText>
        </Section>
        <Section>
          <BigText>R$ {total.toFixed(2)}</BigText>
          <BigText>Total a pagar</BigText>
        </Section>
        {service !== undefined && (
          <>
            <BigText>+</BigText>
            <Section>
              <BigText>R$ {service.price.toFixed(2)}</BigText>
              <BigText>Preço do serviço</BigText>
            </Section>
          </>
        )}
        <Section>
          <MediumText>Empresa</MediumText>
          <MediumText>{companyData.account.name}</MediumText>
        </Section>
        <Section>
          <MediumText>Solicitante</MediumText>
          <MediumText>{user?.account.name}</MediumText>
          <MediumText>{address}</MediumText>
        </Section>
        <Section>
          {services.length > 0 && (
            <>
              {service === undefined && (
                <MediumText>Escolha o serviço desejado</MediumText>
              )}
              {service !== undefined && (
                <MediumText>Serviço escolhido</MediumText>
              )}
              {services.map(servc => (
                <Service
                  data={servc}
                  key={servc.id}
                  setService={setService}
                  company={false}
                  user={{ userId, companyId, token }}
                />
              ))}
            </>
          )}
          {services.length === 0 && (
            <MediumText>Nenhum serviço disponível</MediumText>
          )}
        </Section>
        <Section>
          <Button enabled={true} onPress={() => setSchedule(true)}>
            <ButtonText>Alterar horário do agendamento</ButtonText>
          </Button>
        </Section>
        <Section>
          <Button
            enabled={services.length > 0 ? true : false}
            onPress={handleCheckout}
          >
            <ButtonText>FINALIZAR</ButtonText>
          </Button>
        </Section>
      </Content>
    </Container>
  );
};

export default Checkout;
