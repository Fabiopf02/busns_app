import React from 'react';

import MapBoxGL from '@react-native-mapbox-gl/maps';
import config from '../../config/token';

MapBoxGL.setAccessToken(config.token);

import { MapView as Map, Title } from './styles';
import Directions from '../Directions';
import { ICompanies } from '../../Types/types';

interface IProps {
  card: ICompanies | undefined;
  cards: ICompanies[];
  position: [number, number];
  setPosition?: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const MapView: React.FC<IProps> = ({ card, cards, position }) => {
  // const onUpdatePosition = (location: MapBoxGL.Location) => {
  //   const { latitude, longitude } = location.coords;
  //   if (latitude === position[1] && longitude === position[0]) {
  //     return;
  //   }
  //   // setPosition([longitude, latitude]);
  // };

  return (
    <Map styleURL={MapBoxGL.StyleURL.Street} regionDidChangeDebounceTime={1000}>
      <MapBoxGL.UserLocation animated={true} showsUserHeadingIndicator={true} />
      <MapBoxGL.Camera
        centerCoordinate={position}
        minZoomLevel={13}
        maxZoomLevel={17}
        animationDuration={1000}
        animationMode="flyTo"
      />
      {cards !== undefined &&
        cards.map((item, index) => (
          <>
            <MapBoxGL.PointAnnotation
              anchor={{ x: 0.4, y: 0.2 }}
              children={<Title>{item.name}</Title>}
              key={item.id}
              id={index + item.name}
              title={item.name}
              coordinate={item.coords}
            />
            <MapBoxGL.PointAnnotation
              key={item.name}
              id={item.id + index}
              title={item.name}
              coordinate={item.coords}
            />
          </>
        ))}
      {card !== undefined && (
        <Directions
          key={'direction'}
          origin={position}
          destination={card.coords}
        />
      )}
    </Map>
  );
};

export default MapView;
