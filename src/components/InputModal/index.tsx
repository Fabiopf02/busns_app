import React, { useEffect, useState } from 'react';
import { Center, Title } from '../../pages/Company/styles';
import {
  ButtonText,
  Input,
  InputBlock,
  InputBlockText,
} from '../../pages/Register/styles';
import { IUser } from '../../Types/types';
import { saveUser } from '../../utils/storage';
import {
  Btn,
  Container,
  Form,
  Line,
  Link,
  LinkText,
  ModalView,
} from '../AddressModal/styles';

interface IProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  modalValue: string;
  modalType: string;
  arr: string[];
  account: IUser;
  setAccount: React.Dispatch<React.SetStateAction<IUser>>;
  updateCompany: (params: any) => Promise<void>;
}

const InputModal: React.FC<IProps> = ({
  setVisible,
  visible,
  modalValue,
  modalType,
  arr,
  setAccount,
  account,
  updateCompany,
}) => {
  const [input, setInput] = useState(modalValue);
  const type =
    modalType === 'email'
      ? 'email-address'
      : modalType === 'phone'
      ? 'numeric'
      : 'default';

  const text =
    modalType === 'email'
      ? 'E-mail'
      : modalType === 'phone'
      ? 'Telefone'
      : 'Site';

  async function handleConfirm() {
    if (!input) {
      return;
    }
    let value = null;
    if (modalType === 'email') {
      value = { email: input };
      account.account.company!.email = input;
    }
    if (modalType === 'phone') {
      if (!arr) {
        arr = [];
      }
      arr.push(input);
      value = { phones: arr };
      account.account.company!.phones = arr;
    }
    if (modalType === 'website') {
      value = { website: input };
      account.account.company!.website = input;
    }

    if (!value) {
      return;
    }

    await updateCompany(value);
    await saveUser(account);
    setAccount(account);

    return setVisible(false);
  }

  useEffect(() => {
    setInput(modalValue);
  }, [modalValue]);

  return (
    <ModalView visible={visible}>
      <Container>
        <Form>
          <Center>
            <Title>Atualizar</Title>
          </Center>
          <InputBlock>
            <InputBlockText>{text}</InputBlockText>
            <Line>
              <Input
                placeholder="Digite aqui..."
                value={input}
                onChangeText={setInput}
                keyboardType={type}
                maxLength={modalType === 'phone' ? 11 : 30}
                autoCapitalize="none"
              />
            </Line>
          </InputBlock>
          <Btn onPress={handleConfirm}>
            <ButtonText>Confirmar</ButtonText>
          </Btn>
          <Link onPress={() => setVisible(false)}>
            <LinkText>Cancelar</LinkText>
          </Link>
        </Form>
      </Container>
    </ModalView>
  );
};

export default InputModal;
