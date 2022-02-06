import { IAddress } from '../Types/types';

export function formatAddress(userAddress: IAddress) {
  const { street, number, neighborhood, city, state, zip_code } = userAddress;

  const address = `${street} ${number}, ${neighborhood}, ${city}-${state}, ${zip_code}`;

  return address;
}
