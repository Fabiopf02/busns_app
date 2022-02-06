import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HEADER_HEIGHT } from '../../Constants/Card';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  position: absolute;
`;

interface IProps {
  rr?: boolean;
  rl?: boolean;
}

export const Front = styled.View<IProps>`
  width: ${width}px;
  height: 80px;
  border-bottom-right-radius: ${props => (props.rr === true ? 40 : 0)}px;
  border-bottom-left-radius: ${props => (props.rl === true ? 40 : 0)}px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 3;
`;

export const Back = styled.View<IProps>`
  width: ${width}px;
  height: 80px;
  background-color: ${props =>
    props.rr === true || props.rl === true
      ? props.theme.colors.background
      : props.theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: bold;
  color: #fff;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 4px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: ${HEADER_HEIGHT / 2 - 29 / 2}px;
  background-color: #ffffff22;
  border-radius: 4px;
`;

export const Count = styled.Text`
  width: 40px;
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  left: -5px;
  bottom: -10px;
`;

export const CartButton = styled(LogoutButton)``;

export const LogoutIcon = styled(Icon).attrs({
  name: 'exit-to-app',
})`
  font-size: 26px;
  color: ${props => props.theme.colors.danger};
`;
export const CartIcon = styled(Icon).attrs({
  name: 'cart-outline',
})`
  font-size: 26px;
  color: ${props => props.theme.colors.secundary};
`;
