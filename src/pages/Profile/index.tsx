import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AddressModal from '../../components/AddressModal';
import Header from '../../components/Header';
import { IUser } from '../../Types/types';
import { formatDate } from '../../utils/formatDate';
import { getSavedUser } from '../../utils/storage';
import {
  Button,
  ButtonText,
  Center,
  Propertie,
  Row,
  Texts,
  Title,
  Value,
} from '../Company/styles';
import { Content } from '../Detail/styles';
import { Container } from '../Home/styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<IUser>();
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function get() {
      const result = await getSavedUser();
      return setUser(result);
    }
    get();
  }, [address]);

  return (
    <Container>
      <Header title="Perfil" rr={false} rl={false} logout={true} />
      <Content>
        {user !== undefined && user.account.address === undefined && (
          <AddressModal
            {...{ visible, setVisible, setAddress }}
            user={{ userId: user.account.id, token: user.token }}
          />
        )}
        <Texts>
          <Center>
            <Title>Usuário</Title>
          </Center>
          <Row>
            <Propertie>Nome</Propertie>
            <Value>
              <Title>{user?.account.name}</Title>
            </Value>
          </Row>
          <Row>
            <Propertie>Celular</Propertie>
            <Value>{user?.account.phone}</Value>
          </Row>
          <Row>
            <Propertie>Tipo de conta</Propertie>
            <Value>Cliente</Value>
          </Row>
          <Row>
            <Propertie>Criado em</Propertie>
            {user !== undefined && (
              <Value>{formatDate(user?.account.created_at)}</Value>
            )}
          </Row>
          <Center>
            <Title>Endereço</Title>
          </Center>
          {user?.account.address !== undefined && (
            <>
              <Row>
                <Propertie>Rua</Propertie>
                <Value>{user?.account.address?.street}</Value>
              </Row>
              <Row>
                <Propertie>Número</Propertie>
                <Value>{user?.account.address?.number}</Value>
              </Row>
              <Row>
                <Propertie>Bairro</Propertie>
                <Value>{user?.account.address?.neighborhood}</Value>
              </Row>
              <Row>
                <Propertie>Cidade</Propertie>
                <Value>{user?.account.address?.city}</Value>
              </Row>
              <Row>
                <Propertie>Estado</Propertie>
                <Value>{user?.account.address?.state}</Value>
              </Row>
              <Row>
                <Propertie>CEP</Propertie>
                <Value>{user?.account.address?.zip_code}</Value>
              </Row>
            </>
          )}
          {user?.account.address === undefined && (
            <Button onPress={() => setVisible(true)}>
              <ButtonText>Adicionar endereço</ButtonText>
            </Button>
          )}
        </Texts>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Ver empresas</ButtonText>
        </Button>
        <Button
          onPress={() =>
            navigation.navigate('Agenda', {
              userId: user?.account.id,
              token: user?.token,
            })
          }
        >
          <ButtonText>Ver agenda</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default Profile;
