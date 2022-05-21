import * as S from './ImageUploadWrapper.style';
import useImageHandle from 'hooks/useImageHandle';

export interface ImageUploadPropsType {
  name: string;
  children: JSX.Element;
}

const ImageUploadWrapper = ({ children, name }: ImageUploadPropsType) => {
  const { storeImage } = useImageHandle(name);

  return (
    <>
      <S.ProfileLabel htmlFor="file-input">{children}</S.ProfileLabel>
      <S.FileInput id="file-input" type="file" name={name} onChange={storeImage} />
    </>
  );
};

export default ImageUploadWrapper;
