import styled from 'styled-components/native';
import { HEADER_HEIGHT, WINDOW_W } from '../../Constants/Card';

export const BigText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  padding-horizontal: 4px;
  color: ${props => props.theme.colors.secundary};
`;
export const MediumText = styled(BigText)`
  font-size: 30px;
  color: #cccccc;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + 10,
    paddingBottom: HEADER_HEIGHT,
  },
})`
  flex: 1;
`;

export const Section = styled.View`
  width: ${WINDOW_W}px;
  padding-vertical: 10px;
  margin-vertical: 15px;
  min-height: 50px;
  background-color: transparent;
`;
