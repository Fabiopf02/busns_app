import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  Center,
  Propertie,
  Title,
  Row,
  Texts,
  Value,
} from '../../pages/Company/styles';
import { ButtonText, Content } from '../../pages/Detail/styles';
import { Container } from '../../pages/Home/styles';
import { RouteProps } from '../../routes';
import api from '../../services/api';
import { IAddress, IPurchase } from '../../Types/types';
import { formatAddress } from '../../utils/formatAddres';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { updateAgenda } from '../AgendaItem';
import { BText, DangerText } from '../AgendaItem/styles';
import Header from '../Header';
import { SuccessText, WarnText, BlueText } from '../Service/styles';
import ViewSale from '../ViewSale';
import { Flat, Footer, FooterButtonY, FooterButtonG } from './styles';

export interface IProd extends IPurchase {
  barcode: string;
  name: string;
  image_url: string;
}

const AgendaDetails: React.FC = () => {
  const { data, user } = useRoute<RouteProps<'AgendaDetails'>>().params;
  const [purchase, setPurchase] = useState<IProd[]>();
  const [confirmed, setConfirmed] = useState(data.confirmed);
  const [canceled, setCanceled] = useState(data.canceled);
  const [finished, setFinished] = useState(data.finished);
  const [address, setAddress] = useState<IAddress[]>();
  const [scroll, setScroll] = useState(false);

  const headers = {
    userId: user.account.id,
    token: user.token,
    scheduleId: data.id,
  };

  useEffect(() => {
    async function get() {
      try {
        const params = {
          purchase: data.id,
        };
        const response = await api.get<IProd[]>('/purchases', {
          params,
          headers: {
            userId: user.account.id,
            Authorization: 'Bearer ' + user.token,
          },
        });
        let p = data.account_id;
        if (data.delivery === false && user.account.company?.id !== '') {
          p = user.account.id;
        }
        const addressResponse = await api.get<IAddress[]>(`/address/${p}`, {
          headers: {
            userId: user.account.id,
            Authorization: 'Bearer ' + user.token,
          },
        });
        setAddress(addressResponse.data);

        return setPurchase(response.data);
      } catch (err) {
        return console.log(err);
      }
    }
    get();
  }, [
    data.account_id,
    data.delivery,
    data.id,
    user.account.company?.id,
    user.account.id,
    user.token,
  ]);

  const total =
    purchase !== undefined
      ? purchase.reduce((t, item) => {
          return t + Number(item.price) * item.the_amount;
        }, 0)
      : 0;

  const count =
    purchase !== undefined
      ? purchase.reduce((t, item) => {
          return t + Number(item.the_amount);
        }, 0)
      : 0;

  return (
    <Container>
      <Header title="Detalhes da solicitação" rr={false} rl={false} />
      <Content>
        <Texts>
          <Row>
            <Propertie>Serviço</Propertie>
            <Value>{data.service_name}</Value>
          </Row>
          <Row>
            <Propertie>Agendado para</Propertie>
            <Value>
              <BlueText>
                {formatDate(data.date)}, às {formatTime([data.time])}
              </BlueText>
            </Value>
          </Row>
          {data.company_name !== undefined && (
            <Row>
              <Propertie>Empresa</Propertie>
              <Value>{data.company_name}</Value>
            </Row>
          )}
          {data.user_name !== undefined && (
            <Row>
              <Propertie>Solicitante</Propertie>
              <Value>{data.user_name}</Value>
            </Row>
          )}
          <Row>
            <Propertie>Situação: </Propertie>
            <Value>
              {canceled === false && confirmed === false && (
                <WarnText>Aguardando confirmação...</WarnText>
              )}
              {canceled === false && confirmed === true && (
                <SuccessText>Agendado!</SuccessText>
              )}
              {canceled === true && <DangerText>Cancelado!</DangerText>}
            </Value>
          </Row>
          <Row>
            <Propertie>Realizado?</Propertie>
            <Value>
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
            </Value>
          </Row>
          <Row>
            <Propertie>Tipo de serviço</Propertie>
            <Value>
              {data.associated_product === true && <BText>Compra/Venda</BText>}
              {data.associated_product === false && <BText>Atendimento</BText>}
            </Value>
          </Row>
          <Row>
            <Propertie>Atendimento</Propertie>
            <Value>
              {data.delivery === true ? 'Em domicílio' : 'Na empresa'}
            </Value>
          </Row>
          {data.delivery === true && (
            <Row>
              <Propertie>Endereço de entrega</Propertie>
              {address !== undefined && address.length > 0 && (
                <Value>
                  <BlueText>{formatAddress(address[0]!)}</BlueText>
                </Value>
              )}
            </Row>
          )}
          {data.delivery === false && (
            <Row>
              <Propertie>Endereço da empresa</Propertie>
              {address !== undefined && address.length > 0 && (
                <Value>
                  <BlueText>{formatAddress(address[0]!)}</BlueText>
                </Value>
              )}
            </Row>
          )}
          <Row>
            <Propertie>Total a pagar</Propertie>
            <Value>
              <SuccessText>
                R$ {total.toFixed(2)} + R$ {Number(data.price).toFixed(2)}{' '}
                (Serviço)
              </SuccessText>
            </Value>
          </Row>
          {data.associated_product === true && (
            <Row>
              <Propertie>Total de produtos</Propertie>
              <Value>
                <SuccessText>{count}</SuccessText>
              </Value>
            </Row>
          )}
        </Texts>
        {purchase !== undefined && (
          <Center>
            <Title>Produtos</Title>
            <WarnText>
              O preço dos produtos foi salvo no momento da compra
            </WarnText>
          </Center>
        )}
        <Flat
          ref={flat => {
            if (scroll) {
              return;
            }
            flat?.scrollToOffset({ offset: 20, animated: true });
            setScroll(true);
          }}
          data={purchase}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ViewSale product={item} />}
        />
      </Content>
      <Footer>
        {confirmed === false && canceled === false && (
          <>
            {data.user_name !== undefined && (
              <FooterButtonG
                onPress={() => {
                  if (confirmed) {
                    return;
                  }
                  const res = updateAgenda({ confirmed: true }, headers);
                  if (res) {
                    return setConfirmed(true);
                  }
                }}
              >
                <ButtonText>Confirmar</ButtonText>
              </FooterButtonG>
            )}
            <FooterButtonY
              onPress={() => {
                if (canceled) {
                  return;
                }
                const res = updateAgenda({ canceled: true }, headers);
                if (res) {
                  return setCanceled(true);
                }
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </FooterButtonY>
          </>
        )}
        {confirmed === true &&
          canceled === false &&
          finished === false &&
          data.user_name !== undefined && (
            <FooterButtonG
              onPress={() => {
                if (finished) {
                  return;
                }
                const res = updateAgenda({ finished: true }, headers);
                if (res) {
                  return setFinished(true);
                }
              }}
            >
              <ButtonText>Finalizar</ButtonText>
            </FooterButtonG>
          )}
      </Footer>
    </Container>
  );
};

export default AgendaDetails;
