import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { edit_icon, edit_icon_pressed } from 'constants/imgUrl';
import { PostType } from 'types/post';
import Link from 'next/link';
import { editPostState } from 'recoil/editRecoil';
import { useRecoilState } from 'recoil';
import PopUp from 'components/Profile/PopUp';

interface Props {
  item: PostType;
  editMode?: boolean;
  isTeam: boolean;
}

const Thumbnail: React.FC<Props> = ({ item, editMode, isTeam }) => {
  const [editPost, setEditPost] = useRecoilState(editPostState);

  const postEditHandler = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditPost({ ...editPost, id });
  };
  return (
    <Link href={isTeam ? `/post/team/${item.id}` : `/post/${item.id}`}>
      <ItemCard>
        {item.images.length > 0 && <ItemImage src={item.images[0].image} layout="fill" quality="100" />}
        {editMode && (
          <>
            <ImageWrapper onClick={postEditHandler(item.id)}>
              <Image src={editPost.id === item.id ? edit_icon_pressed : edit_icon} width={32} height={32} />
            </ImageWrapper>
            {editPost.id === item.id && <PopUp postId={item.id} isTeam={isTeam} />}
          </>
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
  cursor: pointer;
  position: relative;
  width: 363px;
  height: 280px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray_500};
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  overflow: hidden;
`;

const ItemImage = styled(Image)`
  border-radius: 10px;
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
