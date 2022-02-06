import React from 'react';
import { Dimensions } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import { WhiteText } from '../../pages/Company/styles';
import { IProd } from '../AgendaDetails';
import { Title } from '../Card/styles';
import { Col, ProductImage, ProductView, Row, View } from '../Product/styles';

interface IProps {
  product: IProd;
}

const ViewSale: React.FC<IProps> = ({ product }) => {
  const width =
    Dimensions.get('window').width / (Dimensions.get('window').width * 0.29);

  return (
    <View count={0}>
      <ProductView activeOpacity={0.9}>
        <Title>{product.name}</Title>
        <Row>
          <ProductImage source={{ uri: product.image_url }} />
          <Col>
            <WhiteText>Preço Unit.: R$ {product.price.toFixed(2)}</WhiteText>
            <WhiteText>Quantidade: {product.the_amount}</WhiteText>
          </Col>
        </Row>
        {product.barcode.length > 0 && (
          <Barcode
            value={String(product.barcode)}
            format="EAN13"
            height={100}
            width={width}
            text={String(product.barcode)}
            flat
          />
        )}
      </ProductView>
    </View>
  );
};

export default ViewSale;
