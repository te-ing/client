import styled from 'styled-components';
import { styledProps } from './types';

export const BannerWrapper = styled.div<styledProps>`
  width: 100%;
  height: 280px;
  background-color: ${(props) => props.theme.color.backgroundGray};
  background-image: ${(props) => props.url && `url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
