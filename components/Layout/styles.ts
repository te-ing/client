import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: ${(props) => props.theme.desktop};
  padding: 0 30px 10px;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    padding: 0 16px 16px 16px;
  }
`;
