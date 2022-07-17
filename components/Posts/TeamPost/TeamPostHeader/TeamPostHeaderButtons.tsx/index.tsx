import styled from 'styled-components';
import { PostType } from 'types/post';
import Image from 'next/image';
import usersApi from 'apis/users.api';
import Login from 'components/Login';
import useModal from 'hooks/useModal';
import { isLoggedIn } from 'utils/isLoggedIn';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TeamTypes } from 'types/team';
import TeamPostsAPI from 'apis/teamPosts.api';

interface data {
  status?: number;
}
const TeamPostHeaderButtons = ({ postId, team }: { postId: number; team: TeamTypes }) => {
  const getPost = async () => {
    const data = await TeamPostsAPI.getTeamPost(postId, { isRequiredLogin: isLoggedIn() });
    return data;
  };

  const { data, isLoading } = useQuery<PostType>('post', getPost);
  const { setModalVisible, isShowing } = useModal();
  const queryClient = useQueryClient();
  const isOwnPost = team.id.toString() === sessionStorage.getItem('id');
  const post = data;

  const likePostMutate = useMutation(() => TeamPostsAPI.likeTeamPost(postId, { isRequiredLogin: isLoggedIn() }), {
    onSuccess: (data: data) => {
      data.status === 401 ? setModalVisible() : queryClient.invalidateQueries('post');
    },
  });
  const scrapPostMutate = useMutation(() => TeamPostsAPI.scrapTeamPost(postId, { isRequiredLogin: isLoggedIn() }), {
    onSuccess: (data: data) => {
      data.status === 401 ? setModalVisible() : queryClient.invalidateQueries('post');
    },
  });
  const followUserMutate = useMutation(() => usersApi.followUser(team.id, { isRequiredLogin: isLoggedIn() }), {
    onSuccess: (data: data) => {
      data.status === 401 ? setModalVisible() : queryClient.invalidateQueries();
    },
  });

  const handlePostLike = () => likePostMutate.mutate();
  const handlePostScrap = () => scrapPostMutate.mutate();
  const handleUserFollow = () => followUserMutate.mutate();

  return isLoading ? (
    <div>Loading..</div>
  ) : (
    <HeaderButtonsWrapper>
      <ButtonWrapper onClick={handlePostLike}>
        <ImageWrapper>
          <ButtonImage
            alt="like_btn"
            src={post.isLike ? '/images/like.svg' : '/images/like-border.svg'}
            width="30px"
            height="30px"
          />
        </ImageWrapper>
        <ButtonName>좋아요</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper onClick={handlePostScrap}>
        <ImageWrapper>
          <ButtonImage
            alt="scrap_btn"
            src={post.isScrap ? '/images/scrap.svg' : '/images/scrap-border.svg'}
            width="18px"
            height="18px"
          />
        </ImageWrapper>
        <ButtonName>스크랩</ButtonName>
      </ButtonWrapper>
      {isOwnPost ? (
        ''
      ) : (
        <ButtonWrapper onClick={handleUserFollow}>
          {/* <FollowImageWrapper isFollowing={team.isFollowed}>
            <ButtonImage alt="follow_btn" src="/images/add.svg" width="26px" height="26px" />
          </FollowImageWrapper>
          <ButtonName>팔로우</ButtonName> */}
        </ButtonWrapper>
      )}
      <Login isShowing={isShowing} setModalVisible={setModalVisible} />
    </HeaderButtonsWrapper>
  );
};

export default TeamPostHeaderButtons;

const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{ isFollowing?: boolean }>`
  display: flex;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: #eeeeee;
`;

// const FollowImageWrapper = styled(ImageWrapper)<{ isFollowing?: boolean }>`
//   background-color: ${(props) => props.isFollowing && '#E4FACC'};
// `;

const ButtonImage = styled(Image)``;

const ButtonName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
`;
