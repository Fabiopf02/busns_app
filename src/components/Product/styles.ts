import styled from 'styled-components/native';
import { WIDTH, MARGIN, WINDOW_W } from '../../Constants/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ICount {
  count: number;
}

export const Row = styled.View`
  flex-direction: row;
  margin-vertical: 5px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: ${WIDTH - 4}px;
`;

export const Col = styled.View`
  flex: 2;
  padding-left: 4px;
`;

export const ProductImageView = styled.View`
  flex: 1;
  height: 98%;
  background-color: ${props => props.theme.colors.primary};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
`;

export const ProductImage = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  flex: 0.8;
  height: 98%;
  min-height: 80px;
  min-width: 80px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
`;

export const View = styled.View<ICount>`
  width: ${WINDOW_W}px;
  padding-vertical: 2px;
  padding-left: ${MARGIN}px;
  margin-top: ${MARGIN / 2}px;
  margin-bottom: 1px;
  background-color: ${props =>
    props.count > 0 ? props.theme.colors.success + '30' : 'transparent'};
`;

export const ProductView = styled.TouchableOpacity`
  width: ${WIDTH}px;
  min-height: 100px;
  align-items: center;
  background-color: ${props => props.theme.colors.info}ca;
  border-radius: 10px;
  padding: 2px;
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.background};
`;

export const ProductText = styled(ProductTitle)`
  font-weight: normal;
`;

export const CartButton = styled.TouchableOpacity`
  padding: 2px;
  background-color: ${props => props.theme.colors.background}22;
  border-radius: 4px;
  margin-horizontal: 15px;
`;

export const CartPlusIcon = styled(Icon).attrs({
  name: 'cart-plus',
})`
  color: ${props => props.theme.colors.primary};
  font-size: 28px;
`;

export const CartRemoveIcon = styled(CartPlusIcon).attrs({
  name: 'cart-remove',
})`
  color: ${props => props.theme.colors.danger};
`;

export const Count = styled.Text`
  font-size: 28px;
  color: ${props => props.theme.colors.primary};
  position: absolute;
  bottom: 5px;
  left: 60px;
`;
