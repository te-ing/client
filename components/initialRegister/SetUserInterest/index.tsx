import React from 'react';
import * as S from './SetUserInterest.style';

import CompleteRegister from '../CompleteRegister';

import { useRecoilState } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';
import type { UserRegisterInfoType } from 'recoil/auth';

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
  const [userInfo, setUserInfo] = useRecoilState<UserRegisterInfoType>(userRegisterInfoState);

  const { navigateToNext, isNext } = useModal();

  const checkActiveButton = (currentTag: string): boolean => {
    let isActive = false;

    const [mainCategoryID, subCategoryID] = currentTag.split('-');
    const { mainCategory } = userInfo;

    mainCategory.forEach(({ mainCategory, subCategory }) => {
      if (mainCategory === Number(mainCategoryID) && subCategory.includes(Number(subCategoryID))) isActive = true;
    });

    return isActive;
  };

  const storeTagInfo = (mainCategoryID: string, subCategoryID: string) => {
    const { mainCategory } = userInfo;
    let isCategoryExisted = false;
    let currentCategoryIndex;

    mainCategory.forEach(({ mainCategory }, index) => {
      if (mainCategory === Number(mainCategoryID)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isCategoryExisted = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentCategoryIndex = index;
        return;
      }
    });

    if (isCategoryExisted) {
      const { subCategory } = mainCategory[currentCategoryIndex];
      let updateSubCategory = [];

      if (subCategory.includes(Number(subCategoryID))) {
        updateSubCategory = subCategory.filter((id) => id !== Number(subCategoryID));

        if (updateSubCategory.length === 0) {
          setUserInfo({
            ...userInfo,
            mainCategory: mainCategory.filter((categoryInfo) => categoryInfo.mainCategory !== Number(mainCategoryID)),
          });
          return;
        } else {
          setUserInfo({
            ...userInfo,
            mainCategory: mainCategory.map((categoryInfo) => {
              if (categoryInfo.mainCategory === Number(mainCategoryID))
                return { ...categoryInfo, subCategory: updateSubCategory };
              else return categoryInfo;
            }),
          });
        }
      } else {
        setUserInfo({
          ...userInfo,
          mainCategory: mainCategory.map((categoryInfo) => {
            if (categoryInfo.mainCategory === Number(mainCategoryID))
              return { ...categoryInfo, subCategory: categoryInfo.subCategory.concat(Number(subCategoryID)) };
            else return categoryInfo;
          }),
        });
      }
    } else {
      const initialCategory = {
        mainCategory: Number(mainCategoryID),
        subCategory: [Number(subCategoryID)],
      };

      setUserInfo({ ...userInfo, mainCategory: [...mainCategory, initialCategory] });
    }
  };

  const handleClickedTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentTag = e.target as HTMLButtonElement;

    if (currentTag.nodeName !== 'BUTTON') return;

    const [mainCategoryID, subCategoryID] = currentTag.id.split('-');

    storeTagInfo(mainCategoryID, subCategoryID);
  };

  if (isNext) return <CompleteRegister />;
  console.log(userInfo.mainCategory);
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
                    <S.Tag
                      key={id}
                      id={`${categoryInfo.id}-${id}`}
                      isActive={checkActiveButton(`${categoryInfo.id}-${id}`)}
                    >
                      {name}
                    </S.Tag>
                  );
                })}
              </S.SubCategoryList>
            </S.CategoryInfo>
          );
        })}
      </S.CategoriesWrapper>
      <Button sort="setUserInteres" name="관심분야 설정 완료" navigateToNext={navigateToNext} />
    </S.Wrapper>
  );
};

export default SetUserInterest;
