import React, { useEffect } from 'react';
import * as S from './styles';
import AddItemCard from 'components/common/AddItemCard';
import Thumbnail from 'components/common/Thumbnail';
interface Props {
  itemList: string[]; //데이터 형식에따라 타입 변환할 것
}
const ItemList: React.FC<Props> = ({ itemList }) => {
  useEffect(() => {
    console.log(itemList);
  }, [itemList]);
  return (
    <S.ItemListWrapper>
      {itemList.length ? (
        itemList.map((item, i) => <Thumbnail key={i} item={item}></Thumbnail>)
      ) : (
        <AddItemCard></AddItemCard>
      )}
    </S.ItemListWrapper>
  );
};

export default ItemList;
