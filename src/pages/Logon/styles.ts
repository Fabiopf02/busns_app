import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Content } from '../Register/styles';

export const Scroll = styled(Content).attrs(() => ({
  contentContainerStyle: {
    paddingTop: '50%',
  },
}))`
  flex: 1;
`;

export const LogIcon = styled(Icon).attrs({
  name: 'login',
})`
  margin-left: 10px;
  font-size: 24px;
  color: ${props => props.theme.colors.background};
`;
