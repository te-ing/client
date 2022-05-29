import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { message_icon } from 'constants/imgUrl';
const MessageButton = () => {
  return (
    <MessageBtn>
      <figure>
        <Image src={message_icon} width={24} height={24} />
      </figure>
      메시지
    </MessageBtn>
  );
};

export default MessageButton;

const MessageBtn = styled.button`
  width: 153px;
  height: 48px;
  background: ${({ theme }) => theme.color.PressedPrimaryGreen};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 1.4375;

  & > figure {
    margin-right: 12px;
    position: relative;
    top: 1.2px;
    display: flex;
    align-items: center;
  }
`;
