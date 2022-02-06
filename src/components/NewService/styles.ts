import styled from 'styled-components/native';
import { HEADER_HEIGHT, MARGIN, WIDTH } from '../../Constants/Card';
import { Button } from '../../pages/Register/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  selected: {
    fontWeight: 'bold',
  },
  picker: {
    fontSize: 18,
    color: '#7159c1',
  },
});

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + 10,
    alignItems: 'center',
  },
})`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Block = styled.View`
  width: ${WIDTH}px;
  margin-vertical: ${MARGIN}px;
`;

export const BlockText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.normal};
  letter-spacing: 0.5px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
  returnKeytype: 'next',
})`
  width: 100%;
  height: 45px;
  padding: 2px;
  font-size: 18px;
  color: ${props => props.theme.colors.normal};
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.normal}80;
`;

export const MInput = styled(Input)`
  width: 80px;
`;

export const Btn = styled(Button)`
  width: 80%;
  left: 0px;
`;
