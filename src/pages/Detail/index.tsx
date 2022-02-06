import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

import Header from '../../components/Header';
import {
  Button,
  ButtonText,
  Container,
  Content,
  H2,
  Info,
  Propertie,
  Row,
  Value,
  Description,
  Area,
  Key,
} from './styles';
import { RouteProps } from '../../routes';

import Carousel from '../../components/Carousel';
import MapView from '../../components/MapView';
import api from '../../services/api';
import {
  IAccount,
  IAddress,
  ICompanies,
  ICompany,
  IService,
  IData,
} from '../../Types/types';
import { formatTime } from '../../utils/formatTime';
import { getStatus } from '../../utils/getStatus';
import { formatAddress } from '../../utils/formatAddres';
import { useQuery } from '../../hooks/useFetch';
import { getLatestLocation } from 'react-native-location';

interface Company extends ICompany {
  account: IAccount;
  address: IAddress;
}

const Detail: React.FC = () => {
  const route = useRoute<RouteProps<'Detail'>>();
  const paramsData = route.params;

  const [company, setCompany] = useState<Company>();
  const [user, setUser] = useState<IData>();
  const [status, setStatus] = useState('');
  const [pcs, setPcs] = useState(false);
  const [dataMaps, setDataMaps] = useState<ICompanies>();
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function get() {
      const pos = await getLatestLocation({
        timeout: 2000,
      });

      setPosition([Number(pos?.longitude), Number(pos?.latitude)]);
    }
    get();
  }, []);

  useEffect(() => {
    async function getCompany() {
      try {
        const response = await api.get<Company>(
          `/company/${paramsData.data.id}`,
          {
            headers: {
              Authorization: 'Bearer ' + paramsData.user.token,
              userId: paramsData.user.account.id,
            },
          },
        );

        setUser({
          id: paramsData.user.account.id,
          name: paramsData.user.account.name,
          phone: paramsData.user.account.phone,
          updated_at: paramsData.user.account.updated_at,
          created_at: paramsData.user.account.created_at,
          type: paramsData.user.account.type,
          address: paramsData.user.account.address,
          token: paramsData.user.token,
        });
        setDataMaps({
          id: response.data.id,
          name: response.data.account.name,
          type: response.data.account.type,
          segment: response.data.segment,
          opening: response.data.opening,
          closing: response.data.closing,
          coords: response.data.address.coords,
        });
        setCompany(response.data);
        setStatus(getStatus(response.data.opening, response.data.closing));
        return;
      } catch (err) {
        return console.log(err);
      }
    }
    getCompany();
  }, [
    paramsData.data.id,
    paramsData.user.account,
    paramsData.user.account.id,
    paramsData.user.token,
  ]);

  const { data } = useQuery<IService[]>('/services', {
    userId: paramsData.user.account.id,
    companyId: paramsData.data.id,
    Authorization: 'Bearer ' + paramsData.user.token,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const change = () => {
      if (company?.segment === 'commerce' && data) {
        const res = data?.filter(
          service =>
            service.associated_product === true &&
            service.activated === true &&
            service.schedulable === true,
        );
        return setPcs(res && res.length > 0 ? true : false);
      }
      if (company?.segment === 'services' && data) {
        const res = data?.filter(
          service =>
            service.associated_product === false && service.activated === true,
        );
        return setPcs(res && res.length > 0 ? true : false);
      }
    };
    return change();
  }, [company?.segment, data]);

  const navigateToProducts = () => {
    navigation.navigate('Products', {
      token: user?.token,
      userId: user?.id,
      companyId: paramsData.data.id,
      pcs: pcs,
      companyData: company,
    });
  };
  const navigateToServices = () => {
    navigation.navigate('Services', {
      token: user?.token,
      userId: user?.id,
      companyId: paramsData.data.id,
    });
  };

  return (
    <Container>
      <Header title="Detalhes" />
      <Content>
        {company !== undefined && (
          <>
            <H2>{company?.account.name}</H2>
            <Area>
              <MapView
                position={position}
                card={dataMaps!}
                cards={[dataMaps!]}
              />
            </Area>
            <Info>
              <Row>
                <Propertie>Funcionamento: </Propertie>
                <Value>{formatTime([company.opening, company.closing])}</Value>
              </Row>
              <Row>
                <Propertie>Endereço: </Propertie>
                <Value>{formatAddress(company.address)}</Value>
              </Row>
              <Row>
                <Propertie>Setor</Propertie>
                <Value>
                  {company.segment === 'commerce' ? 'Comércio' : 'Serviços'}
                </Value>
              </Row>
              <Row>
                <Propertie>Status: </Propertie>
                {status === 'opened' && <Value>Aberto</Value>}
                {status === 'closed' && (
                  <Value color={colors.danger}>Fechado</Value>
                )}
              </Row>
              <Key>Sobre a empresa:</Key>
              <Description>{company.description || '--'}</Description>
            </Info>
            <Carousel images={company.images || []} camera={false} />

            {company.segment === 'commerce' && (
              <Button onPress={navigateToProducts}>
                <ButtonText>Ver produtos</ButtonText>
              </Button>
            )}
            {company.segment === 'services' && (
              <Button onPress={navigateToServices}>
                <ButtonText>Ver serviços</ButtonText>
              </Button>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Detail;
