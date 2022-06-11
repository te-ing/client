import { warning_icon } from 'constants/imgUrl';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import postsApi from 'apis/posts.api';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { editPostState } from 'recoil/editRecoil';
import teamPostsApi from 'apis/teamPosts.api';
import { useRouter } from 'next/router';

interface Props {
  deleteModalOff: (e: React.MouseEvent<HTMLButtonElement>) => void;
  postId: number;
  isTeam: boolean;
}

const userPostDelete = (id: number) => postsApi.deletePost(id, { isRequiredLogin: true });

const teamPostDelete = (id: number) => teamPostsApi.deleteTeamPost(id, { isRequiredLogin: true });

const DeleteModal = ({ deleteModalOff, postId, isTeam }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [editPost, setEditPost] = useRecoilState(editPostState);
  const { mutate: deletePost } = useMutation(() => (isTeam ? teamPostDelete(postId) : userPostDelete(postId)), {
    onSuccess: () => {
      setEditPost({ ...editPost, id: -1 });
      queryClient.invalidateQueries(isTeam ? ['team-profile', id] : ['user-profile', id]);
      queryClient.invalidateQueries(isTeam ? ['team-posts', id] : ['user-posts', id]);
    },
  });
  const deletePostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deletePost();
  };
  return (
    <Modal>
      <Warning>
        <Image src={warning_icon} width={24} height={24} />
        <h1>정말로 삭제하시겠습니까?</h1>
        <p>삭제 이후 게시물을 다시 되돌리기 어렵습니다.</p>
      </Warning>
      <ButtonWrapper>
        <Button onClick={deletePostHandler}>게시물 삭제</Button>
        <Button bgColor onClick={deleteModalOff}>
          취소하기
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default DeleteModal;

const Modal = styled.div`
  z-index: 100;
  position: fixed;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 187px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14), 0 6px 30px rgba(0, 0, 0, 0.12), 0 8px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.color.gray_200};
  border-radius: 4px;
`;

const Warning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > h1 {
    margin: 8px 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4375;
    letter-spacing: 0.02em;
  }

  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.142857;
    letter-spacing: 0.4px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ bgColor?: boolean }>`
  width: 139px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor, theme }) => (bgColor ? theme.color.PressedPrimaryGreen : theme.color.gray_200)};
`;
