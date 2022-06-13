import React from 'react';
import Router, { useRouter } from 'next/router';
import { UploadProductButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';

interface Props {
  isTeam: boolean;
}

const UploadProduct = ({ isTeam }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const moveToUpload = () => {
    isTeam ? Router.push(`/team/upload/${id}`) : Router.push('/user/upload');
  };
  return (
    <UploadProductButton bgColor onClick={moveToUpload}>
      <Image src="/images/profile-edit-write2.svg" width={24} height={24} />
      <span>작품 업로드</span>
    </UploadProductButton>
  );
};

export default UploadProduct;
