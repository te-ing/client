import React from 'react';
import * as S from './SetUserInterest.style';

import Button from '../button/Button';

import intereCategories from 'data/interestCategories.json';
import type { UserSubCategoryInfoType, UserInterestInfoType } from './SetUserInterest.type';

const SetUserInterest: React.FC = () => {
    
    return (
        <S.Wrapper>
            <S.InfoHeader>
                <S.Title>어떤 분야의 예술에 <br /> 종사하고 계신가요?</S.Title>
                <S.SubInfo>관련된 키워드들을 모두 선택해주세요!</S.SubInfo>
            </S.InfoHeader>        
            <S.CategoriesWrapper>
                    {
                        intereCategories.data.map(({ id, mainCategory, subCategory }: UserInterestInfoType) => {
                            return (
                                <S.CategoryInfo key={id}>
                                    <S.CategoryName>{mainCategory}</S.CategoryName>
                                    <S.SubCategoryList>
                                        {
                                            subCategory.map(({ id, name }: UserSubCategoryInfoType) => {
                                                return <S.Tag key={id} id={`${id}`}>{name}</S.Tag>
                                            })
                                        }
                                    </S.SubCategoryList>
                                </S.CategoryInfo>
                                
                            )
                        })
                    }
                </S.CategoriesWrapper>
                <Button sort="setUserInteres" name="관심분야 설정 완료"/>
        </S.Wrapper>
    )
}

export default SetUserInterest;