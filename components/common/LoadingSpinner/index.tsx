import React from 'react';
import styled from 'styled-components';
import { FlexBox } from 'styles/commonStyles';

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #bdf486;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
