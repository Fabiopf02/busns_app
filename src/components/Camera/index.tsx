import { useRoute } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { RouteProps } from '../../routes';
import api from '../../services/api';
import { saveUser } from '../../utils/storage';

import {
  BottomTab,
  CameraView,
  CameraIcon,
  Container,
  TakeButton,
  FlashButton,
  FlashIcon,
  FlashOffIcon,
  ImageView,
  CheckIcon,
  CloseIcon,
  CloseButton,
  SaveButton,
} from './styles';

const Camera: React.FC = () => {
  const { user } = useRoute<RouteProps<'Camera'>>().params;
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const cameraRef = useRef<RNCamera>(null);
  const [data, setData] = useState<TakePictureResponse>();
  const imagesData = new FormData();

  const saveImage = async () => {
    try {
      imagesData.append('company_image', {
        uri: data?.uri,
        type: 'image/jpeg',
        name: 'newcompanyimage.jpg',
      });

      const response = await api.post<string>('/image', imagesData, {
        headers: {
          Authorization: 'Bearer ' + user.token,
          userId: user.account.id,
          companyId: user.account.company!.id,
        },
      });

      if (!user.account.company!.images) {
        user.account.company!.images = [response.data];
      } else {
        user.account.company!.images.push(response.data);
      }

      await saveUser(user);

      return setData(undefined);
    } catch (err) {
      console.log(err);
      return Alert.alert('Erro', 'Ocorreu um erro ao salvar a imagem');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const res = await cameraRef.current.takePictureAsync({
        quality: 0.6,
        fixOrientation: true,
        forceUpOrientation: true,
        base64: true,
      });

      return setData(res);
    }
  };

  return (
    <Container>
      <CameraView ref={cameraRef} captureAudio={false} flashMode={flash} />
      <BottomTab>
        <FlashButton
          onPress={() => {
            setFlash(
              flash === RNCamera.Constants.FlashMode.torch
                ? RNCamera.Constants.FlashMode.off
                : RNCamera.Constants.FlashMode.torch,
            );
          }}
        >
          {flash === RNCamera.Constants.FlashMode.torch && <FlashIcon />}
          {flash === RNCamera.Constants.FlashMode.off && <FlashOffIcon />}
        </FlashButton>
        <TakeButton onPress={takePicture}>
          <CameraIcon />
        </TakeButton>
      </BottomTab>
      {data !== undefined && (
        <ImageView source={{ uri: data.uri }}>
          <BottomTab>
            <CloseButton
              onPress={() => {
                setData(undefined);
              }}
            >
              <CloseIcon />
            </CloseButton>
            <SaveButton onPress={saveImage}>
              <CheckIcon />
            </SaveButton>
          </BottomTab>
        </ImageView>
      )}
    </Container>
  );
};

export default Camera;
