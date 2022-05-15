import * as S from './Register.style';
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
// import axios from axios;
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { default_profile } from 'constants/imgUrl';

const contents = ['image', 'edit', 'video'];

dotenv.config();

const Register = () => {
  const [imgFile, setImgFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const inputOpenImageRef = useRef(null);

  // const imagePatchConfig = {
  //   headers: {
  //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
  //     'Content-Type': 'application/json',
  //   },
  // };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    // 로컬에 미리보기 렌더링
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
  };

  // S3에 최종 선택한 이미지 업로드
  const handleUpload = (e) => {
    const newFileName = uuidv4();

    const config = {
      bucketName: process.env.AWS_STORAGE_BUCKET_NAME,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);
    console.log(imgFile.type);
    console.log(imgFile);

    if (imgFile) {
      if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png' || imgFile.type === 'image/jpg') {
        console.log(imgFile);
        ReactS3Client.uploadFile(imgFile, newFileName).then((data) => {
          console.log(data);
        });
      } else {
        alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
        e.target.value = null;
      }
    }
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  return (
    <S.Wrapper>
      {imgFile ? (
        <S.ImageContainer>
          <Image src={previewImage ? previewImage : default_profile} width="300" height="300" />
        </S.ImageContainer>
      ) : (
        <>
          <S.RegisterSubInfo>컨텐츠를 등록해주세요!</S.RegisterSubInfo>
          <S.RegisterButtonWrapper>
            {contents.map((content) => {
              return (
                <ImageUploadWrapper name="works" key={content}>
                  <S.RegisterButton onClick={handleOpenImageRef}>
                    <Image
                      alt={content}
                      src={
                        content === 'image'
                          ? '/images/icon-upload_image.svg'
                          : content === 'edit'
                          ? '/images/icon-upload_edit.svg'
                          : '/images/icon-upload_video.svg'
                      }
                      width="20px"
                      height="20px"
                    />
                    <div style={{ display: 'none' }}>
                      <input
                        type="file"
                        name="imgFile"
                        id="imgFile"
                        onChange={(e) => handleChangeFile(e)}
                        ref={inputOpenImageRef}
                      />
                    </div>
                  </S.RegisterButton>
                </ImageUploadWrapper>
              );
            })}
          </S.RegisterButtonWrapper>
        </>
      )}
      <S.UploadButton onClick={(e) => handleUpload(e)}>업로드 하기</S.UploadButton>
      {/* <S.UploadButton>업로드 하기</S.UploadButton> */}
    </S.Wrapper>
  );
};

export default Register;
