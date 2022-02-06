import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import {
  ArchiveIcon,
  AccountIcon,
  Col,
  Button,
  Container,
  Main,
} from './styles';
import Cards from '../../components/Cards';
import MapView from '../../components/MapView';

import { getGeocoding } from '../../services/getGeocoding';
import {
  getLatestLocation,
  checkPermission,
  requestPermission,
} from 'react-native-location';
import { RouteProps } from '../../routes';

import LottieView from 'lottie-react-native';

import { ICompanies } from '../../Types/types';
import { useQuery } from '../../hooks/useFetch';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [card, setCard] = useState<ICompanies>();
  const [cards, setCards] = useState<ICompanies[]>();
  const [neighborhood, setNeighborhood] = useState('');
  const [position, setposition] = useState<[number, number]>([0, 0]);
  const { user } = useRoute<RouteProps<'Home'>>().params;

  useEffect(() => {
    async function get() {
      const permission = await checkPermission({ android: { detail: 'fine' } });
      if (!permission) {
        await requestPermission({ android: { detail: 'fine' } });
      }
    }
    get();
  }, []);

  useEffect(() => {
    async function get() {
      const pos = await getLatestLocation({
        timeout: 2000,
      });
      setposition([Number(pos?.longitude), Number(pos?.latitude)]);
      const res = await getGeocoding([
        Number(pos?.longitude),
        Number(pos?.latitude),
      ]);
      if (neighborhood === res) {
        return;
      }
      setNeighborhood(res);
    }
    get();
  }, [neighborhood]);

  const { data, isValidating } = useQuery<ICompanies[]>(
    `/companies?neighborhood=${neighborhood}`,
    {
      userId: user.account.id,
      Authorization: 'Bearer ' + user.token,
    },
  );

  useEffect(() => {
    function change() {
      if (data && data.length > 0) {
        setCards(data);
        return setCard(data[0]!);
      }
      return;
    }
    return change();
  }, [cards, data]);

  const navigateToAgenda = () => {
    return navigation.navigate('Agenda', {
      user,
      companyId: '',
      token: user.token,
    });
  };
  const navigateToProfile = () => {
    return navigation.navigate('Profile', user);
  };

  return (
    <Container>
      <Header title={neighborhood} rr={false} rl={false} logout={true} />
      <Main>
        <Col>
          <Button onPress={navigateToProfile}>
            <AccountIcon />
          </Button>
          <Button onPress={navigateToAgenda}>
            <ArchiveIcon />
          </Button>
        </Col>
        <MapView
          card={card}
          position={position}
          setPosition={setposition}
          cards={cards!}
        />
        {isValidating === true && cards === undefined && (
          <LottieView source={require('../../assets/loading.json')} autoPlay />
        )}
        {cards !== undefined && (
          <Cards setCard={setCard} user={user} cards={cards!} />
        )}
      </Main>
    </Container>
  );
};

export default Home;
