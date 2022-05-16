import * as S from './Register.style';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import useImageHandle from 'hooks/useImageHandle';
import Image from 'next/image';

const contents = ['image', 'edit', 'video'];

const Register = () => {
  return (
    <S.Wrapper>
      <div>
        <S.RegisterSubInfo>컨텐츠를 등록해주세요!</S.RegisterSubInfo>
        <S.RegisterButtonWrapper>
          {contents.map((content) => {
            console.log(contents);
            return (
              <ImageUploadWrapper name="works" key={content}>
                <S.RegisterButton onClick={() => useImageHandle}>
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
                </S.RegisterButton>
              </ImageUploadWrapper>
            );
          })}
        </S.RegisterButtonWrapper>
      </div>
      <S.UploadButton>업로드 하기</S.UploadButton>
    </S.Wrapper>
  );
};

export default Register;
