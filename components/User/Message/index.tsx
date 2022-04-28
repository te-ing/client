import React from 'react';
import Image from 'next/image';
import { MessageButton } from 'components/common/Atomic/Tabs/Button';
const Message = () => {
  return (
    <MessageButton>
      <Image src="/images/icon-message.svg" width={24} height={24} />
      <span>메시지</span>
    </MessageButton>
  );
};

export default Message;
