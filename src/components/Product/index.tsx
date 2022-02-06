import React, { memo, useState } from 'react';
import Barcode from 'react-native-barcode-builder';

import {
  CartPlusIcon,
  CartRemoveIcon,
  Col,
  ProductImage,
  ProductImageView,
  ProductText,
  ProductTitle,
  ProductView,
  Row,
  CartButton,
  Count,
  View,
} from './styles';

import { IProduct, IPurchase } from '../../Types/types';
import { Dimensions } from 'react-native';
import { EditIcon } from '../Service/styles';
import { useNavigation } from '@react-navigation/core';

interface IProps {
  product: IProduct;
  pcs: boolean;
  setPurchase: React.Dispatch<React.SetStateAction<IPurchase[]>>;
  purchase: IPurchase[];
  user: {
    userId: string;
    companyId: string;
    token: string;
  };
  company?: boolean;
}

const Product: React.FC<IProps> = ({
  product,
  pcs = false,
  setPurchase,
  purchase,
  user,
  company = false,
}) => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const addProduct = () => {
    const exists = purchase.filter(p => p.product_id === product.id);
    if (exists.length <= 0) {
      const newPurchase = {
        buyer_id: user.userId,
        seller_id: user.companyId,
        the_amount: 1,
        product_id: product.id,
        schedule_id: '',
        price: product.price,
      };
      setCount(count + 1);
      return setPurchase(prev => [...prev, newPurchase]);
    } else if (exists.length > 0) {
      const newArray = purchase.map(v => {
        if (v.product_id === product.id) {
          v.the_amount += 1;
        }
        return v;
      });
      setCount(count + 1);
      return setPurchase(newArray);
    }
  };
  const removeProduct = () => {
    const exists = purchase.filter(p => p.product_id === product.id);
    if (exists.length <= 0) {
      return;
    }
    if (exists.length > 0) {
      if (exists[0].the_amount === 1) {
        const newArray = purchase.filter(obj => obj.product_id !== product.id);
        setCount(0);
        return setPurchase(newArray);
      }
      const newArray = purchase.map(v => {
        if (v.product_id === product.id) {
          v.the_amount -= 1;
        }
        return v;
      });
      setCount(count - 1);
      return setPurchase(newArray);
    }
  };

  const navigateToAddProduct = () => {
    return navigation.navigate('AddProduct', {
      userId: user.userId,
      companyId: user.companyId,
      token: user.token,
      product,
    });
  };

  const width =
    Dimensions.get('window').width / (Dimensions.get('window').width * 0.29);

  return (
    <View count={count}>
      <ProductView activeOpacity={0.95}>
        {pcs === true && <Count>{count}</Count>}
        <Row>
          {product.image_url !== undefined && (
            <ProductImage
              source={{ uri: product.image_url }}
              fadeDuration={200}
            />
          )}
          {!product.image_url && <ProductImageView />}
          <Col>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductText>
              <ProductTitle>
                Preço: R$ {Number(product.price).toFixed(2)}
              </ProductTitle>
            </ProductText>
          </Col>
        </Row>
        {company === true && product.barcode.length > 0 && (
          <>
            <Barcode
              value={String(product.barcode)}
              format="EAN13"
              height={100}
              width={width}
              text={String(product.barcode)}
              flat
            />
          </>
        )}
        {company === true && (
          <CartButton onPress={navigateToAddProduct}>
            <EditIcon />
          </CartButton>
        )}
        {pcs === true && (
          <Row>
            <CartButton onPress={addProduct}>
              <CartPlusIcon />
            </CartButton>
            <CartButton onPress={removeProduct}>
              <CartRemoveIcon />
            </CartButton>
          </Row>
        )}
      </ProductView>
    </View>
  );
};

export default memo(Product);
