import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { HEADER_HEIGHT } from '../../Constants/Card';

interface IProps {
  color?: string;
}

const WIDTH = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },
})`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  border-top-left-radius: 40px;
`;

export const H2 = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  padding-horizontal: 20px;
  margin-vertical: 5px;
`;

export const Area = styled.View`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
`;

export const Info = styled.View`
  flex: 1;
  margin-top: 5px;
  padding: 5px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Propertie = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.normal};
  margin-right: 5px;
  width: 45%;
  text-align: right;
`;

export const Value = styled.Text<IProps>`
  font-size: 20px;
  color: ${props => props.color || props.theme.colors.primary};
  width: 55%;
`;

export const Button = styled(RectButton)`
  width: ${WIDTH * 0.9}px;
  height: 55px;
  left: ${WIDTH * 0.05}px;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.secundary};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  elevation: 2;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.colors.background};
`;

export const Description = styled.Text`
  width: ${WIDTH * 0.9}px;
  left: ${WIDTH * 0.05}px;
  color: ${props => props.theme.colors.normal};
  text-align: center;
  margin-vertical: 10px;
  font-size: 18px;
`;

export const Key = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.colors.normal};
  font-size: 18px;
  padding-left: 20px;
  margin-top: 10px;
`;
