import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    * {
        box-sizing: border-box;
    }
    html{
        font-size: 16px;
        -webkit-text-size-adjust: none;
        font-family: 'Noto Sans KR',sans-serif;       
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
        height: 100%;
    }
    button,span,input{
        font-family: 'Noto Sans KR',sans-serif;   
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    #body{
        height: 100%;
    }
    
    #__next{
        height: 100%;
    }
`;
