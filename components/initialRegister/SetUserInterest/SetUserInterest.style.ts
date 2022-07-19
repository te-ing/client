import styled, { css } from 'styled-components';

import type { StyledTagType } from './index';

export const Wrapper = styled.div`
  width: 90vw;
  max-width: 752px;
  text-align: center;
`;

export const InfoHeader = styled.header`
  margin-bottom: 39.5px;
`;

export const Title = styled.p`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
`;

export const SubInfo = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.6);
`;

export const CategoriesWrapper = styled.div`
  margin-bottom: 44.85px;
  padding-right: 47px;
  text-align: left;
`;

export const CategoryInfo = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryName = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: #000000;
`;

export const SubCategoryList = styled.div``;

export const Tag = styled.button<StyledTagType>`
  margin-right: 8px;
  margin-bottom: 12px;
  padding: 7px 10px;
  vertical-align: center;
  border: 1px solid #c4c4c4;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: #000000;

  &:last-child {
    margin-right: 0;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid #ffffff;
      background-color: #bdf486;
    `}
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  background-color: #abf066;
  color: #000000;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #bdf486;
  }

  &:disabled {
    color: #b0b0b0;
    background-color: #eeeeee;
    cursor: default;
  }
`;
