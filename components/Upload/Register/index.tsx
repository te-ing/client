import * as S from './Register.style';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import Image from 'next/image';
import { SetStateAction, useCallback, useRef, useState } from 'react';
import { default_profile, upload_image_icon, upload_video_icon } from 'constants/imgUrl';
import { useUploadImage } from 'hooks/useUploadImage';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import AWS from 'aws-sdk';
import shortId from 'shortid';
import { UploadType } from 'types/post';
import { UseMutateFunction } from 'react-query';
const contents = ['image', 'edit', 'video'];

interface Props {
  values: UploadType;
  setValues: React.Dispatch<SetStateAction<UploadType>>;
  upload: UseMutateFunction<unknown, unknown, void, unknown>;
}

const Register = ({ values, setValues, upload }: Props) => {
  const imageInput = useRef(null);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const currentFile = (e.target as HTMLInputElement).files[0];
      const currentFileName = currentFile.name.replaceAll(' ', '') + shortId.generate();
      const { name } = e.target;
      AWS.config.update({
        region: 'ap-northeast-2',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.NEXT_PUBLIC_TEST_COGNITO,
        }),
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
          Key: currentFileName,
          Body: currentFile,
        },
      });

      const promise = upload.promise();

      const url = await promise.then((data) => {
        console.log('S3 이미지', data);
        setValues({ ...values, [name]: [...values.images, data.Location] });
        return data.Location;
      });
    } catch (err) {
      console.log('이미지 선택안함');
    }
  };

  const uploadProduct = () => {
    if (values.title.length > 0) {
      console.log('업로드 성공');
      upload();
    }
  };
  return (
    <S.Wrapper>
      <input type="file" name="images" hidden ref={imageInput} onChange={storeImage} />
      {values.images.length === 0 && (
        <S.RegisterWrapper>
          <S.RegisterSubInfo>컨텐츠를 등록해주세요!</S.RegisterSubInfo>
          <S.RegisterButtonWrapper>
            <S.RegisterButton width="72px" height="72px" onClick={onClickImageUpload}>
              <Image src={upload_image_icon} width={24} height={24} />
            </S.RegisterButton>
            <S.RegisterButton width="72px" height="72px">
              <Image src={upload_video_icon} width={24} height={24} />
            </S.RegisterButton>
          </S.RegisterButtonWrapper>
        </S.RegisterWrapper>
      )}

      {values.images.map((img, i) => (
        <S.ImageContainer key={i} img={img}>
          {i === values.images.length - 1 && (
            <div>
              <S.RegisterButton width="56px" height="56px" onClick={onClickImageUpload}>
                <Image src={upload_image_icon} width={24} height={24} />
              </S.RegisterButton>
              <S.RegisterButton width="56px" height="56px">
                <Image src={upload_video_icon} width={24} height={24} />
              </S.RegisterButton>
            </div>
          )}
        </S.ImageContainer>
      ))}
      <S.UploadButton onClick={uploadProduct}>업로드 하기</S.UploadButton>
    </S.Wrapper>
  );
};

export default Register;
