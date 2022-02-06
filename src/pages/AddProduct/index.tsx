import React, { useEffect, useRef, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { getProduct } from '../../services/getProduct';
import { ButtonText } from '../Company/styles';
import {
  ConfirmCard,
  ConfirmContainer,
  Key,
  CameraView,
  Row,
  ConfirmButton,
  CancelButton,
  PriceInput,
  Name,
  Image,
  Center,
  TextDanger,
  Btn,
  ImageButton,
  AView,
  Cam,
  Input,
} from './styles';

import api from '../../services/api';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { RouteProps } from '../../routes';
import { IProduct } from '../../Types/types';
import { Container } from '../Home/styles';

import LottieView from 'lottie-react-native';
import * as ScanAnim from '../../assets/scan.json';

interface IResponse {
  data: IProduct;
}

const AddProduct: React.FC = () => {
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [image_url, setImage] = useState('');
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const cam = useRef<RNCamera>(null);
  const image = new FormData();

  const { token, userId, companyId, product: prod } = useRoute<
    RouteProps<'AddProduct'>
  >().params;

  const headers = {
    userId,
    companyId,
    Authorization: 'Bearer ' + token,
    productId: '',
  };

  const addProduct = async () => {
    try {
      if (loading) {
        return;
      }
      if (!price || !name) {
        return Alert.alert(
          'Informação insuficiente',
          'Preencha todos os campos',
        );
      }
      setLoading(true);

      image.append('image', {
        uri: image_url,
        type: 'image/jpeg',
        name: 'productimage.jpg',
      });

      const data = {
        barcode: code,
        image_url,
        image: code.length === 0 ? image : null,
        name,
        price,
      };

      if (product !== undefined) {
        headers.productId = product.id;
        await api.put('product', data, { headers });
      } else {
        await api.post('/product', data, { headers });
      }

      setResult('success');

      setCode('');
      setPrice('');
      setName('');
      setImage('');
      setVisible(false);
      setProduct(undefined);
      return setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setResult('error');
      return Alert.alert('Erro', 'Oops! Ocorreu um erro, tente novamente');
    }
  };

  const getProductSaved = async (barcode: string) => {
    try {
      const response: IResponse = await api.get(
        `/products?barcode=${barcode}`,
        {
          headers: {
            authorization: 'Bearer ' + token,
            userId,
            companyId,
          },
        },
      );

      if (!response.data) {
        const res = await getProduct(barcode);
        setName(res.description);
        setImage(res.thumbnail);
        return;
      }

      setProduct(response.data);
      setImage(String(response.data.image_url));
      setPrice(String(response.data.price));
      // setQuantity(String(response.data.quantity));
      setName(response.data.name);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    if (prod) {
      setProduct(prod);
      setName(prod.name);
      setPrice(String(prod.price));
      setImage(String(prod.image_url));
      setVisible(true);
    }
  }, [prod]);

  return (
    <Container>
      {visible === false && (
        <AView>
          <LottieView source={ScanAnim} autoPlay />
        </AView>
      )}
      {loading === true && (
        <AView>
          <LottieView
            source={require('../../assets/loading.json')}
            autoPlay
            autoSize
          />
        </AView>
      )}
      {loading === false && result === 'success' && (
        <AView>
          <LottieView
            source={require('../../assets/success.json')}
            autoPlay
            autoSize
            loop={false}
            onAnimationFinish={() => setResult('')}
          />
        </AView>
      )}
      {loading === false && result === 'error' && (
        <AView>
          <LottieView
            source={require('../../assets/error.json')}
            autoPlay
            autoSize
            loop={false}
            onAnimationFinish={() => setResult('')}
          />
        </AView>
      )}
      <CameraView
        ref={cam}
        onGoogleVisionBarcodesDetected={async ({ barcodes }) => {
          if (code || !barcodes.length || visible === true) {
            return;
          }
          getProductSaved(barcodes[0].data);
          setVisible(true);
          setCode(barcodes[0].data);
        }}
        barCodeTypes={['ean13']}
        autoFocus="on"
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a camera',
          message: 'Precisamos de sua permissão para acessar a camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      {visible === false && (
        <Btn onPress={() => setVisible(true)}>
          <ButtonText>Não tenho código de barras</ButtonText>
        </Btn>
      )}
      {visible === true && (
        <ConfirmContainer>
          <ConfirmCard>
            {product !== undefined && (
              <TextDanger>
                O produto já existe, seus dados serão apenas atualizados
              </TextDanger>
            )}
            <Center>
              {image_url.length > 0 && (
                <Image source={{ uri: image_url }} resizeMode="contain" />
              )}
              <ImageButton
                onPress={async () => {
                  const res = await cam.current?.takePictureAsync({
                    base64: true,
                    fixOrientation: true,
                    quality: 0.6,
                    forceUpOrientation: true,
                  });
                  setImage(String(res?.uri));
                }}
              >
                <Cam />
              </ImageButton>
            </Center>
            {code.length > 0 && (
              <Row>
                <Key>Código:</Key>
                <Name>{code}</Name>
              </Row>
            )}
            <Row>
              <Key>Produto: </Key>
              <Input
                placeholder="Nome do produto"
                multiline={true}
                maxLength={200}
                value={name}
                onChangeText={setName}
              />
            </Row>
            <Row>
              <Key>Preço: R$</Key>
              <PriceInput
                placeholder="00.00"
                value={price}
                onChangeText={setPrice}
              />
            </Row>
            <Row>
              <CancelButton
                onPress={() => {
                  setCode('');
                  setPrice('');
                  setName('');
                  setImage('');
                  setVisible(false);
                  setProduct(undefined);
                }}
              >
                <ButtonText>Voltar</ButtonText>
              </CancelButton>
              <ConfirmButton onPress={addProduct}>
                <ButtonText>Confirmar</ButtonText>
              </ConfirmButton>
            </Row>
          </ConfirmCard>
        </ConfirmContainer>
      )}
    </Container>
  );
};

export default AddProduct;
