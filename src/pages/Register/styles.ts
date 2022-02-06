import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '../../Constants/Card';

const { width } = Dimensions.get('window');

interface IProp {
  selected: Boolean;
  name?: string;
}

export const styles = StyleSheet.create({
  picker: {
    height: 50,
    fontSize: 18,
  },
});

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: ${HEADER_HEIGHT}px;
  background-color: ${props => props.theme.colors.primary};
`;

export const Form = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  padding: 4px;
  padding-bottom: 0px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Row = styled.View`
  width: ${width - 8}px;
  height: auto;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-around;
`;

export const InputBlock = styled.View`
  width: ${width - 8}px;
  margin: 10px 4px;
`;

export const InputBlockText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
  left: 5px;
`;

export const TypeBlock = styled(RectButton)<IProp>`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  background-color: ${props =>
    props.name ? props.theme.colors.secundary : props.theme.colors.primary};
  opacity: ${props => (props.selected ? 1 : 0.5)};
  border-radius: 10px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

export const TypeText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  bottom: 5px;
`;

export const CompanyIcon = styled(Icon).attrs({
  name: 'store',
})`
  color: #ffffff;
  font-size: 60px;
`;
export const ConsumerIcon = styled(Icon).attrs({
  name: 'human-male',
})`
  color: #ffffff;
  font-size: 60px;
`;

export const InputL = styled.View`
  width: ${width - 24}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
  returnKeyType: 'next',
})`
  flex: 6;
  left: 3px;
  height: 44px;
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.primary};
`;

export const MinInput = styled(Input)`
  flex: 1;
  width: 60px;
  left: 5px;
  text-align: center;
`;

export const Button = styled(RectButton)`
  width: ${width - 20}px;
  left: 6px;
  height: 55px;
  margin-top: 40px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
`;

export const Link = styled(Button)`
  background-color: transparent;
  margin-top: 20px;
`;

export const LinkText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export const Btn = styled(RectButton)``;

/* Input -> icons */
export const PhoneIcon = styled(Icon).attrs({
  name: 'cellphone',
})`
  font-size: 20px;
  color: ${props => props.theme.colors.primary};
  border-right-width: 1px;
  border-right-color: ${props => props.theme.colors.primary};
  padding: 3px;
`;
export const AccountIcon = styled(PhoneIcon).attrs({
  name: 'account',
})``;
export const AccountPlusIcon = styled(PhoneIcon).attrs({
  name: 'account-plus-outline',
})`
  color: ${props => props.theme.colors.background};
  font-size: 26px;
  margin-left: 10px;
`;
export const CepIcon = styled(PhoneIcon).attrs({
  name: 'map-marker',
})``;
export const LockIcon = styled(PhoneIcon).attrs({
  name: 'lock',
})``;
export const LockOpenIcon = styled(PhoneIcon).attrs({
  name: 'lock-open',
})``;
export const AdressIcon = styled(PhoneIcon).attrs({
  name: 'home',
})``;
export const StoreIcon = styled(PhoneIcon).attrs({
  name: 'store',
})``;
export const CityIcon = styled(PhoneIcon).attrs({
  name: 'city',
})``;
export const RoadIcon = styled(PhoneIcon).attrs({
  name: 'road',
})``;
