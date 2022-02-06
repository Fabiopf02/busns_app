import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { HEIGHT, MARGIN, RADIUS, WIDTH } from '../../Constants/Card';

export const Container = styled(RectButton)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin: ${MARGIN}px;
  padding: ${MARGIN / 2}px;
  background-color: ${props => props.theme.colors.secundary};
  border-radius: ${RADIUS}px;
  elevation: 4;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #ffffff;
  font-weight: bold;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${props => props.theme.colors.background}70;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled.View`
  width: ${WIDTH - MARGIN}px;
  height: ${HEIGHT * 0.7}px;
  justify-content: space-between;
  background-color: #00000009;
  border-radius: 4px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 3,
  ellipzeMode: 'tail',
})`
  font-size: 18px;
  color: ${props => props.theme.colors.background};
`;

export const Opened = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.colors.success};
`;

export const Closed = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.danger};
`;

export const More = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.background};
`;
