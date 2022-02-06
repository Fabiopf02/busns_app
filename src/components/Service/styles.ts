import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MARGIN, WIDTH } from '../../Constants/Card';

export const Container = styled.View`
  width: ${WIDTH}px;
  left: ${MARGIN}px;
  padding: 2px;
  margin-vertical: 5px;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.background};
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.colors.normal};
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.normal}99;
  align-items: center;
`;

export const WarnText = styled(Text)`
  color: ${props => props.theme.colors.warn};
  padding-horizontal: 4px;
  font-size: 18px;
  text-align: center;
`;
export const SuccessText = styled(Text)`
  color: ${props => props.theme.colors.success};
`;
export const BlueText = styled(Text)`
  color: ${props => props.theme.colors.info};
`;

export const Footer = styled.View`
  width: 99%;
  height: 45px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 5px;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const OtherBtn = styled(Button)`
  background-color: ${props => props.theme.colors.normal}11;
  width: auto;
  flex-direction: row;
  padding-horizontal: 4px;
`;

export const Center = styled.View`
  width: 100%;
  align-items: center;
  margin-vertical: 2px;
`;

export const CalendarIcon = styled(Icon).attrs({
  name: 'calendar',
})`
  color: ${props => props.theme.colors.secundary};
  font-size: 26px;
`;
export const ChevronIcon = styled(CalendarIcon).attrs({
  name: 'chevron-right',
})`
  font-size: 28px;
`;
export const CheckIcon = styled(CalendarIcon).attrs({
  name: 'check-bold',
})`
  font-size: 28px;
`;
export const EditIcon = styled(CalendarIcon).attrs({
  name: 'pencil',
})`
  color: ${props => props.theme.colors.secundary};
`;
export const MoneyIcon = styled(CalendarIcon).attrs({
  name: 'cash',
})`
  color: ${props => props.theme.colors.primary};
`;
