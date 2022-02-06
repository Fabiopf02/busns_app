import MbxGeo from '@mapbox/mapbox-sdk/services/geocoding';
import config from '../config/token';

const geocoder = MbxGeo({ accessToken: config.token });

interface Response {
  body: {
    features: [
      {
        text: string;
      },
    ];
  };
}

async function getGeocoding(coords: [number, number]): Promise<string> {
  try {
    const response: Response = await geocoder
      .reverseGeocode({
        mode: 'mapbox.places',
        types: ['neighborhood'],
        query: coords,
        limit: 1,
      })
      .send();

    return response.body.features[0].text;
  } catch (err) {
    return err;
  }
}

export { getGeocoding };
