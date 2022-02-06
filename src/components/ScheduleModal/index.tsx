import React, { useEffect, useState } from 'react';
import { BigText } from '../../pages/Checkout/styles';
import { Container, ModalView, Form } from '../AddressModal/styles';
import { Block, BlockText } from '../NewService/styles';
import { ButtonText, Center, Text } from '../../pages/Company/styles';
import { Btn } from '../AddressModal/styles';

import DatePicker from '@react-native-community/datetimepicker';
import { ButtonS } from '../ToSchedule';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatTime } from '../../utils/formatTime';
import { formatDate } from '../../utils/formatDate';
import styled from 'styled-components/native';

const Button = styled(Btn)`
  width: 92%;
  left: 0px;
`;

interface IProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
  schedule: boolean;
  setSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleModal: React.FC<IProps> = ({
  date = new Date(),
  setDate,
  time = new Date(),
  setTime,
  schedule,
  setSchedule,
}) => {
  const [timeText, setTimeText] = useState('');
  const [dateText, setDateText] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    setTimeText(formatTime([time]));
    setDateText(formatDate(date));
  }, [time, date]);

  return (
    <ModalView animationType="slide" visible={schedule}>
      <Container>
        <Form>
          <BigText>Agendamento do serviço</BigText>
          <Block>
            <Center>
              <BlockText>Data para atendimento</BlockText>
            </Center>
            <ButtonS onPress={() => setShowDate(true)}>
              <Text>
                {dateText} <Icon name="calendar" size={26} />
              </Text>
            </ButtonS>
            {showDate === true && (
              <DatePicker
                mode="date"
                value={date || new Date()}
                onChange={(_, t) => {
                  setShowDate(false);
                  setDate(t ?? date);
                }}
                minimumDate={new Date()}
              />
            )}
          </Block>
          <Block>
            <Center>
              <BlockText>Horário para atendimento</BlockText>
            </Center>
            <ButtonS onPress={() => setShowTime(true)}>
              <Text>
                {timeText} <Icon name="clock-time-four-outline" size={26} />
              </Text>
            </ButtonS>
            {showTime === true && (
              <DatePicker
                mode="time"
                value={time || new Date()}
                onChange={(_, t) => {
                  setShowTime(false);
                  setTime(t ?? time);
                }}
              />
            )}
          </Block>
          <Center>
            <Button onPress={() => setSchedule(false)}>
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </Center>
        </Form>
      </Container>
    </ModalView>
  );
};

export default ScheduleModal;
