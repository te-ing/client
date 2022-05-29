import React, { useEffect } from 'react';
import * as S from './styles';
import AddItemCard from 'components/common/AddItemCard';
import Thumbnail from 'components/common/Thumbnail';
import { PostType } from 'types/post';
interface Props {
  dataList: PostType[]; //데이터 형식에따라 타입 변환할 것
  isLeader: boolean;
  editMode?: boolean;
}
const ItemList: React.FC<Props> = ({ dataList, isLeader, editMode }) => {
  return (
    <S.ItemListWrapper>
      {dataList.length > 0
        ? dataList.map((item) => <Thumbnail key={item.id} item={item} editMode={editMode} />)
        : isLeader && <AddItemCard></AddItemCard>}
    </S.ItemListWrapper>
  );
};

export default ItemList;
