import * as S from './Register.style';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { default_profile } from 'constants/imgUrl';

const contents = ['image', 'edit', 'video'];

const Register = () => {
  const [imgFile, setImgFile] = useState(null);
  const inputOpenImageRef = useRef(null);

  const handleChangeFile = (e) => {
    const reader = new FileReader();

    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      setImgFile(e.target.result);
    };
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  return (
    <S.Wrapper>
      {imgFile ? (
        <S.ImageContainer>
          <Image src={imgFile ? imgFile : default_profile} width="300" height="300" />
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
      <S.UploadButton>업로드 하기</S.UploadButton>
    </S.Wrapper>
  );
};

export default Register;
