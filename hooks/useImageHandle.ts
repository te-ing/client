import React, { useState } from 'react';

import AWS from 'aws-sdk';

import { useRecoilState } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

const useImageHandle = (name: string) => {
  // const [info, setInfo] = (function fetchStore(name) {
  //   switch (name) {
  //     case 'profile':
  //       return useRecoilState<UserRegisterInfoType>(userRegisterInfoState);
  //   }
  // })(name);
  const [isUpload, setIsUpload] = useState(false);

  const awsObj = AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  });

  console.log(awsObj);

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.NEXT_PUBLIC_AWS_STORAGE_BUCKET_NAME },
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = (e.target as HTMLInputElement).files[0];
    const currentFileName = currentFile.name.replaceAll(' ', '');
    console.log(currentFile);
    console.log(currentFileName);

    const params = {
      ACL: 'public-read',
      Body: currentFile,
      Bucket: process.env.NEXT_PUBLIC_AWS_STORAGE_BUCKET_NAME,
      Key: `${name}/${currentFileName}`,
      ContentType: 'text/plain',
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (Progress, Response) => {
        console.log(Response);
      })
      .send((err) => {
        if (err) console.log(err);
      });

    setIsUpload(true);
    // const uploadedUserProfileInfo = { ...userInfo, userProfile: readedFile };
    // setUserInfo(uploadedUserProfileInfo);
  };

  return { storeImage };
};

export default useImageHandle;
