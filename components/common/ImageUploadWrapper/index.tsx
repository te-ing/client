import * as S from './ImageUploadWrapper.style';
import useImageHandle from 'hooks/useImageHandle';
import AWS from 'aws-sdk';
import { useState } from 'react';

export interface ImageUploadPropsType {
  name: string;
  children: JSX.Element;
}

const ImageUploadWrapper = ({ children, name }: ImageUploadPropsType) => {
  // const storeImage = useImageHandle(name);
  const [firstImg, setFirstImg] = useState(null);
  const poolID = process.env.NEXT_PUBLIC_TEST_COGNITO;
  const bucket = process.env.NEXT_PUBLIC_BUCKET_NAME;

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = (e.target as HTMLInputElement).files[0];
    const currentFileName = currentFile.name.replaceAll(' ', '');
    console.log(currentFileName);
    console.log('why?');
    // console.log(process.env.NEXT_PUBLIC_TEST_COGNITO);
    AWS.config.update({
      region: 'ap-northeast-2', //process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolID,
      }),
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: currentFileName,
        Body: currentFile,
      },
    });

    const promise = upload.promise();

    promise.then((data) => {
      console.log(data);
      setFirstImg(data.Location);
    });

    // myBucket
    //   .putObject(params)
    //   .on('httpUploadProgress', (Progress, Response) => {
    //     console.log(Response);
    //   })
    //   .send((err) => {
    //     if (err) console.log(err);
    //   });

    // setIsUpload(true);
    // const uploadedUserProfileInfo = { ...userInfo, userProfile: readedFile };
    // setUserInfo(uploadedUserProfileInfo);
  };

  return (
    <>
      {/* <S.ProfileLabel htmlFor="file-input">{children}</S.ProfileLabel>
      <S.FileInput id="file-input" type="file" name={name} onChange={storeImage} /> */}
    </>
  );
};

export default ImageUploadWrapper;
