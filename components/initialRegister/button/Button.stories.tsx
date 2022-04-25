import React from 'react';
import Button from '.';

export default {
  component: Button,
  title: 'InitialRegister Button',
};

const Template = (args) => <Button {...args} />;

export const SetUserProfile = Template.bind({});
SetUserProfile.args = {
  sort: 'setUserProfile',
  name: '관심분야 설정하러가기',
};

export const SetUserInterest = Template.bind({});
SetUserInterest.args = {
  sort: 'setUserInterest',
  name: '관심분야 설정 완료',
};

export const CompleteRegister = Template.bind({});
CompleteRegister.args = {
  sort: 'setUserComplete',
  name: '프로필 설정하기',
};
