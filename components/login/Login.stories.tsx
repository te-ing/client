import React from 'react';

import { ComponentMeta } from '@storybook/react';

import Login from './Login';

export default {
  component: Login,
  title: 'Login',
} as ComponentMeta<typeof Login>;

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {};
