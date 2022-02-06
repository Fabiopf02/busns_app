import React, { memo, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { IService } from '../../Types/types';
import { Alert, Switch } from 'react-native';

import {
  Button,
  Container,
  Name,
  Text,
  Footer,
  ChevronIcon,
  MoneyIcon,
  Center,
  EditIcon,
  WarnText,
  SuccessText,
  CheckIcon,
  OtherBtn,
} from './styles';
import api from '../../services/api';

interface IProps {
  data: IService;
  company?: boolean;
  user: {
    companyId: string;
    userId: string;
    token: string;
  };
  setService?: React.Dispatch<React.SetStateAction<IService | undefined>>;
}

const Service: React.FC<IProps> = ({
  data,
  user,
  company = false,
  setService = () => {},
}) => {
  const [activated, setActivated] = useState(data.activated);
  const [servc, setServc] = useState(false);

  const navigation = useNavigation();
  const navigateToSchedule = () => {
    navigation.navigate('ToSchedule', { data, user });
  };

  const navigateToNewService = () => {
    navigation.navigate('NewService', {
      service: data,
      companyId: data.company_id,
      token: user.token,
      userId: user.userId,
      segment: data.associated_product === true ? 'commerce' : 'services',
    });
  };

  const updateService = async (sdata = {}) => {
    try {
      await api.put('/service', sdata, {
        headers: {
          Authorization: 'Bearer ' + user.token,
          userId: user.userId,
          companyId: user.companyId,
          serviceId: data.id,
        },
      });

      return true;
    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o serviço');
      return false;
    }
  };

  return (
    <Container>
      <Name>{data.name}</Name>
      <Text>
        Preço: R$ {Number(data.price).toFixed(2)} <MoneyIcon />{' '}
      </Text>
      <Text>
        Tipo:{' '}
        {data.delivery === false
          ? 'Atendimento na empresa'
          : 'Atendimento em domicílio'}
      </Text>
      {data.schedulable === true && (
        <Center>
          <SuccessText>Agendamento disponível</SuccessText>
        </Center>
      )}
      {data.associated_product === true && (
        <WarnText>Serviço disponível apenas para compra de produtos</WarnText>
      )}
      <Footer>
        {company === false && data.associated_product === false && (
          <Button onPress={navigateToSchedule}>
            <ChevronIcon />
          </Button>
        )}
        {company === false &&
          data.associated_product === true &&
          servc === false && (
            <OtherBtn
              onPress={() => {
                setService(data);
                setServc(true);
              }}
            >
              <Text>Escolher</Text>
              <CheckIcon />
            </OtherBtn>
          )}
        {company === true && (
          <>
            <Switch
              value={activated}
              onValueChange={async value => {
                setActivated(value);
                const res = await updateService({ activated: value });
                if (!res) {
                  return setActivated(!value);
                }
              }}
              thumbColor={activated ? '#7159c1' : '#aaa'}
              trackColor={{ false: '#ddd', true: '#7159c199' }}
            />
            <Button onPress={navigateToNewService}>
              <EditIcon />
            </Button>
          </>
        )}
      </Footer>
    </Container>
  );
};

export default memo(Service);
