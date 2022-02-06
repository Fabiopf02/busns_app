import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IProd } from '.';
import { WINDOW_W } from '../../Constants/Card';
import { GreenButton } from '../../pages/Company/styles';

export const Flat = styled(FlatList as new () => FlatList<IProd>).attrs({
  nestedScrollEnabled: true,
  horizontal: true,
  bounces: false,
  snapToInterval: WINDOW_W,
})`
  flex: 1;
`;

export const FooterButtonG = styled(GreenButton)`
  flex: 1;
  left: 0px;
  border-radius: 0px;
  margin: 0px;
  opacity: 0.9;
  background-color: ${props => props.theme.colors.success};
`;
export const FooterButtonY = styled(FooterButtonG)`
  flex: 1;
  background-color: ${props => props.theme.colors.warn}99;
`;

export const Footer = styled.View`
  flex-direction: row;
  padding: 0px;
  background-color: ${props => props.theme.colors.background};
  width: 100%;
  margin: 0px;
`;
