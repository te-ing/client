import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { scrap_icon, edit_icon } from 'constants/imgUrl';

interface Props {
  item: string; //작품 정보에 대한 타입을 정의해줘야함
  editMode?: boolean;
}
const Thumbnail: React.FC<Props> = ({ item, editMode }) => {
  return (
    <ItemCard>
      <ImageWrapper>
        <Image src={editMode ? edit_icon : scrap_icon} width={24} height={24} />
      </ImageWrapper>
      {item.length > 0 && (
        <ItemInfo>
          <p>{item}</p>
        </ItemInfo>
      )}
    </ItemCard>
  );
};

export default Thumbnail;

const ItemCard = styled.div`
  position: relative;
  width: 363px;
  height: 280px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray_500};
  overflow: hidden;
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 70.31%);
  width: 100%;
  height: 100px;
  padding: 0 16px;

  p {
    position: absolute;
    color: ${({ theme }) => theme.color.white};
    font-weght: ${({ theme }) => theme.fontWeight.medium};
    font-size: 16px;
    line-height: 1.4375;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 332px;
    height: 23px;
    bottom: 16px;
  }
`;

const ImageWrapper = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 32px;
  height: 32px;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
