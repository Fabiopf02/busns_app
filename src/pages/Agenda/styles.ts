import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { HEADER_HEIGHT } from '../../Constants/Card';
import { IAgenda } from '../../Types/types';

export const Content = styled(FlatList as new () => FlatList<IAgenda>).attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + 5,
  },
})`
  flex: 1;
`;
