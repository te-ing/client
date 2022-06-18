import React, { useState } from 'react';
import postsApi from 'apis/posts.api';
import styled from 'styled-components';
import Image from 'next/image';
import { delete_button, edit_button } from 'constants/imgUrl';
import DeleteModal from '../DeleteModal';
import { useMutation, useQueryClient } from 'react-query';
import teamsApi from 'apis/teams.api';
import Router from 'next/router';

interface Props {
  postId: number;
  isTeam: boolean;
}

const PopUp = ({ postId, isTeam }: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteModalOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteModal(true);
  };

  const deleteModalOff = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteModal(false);
  };

  const moveToEdit = () => {
    Router.push(isTeam ? `/team/edit/${postId}` : `/user/edit/${postId}`);
  };
  return (
    <PopUpContainer onClick={(e) => e.stopPropagation()}>
      {deleteModal && <DeleteModal deleteModalOff={deleteModalOff} postId={postId} isTeam={isTeam} />}

      <EditButton onClick={moveToEdit}>
        <Image src={edit_button} width={16} height={16} />
        <span>수정하기</span>
      </EditButton>
      <DeleteButton onClick={deleteModalOn}>
        <Image src={delete_button} width={16} height={16} />
        <span>삭제하기</span>
      </DeleteButton>
    </PopUpContainer>
  );
};

export default PopUp;

const PopUpContainer = styled.div`
  z-index: 100;
  right: -104px;
  top: 16px;
  position: absolute;
  width: 120px;
  height: 112px;
  padding: 16px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

const EditButton = styled.button`
  padding: 10px 0;
  width: 88px;
  height: 40px;
  display: flex;
  align-items: center;
  & > span {
    font-weigth: 500;
    font-size: 14px;
    line-height: 1.428571;
    margin-left: 8px;
  }

  &:hover {
    background: ${({ theme }) => theme.color.gray_200};
  }
`;
const DeleteButton = styled.button`
  padding: 10px 0;
  width: 88px;
  height: 40px;
  display: flex;
  align-items: center;
  & > span {
    font-weigth: 500;
    font-size: 14px;
    line-height: 1.428571;
    margin-left: 8px;
    color: ${({ theme }) => theme.color.warningRed};
  }
  &:hover {
    background: ${({ theme }) => theme.color.gray_200};
  }
`;
