import Image from 'next/image';
import styled from 'styled-components';
import { FlexBox, FlexCenter, FlexColumn, TextBox } from 'styles/commonStyles';

const MainCard = () => {
  return (
    <Wrapper>
      <PreviewImageBox>
        <Image src={'/images/logo.svg'} width="100%" height="100%" />
        <FolderAddIcon>
          <Image src={'/images/folder.svg'} width="24" height="24" />
        </FolderAddIcon>
      </PreviewImageBox>
      <CardInfo>
        <FlexCenter>
          <ProfileImageBox>
            <Image src={'/images/icon-profile.svg'} width={32} height={32} />
          </ProfileImageBox>
          <TextBox size="20" weight={600}>
            작업자 이름
          </TextBox>
        </FlexCenter>
        <FlexBox>
          <FlexBox style={{ cursor: 'pointer' }}>{/* LikesIcon */}5</FlexBox>
          <FlexBox style={{ cursor: 'pointer' }}>{/* BookmarkIcon */}5</FlexBox>
        </FlexBox>
      </CardInfo>
    </Wrapper>
  );
};

const Wrapper = styled(FlexColumn)`
  width: 364px;
  height: 328px;
  margin-bottom: 24px;
`;

const PreviewImageBox = styled(FlexCenter)`
  position: relative;
  height: 250px;

  border-radius: 1rem;
  border: 1px solid #8e8e8e;
  background-color: ${({ theme }) => theme.color.gray_500};
`;

const FolderAddIcon = styled(FlexCenter)`
  position: absolute;
  top: 16px;
  right: 16px;

  width: 32px;
  height: 32px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.gray_700};

  cursor: pointer;
`;

const CardInfo = styled(FlexBox)`
  justify-content: space-between;
  padding: 16px 0 0;
`;

const ProfileImageBox = styled.div`
  border-radius: 50%;
  margin-right: 8px;

  cursor: pointer;
`;

export default MainCard;
