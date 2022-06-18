import styled from 'styled-components';

export const Keyword = styled.span`
  display: inline-block;

  height: 24px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.3166666;
  background-color: ${({ theme }) => theme.color.gray_200};

  margin-right: 8px;
  margin-bottom: 8px;
`;

export const TempKeyword = styled.span`
  display: inline-flex;
  justify-content: center;
  height: 24px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.3166666;
  background-color: ${({ theme }) => theme.color.gray_200};

  margin-right: 8px;
  margin-bottom: 8px;
`;
