import React, { useEffect, memo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  Description,
  Content,
  Row,
  Opened,
  Closed,
  More,
} from './styles';
import { ICompanies, IResponse } from '../../Types/types';
import { formatTime } from '../../utils/formatTime';
import { getStatus } from '../../utils/getStatus';

interface IProps extends IResponse {
  data: ICompanies;
}

const Card: React.FC<IProps> = ({ data, user }) => {
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');
  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate('Detail', { data, user });
  };

  useEffect(() => {
    const opening = data.opening;
    const closing = data.closing;
    const stt = getStatus(opening, closing);
    setStatus(stt);
    const formatedTime = formatTime([opening, closing]);
    setTime(formatedTime);
  }, [data.closing, data.opening]);

  return (
    <Container onPress={navigateToDetail}>
      <Title>{data.name}</Title>
      <Row>
        <Content>
          <Description>
            Setor de {data.segment === 'services' ? 'Serviços' : 'Comércio'}
          </Description>
          <More>{time}</More>
          {status === 'opened' && <Opened>Aberto</Opened>}
          {status === 'closed' && <Closed>Fechado</Closed>}
        </Content>
      </Row>
    </Container>
  );
};

export default memo(Card);
