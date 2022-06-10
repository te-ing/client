import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { scrap_icon, edit_icon } from 'constants/imgUrl';
import { PostType } from 'types/post';
import Link from 'next/link';

interface Props {
  item: PostType;
  editMode?: boolean;
}
const Thumbnail: React.FC<Props> = ({ item, editMode }) => {
  // Link로 작품 클릭하면 작품 란으로 이동
  return (
    <Link href={`/post/${item.id}`}>
      <ItemCard>
        {item.images.length > 0 && (
          <Image src={item.images[0].image} layout="responsive" width={100} height={100} quality="100" />
        )}
        {editMode && (
          <ImageWrapper>
            <Image src={editMode ? edit_icon : scrap_icon} width={24} height={24} />
          </ImageWrapper>
        )}

        {item.title.length > 0 && (
          <ItemInfo>
            <p>{item.title}</p>
          </ItemInfo>
        )}
      </ItemCard>
    </Link>
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
