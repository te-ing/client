import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as S from './styles';
import intereCategories from 'data/interestCategories.json';
import Image from 'next/image';
import { close_icon } from 'constants/imgUrl';

interface UserSubCategoryInfoType {
  id: number;
  name: string;
}

interface UserInterestInfoType {
  id: number;
  mainCategory: string;
  subCategory: UserSubCategoryInfoType[];
}

interface Props {
  setInterestOnOff: Dispatch<SetStateAction<boolean>>;
  interestList: UserSubCategoryInfoType[];
  setInterestList: Dispatch<SetStateAction<UserSubCategoryInfoType[]>>;
}

const InterestModal = ({ setInterestOnOff, interestList, setInterestList }: Props) => {
  const [interests, selectedInterest] = useState<UserSubCategoryInfoType[]>(interestList);

  const handleClickedTag = (keyword: UserSubCategoryInfoType) => () => {
    if (interests.map((el) => el.id).includes(keyword.id)) {
      selectedInterest(interests.filter((interest) => interest.id !== keyword.id));
    } else {
      selectedInterest([...interests, keyword]);
    }
  };

  const selectedFinish = () => {
    setInterestList([...interests]);
    setInterestOnOff(false);
  };

  const interestHandler = (flag: boolean) => () => {
    setInterestOnOff(flag);
  };

  useEffect(() => {
    console.log(interestList);
  }, [interestList]);

  return (
    <S.Modal>
      <S.Wrapper>
        <S.CloseButton onClick={interestHandler(false)}>
          <Image src={close_icon} width={24} height={24} />
        </S.CloseButton>
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
                <S.SubCategoryList>
                  {categoryInfo.subCategory.map((interest) => {
                    return (
                      <S.Tag
                        key={interest.id}
                        onClick={handleClickedTag(interest)}
                        isActive={interests.map((el) => el.id).includes(interest.id)}
                      >
                        {interest.name}
                      </S.Tag>
                    );
                  })}
                </S.SubCategoryList>
              </S.CategoryInfo>
            );
          })}
        </S.CategoriesWrapper>
        <S.Button onClick={selectedFinish}>관심 분야 설정 완료</S.Button>
      </S.Wrapper>
    </S.Modal>
  );
};

export default InterestModal;
