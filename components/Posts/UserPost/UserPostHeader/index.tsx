import usersApi from 'apis/users.api';
import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PostType } from 'types/post';
import { User } from 'types/user';

const UserPostHeader = ({ post }: { post: PostType }) => {
  const getUserInfo = async () => {
    const data = await usersApi.getUserInfo(post.author);
    return data;
  };
  const { data, isLoading } = useQuery<User>('user', getUserInfo);

  return !isLoading ? (
    <Header>
      <InfoWrapper>
        <ProfileWrapper>
          <ProfileIcon
            src={`${data.profileImage ? data.profileImage : '/images/icon-profile.svg'}`}
            width={82}
            height={82}
          />
        </ProfileWrapper>
        <PostInfoWrapper>
          <Title>{post.title}</Title>
          <UserInfoWrapper>
            <UserName>{data.nickname}</UserName>
            <Breakpoint />
            <Category>{data.categories.map((category) => category.name).join(', ')}</Category>
          </UserInfoWrapper>
        </PostInfoWrapper>
      </InfoWrapper>
      <ButtonWrapper></ButtonWrapper>
    </Header>
  ) : (
    <LoadingHeader />
  );
};

export default UserPostHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding: 23px;
  background-color: lightgrey;
`;

const LoadingHeader = styled(Header)`
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: coral;
`;

const ProfileWrapper = styled.div``;

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
const UserName = styled.p``;

const Breakpoint = styled.div`
  display: flex;
  align-self: center;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #abf066;
`;

const Category = styled(UserName)``;

const ButtonWrapper = styled.div`
  width: 300px;
  background-color: coral;
`;
