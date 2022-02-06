import React, { useEffect, useState } from 'react';

import Service from '../Service';

import { Container, Content, Error } from './styles';
import Header from '../Header';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from '../../routes';
import { IService } from '../../Types/types';
import { useQuery } from '../../hooks/useFetch';

import LottieView from 'lottie-react-native';
import { Center } from '../../pages/Company/styles';

const Services: React.FC = () => {
  const { companyId, token, userId, company = false } = useRoute<
    RouteProps<'Services'>
  >().params;
  const [services, setServices] = useState<IService[]>();

  const { data, isValidating } = useQuery<IService[]>('/services', {
    userId,
    companyId,
    Authorization: 'Bearer ' + token,
  });

  useEffect(() => {
    function change() {
      if (data) {
        return setServices(data);
      }
      return;
    }
    return change();
  }, [data]);

  return (
    <Container>
      <Header title="Serviços" rl={false} rr={false} />
      {services !== undefined && services?.length! <= 0 && (
        <>
          <Error>Nenhum serviço encontrado</Error>
          <Center>
            <LottieView
              source={require('../../assets/error.json')}
              autoPlay
              loop={false}
              autoSize
            />
          </Center>
        </>
      )}
      {services !== undefined && services?.length! > 0 && (
        <Content
          data={services}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Service
              data={item}
              company={company}
              user={{ companyId, token, userId }}
            />
          )}
        />
      )}
      {isValidating === true && services === undefined && (
        <Center>
          <LottieView
            source={require('../../assets/loading.json')}
            autoPlay
            autoSize
          />
        </Center>
      )}
    </Container>
  );
};

export default Services;
