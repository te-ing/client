import React from 'react';
import styled from 'styled-components';

interface Props {
  editMode: boolean;
  originNickname: string;
  changedNickname: string;
  handler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  initProfile: () => void;
}

const Nickname = ({ editMode, originNickname, changedNickname, handler, initProfile }: Props) => {
  return (
    <>
      {editMode ? (
        <>
          <EditNickname
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={handler}
            value={changedNickname}
          />
          <InitButton onClick={initProfile}>프로필 초기화</InitButton>
        </>
      ) : (
        <h1>{originNickname}</h1>
      )}
    </>
  );
};

export default Nickname;

const EditNickname = styled.input`
  width: 240px;
  height: 26px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  margin-bottom: 16px;
  &::placeholder {
    font-family: 'Noto Sans KR', sans serif;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
    color: ${({ theme }) => theme.color.gray_400};
  }
`;

const InitButton = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  color: ${({ theme }) => theme.color.gray_500};
  margin-left: 16px;
`;
