import React from 'react';
import Header from '../../components/Header';
import { Container } from '../../components/NewService/styles';

import AgendaItem from '../../components/AgendaItem';
import { Content } from './styles';
import { useRoute } from '@react-navigation/core';
import { RouteProps } from '../../routes';
import { IAgenda } from '../../Types/types';
import { Center, Title } from '../../components/Products/styles';

import LottieView from 'lottie-react-native';
import { useQuery } from '../../hooks/useFetch';

const Agenda: React.FC = () => {
  const { user, companyId, token } = useRoute<RouteProps<'Agenda'>>().params;

  const c = companyId !== '' ? true : false;
  const id = c === true ? companyId : user.account.id;

  const { data, isValidating } = useQuery<IAgenda[]>(`/agenda/${id}?c=${c}`, {
    userId: user.account.id,
    Authorization: 'Bearer ' + token,
  });

  return (
    <Container>
      <Header title="Agenda" rr={false} rl={false} />
      {data !== undefined && data?.length === 0 && (
        <Center>
          <Title>Nada encontrado por aqui!</Title>
          <LottieView
            source={require('../../assets/error.json')}
            autoSize
            autoPlay
            loop={false}
          />
        </Center>
      )}
      {data === undefined && isValidating === true && (
        <Center>
          <LottieView
            source={require('../../assets/loading.json')}
            autoSize
            autoPlay
          />
        </Center>
      )}
      {data !== undefined && data.length > 0 && (
        <Content
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <AgendaItem
              isCompany={companyId ? true : false}
              user={user}
              key={item.id}
              data={item}
            />
          )}
        />
      )}
    </Container>
  );
};

export default Agenda;
