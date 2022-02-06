import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { SuccessText, Text } from '../Service/styles';

import { WIDTH, MARGIN } from '../../Constants/Card';

export const Container = styled(RectButton)`
  width: ${WIDTH}px;
  left: ${MARGIN}px;
  padding: 2px;
  margin-vertical: 5px;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.background};
`;

export const Button = styled(RectButton)`
  padding: 3px;
  border-radius: 4px;
  height: 30px;
  margin-left: 5px;
  background-color: ${props => props.theme.colors.primary};
`;

export const BText = styled(Text)`
  font-weight: bold;
`;

export const DangerButton = styled(Button)`
  background-color: ${props => props.theme.colors.danger};
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.background};
  font-size: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const DangerText = styled(SuccessText)`
  color: ${props => props.theme.colors.danger};
`;
