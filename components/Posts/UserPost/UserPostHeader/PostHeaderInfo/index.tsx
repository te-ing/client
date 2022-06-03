import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PostType } from 'types/post';
import { User } from 'types/user';

const PostHeaderInfo = ({ post, user }: { post: PostType; user: User }) => {
  const route = useRouter();
  const navigateToUserPage = () => {
    route.push(`/user/${user.id}`);
  };

  return (
    <InfoWrapper>
      <ProfileWrapper onClick={navigateToUserPage}>
        <ProfileIcon
          src={`${user.profileImage ? user.profileImage : '/images/icon-profile.svg'}`}
          width={82}
          height={82}
        />
      </ProfileWrapper>
      <PostInfoWrapper>
        <Title>{post.title}</Title>
        <UserInfoWrapper onClick={navigateToUserPage}>
          <UserName>{user.nickname}</UserName>
          <Breakpoint />
          <Category>{user.categories.map((category) => category.name).join(', ')}</Category>
        </UserInfoWrapper>
      </PostInfoWrapper>
    </InfoWrapper>
  );
};

export default PostHeaderInfo;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const UserName = styled.p`
  cursor: pointer;
`;

const Breakpoint = styled.div`
  display: flex;
  align-self: center;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #abf066;
`;

const Category = styled(UserName)``;
