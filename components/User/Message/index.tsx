import React from 'react';
import Image from 'next/image';
import { MessageButton } from 'components/common/Atomic/Tabs/Button';
import { message_icon } from 'constants/imgUrl';
const Message = () => {
  return (
    <MessageButton>
      <Image src={message_icon} width={24} height={24} />
      <span>메시지</span>
    </MessageButton>
  );
};

export default Message;
