import styled, { css } from 'styled-components';

export const Modal = styled.div`
  z-index: 1001;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.color.white};
  max-width: 752px;
  min-height: 602px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoHeader = styled.header`
  margin-bottom: 24px;
  text-align: center;
`;

export const Title = styled.p`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.458333;
  color: ${({ theme }) => theme.color.black};
`;

export const SubInfo = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.6);
`;

export const CategoriesWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const CategoryInfo = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryName = styled.p`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: #000000;
`;

export const SubCategoryList = styled.div``;

export const Tag = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 12px;
  padding: 8px 10px;
  vertical-align: center;
  border: 1px solid #c4c4c4;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15px;
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
  width: 100%;
  min-height: 56px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
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
