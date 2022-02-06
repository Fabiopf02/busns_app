import styled from 'styled-components/native';
import { Modal } from 'react-native';

import { WIDTH } from '../../Constants/Card';
import { ButtonText, InputL } from '../../pages/Register/styles';

export const ModalView = styled(Modal).attrs({
  animationType: 'slide',
  transparent: true,
  statusBarTranslucent: true,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.normal}70;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  width: ${WIDTH}px;
  padding-vertical: 15px;
  min-height: 60px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
`;

export const Line = styled(InputL)`
  width: ${WIDTH - 24}px;
`;
export const Btn = styled.TouchableOpacity`
  width: ${WIDTH * 0.95}px;
  left: ${WIDTH * 0.025}px;
  height: 55px;
  margin-top: 40px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const Link = styled(Btn)`
  background-color: transparent;
  margin-top: 20px;
`;

export const LinkText = styled(ButtonText)`
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
`;
