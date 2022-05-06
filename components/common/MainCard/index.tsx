import Image from 'next/image';
import styled from 'styled-components';
import { FlexBox, FlexCenter, FlexColumn, TextBox } from 'styles/commonStyles';

const MainCard = () => {
  return (
    <Wrapper>
      <PreviewImageBox>
        <Image src={'/images/logo.svg'} width="100%" height="100%" />
      </PreviewImageBox>
      <CardInfo>
        <FlexCenter>
          <ProfileImageBox>
            <Image src={'/images/profile-edit.svg'} width={32} height={32} />
          </ProfileImageBox>
          <TextBox size="20" weight={600}>
            작업자 이름
          </TextBox>
        </FlexCenter>
        <FlexBox>
          <FlexBox>{/* LikesIcon */}5</FlexBox>
          <FlexBox>{/* BookmarkIcon */}5</FlexBox>
        </FlexBox>
      </CardInfo>
    </Wrapper>
  );
};

const Wrapper = styled(FlexColumn)`
  width: 300px;
  margin-bottom: 24px;
`;

const PreviewImageBox = styled(FlexCenter)`
  height: 250px;

  border-radius: 1rem;
  border: 1px solid #8e8e8e;
`;

const CardInfo = styled(FlexBox)`
  justify-content: space-between;
  padding: 16px 0 0;
`;

const ProfileImageBox = styled.div`
  border-radius: 50%;
  border: 1px solid #8e8e8e;
  margin-right: 8px;
`;

export default MainCard;
