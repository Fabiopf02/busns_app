import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MARGIN, WIDTH } from '../../Constants/Card';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primary};
`;

export const Main = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Button = styled(RectButton)`
  padding: 3px;
  border-radius: 4px;
  margin-vertical: 5px;
  background-color: ${props => props.theme.colors.secundary};
`;

export const Col = styled.View`
  z-index: 99;
  position: absolute;
  padding: 4px;
  left: ${MARGIN}px;
  top: ${WIDTH}px;
`;

export const ArchiveIcon = styled(Icon).attrs({
  name: 'archive',
})`
  font-size: 28px;
  color: ${props => props.theme.colors.background};
`;
export const AccountIcon = styled(Icon).attrs({
  name: 'account',
})`
  font-size: 28px;
  color: ${props => props.theme.colors.background};
`;
