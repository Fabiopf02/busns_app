import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HEADER_HEIGHT, WINDOW_W } from '../../Constants/Card';
import { CartButton } from '../../components/Header/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT,
  },
})`
  flex: 1;
`;

export const Texts = styled.View`
  margin-vertical: 6px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.theme.colors.normal};
  font-weight: bold;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 0px;
`;

export const Propertie = styled.Text`
  width: ${WINDOW_W * 0.28}px;
  font-size: 18px;
  padding-vertical: 8px;
  font-weight: bold;
  text-align: right;
  color: ${props => props.theme.colors.normal};
  padding-right: 5px;
  border-right-width: 1px;
  border-right-color: #cccccc;
  height: 100%;
  align-items: center;
  background-color: blue;
`;
//${props => props.theme.colors.primary}15

export const Value = styled(Propertie)`
  min-width: ${WINDOW_W * 0.7}px;
  font-weight: normal;
  text-align: left;
  padding-left: 5px;
  border-color: transparent;
  background-color: red;
  color: ${props => props.theme.colors.primary};
`;

export const Input = styled.TextInput`
  width: 70%;
  padding: 2px;
  padding-right: 5px;
  font-size: 16px;
  color: ${props => props.theme.colors.normal};
`;

export const ButtonTextMD = styled.Text`
  color: ${props => props.theme.colors.background};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const BtnA = styled(CartButton)`
  top: 0px;
  position: absolute;
`;

export const Button = styled(RectButton)`
  width: 90%;
  height: 50px;
  left: 5%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.secundary};
  border-radius: 20px;
  margin-vertical: 5px;
`;

export const GreenButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
`;
export const RedButton = styled(Button)`
  width: 50%;
  height: 45px;
  left: 0%;
  background-color: ${props => props.theme.colors.danger};
`;

export const ActivatedButton = styled(RedButton)`
  background-color: ${props => props.theme.colors.success};
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.background};
`;

export const Center = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const Text = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${props => props.theme.colors.secundary};
`;

export const WhiteText = styled(Text)`
  color: ${props => props.theme.colors.background};
  font-size: 20px;
`;

export const Btn = styled(RectButton)`
  width: 40%;
  justify-content: center;
  background-color: #ccc;
  border-radius: 5px;
`;

export const Line = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const TimePicker = styled(DateTimePicker).attrs({
  mode: 'time',
  display: 'default',
  is24Hour: true,
})``;
