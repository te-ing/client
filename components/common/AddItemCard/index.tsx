import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { AddImageWrapper, AddImageSvg } from '../Atomic/AddItem';

interface Props {
  isTeam: boolean;
}
const AddItem = ({ isTeam }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Link href={isTeam ? `/team/upload/${id}` : '/user/upload'}>
      <AddItemCard>
        <AddImageWrapper>
          <AddImageText>게시물을 추가 해주세요.</AddImageText>
          <AddImageSvg width={80} height={80} />
        </AddImageWrapper>
      </AddItemCard>
    </Link>
  );
};

export default AddItem;

const AddItemCard = styled.div`
  width: 363px;
  height: 280px;
  background-color: ${({ theme }) => theme.color.gray_100};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const AddImageText = styled.span`
  color: ${(props) => props.theme.color.addTextGray};
  font-size: 14px;
  margin-bottom: 16px;
`;
