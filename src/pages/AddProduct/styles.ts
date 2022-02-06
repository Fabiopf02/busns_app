import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';
import { CameraIcon } from '../../components/Camera/styles';

export const CameraView = styled(RNCamera)`
  flex: 1;
`;

export const ConfirmContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const ConfirmCard = styled.View`
  width: 90%;
  padding: 5px;
  top: -25px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 4px;
`;

export const Key = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.normal};
`;

export const Name = styled(Key)`
  width: 90%;
  padding-left: 5px;
  font-weight: normal;
`;

export const PriceInput = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
  keyboardType: 'numeric',
})`
  width: 50%;
  height: 45px;
  font-size: 20px;
  background-color: #eee;
  color: #333;
  text-align: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
  keyboardType: 'default',
})`
  width: 75%;
  min-height: 45px;
  font-size: 20px;
  color: #333;
  background-color: #eee;
`;

export const AView = styled.View`
  position: absolute;
  elevation: 2;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  align-items: center;
`;

export const Cam = styled(CameraIcon)`
  color: #7159c1;
`;

export const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 4px;
  align-items: center;
  justify-content: center;
`;

export const ImageButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #eeeeee;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButton = styled(RectButton)`
  width: 45%;
  height: 45px;
  background-color: ${props => props.theme.colors.secundary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const CancelButton = styled(ConfirmButton)`
  background-color: ${props => props.theme.colors.danger};
`;

export const Center = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

export const TextDanger = styled(Key)`
  width: 100%;
  color: ${props => props.theme.colors.danger};
  text-align: center;
`;
