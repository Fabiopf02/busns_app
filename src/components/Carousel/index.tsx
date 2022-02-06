import React, { memo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CameraIcon, TakeButton } from '../Camera/styles';
import {
  ButtonView,
  Container,
  DeleteIcon,
  Image,
  Item,
  ItemTitle,
  Left,
} from './styles';
import { IData } from '../../Types/types';
import { Alert } from 'react-native';
import api from '../../services/api';
import { getSavedUser, saveUser } from '../../utils/storage';

interface IProps {
  images: string[];
  camera?: boolean;
  user?: {
    account: IData;
    token: string;
  };
}

const Carousel: React.FC<IProps> = ({ images, camera = true, user }) => {
  const navigation = useNavigation();
  const [imagesList, setImagesList] = useState(images);

  const navigateToCamera = () => {
    navigation.navigate('Camera', { user });
  };

  const removeImage = async (image: string) => {
    try {
      await api.put(
        '/image',
        { image },
        {
          headers: {
            userId: user?.account.id,
            companyId: user?.account.company.id,
            Authorization: 'Bearer ' + user?.token,
          },
        },
      );

      const newImages = imagesList.filter(img => img !== image);
      const saved = await getSavedUser();
      saved.account.company.images = newImages;
      await saveUser(saved);
      return setImagesList(newImages);
    } catch (err) {
      console.log(err);
      return Alert.alert('Erro', 'Ocorreu um erro ao remover a imagem');
    }
  };

  return (
    <Container>
      {imagesList.length > 0 &&
        imagesList.map(image => (
          <Image
            source={{ uri: image }}
            key={image}
            resizeMode="contain"
            fadeDuration={200}
          >
            {camera === true && (
              <Left>
                <TakeButton onPress={() => removeImage(image)}>
                  <DeleteIcon />
                </TakeButton>
              </Left>
            )}
          </Image>
        ))}
      {imagesList.length === 0 && (
        <Item>
          <ItemTitle>Sem imagens</ItemTitle>
        </Item>
      )}
      {camera === true && (
        <ButtonView>
          <TakeButton onPress={navigateToCamera}>
            <CameraIcon />
          </TakeButton>
        </ButtonView>
      )}
    </Container>
  );
};

export default memo(Carousel);
