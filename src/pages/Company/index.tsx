import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Carousel from '../../components/Carousel';
import Header from '../../components/Header';

import {
  Container,
  Title,
  Content,
  Row,
  Propertie,
  Value,
  Button,
  ButtonText,
  Texts,
  GreenButton,
  Center,
  Btn,
  Text,
  Line,
  TimePicker,
  Input,
  RedButton,
  ActivatedButton,
  ButtonTextMD,
  BtnA,
} from './styles';

import { RouteProps } from '../../routes';
import api from '../../services/api';
import { Alert } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import { ArchiveIcon } from '../Home/styles';
import { formatAddress } from '../../utils/formatAddres';
import { getSavedUser, saveUser } from '../../utils/storage';
import InputModal from '../../components/InputModal';
import { EditIcon } from '../../components/Service/styles';
import Phones from '../../components/Phones';

const Company: React.FC = () => {
  const { user } = useRoute<RouteProps<'Company'>>().params;
  const [visible, setVisible] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [modalType, setModalType] = useState('');

  const [description, setDescription] = useState(
    user.account.company!.description,
  );
  const [account, setAccount] = useState(user);
  const [arr, setArr] = useState(account.account.company!.phones);
  const [activated, setActivated] = useState(
    account.account.company!.activated,
  );
  const segment = account.account.company!.segment;

  const navigation = useNavigation();
  const [opening, setOpening] = useState(
    user.account.company!.opening
      ? new Date(user.account.company!.opening)
      : null,
  );
  const [closing, setClosing] = useState(
    user.account.company!.closing
      ? new Date(user.account.company!.closing)
      : null,
  );
  const [openingText, setOpeningText] = useState('Início');
  const [closingText, setClosingText] = useState('Fim');
  const [openingShow, setOpeningShow] = useState(false);
  const [closingShow, setClosingShow] = useState(false);

  const navigateToBarCodeReader = () => {
    return navigation.navigate('AddProduct', {
      token: user.token,
      userId: user.account.id,
      companyId: user.account.company!.id,
    });
  };
  const navigateToProducts = () => {
    return navigation.navigate('Products', {
      token: user.token,
      userId: user.account.id,
      companyId: user.account.company!.id,
    });
  };
  const navigateToServices = () => {
    return navigation.navigate('Services', {
      companyId: user.account.company!.id,
      userId: user.account.id,
      token: user.token,
      company: true,
    });
  };
  const navigateToNewService = () => {
    return navigation.navigate('NewService', {
      companyId: user.account.company!.id,
      segment: user.account.company!.segment,
      token: user.token,
      userId: user.account.id,
    });
  };
  const navigateToAgenda = () => {
    return navigation.navigate('Agenda', {
      companyId: user.account.company!.id,
      token: user.token,
      user,
    });
  };

  const address = formatAddress(user.account.address);

  const updateCompany = async (params = {}) => {
    try {
      await api.put('/company', params, {
        headers: {
          Authorization: 'Bearer ' + account.token,
          userId: account.account.id,
          companyId: account.account.company!.id,
        },
      });

      return await saveUser(account);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleActivated = () => {
    if (!opening || !closing) {
      return Alert.alert(
        'Aviso',
        'Não é possível ativar sem horário de abertura e fechamento da empresa',
      );
    }
    account.account.company!.activated = !activated;
    updateCompany({ activated: !activated });
    setActivated(!activated);
  };

  const handleModal = (value: string, type: string) => {
    setModalValue(value);
    setModalType(type);
    setArr(account.account.company!.phones);
    return setVisible(true);
  };

  useEffect(() => {
    if (opening) {
      setOpeningText(formatTime([opening]));
    }
    if (closing) {
      setClosingText(formatTime([closing]));
    }
  }, [closing, opening, user.account.company]);

  navigation.addListener('focus', async () => {
    const saved = await getSavedUser();
    setAccount(saved);
  });

  return (
    <Container>
      <Header title="Admin" rr={false} rl={false} logout={true} />
      <InputModal
        {...{
          visible,
          setVisible,
          modalValue,
          modalType,
          arr,
          updateCompany,
          account,
          setAccount,
        }}
      />
      <Content>
        <Texts>
          <Row>
            <Propertie>Empresa</Propertie>
            <Value>
              <Title>{account.account.name}</Title>
            </Value>
          </Row>
          <Row>
            <Propertie>Sobre</Propertie>
            <Input
              returnKeyType="next"
              placeholder="Informações sobre a empresa... ✏"
              placeholderTextColor="#aaa"
              multiline={true}
              maxLength={700}
              value={description}
              onChangeText={setDescription}
              onEndEditing={async () => {
                account.account.company!.description = description;
                await updateCompany({ description });
              }}
            />
          </Row>
          <Row>
            <Propertie>Horário</Propertie>
            {openingShow === true && (
              <TimePicker
                value={opening || new Date()}
                onChange={(event: Event, time?: Date) => {
                  setOpeningShow(false);
                  if (!time) {
                    return;
                  }
                  setOpening(time);
                  account.account.company!.opening = time;
                  updateCompany({ opening: time });
                }}
              />
            )}
            {closingShow === true && (
              <TimePicker
                value={closing || new Date()}
                onChange={(event: Event, time?: Date) => {
                  setClosingShow(false);
                  if (!time) {
                    return;
                  }
                  setClosing(time);
                  account.account.company!.closing = time;
                  updateCompany({ closing: time });
                }}
              />
            )}
            <Line>
              <Btn onPress={() => setOpeningShow(true)}>
                <Text>{openingText}</Text>
              </Btn>
              <Text> - </Text>
              <Btn onPress={() => setClosingShow(true)}>
                <Text>{closingText}</Text>
              </Btn>
            </Line>
          </Row>
          <Row>
            <Propertie>Login</Propertie>
            <Value>{account.account.phone}</Value>
          </Row>
          <Row>
            <Propertie>Segmento</Propertie>
            <Value>
              {account.account.company!.segment === 'commerce'
                ? 'Comércio'
                : 'Serviços'}
            </Value>
          </Row>
          <Row>
            <Propertie>E-mail</Propertie>
            <Value>{account.account.company?.email || '-'}</Value>
            <BtnA
              onPress={() =>
                handleModal(account.account.company!.email, 'email')
              }
            >
              <EditIcon />
            </BtnA>
          </Row>
          <Row>
            <Propertie>Telefones</Propertie>
            <Value>
              <Phones />
            </Value>
            <BtnA onPress={() => handleModal('', 'phone')}>
              <EditIcon />
            </BtnA>
          </Row>
          <Row>
            <Propertie>Site</Propertie>
            <Value>{account.account.company?.website}</Value>
            <BtnA
              onPress={() =>
                handleModal(account.account.company!.website, 'website')
              }
            >
              <EditIcon />
            </BtnA>
          </Row>
          <Row>
            <Propertie>Endereço</Propertie>
            <Value>{address}</Value>
          </Row>
        </Texts>
        <Center>
          {activated === false && (
            <RedButton onPress={handleActivated}>
              <ButtonTextMD>Desativada</ButtonTextMD>
            </RedButton>
          )}
          {activated === true && (
            <ActivatedButton onPress={handleActivated}>
              <ButtonTextMD>Ativada</ButtonTextMD>
            </ActivatedButton>
          )}
        </Center>
        <Center>
          <Title>Imagens da empresa</Title>
        </Center>
        <Carousel user={user} images={account.account.company!.images || []} />
        {segment === 'commerce' && (
          <Button onPress={navigateToBarCodeReader}>
            <ButtonText>Adicionar Produtos</ButtonText>
          </Button>
        )}
        {segment !== 'commerce' && (
          <Button onPress={navigateToNewService}>
            <ButtonText>Adicionar Serviço</ButtonText>
          </Button>
        )}
        {segment === 'commerce' && (
          <GreenButton onPress={navigateToProducts}>
            <ButtonText>Meus Produtos</ButtonText>
          </GreenButton>
        )}
        <GreenButton onPress={navigateToServices}>
          <ButtonText>Meus Serviços</ButtonText>
        </GreenButton>
        <GreenButton onPress={navigateToAgenda}>
          <ButtonText>
            Minha agenda <ArchiveIcon />
          </ButtonText>
        </GreenButton>
      </Content>
    </Container>
  );
};

export default Company;
