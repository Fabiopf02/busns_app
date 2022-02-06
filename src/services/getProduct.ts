import axios from 'axios';
import config from '../config/token';

const api = axios.create({
  baseURL: 'https://api.cosmos.bluesoft.com.br/',
});

interface IResponse {
  thumbnail: string;
  description: string;
}

export async function getProduct(barcode: string): Promise<IResponse> {
  try {
    const response = await api.get(`/gtins/${barcode}`, {
      headers: {
        'X-Cosmos-Token': config.cosmos,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err) {
    return {
      thumbnail: '',
      description: '',
    };
  }
}
