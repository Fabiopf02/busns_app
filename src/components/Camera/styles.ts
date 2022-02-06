import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const CameraView = styled(RNCamera)`
  flex: 1;
`;

export const TakeButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: ${props => props.theme.colors.primary}99;
`;

export const CameraIcon = styled(Icon).attrs({
  color: '#fff',
  name: 'camera',
  size: 28,
})`
  elevation: 2;
`;

export const FlashIcon = styled(CameraIcon).attrs({
  name: 'flash',
  color: '#FFC10788',
})``;
export const FlashOffIcon = styled(FlashIcon).attrs({
  name: 'flash-off',
})``;

export const FlashButton = styled(TakeButton)`
  background-color: ${props => props.theme.colors.normal}70;
`;

export const BottomTab = styled.View`
  position: absolute;
  bottom: 40px;
  width: 100%;
  justify-content: space-evenly;
  flex-direction: row;
`;

export const ImageView = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  elevation: 3;
  background-color: #000;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  position: absolute;
`;

export const CheckIcon = styled(CameraIcon).attrs({
  name: 'check-bold',
})``;
export const CloseIcon = styled(FlashIcon).attrs({
  name: 'close',
  color: '#ff6666',
  size: 36,
})``;

export const CloseButton = styled(FlashButton)``;
export const SaveButton = styled(TakeButton)``;
