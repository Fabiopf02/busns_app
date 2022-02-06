import React, { useEffect, useRef, useState } from 'react';
import mbxDir from '@mapbox/mapbox-sdk/services/directions';
import MapBoxGL, { LineLayerProps } from '@react-native-mapbox-gl/maps';

import config from '../../config/token';
import { lineString } from '@turf/helpers';

MapBoxGL.setAccessToken(config.token);

interface IProps {
  origin: [number, number];
  destination: [number, number];
}

const directions = mbxDir({ accessToken: config.token });
const style: LineLayerProps = {
  id: 'layerStyle',
  style: { lineWidth: 5, lineJoin: 'bevel', lineColor: '#7159c1' },
};

const Directions: React.FC<IProps> = ({ origin, destination }) => {
  const [route, setRoute] = useState<any>();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    async function fetchRoute() {
      console.log('dir');
      const { body } = await directions
        .getDirections({
          profile: 'driving-traffic',
          waypoints: [{ coordinates: origin }, { coordinates: destination }],
          geometries: 'geojson',
        })
        .send();
      if (!mountedRef.current) {
        return;
      }
      const newRoute = lineString(body.routes[0].geometry.coordinates);
      setRoute(newRoute);
    }
    fetchRoute();
    return () => {
      mountedRef.current = false;
    };
  }, [destination, origin]);

  return (
    <>
      {route && (
        <MapBoxGL.ShapeSource id="direction" shape={route}>
          <MapBoxGL.LineLayer id="direction-line" style={style.style} />
        </MapBoxGL.ShapeSource>
      )}
    </>
  );
};

export default Directions;
