import styled from 'styled-components/native';
import MapBoxGL from '@react-native-mapbox-gl/maps';

export const MapView = styled(MapBoxGL.MapView)`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 10px;
  color: #7159c1;
  text-align: center;
  width: 70px;
  background-color: #7159c130;
  border-radius: 4px;
`;
