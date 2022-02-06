import React, { useState, memo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { IAgenda, IUser } from '../../Types/types';

import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';

import { Footer, Name, SuccessText, Text, WarnText } from '../Service/styles';
import {
  Container,
  BText,
  Button,
  ButtonText,
  DangerButton,
  DangerText,
  Row,
} from './styles';
import api from '../../services/api';

interface IProps {
  data: IAgenda;
  isCompany: boolean;
  user: IUser;
}

interface IHeaders {
  userId: string;
  token: string;
  scheduleId: string;
}

export const updateAgenda = async (values = {}, headers: IHeaders) => {
  try {
    await api.put('/agenda', values, {
      headers: {
        userId: headers.userId,
        Authorization: 'Bearer ' + headers.token,
        scheduleId: headers.scheduleId,
      },
    });

    return true;
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro ao atualizar a agenda');
    return false;
  }
};

const AgendaItem: React.FC<IProps> = ({ data, isCompany, user }) => {
  const navigation = useNavigation();
  const [confirmed, setConfirmed] = useState(data.confirmed);
  const [canceled, setCanceled] = useState(data.canceled);
  const [finished, setFinished] = useState(data.finished);

  const headers = {
    userId: user.account.id,
    token: user.token,
    scheduleId: data.id,
  };

  const navigateToDetail = () => {
    navigation.navigate('Detail', {
      user: { account: user.account, token: user.token },
      data: {
        id: data.received,
      },
    });
  };
  const navigateToAgendaDetails = () => {
    navigation.navigate('AgendaDetails', {
      data,
      user,
    });
  };

  return (
    <Container onPress={navigateToAgendaDetails}>
      <Name>{data.service_name}</Name>
      {data.user_name !== undefined && <BText>Nome: {data.user_name}</BText>}
      {data.company_name !== undefined && (
        <BText>Empresa: {data.company_name}</BText>
      )}
      <Text>
        <BText>Agendado para: </BText>
        {formatDate(data.date)}
      </Text>
      <Text>
        <BText>Horário: </BText>
        {formatTime([data.time])}
      </Text>
      <Row>
        <BText>Situação: </BText>
        {canceled === false && confirmed === false && (
          <WarnText>Aguardando confirmação...</WarnText>
        )}
        {canceled === false && confirmed === true && (
          <SuccessText>Agendado!</SuccessText>
        )}
        {canceled === true && <DangerText>Cancelado!</DangerText>}
      </Row>
      <Row>
        <BText>Realizado: </BText>
        {finished === false && (
          <BText>
            <DangerText>Não</DangerText>
          </BText>
        )}
        {finished === true && (
          <BText>
            <SuccessText>Sim</SuccessText>
          </BText>
        )}
      </Row>
      <Footer>
        {!isCompany && (
          <Button onPress={navigateToDetail}>
            <ButtonText>Ver empresa</ButtonText>
          </Button>
        )}
        {isCompany === true && confirmed === false && canceled === false && (
          <Button
            onPress={async () => {
              const res = updateAgenda({ confirmed: true }, headers);
              if (!res) {
                return;
              }
              setConfirmed(true);
            }}
          >
            <ButtonText>Confirmar</ButtonText>
          </Button>
        )}
        {isCompany === true &&
          canceled === false &&
          confirmed === true &&
          finished === false && (
            <Button
              onPress={async () => {
                const res = updateAgenda({ finished: true }, headers);
                if (!res) {
                  return;
                }
                setFinished(true);
              }}
            >
              <ButtonText>Finalizar</ButtonText>
            </Button>
          )}
        {canceled === false && confirmed === false && (
          <DangerButton
            onPress={async () => {
              const res = updateAgenda({ canceled: true }, headers);
              if (!res) {
                return;
              }
              setCanceled(true);
            }}
          >
            <ButtonText>Cancel.</ButtonText>
          </DangerButton>
        )}
      </Footer>
    </Container>
  );
};

export default memo(AgendaItem);
