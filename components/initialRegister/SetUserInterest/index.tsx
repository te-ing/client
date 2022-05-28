import React, { useState } from 'react';
import * as S from './SetUserInterest.style';

import CompleteRegister from '../CompleteRegister';

import Button from '../Button';

import useModal from 'hooks/useModal';

import intereCategories from 'data/interestCategories.json';

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
  const { navigateToNext, isNext } = useModal();

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

  if (isNext) return <CompleteRegister />;

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
      <Button
        sort="setUserInteres"
        name="관심분야 설정 완료"
        navigateToNext={navigateToNext}
        userData={{ categories: userInterests.join(',') }}
      />
    </S.Wrapper>
  );
};

export default SetUserInterest;
