import Dotenv from 'dotenv';
Dotenv.config();

import React, { useState } from 'react';

import AWS from 'aws-sdk';

import { useRecoilState } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';
import type { UserRegisterInfoType } from 'recoil/auth';

const useImageHandle = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserRegisterInfoType>(userRegisterInfoState);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_STORAGE_BUCKET_NAME } = process.env;

  AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = (e.target as HTMLInputElement).files[0];

    const params = {
      ACL: 'public-read',
      Body: currentFile,
      Bucket: AWS_STORAGE_BUCKET_NAME,
      Key: `upload/${currentFile.name}`,
    };

    const upload = new AWS.S3.ManagedUpload({
      params: params,
    });

    upload
      .promise()
      .then(() => {
        alert('image upload success!');
      })
      .catch((e) => {
        alert(`occur error: ${e.message}`);
      });

    setIsUpload(true);
    // const uploadedUserProfileInfo = { ...userInfo, userProfile: readedFile };
    // setUserInfo(uploadedUserProfileInfo);
  };

  return { storeImage };
};

export default useImageHandle;
