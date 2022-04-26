import styled from 'styled-components';
import Image from 'next/image';
export const InfoWrapper = styled.div`
  padding: 24px;
  position: relative;
  margin-bottom: 80px;
  display: flex;
`;

export const ProfileImg = styled.div``;

export const InfoSection = styled.div`
  margin-left: 24px;
  width: 610px;

  & > h1{
    font-size: 20px;
    line-height: 1.3;
    font-weight : ${({ theme }) => theme.fontWeight.bold}
    color: ${({ theme }) => theme.color.profileNameBlack};
    margin-bottom: 16px;
  }
`;

export const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  p {
    color: ${({ theme }) => theme.color.gray_700};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
  }
`;

export const InfoAside = styled.div`
  position: absolute;
  right: 24px;
`;

export const FollowInfo = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.833333;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.gray_700};
    margin-right: 16px;
  }

  span:nth-child(2n-1) {
    margin-right: 4px;
  }
`;
