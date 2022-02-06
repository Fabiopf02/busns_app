import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IService } from '../../Types/types';
import { HEADER_HEIGHT, WIDTH } from '../../Constants/Card';

export const Container = styled.View`
  flex: 1;
  background-color: #dddddd99;
`;

export const Content = styled(FlatList as new () => FlatList<IService>).attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + 5,
  },
})`
  flex: 1;
`;

export const Error = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.colors.danger};
  padding: 4px;
  padding-top: ${WIDTH}px;
  margin-bottom: 25px;
  margin-top: 20px;
  text-align: center;
`;
