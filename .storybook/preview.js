import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from './theme';
import GlobalStyle from './reset';

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
