import React, { useEffect, useState } from 'react';

import Header from '../Header';
import Product from '../Product';

import { RouteProps } from '../../routes';
import { Center, Container, Content, Title } from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useQuery } from '../../hooks/useFetch';
import { IProduct, IPurchase } from '../../Types/types';

import LottieView from 'lottie-react-native';

const Products: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<IProduct[]>();
  const [purchase, setPurchase] = useState<IPurchase[]>([]);
  const { companyId, userId, token, pcs = false, companyData } = useRoute<
    RouteProps<'Products'>
  >().params;
  const user = { companyId, userId, token };

  const { data, isValidating } = useQuery<IProduct[]>('/products', {
    userId,
    companyId,
    Authorization: 'Bearer ' + token,
  });

  const navigateToCheckout = () => {
    if (purchase.length === 0) {
      return;
    }
    return navigation.navigate('Checkout', {
      companyId,
      userId,
      token,
      purchase,
      companyData,
    });
  };

  useEffect(() => {
    function change() {
      if (data !== undefined) {
        return setProducts(data);
      }
    }
    return change();
  }, [data]);

  const count = purchase.reduce((t, item) => {
    return t + Number(item.the_amount);
  }, 0);

  return (
    <Container>
      <Header
        title="Produtos"
        rr={false}
        rl={false}
        pcs={pcs}
        pcsFC={navigateToCheckout}
        count={count}
      />
      {products !== undefined && products.length <= 0 && (
        <Center>
          <Title>Nenhum produto cadastrado</Title>
          <LottieView
            source={require('../../assets/error.json')}
            autoPlay
            autoSize
            loop={false}
          />
        </Center>
      )}
      {products !== undefined && products.length > 0 && (
        <Content
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Product
              product={item}
              {...{ user, setPurchase, pcs, purchase }}
              company={companyData !== undefined ? false : true}
            />
          )}
        />
      )}
      {isValidating === true && products === undefined && (
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

export default Products;
