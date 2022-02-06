export interface ICompany {
  activated: boolean;
  account_id: string;
  closing: any;
  opening: any;
  description: string;
  email: string;
  website: string;
  phones: string[];
  images: string[];
  segment: string;
  id: string;
}

export interface IAddress {
  street: string;
  state: string;
  number: number;
  neighborhood: string;
  city: string;
  zip_code: string;
  coords: [number, number];
  account_id: string;
}

export interface IAccount {
  id: string;
  name: string;
  phone: number;
  type: string;
  created_at: Date;
  updated_at: Date;
}

export interface ILocation {
  data: {
    dados: [
      {
        uf: string;
        localidade: string;
        bairro: string;
        logradouroDNEC: string;
      },
    ];
  };
}

export interface IProduct {
  name: string;
  price: number;
  barcode: string;
  image_url: string | undefined;
  id: string;
  company_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanies {
  id: string;
  name: string;
  type: string;
  segment: string;
  coords: [number, number];
  opening: Date;
  closing: Date;
}

export interface IService {
  id: string;
  name: string;
  price: number;
  delivery: boolean;
  schedulable: boolean;
  associated_product: boolean;
  activated: boolean;
  company_id: string;
}

export interface IUser {
  account: IData;
  token: string;
}

export interface Company extends ICompany {
  account: IAccount;
  address: IAddress;
}

export interface IAgenda {
  id: string;
  requested: string;
  received: string;
  service_id: string;
  canceled: boolean;
  confirmed: boolean;
  who_canceled: string;
  reason_cancellation: string;
  price: number;
  time: Date;
  date: Date;
  company_name?: string;
  user_name?: string;
  account_id: string;
  delivery: boolean;
  associated_product: boolean;
  service_name: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IPurchase {
  id?: number;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  the_amount: number;
  schedule_id: string;
  price: number;
}

export interface IData extends IAccount {
  company?: ICompany;
  address: IAddress;
  token: string;
}

//Routes.ts
export interface IResponse {
  user: IUser;
}
interface IHeaders {
  token: string;
  userId: string;
  companyId: string;
}
interface INewService extends IHeaders {
  segment: string;
  service?: IService;
}
interface IServices extends IHeaders {
  company?: boolean;
}
interface IProducts extends IHeaders {
  pcs: boolean;
  companyData: {
    account: IAccount;
    address: IAddress;
  };
}
interface ICheckout extends IHeaders {
  purchase: IPurchase[];
  companyData: {
    account: IAccount;
    address: IAddress;
  };
}

interface IAddProduct extends IHeaders {
  product: IProduct;
}

export type ParamList = {
  Detail: {
    data: {
      id: string;
    };
    user: {
      token: string;
      account: IData;
    };
  };
  Camera: IResponse;
  Register: undefined;
  Home: IResponse;
  Company: IResponse;
  Services: IServices;
  Logon: {
    phone: string;
  };
  Products: IProducts;
  AddProduct: IAddProduct;
  NewService: INewService;
  ToSchedule: {
    data: IService;
    user: IHeaders;
  };
  Agenda: {
    user: IUser;
    companyId: string;
    token: string;
  };
  Checkout: ICheckout;
  Profile: {
    account: IData;
    token: string;
  };
  AgendaDetails: {
    data: IAgenda;
    user: IUser;
  };
};
