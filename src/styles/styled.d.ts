import 'styled-components/native';

export interface IColors {
  primary: string;
  secundary: string;

  background: string;

  normal: string;
  danger: string;
  info: string;
  success: string;
  warn: string;
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    title: string;

    colors: IColors;
  }
}
