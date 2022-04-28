import React from 'react';
import { UploadProductButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
const UploadProduct = () => {
  return (
    <UploadProductButton bgColor>
      <Image src="/images/profile-edit-write2.svg" width={24} height={24} />
      <span>작품 업로드</span>
    </UploadProductButton>
  );
};

export default UploadProduct;
