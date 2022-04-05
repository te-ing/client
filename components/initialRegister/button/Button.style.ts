import styled from 'styled-components';
import type { StyledButtonPropsType } from './Button.type';

export const StyledButton = styled.button<StyledButtonPropsType>`
    min-width: ${({ sort }) => sort === 'setUserProfile' ? '520px' : (sort === 'setUserInterest' ? '552px' : '368px')};
    min-height: 56px;
    padding: 16px ${({ sort }) => sort === 'setUserProfile' ? '165px' : (sort === 'setUserInterest' ? '197px' : '116.5px')};
    border: none;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.15px;
    background-color: #ABF066;
    color: #000000;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #BDF486;
    }
`;