import React, { useState } from 'react';
import * as S from './SetUserInterest.style';

import CompleteRegister from '../CelebrateRegister';

import useModal from 'hooks/useModal';

import intereCategories from 'data/interestCategories.json';
import editUserData from '../userEdit.api';
import { useRouter } from 'next/router';

export interface UserSubCategoryInfoType {
  id: number;
  name: string;
}

export interface UserInterestInfoType {
  id: number;
  mainCategory: string;
  subCategory: UserSubCategoryInfoType[];
}

export interface StyledTagType {
  isActive: boolean;
}

const SetUserInterest: React.FC = () => {
  const [userInterests, setUserInterests] = useState([]);
  const { setModalVisible } = useModal();
  const router = useRouter();
  const userData = { categories: userInterests.join(',') };
  let isCompleted = false;
  if (userInterests.length) isCompleted = true;

  const handleClickedTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentTag = e.target as HTMLButtonElement;
    if (currentTag.nodeName !== 'BUTTON') return;
    const targetId = currentTag.id.split('-')[1];
    if (userInterests.includes(targetId)) {
      setUserInterests(userInterests.filter((id) => id !== targetId));
    } else {
      setUserInterests([...userInterests, targetId]);
    }
  };

  const confirmSetting = () => {
    editUserData(userData);
    setModalVisible();
    router.push(`/user/${sessionStorage.getItem('id')}`);
  };

  return (
    <S.Wrapper>
      <S.InfoHeader>
        <S.Title>
          어떤 분야의 예술에 <br /> 종사하고 계신가요?
        </S.Title>
        <S.SubInfo>관련된 키워드들을 모두 선택해주세요!</S.SubInfo>
      </S.InfoHeader>
      <S.CategoriesWrapper>
        {intereCategories.data.map((categoryInfo: UserInterestInfoType) => {
          return (
            <S.CategoryInfo key={categoryInfo.id}>
              <S.CategoryName>{categoryInfo.mainCategory}</S.CategoryName>
              <S.SubCategoryList onClick={handleClickedTag}>
                {categoryInfo.subCategory.map(({ id, name }: UserSubCategoryInfoType) => {
                  return (
                    <S.Tag key={id} id={`${categoryInfo.id}-${id}`} isActive={userInterests.includes(String(id))}>
                      {name}
                    </S.Tag>
                  );
                })}
              </S.SubCategoryList>
            </S.CategoryInfo>
          );
        })}
      </S.CategoriesWrapper>
      <S.Button disabled={!isCompleted} onClick={confirmSetting}>
        관심분야 설정 완료
      </S.Button>
    </S.Wrapper>
  );
};

export default SetUserInterest;
