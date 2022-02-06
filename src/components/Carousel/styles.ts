import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export const Container = styled.ScrollView.attrs({
  bounces: true,
  horizontal: true,
  snapToInterval: width,
  showsHorizontalScrollIndicator: false,
})`
  width: ${width}px;
  height: ${width * 0.8}px;
`;

export const Item = styled.View`
  width: ${width}px;
  height: ${width * 0.8}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.normal}20;
`;

export const ItemTitle = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.colors.background};
  font-weight: bold;
  text-align: center;
`;

export const Image = styled.ImageBackground`
  flex: 1;
  width: ${width}px;
  height: ${width * 0.8}px;
`;

export const ButtonView = styled.View`
  position: absolute;
  left: ${width - 70}px;
  top: 40px;
  justify-content: center;
  align-items: center;
`;

export const Left = styled(ButtonView)`
  left: 10px;
  elevation: 1;
`;

export const DeleteIcon = styled(Icon).attrs({
  name: 'delete',
  color: '#ff6666',
  size: 36,
})``;
