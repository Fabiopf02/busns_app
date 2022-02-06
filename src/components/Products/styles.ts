import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IProduct } from '../../Types/types';
import { HEADER_HEIGHT } from '../../Constants/Card';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled(FlatList as new () => FlatList<IProduct>).attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT,
  },
})`
  flex: 1;
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.danger};
  text-align: center;
`;
