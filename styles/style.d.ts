import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      white: '#ffffff';
      black: '#000000';
      purple: '#8661de';
      blue: '#00bac7';
      gray: '#f6f6f6';
      green: '#07b495';
      DefaultPrimaryGreen: '#bdF486';
      PressedPrimaryGreen: '#abf066';
      lightGreen: '#99ecdd';
      darkGray: '#54595d';
      backgroundGray: '#eeeeee';
      backgroundHoverGray: '#e0e0e0';
      addTextGray: '#9e9e9e';
      gray_100: '#f5f5f5';
      gray_300: '#e5e5e5';
      gray_400: '#bdbdbd';
      gray_500: '#757575';
      gray_700: '#616161';
      profileNameBlack: '#212121';
    };
    fontWeight: {
      bold: 700;
      medium: 500;
    };
    desktop: '1200px';
  }
}
