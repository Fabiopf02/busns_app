import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container } from '../../pages/Home/styles';
import { Block, BlockText, Form, Btn } from '../NewService/styles';
import { ButtonText, Center, Text, Title } from '../../pages/Company/styles';
import { Button } from '../Service/styles';

import DatePicker from '@react-native-community/datetimepicker';

import { formatTime } from '../../utils/formatTime';
import { formatDate } from '../../utils/formatDate';

import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { RouteProps } from '../../routes';
import { Company } from '../../Types/types';
import api from '../../services/api';

export const ButtonS = styled(Button)`
  width: 100%;
`;

interface Response {
  id: string;
}

const ToSchedule: React.FC = () => {
  const { data, user } = useRoute<RouteProps<'ToSchedule'>>().params;
  const [company, setCompany] = useState<Company>();
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [timeText, setTimeText] = useState('');
  const [dateText, setDateText] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeText(formatTime([time]));
    setDateText(formatDate(date));
  }, [time, date]);

  const createSchedule = async () => {
    try {
      const response = await api.post<Response>(
        '/agenda',
        { date, time },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
            userId: user.userId,
            companyId: user.companyId,
            serviceId: data.id,
          },
        },
      );

      if (response.data.id) {
        return Alert.alert(
          'Sucesso!',
          'A solicitação foi enviada para a empresa, aguarde a resposta da mesma',
          [{ text: 'Ok', onPress: () => navigation.goBack() }],
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao agendar serviço, tente novamente',
      );
    }
  };

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await api.get<Company>(`/company/${data.company_id}`, {
          headers: {
            userId: user.userId,
            Authorization: 'Bearer ' + user.token,
          },
        });
        setCompany(res.data);
        setTime(new Date(res.data.opening));
      } catch (err) {
        return console.log(err);
      }
    }
    getCompany();
  }, [data.company_id, user.token, user.userId]);

  return (
    <Container>
      <Header title="Agendar" rl={false} rr={false} />
      <Form>
        <Block>
          <BlockText>Empresa</BlockText>
          <Center>
            <Title>{company?.account.name}</Title>
          </Center>
        </Block>
        <Block>
          <BlockText>Serviço</BlockText>
          <Center>
            <Title>{data.name}</Title>
          </Center>
        </Block>
        <Block>
          <BlockText>Preço</BlockText>
          <Center>
            <Title>R$ {String(data.price.toFixed(2)).replace('.', ',')}</Title>
          </Center>
        </Block>
        <Block>
          <BlockText>Data para atendimento</BlockText>
          <ButtonS onPress={() => setShowDate(true)}>
            <Text>
              {dateText} <Icon name="calendar" size={26} />
            </Text>
          </ButtonS>
          {showDate === true && (
            <DatePicker
              mode="date"
              value={date || new Date()}
              onChange={(_, t) => {
                setShowDate(false);
                setDate(t ?? date);
              }}
              minimumDate={new Date()}
            />
          )}
        </Block>
        <Block>
          <BlockText>Horário para atendimento</BlockText>
          <ButtonS onPress={() => setShowTime(true)}>
            <Text>
              {timeText} <Icon name="clock-time-four-outline" size={26} />
            </Text>
          </ButtonS>
          {showTime === true && (
            <DatePicker
              mode="time"
              value={time || new Date()}
              onChange={(_, t) => {
                setShowTime(false);
                setTime(t ?? time);
              }}
            />
          )}
        </Block>
        <Btn onPress={createSchedule}>
          <ButtonText>Confirmar</ButtonText>
        </Btn>
      </Form>
    </Container>
  );
};

export default ToSchedule;
